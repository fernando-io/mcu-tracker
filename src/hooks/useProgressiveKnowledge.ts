import { useMemo } from "react";
import { createProgressiveKnowledge } from "../engines/progressiveKnowledge";

export function useProgressiveKnowledge(watched: Iterable<number>) {
  return useMemo(() => createProgressiveKnowledge(watched), [watched]);
}