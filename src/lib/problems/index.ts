
import { Problem } from '../types/problem';
import { logicGateProblems } from './logic-gates';
import { combinationalLogicProblems } from './combinational-logic';
import { sequenceLogicProblems } from './sequence-logic';

// Combine all problem sets
export const sampleProblems: Problem[] = [
  ...combinationalLogicProblems,
  ...logicGateProblems,
  ...sequenceLogicProblems
];

// Re-export the Problem and TestCase types
export * from '../types/problem';
