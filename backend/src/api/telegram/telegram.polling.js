import { telegramRequest } from "./telegram.client.js";
import { parseTelegramMessage } from "./parser.js";
import { metrics } from "../../utils/metrics.js";
import { EventsService } from "../../services/events.service.js";
import { EventsRepository } from "../../repositories/events.repository.js";
import { formatEventDateForUser } from "../../utils/date.js";
import { config } from "../../config/index.js";
import { logger } from "../../utils/logger.js";
import { handleTelegramCommand } from "./telegram.commands.js";
import { ensureDataStore, updateDataStore } from "../../utils/data-store.js";

export class TelegramPolling {
  constructor({ token, dataFile, interval, allowedChatId = null }) {
    this.token = token;
    this.dataFile = dataFile;
    this.interval = interval;
    this.allowedChatId = allowedChatId;
    this.offset = 0;
    this.running = false;
    this.timer = null;
    this.eventsService = new EventsService(new EventsRepository(this.dataFile));
  }

  async loadOffset() {
    const json = await ensureDataStore(this.dataFile);
    this.offset = json.meta?.telegramOffset || 0;
    metrics.setTelegramOffset(this.offset);
  }

  async saveOffset() {
    await updateDataStore(this.dataFile, (json) => {
      json.meta.telegramOffset = this.offset;
    });
    metrics.setTelegramOffset(this.offset);
  }

  async pollOnce() {
    try {
      const updates = await telegramRequest(this.token, "getUpdates", {
        timeout: 30,
        offset: this.offset,
      });

      for (const update of updates) {
        this.offset = update.update_id + 1;
        metrics.incTelegramUpdates();

        const msg = update.message;
        if (!msg?.text) continue;

        const chatId = msg.chat.id;

        // если ограничение задано и чат не тот — игнорируем
        if (this.allowedChatId !== null && chatId !== this.allowedChatId) {
          continue;
        }

        const text = msg.text.trim();

        // обработка команд
        if (text.startsWith("/")) {
          const handled = await handleTelegramCommand({ text, chatId, token: this.token, eventsService: this.eventsService, dataFile: this.dataFile });
          if (handled) continue;
        }

        //парсинг сообщения

        const parsed = parseTelegramMessage(msg.text);
        if (parsed.error) {
          await telegramRequest(this.token, "sendMessage", {
            chat_id: chatId,
            text: `Ошибка: ${parsed.error}`,
          });
          continue;
        }

        let event;
        try {
          event = await this.eventsService.createEvent({
            ...parsed,
            chatId,
          });
        } catch (err) {
          logger.error("Error creating Telegram event", {
            error: err,
            chatId,
          });
          await telegramRequest(this.token, "sendMessage", {
            chat_id: chatId,
            text:
              "⚠️ Ошибка\n\n" +
              "Не удалось сохранить событие. Мы уже записали техническую ошибку и попробуем дальше работать нормально.",
          });
          continue;
        }

        const dateText = formatEventDateForUser(event, config.timeZone);
        await telegramRequest(this.token, "sendMessage", {
          chat_id: chatId,
          text: `📌 Событие создано\n\n` + `${event.title}\n` + `${dateText}`,
        });
      }

      await this.saveOffset();
    } catch (err) {
      metrics.incTelegramErrors();
      logger.error("Telegram polling error", {
        error: err,
      });
    }
  }

  async start() {
    if (this.running) return;
    this.running = true;
    logger.info("Telegram polling started");

    await this.loadOffset();

    const loop = async () => {
      if (!this.running) return;
      await this.pollOnce();
      this.timer = setTimeout(loop, this.interval);
    };

    loop();
  }

  async stop() {
    this.running = false;
    if (this.timer) clearTimeout(this.timer);
    await this.saveOffset();
  }
}
