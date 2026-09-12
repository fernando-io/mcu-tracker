import type { Achievement } from "../../types";

interface AchievementCardProps {
  achievement: Achievement;
  unlocked: boolean;
}

export function AchievementCard({ achievement, unlocked }: AchievementCardProps) {
  return (
    <div className={`achievement ${unlocked ? "" : "locked"}`}>
      <div className="icon">{achievement.icon}</div>
      <h4>{unlocked ? achievement.name : "CLASSIFIED"}</h4>
      <p>{unlocked ? `${achievement.desc} • Desbloqueada` : "████████████"}</p>
    </div>
  );
}
