import fs from "fs/promises";
import path from "node:path";
import { withFileLock } from "./fileLock.js";
import { logger } from "./logger.js";
import { restoreLatestBackup } from "./backup.js";

const DEFAULT_STORE = {
  meta: {
    telegramOffset: 0,
    sentReminders: {},
    pendingDeletes: {},
  },
  events: [],
};

function cloneDefaultStore() {
  return JSON.parse(JSON.stringify(DEFAULT_STORE));
}

async function writeJsonAtomic(filePath, json) {
  const dir = path.dirname(filePath);
  const tempPath = path.join(
    dir,
    `.${path.basename(filePath)}.${process.pid}.${Date.now()}.tmp`
  );

  await fs.writeFile(tempPath, JSON.stringify(json, null, 2));
  await fs.rename(tempPath, filePath);
}

async function renameCorruptFile(filePath) {
  const dir = path.dirname(filePath);
  const corruptPath = path.join(
    dir,
    `.${path.basename(filePath)}.corrupt.${process.pid}.${Date.now()}`
  );

  try {
    await fs.rename(filePath, corruptPath);
    return corruptPath;
  } catch {
    return null;
  }
}

async function recoverCorruptStore(filePath, parseError) {
  const restoredBackup = await restoreLatestBackup(filePath);
  if (restoredBackup) {
    logger.warn("Recovered corrupted data store from backup", {
      filePath,
      backupFile: restoredBackup,
      error: parseError,
    });

    try {
      return await ensureDataStore(filePath, false);
    } catch (error) {
      logger.warn("Backup restore still produced invalid data store; resetting", {
        filePath,
        backupFile: restoredBackup,
        error,
      });
    }
  }

  const corruptPath = await renameCorruptFile(filePath);
  const store = cloneDefaultStore();
  await writeJsonAtomic(filePath, store);

  logger.warn("Initialized fresh data store after corruption", {
    filePath,
    corruptPath,
    error: parseError,
  });

  return store;
}

export async function ensureDataStore(filePath, allowRecovery = true) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  let raw;
  try {
    raw = await fs.readFile(filePath, "utf-8");
  } catch (error) {
    if (error?.code === "ENOENT") {
      const store = cloneDefaultStore();
      await writeJsonAtomic(filePath, store);
      return store;
    }

    throw error;
  }

  if (!raw.trim()) {
    const store = cloneDefaultStore();
    await writeJsonAtomic(filePath, store);
    return store;
  }

  let json;
  try {
    json = JSON.parse(raw);
  } catch (error) {
    if (!allowRecovery) {
      throw error;
    }
    return recoverCorruptStore(filePath, error);
  }

  let dirty = false;

  if (!json.meta) {
    json.meta = {};
    dirty = true;
  }

  if (json.meta.telegramOffset === undefined) {
    json.meta.telegramOffset = 0;
    dirty = true;
  }

  if (!json.meta.sentReminders) {
    json.meta.sentReminders = {};
    dirty = true;
  }

  if (!json.meta.pendingDeletes) {
    json.meta.pendingDeletes = {};
    dirty = true;
  }

  if (!Array.isArray(json.events)) {
    json.events = [];
    dirty = true;
  }

  if (dirty) {
    await writeJsonAtomic(filePath, json);
  }

  return json;
}

export async function writeDataStore(filePath, json) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await writeJsonAtomic(filePath, json);
}

export async function updateDataStore(filePath, mutator) {
  return withFileLock(async () => {
    const json = await ensureDataStore(filePath);
    const result = await mutator(json);
    await writeJsonAtomic(filePath, json);
    return result;
  });
}
