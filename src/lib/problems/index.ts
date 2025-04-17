
import { Problem } from '../types/problem';
import { logicGateProblems } from './logic-gates';
import { combinationalLogicProblems } from './combinational-logic';

// Combine all problem sets
export const sampleProblems: Problem[] = [
  ...combinationalLogicProblems,
  ...logicGateProblems
];

// Re-export the Problem and TestCase types
export * from '../types/problem';
