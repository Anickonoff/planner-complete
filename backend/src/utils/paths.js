import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "../..");

export function resolveBackendPath(value, fallback) {
  const target = value || fallback;

  if (!target) {
    return null;
  }

  return path.isAbsolute(target) ? target : path.resolve(backendRoot, target);
}
