import { defaultWatchlist } from "../watchlists/defaultWatchlist";
import type { ProgressState, WatchlistProgress } from "../types";

const STORAGE = "mcu-shield-archive-v5";
const LEGACY_STORAGE = "mcu-shield-archive-v4";

export const EMPTY_PROGRESS_STATE: ProgressState = {
  watched: [],
  ratings: {},
  notes: {},
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function isProgressState(value: unknown): value is ProgressState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const progress = value as Partial<ProgressState>;
  return Array.isArray(progress.watched)
    && progress.watched.every(productionId => typeof productionId === "number")
    && Boolean(progress.ratings) && typeof progress.ratings === "object"
    && Boolean(progress.notes) && typeof progress.notes === "object";
}

function isWatchlistProgress(value: unknown): value is WatchlistProgress {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every(isProgressState);
}

function migrateLegacyProgress(): ProgressState {
  const current = readJson<unknown>(LEGACY_STORAGE, null);
  if (isProgressState(current)) {
    return current;
  }

  const previousV3 = readJson<ProgressState | null>("mcu-shield-archive-v3", null);
  if (previousV3) {
    const migrated: ProgressState = { watched: [], ratings: {}, notes: {} };
    const mapV3 = (n: number) => n === 33 ? null : n > 33 ? n - 1 : n;
    (previousV3.watched || []).forEach(n => { const mapped = mapV3(n); if (mapped) migrated.watched.push(mapped); });
    Object.entries(previousV3.ratings || {}).forEach(([n, value]) => { const mapped = mapV3(Number(n)); if (mapped) migrated.ratings[mapped] = value; });
    Object.entries(previousV3.notes || {}).forEach(([n, value]) => { const mapped = mapV3(Number(n)); if (mapped) migrated.notes[mapped] = value; });
    return migrated;
  }

  const previousV2 = readJson<ProgressState | null>("mcu-shield-archive-v2", null);
  if (previousV2) {
    const removedOld = new Set([25, 29, 31, 32, 34]);
    const oldToNew: Record<number, number> = {};
    let nextNumber = 0;
    for (let oldNumber = 1; oldNumber <= 48; oldNumber += 1) {
      if (!removedOld.has(oldNumber)) {
        nextNumber += 1;
        oldToNew[oldNumber] = nextNumber;
      }
    }

    const migrated: ProgressState = { watched: [], ratings: {}, notes: {} };
    (previousV2.watched || []).forEach(n => { if (oldToNew[n]) migrated.watched.push(oldToNew[n]); });
    Object.entries(previousV2.ratings || {}).forEach(([n, value]) => { if (oldToNew[Number(n)]) migrated.ratings[oldToNew[Number(n)]] = value; });
    Object.entries(previousV2.notes || {}).forEach(([n, value]) => { if (oldToNew[Number(n)]) migrated.notes[oldToNew[Number(n)]] = value; });
    return migrated;
  }

  const oldProgress = readJson<number[]>("mcu-essencial-progress-v1", []).filter(n => n < 25);
  return { ...EMPTY_PROGRESS_STATE, watched: oldProgress };
}

export function getPersistedWatchlistProgress(): WatchlistProgress {
  const persisted = readJson<unknown>(STORAGE, null);
  if (isWatchlistProgress(persisted)) {
    return persisted;
  }

  return { [defaultWatchlist.id]: migrateLegacyProgress() };
}

export function persistWatchlistProgress(progress: WatchlistProgress): void {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(progress));
  } catch {
    // Persistence is optional when browser storage is unavailable.
  }
}
