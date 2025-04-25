import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMode } from '@/contexts/ModeContext'
import NavBar from "@/components/NavBar";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { useProblemStats } from "@/hooks/useProblemStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PuzzleIcon, TrophyIcon, BookOpenIcon, ChevronRight } from "lucide-react";
import { ProgressTab } from "@/components/dashboard/ProgressTab";
import { ProblemsTab } from "@/components/dashboard/ProblemsTab";
import { AchievementsTab } from "@/components/dashboard/AchievementsTab";
import { CoursesTab } from "@/components/dashboard/CoursesTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { stats: problemStats, loading: statsLoading } = useProblemStats(user);
  const { mode, setMode, resolvedMode } = useMode();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard user={user} problemStats={problemStats} />
            
            {/* Mode Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setMode('light')}
                    className={`flex-1 px-3 py-2 rounded-md ${
                      mode === 'light'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setMode('dark')}
                    className={`flex-1 px-3 py-2 rounded-md ${
                      mode === 'dark'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setMode('system')}
                    className={`flex-1 px-3 py-2 rounded-md ${
                      mode === 'system'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    System
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Current mode: {resolvedMode} {mode === 'system' && '(System)'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Problems</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{problemStats.total}</div>
                  <Progress value={(problemStats.total / 50) * 100} className="mt-2 bg-blue-500/20 dark:bg-blue-500/40" />
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Points Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {problemStats.easy * 10 + problemStats.medium * 20 + problemStats.hard * 30}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Keep going!</div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Current Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {problemStats.total >= 10 ? "Expert" : 
                     problemStats.total >= 5 ? "Pro" : 
                     problemStats.total >= 1 ? "Easy" : "-"}
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2">
                    View Leaderboard <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="progress" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="progress" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Progress
                </TabsTrigger>
                <TabsTrigger value="problems" className="flex items-center gap-2">
                  <PuzzleIcon className="h-4 w-4" />
                  Problems
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <TrophyIcon className="h-4 w-4" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="courses" className="flex items-center gap-2">
                  <BookOpenIcon className="h-4 w-4" />
                  Courses
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="progress" className="mt-6">
                <ProgressTab 
                  statsLoading={statsLoading} 
                  problemStats={problemStats} 
                  navigate={navigate} 
                />
              </TabsContent>
              
              <TabsContent value="problems" className="mt-6">
                <ProblemsTab statsLoading={statsLoading} user={user} />
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-6">
                <AchievementsTab problemStats={problemStats} />
              </TabsContent>
              
              <TabsContent value="courses" className="mt-6">
                <CoursesTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
