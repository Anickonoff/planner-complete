import { updateDataStore, ensureDataStore } from "./data-store.js";

export async function wasReminderSent(dataFile, key) {
  const json = await ensureDataStore(dataFile);

  return Boolean(json.meta?.sentReminders?.[key]);
}

export async function markReminderSent(dataFile, key) {
  await updateDataStore(dataFile, (json) => {
    if (!json.meta) json.meta = {};
    if (!json.meta.sentReminders) json.meta.sentReminders = {};

    json.meta.sentReminders[key] = true;
  });
}

export async function cleanupOldReminders(dataFile, keepDays = 30) {
  await updateDataStore(dataFile, (json) => {
    if (!json.meta?.sentReminders) return;

    const cutoff = Date.now() - keepDays * 86400000;

    for (const key of Object.keys(json.meta.sentReminders)) {
      const datePart = key.split(":")[2];
      if (new Date(datePart).getTime() < cutoff) {
        delete json.meta.sentReminders[key];
      }
    }
  });
}
