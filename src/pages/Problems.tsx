
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
import NavBar from "@/components/NavBar";
import { sampleProblems } from "@/lib/sample-problems";
import { SearchIcon, FilterIcon, TagIcon } from "lucide-react";

const Problems = () => {
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredProblems = sampleProblems.filter((problem) => {
    // Filter by search term
    const matchesSearch = 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by difficulty
    const matchesDifficulty = 
      filterDifficulty === "all" || problem.difficulty === filterDifficulty;
    
    // Filter by category (tab)
    const matchesCategory = 
      activeTab === "all" || problem.category.toLowerCase().includes(activeTab.toLowerCase());
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(sampleProblems.map(p => p.category)))];

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">HDL Practice Problems</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-4xl">
            Improve your hardware description language skills by solving these digital circuit design problems. 
            Each problem is verified against test cases to ensure your solution works correctly.
          </p>
          
          {/* Search & Filters */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search problems..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <FilterIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                <SelectTrigger className="w-[180px]">
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
          </div>
          
          {/* Category Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 w-full justify-start overflow-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category === "all" ? "All Categories" : category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {filteredProblems.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredProblems.map((problem) => (
                    <Link to={`/problem/${problem.id}`} key={problem.id}>
                      <Card className="h-full transition-shadow hover:shadow-md">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div 
                              className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full
                                ${problem.difficulty === "easy" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : 
                                  problem.difficulty === "medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" : 
                                  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
                            >
                              {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                            </div>
                          </div>
                          <CardTitle className="text-xl">{problem.title}</CardTitle>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <TagIcon className="mr-1.5 h-3.5 w-3.5" />
                            {problem.category}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-3">
                            {problem.description.substring(0, 150)}...
                          </CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full mt-2">
                            Solve Challenge
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <h3 className="text-xl font-medium">No problems found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Footer - reused from Index.tsx */}
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
