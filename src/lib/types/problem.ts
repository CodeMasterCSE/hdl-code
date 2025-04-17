
export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  category: string;
  starterCode: string;
  testCases: TestCase[];
  constraints: string[];
  solution?: string;
}

export interface TestCase {
  inputs: Record<string, string>;
  outputs: Record<string, string>;
  description: string;
}

export interface RunResult {
  testCaseIndex: number;
  passed: boolean;
  description: string;
  expected: Record<string, string>;
  actual?: Record<string, string>;
  error?: string;
}
