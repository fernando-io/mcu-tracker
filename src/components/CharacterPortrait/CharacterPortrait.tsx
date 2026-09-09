import type { CharacterImage } from "../../types";

interface CharacterPortraitProps {
  image: CharacterImage | undefined;
  alt: string;
}

export function CharacterPortrait({ image, alt }: CharacterPortraitProps) {
  if (!image || !image.src) {
    return (
      <div className="character-portrait asset-pending">
        <span>CLASSIFIED</span>
        <b>Retrato indisponível</b>
      </div>
    );
  }

  return <img className="character-portrait" src={image.src} alt={image.alt || alt} />;
}