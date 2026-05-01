import { updateDataStore, ensureDataStore } from "./data-store.js";

const TTL_MS = 5 * 60 * 1000; // 5 минут

export async function createPendingDelete(dataFile, eventId, chatId) {
  await updateDataStore(dataFile, (json) => {
    if (!json.meta) json.meta = {};
    if (!json.meta.pendingDeletes) json.meta.pendingDeletes = {};

    json.meta.pendingDeletes[eventId] = {
      chatId,
      expiresAt: new Date(Date.now() + TTL_MS).toISOString(),
    };
  });
}

export async function getPendingDelete(dataFile, eventId) {
  const json = await ensureDataStore(dataFile);

  return json.meta?.pendingDeletes?.[eventId] || null;
}

export async function clearPendingDelete(dataFile, eventId) {
  await updateDataStore(dataFile, (json) => {
    if (json.meta?.pendingDeletes?.[eventId]) {
      delete json.meta.pendingDeletes[eventId];
    }
  });
}

export async function clearPendingDeletesForChat(dataFile, chatId) {
  return updateDataStore(dataFile, (json) => {
    if (!json.meta?.pendingDeletes) {
      return 0;
    }

    let removed = 0;

    for (const [eventId, pending] of Object.entries(json.meta.pendingDeletes)) {
      if (pending.chatId === chatId) {
        delete json.meta.pendingDeletes[eventId];
        removed++;
      }
    }

    return removed;
  });
}
