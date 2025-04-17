
import { Card, CardContent } from "@/components/ui/card";
import { TestCase } from "@/lib/problems";

interface TestCasesListProps {
  testCases: TestCase[];
}

const TestCasesList = ({ testCases }: TestCasesListProps) => {
  return (
    <div className="space-y-4">
      {testCases.map((testCase, index) => (
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
  );
};

export default TestCasesList;
