import { AchievementCard } from "../../components/AchievementCard/AchievementCard";
import { useHomeViewModel } from "../../hooks/useHomeViewModel";

export function AchievementsPage() {
  const achievements = useHomeViewModel({ filter: "all", query: "" });

  return (
    <main className="wrap page-content">
      <div className="achievement-grid">{achievements.achievements.map(({ achievement, unlocked }) => <AchievementCard key={achievement.name} achievement={achievement} unlocked={unlocked} />)}</div>
    </main>
  );
}
