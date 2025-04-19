
import { RunResult } from "@/types/problem";

interface ConsoleOutputProps {
  results: RunResult[];
  passedTests: number;
  totalTests: number;
}

const ConsoleOutput = ({ results, passedTests, totalTests }: ConsoleOutputProps) => {
  // Check if there are any compilation errors
  const hasCompilationErrors = results.some(r => r.error);
  
  return (
    <div className="h-full bg-gray-900 text-gray-200 font-mono p-4 text-sm overflow-auto">
      {results.length > 0 ? (
        <div>
          <div className="text-green-400">
            $ Compiling Verilog module...
          </div>
          
          {hasCompilationErrors ? (
            <>
              <div className="text-red-400 mt-1">
                $ Compilation failed with errors:
              </div>
              <div className="mt-2 text-red-400">
                {results.filter(r => r.error).map((result, idx) => (
                  <div key={idx} className="mb-1">
                    - {result.error}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="text-green-400 mt-1">
                $ Compilation successful
              </div>
              <div className="text-green-400 mt-1">
                $ Running test cases...
              </div>
              
              {passedTests === totalTests ? (
                <div className="text-green-400 mt-2">
                  All tests passed! Your implementation is correct.
                </div>
              ) : (
                <>
                  <div className="text-yellow-400 mt-2">
                    {passedTests} of {totalTests} tests passed:
                  </div>
                  <div className="mt-1 text-yellow-400">
                    - {totalTests - passedTests} test(s) failed. Review the results for details.
                  </div>
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="text-gray-500">Run your code to see console output.</div>
      )}
    </div>
  );
};

export default ConsoleOutput;
