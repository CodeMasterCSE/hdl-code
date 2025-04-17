
import { TestCase } from "@/lib/problems";

export interface RunResult {
  testCaseIndex: number;
  passed: boolean;
  description: string;
  expected: Record<string, string>;
  actual?: Record<string, string>;
  error?: string;
}
