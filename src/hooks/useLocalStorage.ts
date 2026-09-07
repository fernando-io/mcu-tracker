import { useEffect, useState } from "react";
import type { ProgressState } from "../types";

const STORAGE = "mcu-shield-archive-v4";
const EMPTY_STATE: ProgressState = { watched: [], ratings: {}, notes: {} };

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function migrateState(): ProgressState {
  const current = readJson<ProgressState | null>(STORAGE, null);
  if (current) return current;

  const previousV3 = readJson<ProgressState | null>("mcu-shield-archive-v3", null);
  if (previousV3) {
    const migrated: ProgressState = { watched: [], ratings: {}, notes: {} };
    const mapV3 = (n: number) => n === 33 ? null : n > 33 ? n - 1 : n;
    (previousV3.watched || []).forEach(n => { const m = mapV3(n); if (m) migrated.watched.push(m); });
    Object.entries(previousV3.ratings || {}).forEach(([n, v]) => { const m = mapV3(Number(n)); if (m) migrated.ratings[m] = v; });
    Object.entries(previousV3.notes || {}).forEach(([n, v]) => { const m = mapV3(Number(n)); if (m) migrated.notes[m] = v; });
    localStorage.setItem(STORAGE, JSON.stringify(migrated));
    return migrated;
  }

  const previousV2 = readJson<ProgressState | null>("mcu-shield-archive-v2", null);
  if (previousV2) {
    const removedOld = new Set([25, 29, 31, 32, 34]);
    const oldToNew: Record<number, number> = {};
    let nextNumber = 0;
    for (let oldNumber = 1; oldNumber <= 48; oldNumber++) {
      if (!removedOld.has(oldNumber)) {
        nextNumber++;
        oldToNew[oldNumber] = nextNumber;
      }
    }
    const migrated: ProgressState = { watched: [], ratings: {}, notes: {} };
    (previousV2.watched || []).forEach(n => { if (oldToNew[n]) migrated.watched.push(oldToNew[n]); });
    Object.entries(previousV2.ratings || {}).forEach(([n, v]) => { if (oldToNew[Number(n)]) migrated.ratings[oldToNew[Number(n)]] = v; });
    Object.entries(previousV2.notes || {}).forEach(([n, v]) => { if (oldToNew[Number(n)]) migrated.notes[oldToNew[Number(n)]] = v; });
    localStorage.setItem(STORAGE, JSON.stringify(migrated));
    return migrated;
  }

  const oldProgress = readJson<number[]>("mcu-essencial-progress-v1", []).filter(n => n < 25);
  return { ...EMPTY_STATE, watched: oldProgress };
}

export function useLocalStorage() {
  const [state, setState] = useState<ProgressState>(() => migrateState());

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(state));
  }, [state]);

  return [state, setState] as const;
}
