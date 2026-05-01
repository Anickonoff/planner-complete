import { withFileLock } from "../utils/fileLock.js";
import { createBackup, cleanupBackups } from "../utils/backup.js";
import { ensureDataStore, writeDataStore } from "../utils/data-store.js";

export class EventsRepository {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async load() {
    return ensureDataStore(this.filePath);
  }

  async save(mutator) {
    return withFileLock(async () => {
      const data = await this.load();
      await createBackup(this.filePath);

      const result = await mutator(data);

      data.meta.updatedAt = new Date().toISOString();
      await writeDataStore(this.filePath, data);

      await cleanupBackups();
      return result;
    });
  }
}
