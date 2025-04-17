
interface ConsoleOutputProps {
  results: any[];
  passedTests: number;
  totalTests: number;
}

const ConsoleOutput = ({ results, passedTests, totalTests }: ConsoleOutputProps) => {
  return (
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
  );
};

export default ConsoleOutput;
