
import { useProblemStats } from "@/hooks/useProblemStats";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { NavigateFunction } from "react-router-dom";

interface ProgressTabProps {
  statsLoading: boolean;
  problemStats: {
    total: number;
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  navigate: NavigateFunction;
}

export const ProgressTab = ({ statsLoading, problemStats, navigate }: ProgressTabProps) => {
  const totalProblems = 50; // Example total, adjust based on your actual total
  const completionPercentage = (problemStats.total / totalProblems) * 100;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Overall Progress</h3>
        {statsLoading ? (
          <div className="animate-pulse h-4 bg-muted rounded" />
        ) : (
          <>
            <Progress value={completionPercentage} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {problemStats.total} of {totalProblems} problems completed ({Math.round(completionPercentage)}%)
            </p>
          </>
        )}
      </Card>
    </div>
  );
};
