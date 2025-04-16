
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PuzzleIcon, TrophyIcon, BookOpenIcon, BarChart } from "lucide-react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      ? name
          .split(' ')
          .map(part => part[0])
          .join('')
          .toUpperCase()
      : user.email?.substring(0, 2).toUpperCase() || 'U';
  };

  const fullName = user.user_metadata?.full_name || '';
  const email = user.email || '';

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" alt={fullName} />
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-700">
                      {getInitials(fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">{fullName || 'HDL User'}</h3>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-xs text-muted-foreground">Solved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-xs text-muted-foreground">Points</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">-</p>
                      <p className="text-xs text-muted-foreground">Rank</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Your Learning Progress</CardTitle>
                    <CardDescription>Track your journey in learning HDL</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4">
                      <p className="text-muted-foreground">You haven't started any courses or problems yet.</p>
                      <p>Ready to begin your HDL learning journey?</p>
                      <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <a href="/problems" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          <PuzzleIcon className="mr-2 h-4 w-4" />
                          Browse Problems
                        </a>
                        <a href="/learn/hdl-basics" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          <BookOpenIcon className="mr-2 h-4 w-4" />
                          Start Learning
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="problems">
                <Card>
                  <CardHeader>
                    <CardTitle>My Problems</CardTitle>
                    <CardDescription>Problems you've attempted or solved</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">You haven't attempted any problems yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Badges and trophies you've earned</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Complete challenges to earn achievements</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>My Courses</CardTitle>
                    <CardDescription>Courses you're enrolled in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">You haven't enrolled in any courses yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
