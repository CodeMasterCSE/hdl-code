import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { sampleProblems } from "@/lib/problems";
import { Play, Clock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { RunResult } from "@/types/problem";

// Import our components
import CodeEditor from "@/components/problems/CodeEditor";
import ProblemDescription from "@/components/problems/ProblemDescription";
import ResultsPanel from "@/components/problems/ResultsPanel";
import SuccessModal from "@/components/problems/SuccessModal";
import FailureModal from "@/components/problems/FailureModal";

const ProblemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [problem, setProblem] = useState(null);
  const [results, setResults] = useState<RunResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [activeResultsTab, setActiveResultsTab] = useState("testcases");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    // Check if user is authenticated after auth state is loaded
    if (!loading && !user) {
      toast.error("Please sign in to run code and solve problems", {
        description: "You'll be redirected to the login page."
      });
      // Redirect to login page
      navigate("/login", { state: { redirectTo: `/problem/${id}` } });
    }
  }, [user, loading, navigate, id]);

  useEffect(() => {
    // Find the problem based on the ID from the URL
    const foundProblem = sampleProblems.find(p => p.id === id);
    
    if (foundProblem) {
      console.log("Problem found:", foundProblem.id);
      setProblem(foundProblem);
      setCode(foundProblem.starterCode);
    } else {
      console.log("Problem not found with ID:", id);
      // Redirect to problems list if problem not found
      navigate("/problems");
    }
  }, [id, navigate]);

  // Normalize code by removing whitespace and formatting issues
  const normalizeCode = (code: string): string => {
    // Remove comments
    let normalized = code.replace(/\/\/.*$/gm, '');
    // Remove line breaks and extra spaces
    normalized = normalized.replace(/\s+/g, ' ').trim();
    return normalized;
  };

  const runTests = async () => {
    if (!problem) return;
    
    // Check if user is authenticated
    if (!user) {
      toast.error("Please sign in to run code", {
        description: "You'll be redirected to the login page."
      });
      navigate("/login", { state: { redirectTo: `/problem/${id}` } });
      return;
    }
    
    setIsRunning(true);
    
    // Simulate test running with improved logic
    setTimeout(async () => {
      // Normalize the user's code to ignore formatting
      const normalizedUserCode = normalizeCode(code);
      
      const newResults: RunResult[] = problem.testCases.map((testCase, index) => {
        // In a real implementation, we would evaluate the actual code
        // For now, we'll simulate with a higher pass rate
        const passed = Math.random() > 0.2;
        
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

      // Check if all tests pass
      const allTestsPassed = newResults.every(r => r.passed);
      
      if (allTestsPassed) {
        setShowSuccessModal(true);
        
        // Insert problem completion record if user is logged in
        if (user) {
          try {
            // Insert problem completion record
            const { error } = await supabase
              .from('problem_completions')
              .insert({
                user_id: user.id,
                problem_id: problem.id,
                solution: code,
                difficulty: problem.difficulty,
                completed_at: new Date().toISOString()
              });

            // Update user's problems solved count
            const { error: profileError } = await supabase
              .from('profiles')
              .update({ problems_solved: (user.problems_solved || 0) + 1 })
              .eq('id', user.id);

            if (error || profileError) {
              console.error("Error tracking problem completion", error, profileError);
            }
          } catch (err) {
            console.error("Error submitting problem completion", err);
          }
        }
      } else {
        setShowFailureModal(true);
      }
    }, 1500);
  };

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      setCode(value);
    }
  }

  if (!problem) {
    return (
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading problem...</h1>
          </div>
        </div>
      </div>
    );
  }

  const passedTests = results.filter(r => r.passed).length;
  const totalTests = results.length;

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      
      <div className="container mx-auto px-0 py-4 flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex flex-col lg:flex-row h-full gap-4">
          {/* Problem Description Component */}
          <ProblemDescription 
            problem={problem} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          
          {/* Right panel - Code editor and results */}
          <div className="lg:w-3/5 h-full flex flex-col">
            {/* Editor */}
            <div className="flex-1 border rounded-md overflow-hidden mb-4">
              <CodeEditor code={code} onChange={handleEditorChange} />
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
                <ResultsPanel 
                  activeResultsTab={activeResultsTab}
                  setActiveResultsTab={setActiveResultsTab}
                  results={results}
                  testCases={problem.testCases}
                  passedTests={passedTests}
                  totalTests={totalTests}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal 
          onClose={() => setShowSuccessModal(false)}
          problem={problem}
        />
      )}
      
      {/* Failure Modal */}
      {showFailureModal && (
        <FailureModal 
          onClose={() => setShowFailureModal(false)}
          passedTests={passedTests}
          totalTests={totalTests}
        />
      )}
    </div>
  );
};

export default ProblemDetail;
