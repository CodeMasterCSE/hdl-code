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
              <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Total Problems</h3>
                      <div className="text-4xl font-bold mt-1">{problemStats.total}</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <PuzzleIcon className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm text-muted-foreground">Easy</span>
                      </div>
                      <span className="text-base font-medium">{problemStats.easy}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span className="text-sm text-muted-foreground">Medium</span>
                      </div>
                      <span className="text-base font-medium">{problemStats.medium}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span className="text-sm text-muted-foreground">Hard</span>
                      </div>
                      <span className="text-base font-medium">{problemStats.hard}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Points Earned</h3>
                      <div className="text-3xl font-bold mt-1">
                        {problemStats.easy * 10 + problemStats.medium * 20 + problemStats.hard * 30}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <TrophyIcon className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Easy Problems</span>
                      <span className="text-sm font-medium">{problemStats.easy * 10} pts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Medium Problems</span>
                      <span className="text-sm font-medium">{problemStats.medium * 20} pts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Hard Problems</span>
                      <span className="text-sm font-medium">{problemStats.hard * 30} pts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Current Rank</h3>
                      <div className="text-3xl font-bold mt-1">
                        {problemStats.total >= 10 ? "Expert" : 
                         problemStats.total >= 5 ? "Pro" : 
                         problemStats.total >= 1 ? "Beginner" : "-"}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <BarChart className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Next Rank</span>
                      <span className="text-sm font-medium">
                        {problemStats.total < 1 ? "Beginner" : 
                         problemStats.total < 5 ? "Pro" : 
                         problemStats.total < 10 ? "Expert" : "Master"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Problems Needed</span>
                      <span className="text-sm font-medium">
                        {problemStats.total < 1 ? 1 : 
                         problemStats.total < 5 ? 5 - problemStats.total : 
                         problemStats.total < 10 ? 10 - problemStats.total : 0}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-3 w-full">
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
                <AchievementsTab problemStats={{...problemStats, beginner: 0, intermediate: 0, advanced: 0}} />
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
