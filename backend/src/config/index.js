import { resolveBackendPath } from "../utils/paths.js";

export const config = {
  port: Number(process.env.PORT) || 3000,
  dataFile: resolveBackendPath(
    process.env.DATA_FILE_PATH,
    "./data/events.json"
  ),
  backupDir: resolveBackendPath(process.env.BACKUP_DIR, "./data/backups"),
  logDir: resolveBackendPath(process.env.LOG_DIR, "./logs"),
  timeZone: process.env.APP_TIMEZONE || "UTC",
  locale: process.env.APP_LOCALE || "ru-RU",
  telegram: {
    token: process.env.TG_BOT_TOKEN,
    pollingInterval: Number(process.env.TG_POLLING_INTERVAL) || 2000,
    allowedChatId: process.env.TELEGRAM_ALLOWED_CHAT_ID
      ? Number(process.env.TELEGRAM_ALLOWED_CHAT_ID)
      : null,
    proxyUrl: process.env.TG_PROXY_URL || null,
  },
};
