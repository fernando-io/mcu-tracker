const characterPortraits = import.meta.glob<string>("../assets/characters/**/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

export function characterPortrait(characterId: string, revealedAt: number) {
  return characterPortraits[`../assets/characters/${characterId}/${revealedAt}.webp`] || "";
}
