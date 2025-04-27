import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import NavBar from "@/components/NavBar";
import { sampleProblems } from "@/lib/problems";
import { SearchIcon, FilterIcon, TagIcon, ArrowUpDown, Trophy, Star, Clock, Check } from "lucide-react";
import { useProblemStats } from "@/hooks/useProblemStats";
import { useAuth } from "@/hooks/useAuth";
import { flipFlopProblems } from "@/lib/problems/flipflops";
import { counterProblems } from "@/lib/problems/counters";
import { registerProblems } from "@/lib/problems/registers";
import { stateMachineProblems } from "@/lib/problems/state-machines";
import { Problem } from "@/lib/types/problem";

type SortOption = "difficulty" | "points";

const Problems = () => {
  const { user } = useAuth();
  const { stats: problemStats, completedProblemIds } = useProblemStats(user);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("difficulty");
  const [activeTab, setActiveTab] = useState("all");

  const allProblems = [
    ...flipFlopProblems,
    ...counterProblems,
    ...registerProblems,
    ...stateMachineProblems,
    ...sampleProblems,
  ];

  // Debug: Log all problems and their categories
  console.log('All problems:', allProblems.map(p => `${p.id}: ${p.title} (${p.category})`));

  const filteredProblems = allProblems
    .filter((problem) => {
      // Filter by search term
      const matchesSearch = 
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by difficulty
      const matchesDifficulty = 
        difficultyFilter === "all" || problem.difficulty === difficultyFilter;
      
      // Filter by category (tab)
      const matchesCategory = 
        activeTab === "all" || 
        (activeTab === "Logic Gates" && problem.category === "Logic Gates") ||
        (activeTab === "Arithmetic Circuits" && problem.category === "Arithmetic Circuits") ||
        (activeTab === "Data Selectors" && problem.category === "Data Selectors") ||
        (activeTab === "Flip Flops" && problem.category === "Flip Flops") ||
        (activeTab === "Counters" && problem.category === "Counters") ||
        (activeTab === "Registers" && problem.category === "Registers") ||
        (activeTab === "State Machines" && problem.category === "State Machines");
      
      // Debug: Log problem category and whether it matches
      if (activeTab !== "all") {
        console.log(`Problem: ${problem.title}, Category: ${problem.category}, Active Tab: ${activeTab}, Matches: ${matchesCategory}`);
      }
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "difficulty":
          const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case "points":
          const pointsOrder = { easy: 10, medium: 20, hard: 30 };
          return pointsOrder[b.difficulty] - pointsOrder[a.difficulty];
        default:
          return 0;
      }
    });

  const categories = [
    "all",
    "Logic Gates",
    "Arithmetic Circuits",
    "Data Selectors",
    "Flip Flops",
    "Counters",
    "Registers",
    "State Machines"
  ];
  const totalProblems = allProblems.length;
  const solvedProblems = problemStats?.total || 0;
  const completionPercentage = (solvedProblems / totalProblems) * 100;

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTI0IDBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bS0yNCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMjQgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content - Main Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-100 text-sm font-medium">
                <Trophy className="h-4 w-4 mr-2" />
                Master HDL Programming
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Practice Problems for
                <span className="text-blue-200 block">Hardware Design</span>
              </h1>
              
              <p className="text-xl text-blue-100">
                Sharpen your hardware description language skills with hands-on practice. Each problem is verified against test cases to ensure your solution works correctly.
              </p>
            </div>

            {/* Right Content - Stats */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-3 rounded-lg">
                  <Trophy className="h-5 w-5 text-blue-200" />
                  <div>
                    <div className="text-sm text-blue-200">Solved</div>
                    <div className="text-xl font-bold">{solvedProblems}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-3 rounded-lg">
                  <Star className="h-5 w-5 text-blue-200" />
                  <div>
                    <div className="text-sm text-blue-200">Total</div>
                    <div className="text-xl font-bold">{totalProblems}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 bg-blue-500/20 p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-200">Progress</span>
                  <span className="text-blue-200">{Math.round(completionPercentage)}%</span>
                </div>
                <div className="relative h-3 bg-blue-500/20 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-300 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] animate-shimmer"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-0.5 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        {/* Search & Filters */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search problems..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <FilterIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-[140px] sm:w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <ArrowUpDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Select value={sortBy} onValueChange={(value: string) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[140px] sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                  <SelectItem value="points">Points</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="w-full justify-start overflow-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize whitespace-nowrap">
                {category === "all" ? "All Categories" : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {/* Problems Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
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
                        <div className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400">
                          <Trophy className="h-3.5 w-3.5" />
                          {problem.points} points
                        </div>
                      </div>
                      {completedProblemIds?.includes(problem.id) && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          <Check className="h-3.5 w-3.5" />
                          <span>Solved</span>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg sm:text-xl line-clamp-2">{problem.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <TagIcon className="mr-1.5 h-3.5 w-3.5" />
                      {problem.category}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3 text-sm sm:text-base">
                      {problem.description.substring(0, 150)}...
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Solve Challenge
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <h3 className="text-xl font-medium mb-2">No problems found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t bg-background mt-auto">
        <div className="container flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between md:py-8">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h10M7 12h10M7 17h10" />
              </svg>
            </div>
            <p className="text-sm leading-loose text-gray-500 dark:text-gray-400 md:text-base">
              © 2023 HDLCode. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link to="/about" className="text-sm hover:underline underline-offset-4">
              About
            </Link>
            <Link to="/contact" className="text-sm hover:underline underline-offset-4">
              Contact
            </Link>
            <a 
              href="https://github.com/hdlcode/hdlcode" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:underline underline-offset-4"
            >
              GitHub
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Problems;
