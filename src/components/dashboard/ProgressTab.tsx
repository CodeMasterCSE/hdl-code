import { useProblemStats } from "@/hooks/useProblemStats";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigateFunction } from "react-router-dom";
import { BarChart, TrendingUp, Target, Award } from "lucide-react";

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

  const difficultyStats = [
    {
      title: "Beginner",
      value: problemStats.beginner,
      total: 20,
      icon: <BarChart className="h-4 w-4" />,
      color: "text-green-500"
    },
    {
      title: "Intermediate",
      value: problemStats.intermediate,
      total: 20,
      icon: <TrendingUp className="h-4 w-4" />,
      color: "text-yellow-500"
    },
    {
      title: "Advanced",
      value: problemStats.advanced,
      total: 10,
      icon: <Target className="h-4 w-4" />,
      color: "text-red-500"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {statsLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-2 bg-muted rounded" />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{Math.round(completionPercentage)}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {problemStats.total} of {totalProblems} problems completed
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {difficultyStats.map((stat, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={stat.color}>{stat.icon}</div>
                        <span className="text-sm font-medium">{stat.title}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">completed</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          of {stat.total}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
