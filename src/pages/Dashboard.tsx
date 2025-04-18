
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import NavBar from "@/components/NavBar";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { useProblemStats } from "@/hooks/useProblemStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PuzzleIcon, TrophyIcon, BookOpenIcon } from "lucide-react";
import { ProgressTab } from "@/components/dashboard/ProgressTab";
import { ProblemsTab } from "@/components/dashboard/ProblemsTab";
import { AchievementsTab } from "@/components/dashboard/AchievementsTab";
import { CoursesTab } from "@/components/dashboard/CoursesTab";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { stats: problemStats, loading: statsLoading } = useProblemStats(user);

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
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <ProfileCard user={user} problemStats={problemStats} />
          </div>
          
          <div className="md:w-2/3">
            <Tabs defaultValue="progress">
              <TabsList className="mb-4">
                <TabsTrigger value="progress">
                  <BarChart className="h-4 w-4 mr-2" />
                  Progress
                </TabsTrigger>
                <TabsTrigger value="problems">
                  <PuzzleIcon className="h-4 w-4 mr-2" />
                  My Problems
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  <TrophyIcon className="h-4 w-4 mr-2" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="courses">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  My Courses
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="progress">
                <ProgressTab 
                  statsLoading={statsLoading} 
                  problemStats={problemStats} 
                  navigate={navigate} 
                />
              </TabsContent>
              
              <TabsContent value="problems">
                <ProblemsTab statsLoading={statsLoading} user={user} />
              </TabsContent>
              
              <TabsContent value="achievements">
                <AchievementsTab problemStats={problemStats} />
              </TabsContent>
              
              <TabsContent value="courses">
                <CoursesTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
