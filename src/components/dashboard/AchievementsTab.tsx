
interface AchievementsTabProps {
  problemStats: {
    total: number;
    beginner: number;
    intermediate: number;
    advanced: number;
  };
}

export const AchievementsTab = ({ problemStats }: AchievementsTabProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Achievements</h3>
      <div className="grid gap-4">
        {problemStats.total >= 1 && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">First Problem Solved! 🎉</h4>
            <p className="text-sm text-muted-foreground">You solved your first problem</p>
          </div>
        )}
      </div>
    </div>
  );
};
