import type { Character, Movie, Priority } from "../types";

export function level(watched: Set<number>) {
  return watched.size ? Math.max(...watched) : 0;
}

export function canKnow(revealedAt: number, knowledgeLevel: number) {
  return revealedAt <= knowledgeLevel;
}

export function label(priority: Priority): [string, string] {
  return priority === "essential"
    ? ["🔴 Essencial", "essential"]
    : priority === "recommended"
      ? ["🟡 Recomendado", "recommended"]
      : ["🔵 Futuro", "future"];
}

export function visible(movie: Movie, query: string, filter: string, watched: Set<number>) {
  if (!movie.t.toLowerCase().includes(query)) return false;
  if (filter === "all") return true;
  if (filter === "essential") return movie.p === "essential";
  if (filter === "recommended") return movie.p === "recommended";
  if (filter === "watched") return watched.has(movie.n);
  if (filter === "unwatched") return !watched.has(movie.n);
  return true;
}

export function currentStatus(character: Character, knowledgeLevel: number) {
  let result = "CLASSIFIED";
  character.updates.forEach(([at, text]) => {
    if (canKnow(at, knowledgeLevel)) result = text;
  });
  return result;
}

export function nodeKind(name: string) {
  if (["S.H.I.E.L.D.", "HYDRA", "Vingadores", "TVA"].includes(name)) return "org";
  if (["Tesseract", "Reino Quântico", "Kamar-Taj", "Westview", "Nova York"].includes(name)) return "concept";
  return "person";
}
