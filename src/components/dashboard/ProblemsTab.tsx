import { User } from "@/hooks/useAuth";
import { useProblemStats } from "@/hooks/useProblemStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { sampleProblems } from "@/lib/problems";
import { flipFlopProblems } from "@/lib/problems/flipflops";
import { counterProblems } from "@/lib/problems/counters";
import { registerProblems } from "@/lib/problems/registers";
import { stateMachineProblems } from "@/lib/problems/state-machines";

interface ProblemsTabProps {
  statsLoading: boolean;
  user: User;
}

export const ProblemsTab = ({ statsLoading, user }: ProblemsTabProps) => {
  const { completedProblemIds } = useProblemStats(user);
  
  const allProblems = [
    ...sampleProblems,
    ...flipFlopProblems,
    ...counterProblems,
    ...registerProblems,
    ...stateMachineProblems,
  ];

  const solvedProblems = allProblems.filter(problem => 
    completedProblemIds?.includes(problem.id)
  );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">My Problems</h3>
      {statsLoading ? (
        <div className="animate-pulse h-20 bg-muted rounded" />
      ) : solvedProblems.length === 0 ? (
        <p className="text-muted-foreground">You haven't solved any problems yet. Start solving to see them here!</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {solvedProblems.map((problem) => (
            <Link to={`/problem/${problem.id}`} key={problem.id}>
              <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <div 
                        className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full
                          ${problem.difficulty === "easy" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : 
                            problem.difficulty === "medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" : 
                            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
                      >
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                      <span>Solved</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl line-clamp-2">{problem.title}</CardTitle>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {problem.category}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 text-sm sm:text-base">
                    {problem.description.substring(0, 150)}...
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
