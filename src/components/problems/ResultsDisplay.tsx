
import { Check, X } from "lucide-react";
import { RunResult } from "@/types/problem";

interface ResultsDisplayProps {
  results: RunResult[];
}

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  if (results.length === 0) {
    return (
      <div className="text-center text-gray-500 pt-8">
        <div className="mx-auto h-8 w-8 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p>No results yet. Run your code to see test results.</p>
      </div>
    );
  }

  return (
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
                    <div key={key}>{key}: {typeof value === 'string' ? value : String(value)}</div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Actual</p>
                <div className="font-mono bg-white dark:bg-gray-800 p-1.5 rounded text-xs">
                  {Object.entries(result.actual).map(([key, value]) => (
                    <div key={key}>{key}: {typeof value === 'string' ? value : String(value)}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultsDisplay;
