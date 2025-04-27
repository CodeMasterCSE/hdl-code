import { useProblemStats } from "@/hooks/useProblemStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigateFunction } from "react-router-dom";
import { Award } from "lucide-react";
import { sampleProblems } from "@/lib/problems";
import { flipFlopProblems } from "@/lib/problems/flipflops";
import { counterProblems } from "@/lib/problems/counters";
import { registerProblems } from "@/lib/problems/registers";
import { stateMachineProblems } from "@/lib/problems/state-machines";
import { SemiCircularProgress } from "./SemiCircularProgress";

interface ProgressTabProps {
  statsLoading: boolean;
  problemStats: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
  navigate: NavigateFunction;
}

export const ProgressTab = ({ statsLoading, problemStats, navigate }: ProgressTabProps) => {
  // Calculate total problems from all problem sets
  const allProblems = [
    ...sampleProblems,
    ...flipFlopProblems,
    ...counterProblems,
    ...registerProblems,
    ...stateMachineProblems,
  ];

  const totalProblems = allProblems.length;
  const completionPercentage = (problemStats.total / totalProblems) * 100;

  // Count problems by difficulty
  const difficultyCounts = {
    easy: allProblems.filter(p => p.difficulty === 'easy').length,
    medium: allProblems.filter(p => p.difficulty === 'medium').length,
    hard: allProblems.filter(p => p.difficulty === 'hard').length
  };

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
              <div className="flex justify-center mb-8">
                <SemiCircularProgress
                  easy={problemStats.easy}
                  medium={problemStats.medium}
                  hard={problemStats.hard}
                  totalEasy={difficultyCounts.easy}
                  totalMedium={difficultyCounts.medium}
                  totalHard={difficultyCounts.hard}
                />
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold mb-1">
                  {problemStats.total} of {totalProblems} Problems Solved
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="text-green-500">{problemStats.easy}/{difficultyCounts.easy} Easy</span> • 
                  <span className="text-yellow-500 ml-1">{problemStats.medium}/{difficultyCounts.medium} Medium</span> • 
                  <span className="text-red-500 ml-1">{problemStats.hard}/{difficultyCounts.hard} Hard</span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
