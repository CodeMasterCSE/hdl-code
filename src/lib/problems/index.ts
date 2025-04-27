import { Problem } from '../types/problem';
import { logicGateProblems } from './logic-gates';
import { arithmeticProblems } from './arithmetic';
import { dataSelectorProblems } from './data-selectors';

// Helper function to remove duplicates based on problem ID
const removeDuplicates = (problems: Problem[]): Problem[] => {
  const uniqueProblems = new Map<string, Problem>();
  problems.forEach(problem => {
    console.log(`Processing problem: ${problem.id}, ${problem.title}, Category: ${problem.category}`);
    if (!uniqueProblems.has(problem.id)) {
      uniqueProblems.set(problem.id, problem);
    } else {
      console.log(`Duplicate found: ${problem.id}, ${problem.title}, Category: ${problem.category}`);
    }
  });
  return Array.from(uniqueProblems.values());
};

// Combine all problem sets and remove duplicates
export const sampleProblems: Problem[] = removeDuplicates([
  ...logicGateProblems,
  ...arithmeticProblems,
  ...dataSelectorProblems
]);

// Re-export the Problem and TestCase types
export * from '../types/problem';
