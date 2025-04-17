
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import { RunResult, TestCase } from "@/lib/problems";
import ResultsDisplay from "./ResultsDisplay";
import ConsoleOutput from "./ConsoleOutput";

interface ResultsPanelProps {
  activeResultsTab: string;
  setActiveResultsTab: (value: string) => void;
  results: RunResult[];
  testCases: TestCase[];
  passedTests: number;
  totalTests: number;
}

const ResultsPanel = ({ 
  activeResultsTab, 
  setActiveResultsTab, 
  results, 
  testCases,
  passedTests,
  totalTests
}: ResultsPanelProps) => {
  return (
    <Tabs value={activeResultsTab} onValueChange={setActiveResultsTab} className="h-full">
      <div className="flex border-b">
        <TabsList className="bg-transparent p-0 h-auto">
          <TabsTrigger 
            value="testcases" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Test Cases
          </TabsTrigger>
          <TabsTrigger 
            value="results" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Results
          </TabsTrigger>
          <TabsTrigger 
            value="console" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Console
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="testcases" className="h-[calc(100%-40px)] overflow-auto p-4 mt-0">
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mb-4">
          <Info className="mr-2 h-4 w-4" />
          Click "Run Code" to test your solution against all test cases.
        </div>
        
        <div className="space-y-2">
          {testCases.map((testCase, index) => (
            <div 
              key={index} 
              className="p-2 text-sm border border-gray-200 dark:border-gray-700 rounded"
            >
              <p className="font-medium">Test Case {index + 1}</p>
              <p className="text-xs text-gray-500">{testCase.description}</p>
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="results" className="h-[calc(100%-40px)] overflow-auto p-4 mt-0">
        <ResultsDisplay results={results} />
      </TabsContent>
      
      <TabsContent value="console" className="h-[calc(100%-40px)] overflow-auto p-0 mt-0">
        <ConsoleOutput 
          results={results} 
          passedTests={passedTests} 
          totalTests={totalTests} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default ResultsPanel;
