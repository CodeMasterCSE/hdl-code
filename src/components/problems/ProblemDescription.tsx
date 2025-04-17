
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Problem } from "@/lib/problems";
import TestCasesList from "./TestCasesList";

interface ProblemDescriptionProps {
  problem: Problem;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ProblemDescription = ({ problem, activeTab, setActiveTab }: ProblemDescriptionProps) => {
  return (
    <div className="lg:w-2/5 h-full overflow-auto">
      <div className="px-4">
        <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
        
        <div className="flex items-center gap-2 mb-4">
          <div 
            className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full
              ${problem.difficulty === "easy" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : 
                problem.difficulty === "medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" : 
                "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
          >
            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {problem.category}
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start px-4">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="testcases">Test Cases</TabsTrigger>
          <TabsTrigger value="constraints">Constraints</TabsTrigger>
        </TabsList>
        
        <div className="p-4">
          <TabsContent value="description" className="mt-0">
            <div className="prose max-w-none dark:prose-invert">
              <div className="whitespace-pre-line">{problem.description}</div>
            </div>
          </TabsContent>
          
          <TabsContent value="testcases" className="mt-0">
            <TestCasesList testCases={problem.testCases} />
          </TabsContent>
          
          <TabsContent value="constraints" className="mt-0">
            <div className="prose max-w-none dark:prose-invert">
              <ul>
                {problem.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProblemDescription;
