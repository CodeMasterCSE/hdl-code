import { Problem } from '../types/problem';
import { logicGateProblems } from './logic-gates';
import { combinationalLogicProblems } from './combinational';

// Helper function to remove duplicates based on problem ID
const removeDuplicates = (problems: Problem[]): Problem[] => {
  const uniqueProblems = new Map<string, Problem>();
  problems.forEach(problem => {
    if (!uniqueProblems.has(problem.id)) {
      uniqueProblems.set(problem.id, problem);
    }
  });
  return Array.from(uniqueProblems.values());
};

// Combine all problem sets and remove duplicates
export const sampleProblems: Problem[] = removeDuplicates([
  ...logicGateProblems,
  ...combinationalLogicProblems,
]);

// Re-export the Problem and TestCase types
export * from '../types/problem';
