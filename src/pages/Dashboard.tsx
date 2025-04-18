import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PuzzleIcon, 
  TrophyIcon, 
  BookOpenIcon, 
  BarChart, 
  CheckCircle2,
  Medal,
  Star
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Define proper types to avoid recursive type issues
interface ProblemStats {
  beginner: number;
  intermediate: number;
  advanced: number;
  total: number;
}

// Update interface to match the actual data structure from Supabase
interface ProblemCompletion {
  id: string;
  user_id: string;
  problem_id: string;
  completed_at?: string;
  solution?: string;
  created_at?: string;
  difficulty?: string;
  problems?: {
    id: string;
    title: string;
    [key: string]: any;
  };
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [problemStats, setProblemStats] = useState<ProblemStats>({
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    total: 0
  });
  const [recentCompletions, setRecentCompletions] = useState<ProblemCompletion[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProblemStats();
      fetchRecentCompletions();
    }
  }, [user]);

  const fetchProblemStats = async () => {
    try {
      // Get beginner problems
      const { data: beginnerData, error: beginnerError } = await supabase
        .from('problem_completions')
        .select('*')
        .eq('user_id', user.id)
        .eq('difficulty', 'Beginner');

      // Get intermediate problems
      const { data: intermediateData, error: intermediateError } = await supabase
        .from('problem_completions')
        .select('*')
        .eq('user_id', user.id)
        .eq('difficulty', 'Intermediate');

      // Get advanced problems
      const { data: advancedData, error: advancedError } = await supabase
        .from('problem_completions')
        .select('*')
        .eq('user_id', user.id)
        .eq('difficulty', 'Advanced');

      // Get total problems
      const { data: totalData, error: totalError } = await supabase
        .from('problem_completions')
        .select('*')
        .eq('user_id', user.id);

      if (!beginnerError && !intermediateError && !advancedError && !totalError) {
        setProblemStats({
          beginner: beginnerData?.length || 0,
          intermediate: intermediateData?.length || 0,
          advanced: advancedData?.length || 0,
          total: totalData?.length || 0
        });
      }

      setStatsLoading(false);
    } catch (error) {
      console.error("Error fetching problem stats:", error);
      setStatsLoading(false);
    }
  };

  const fetchRecentCompletions = async () => {
    try {
      const { data, error } = await supabase
        .from('problem_completions')
        .select('*, problems:problem_id(*)')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(5);

      if (!error && data) {
        // Convert to our expected type with a type assertion
        setRecentCompletions(data as unknown as ProblemCompletion[]);
      }
    } catch (error) {
      console.error("Error fetching recent completions:", error);
    }
  };

  if (loading || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Helper function to get initials
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

  // Chart data
  const difficultyData = [
    { name: 'Beginner', value: problemStats.beginner, fill: '#10B981' },  // Green
    { name: 'Intermediate', value: problemStats.intermediate, fill: '#3B82F6' },  // Blue
    { name: 'Advanced', value: problemStats.advanced, fill: '#8B5CF6' }  // Purple
  ];

  const progressData = [
    { name: 'Beginner', solved: problemStats.beginner, total: 10 },
    { name: 'Intermediate', solved: problemStats.intermediate, total: 15 },
    { name: 'Advanced', solved: problemStats.advanced, total: 8 }
  ];

  // Colors for the charts
  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6'];

  // Difficulty badge
  const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
    const color = 
      difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
      difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
      'bg-purple-100 text-purple-800';
    
    return (
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${color}`}>
        {difficulty}
      </span>
    );
  };

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
                      <p className="text-2xl font-bold">{problemStats.total}</p>
                      <p className="text-xs text-muted-foreground">Solved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        {problemStats.beginner * 10 + 
                         problemStats.intermediate * 20 + 
                         problemStats.advanced * 30}
                      </p>
                      <p className="text-xs text-muted-foreground">Points</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        {problemStats.total >= 10 ? "Expert" : 
                         problemStats.total >= 5 ? "Pro" : 
                         problemStats.total >= 1 ? "Beginner" : "-"}
                      </p>
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
                    {statsLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    ) : problemStats.total > 0 ? (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="bg-green-50">
                            <CardContent className="p-6 flex items-center space-x-4">
                              <div className="bg-green-100 p-3 rounded-full">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Beginner</p>
                                <p className="text-2xl font-bold">{problemStats.beginner}</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-blue-50">
                            <CardContent className="p-6 flex items-center space-x-4">
                              <div className="bg-blue-100 p-3 rounded-full">
                                <Medal className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Intermediate</p>
                                <p className="text-2xl font-bold">{problemStats.intermediate}</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-purple-50">
                            <CardContent className="p-6 flex items-center space-x-4">
                              <div className="bg-purple-100 p-3 rounded-full">
                                <Star className="h-6 w-6 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Advanced</p>
                                <p className="text-2xl font-bold">{problemStats.advanced}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Pie chart */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Problems by Difficulty</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={difficultyData}
                                      cx="50%"
                                      cy="50%"
                                      labelLine={false}
                                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                      outerRadius={80}
                                      dataKey="value"
                                    >
                                      {difficultyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                  </PieChart>
                                </ResponsiveContainer>
                              </div>
                            </CardContent>
                          </Card>
                          
                          {/* Bar chart */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Completion Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                  <RechartsBarChart 
                                    data={progressData}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar name="Solved" dataKey="solved" fill="#3B82F6" />
                                    <Bar name="Total" dataKey="total" fill="#E5E7EB" />
                                  </RechartsBarChart>
                                </ResponsiveContainer>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="flex justify-center mt-4">
                          <Button 
                            onClick={() => navigate('/problems')} 
                            className="gap-2"
                          >
                            <PuzzleIcon className="h-4 w-4" />
                            Solve More Problems
                          </Button>
                        </div>
                      </div>
                    ) : (
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
                    )}
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
                    {statsLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    ) : recentCompletions && recentCompletions.length > 0 ? (
                      <div className="space-y-4">
                        {recentCompletions.map((completion: ProblemCompletion) => (
                          <div 
                            key={completion.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                              <div>
                                <p className="font-medium">{completion.problems?.title || completion.problem_id}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(completion.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <DifficultyBadge difficulty={completion.difficulty} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">You haven't attempted any problems yet.</p>
                    )}
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
                    {problemStats.total > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {problemStats.beginner > 0 && (
                          <Card className="bg-gradient-to-br from-green-50 to-blue-50">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                              <div className="bg-green-100 p-4 rounded-full mb-3">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                              </div>
                              <h3 className="font-bold">First Steps</h3>
                              <p className="text-sm text-muted-foreground">Completed your first problem</p>
                            </CardContent>
                          </Card>
                        )}
                        
                        {problemStats.total >= 5 && (
                          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                              <div className="bg-blue-100 p-4 rounded-full mb-3">
                                <Medal className="h-8 w-8 text-blue-600" />
                              </div>
                              <h3 className="font-bold">Problem Solver</h3>
                              <p className="text-sm text-muted-foreground">Completed 5+ problems</p>
                            </CardContent>
                          </Card>
                        )}
                        
                        {problemStats.advanced > 0 && (
                          <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                              <div className="bg-purple-100 p-4 rounded-full mb-3">
                                <Star className="h-8 w-8 text-purple-600" />
                              </div>
                              <h3 className="font-bold">Advanced Thinker</h3>
                              <p className="text-sm text-muted-foreground">Completed an advanced problem</p>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Complete challenges to earn achievements</p>
                    )}
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
