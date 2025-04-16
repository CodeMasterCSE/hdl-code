import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import { sampleProblems, TestCase } from "@/lib/problems";
import { Separator } from "@/components/ui/separator";
import { Play, Check, X, AlertCircle, Clock, Terminal, Info } from "lucide-react";
import Editor from "@monaco-editor/react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface RunResult {
  testCaseIndex: number;
  passed: boolean;
  description: string;
  expected: Record<string, string>;
  actual?: Record<string, string>;
  error?: string;
}

const ProblemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [code, setCode] = useState("");
  const [problem, setProblem] = useState(sampleProblems[0]);
  const [results, setResults] = useState<RunResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [activeResultsTab, setActiveResultsTab] = useState("testcases");
  const { user } = useAuth();

  useEffect(() => {
    const foundProblem = sampleProblems.find(p => p.id === id);
    if (foundProblem) {
      setProblem(foundProblem);
      setCode(foundProblem.starterCode);
    }
  }, [id]);

  const runTests = async () => {
    setIsRunning(true);
    
    // Simulate test running
    setTimeout(async () => {
      const newResults: RunResult[] = problem.testCases.map((testCase, index) => {
        const passed = Math.random() > 0.3;
        
        return {
          testCaseIndex: index,
          passed,
          description: testCase.description,
          expected: testCase.outputs,
          actual: passed ? testCase.outputs : { 
            ...testCase.outputs, 
            [Object.keys(testCase.outputs)[0]]: 
              testCase.outputs[Object.keys(testCase.outputs)[0]] === "0" ? "1" : "0" 
          },
        };
      });
      
      setResults(newResults);
      setIsRunning(false);
      setActiveResultsTab("results");

      // Check if all tests pass and user is logged in
      if (newResults.every(r => r.passed) && user) {
        try {
          // Insert problem completion record
          const { error } = await supabase
            .from('problem_completions')
            .insert({
              user_id: user.id,
              problem_id: problem.id,
              solution: code
            });

          // Update user's problems solved count
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ problems_solved: (user.problems_solved || 0) + 1 })
            .eq('id', user.id);

          if (!error && !profileError) {
            toast.success("Congratulations! Problem solved successfully!", {
              description: `You've completed the ${problem.title} problem.`
            });
          } else {
            console.error("Error tracking problem completion", error, profileError);
          }
        } catch (err) {
          console.error("Error submitting problem completion", err);
        }
      }
    }, 1500);
  };

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      setCode(value);
    }
  }

  if (!problem) {
    return <div>Problem not found</div>;
  }

  const passedTests = results.filter(r => r.passed).length;
  const totalTests = results.length;

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      
      <div className="container mx-auto px-0 py-4 flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex flex-col lg:flex-row h-full gap-4">
          {/* Left panel - Problem description */}
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
                  <div className="space-y-4">
                    {problem.testCases.map((testCase, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h3 className="text-sm font-medium mb-2">Test Case {index + 1}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            {testCase.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-xs font-medium text-gray-500 mb-1">Inputs</h4>
                              <div className="text-sm font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">
                                {Object.entries(testCase.inputs).map(([key, value]) => (
                                  <div key={key}>{key}: {value}</div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-xs font-medium text-gray-500 mb-1">Expected Outputs</h4>
                              <div className="text-sm font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">
                                {Object.entries(testCase.outputs).map(([key, value]) => (
                                  <div key={key}>{key}: {value}</div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
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
          
          {/* Right panel - Code editor and results */}
          <div className="lg:w-3/5 h-full flex flex-col">
            {/* Editor */}
            <div className="flex-1 border rounded-md overflow-hidden mb-4">
              <Editor
                height="100%"
                defaultLanguage="verilog"
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  tabSize: 2,
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
            
            {/* Run button and results */}
            <div className="h-64 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <Button 
                  onClick={runTests} 
                  disabled={isRunning}
                  className="gap-2"
                >
                  {isRunning ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" />
                      Running Tests...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Run Code
                    </>
                  )}
                </Button>
                
                {results.length > 0 && (
                  <div className="text-sm">
                    <span className={passedTests === totalTests ? "text-green-600" : "text-red-600"}>
                      {passedTests}/{totalTests} tests passed
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 border rounded-md overflow-hidden">
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
                      {problem.testCases.map((testCase, index) => (
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
                    {results.length === 0 ? (
                      <div className="text-center text-gray-500 pt-8">
                        <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                        <p>No results yet. Run your code to see test results.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {results.map((result, index) => (
                          <div 
                            key={index} 
                            className={`p-3 border rounded ${
                              result.passed 
                                ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20" 
                                : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20"
                            }`}
                          >
                            <div className="flex items-center mb-2">
                              {result.passed ? (
                                <Check className="h-5 w-5 text-green-600 mr-2" />
                              ) : (
                                <X className="h-5 w-5 text-red-600 mr-2" />
                              )}
                              <span className="font-medium">Test Case {result.testCaseIndex + 1}</span>
                            </div>
                            
                            <p className="text-sm mb-2">{result.description}</p>
                            
                            {!result.passed && result.actual && (
                              <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-xs font-medium text-gray-500 mb-1">Expected</p>
                                  <div className="font-mono bg-white dark:bg-gray-800 p-1.5 rounded text-xs">
                                    {Object.entries(result.expected).map(([key, value]) => (
                                      <div key={key}>{key}: {value}</div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-xs font-medium text-gray-500 mb-1">Actual</p>
                                  <div className="font-mono bg-white dark:bg-gray-800 p-1.5 rounded text-xs">
                                    {Object.entries(result.actual).map(([key, value]) => (
                                      <div key={key}>{key}: {value}</div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="console" className="h-[calc(100%-40px)] overflow-auto p-0 mt-0">
                    <div className="h-full bg-gray-900 text-gray-200 font-mono p-4 text-sm overflow-auto">
                      {results.length > 0 ? (
                        <div>
                          <div className="text-green-400">
                            $ Compiling Verilog module...
                          </div>
                          <div>
                            {results.every(r => r.passed) ? (
                              <div className="text-green-400 mt-2">
                                Compilation successful. All tests passed!
                              </div>
                            ) : (
                              <>
                                <div className="text-yellow-400 mt-2">
                                  Compilation successful with warnings:
                                </div>
                                <div className="mt-1 text-red-400">
                                  - {totalTests - passedTests} test(s) failed. Check the Results tab for details.
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500">Run your code to see console output.</div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
