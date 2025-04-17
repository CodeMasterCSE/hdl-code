
import { Problem } from '../types/problem';
import { logicGateProblems } from './logic-gates';
import { combinationalLogicProblems } from './combinational-logic';
import { sequenceLogicProblems } from './sequence-logic';
import { logicGatesBeginnersProblems } from './logic-gates-beginners';
import { arithmeticCircuitsProblems } from './arithmetic-circuits';
import { sequentialCircuitsProblems } from './sequential-circuits';
import { digitalSystemsProblems } from './digital-systems';

// Combine all problem sets
export const sampleProblems: Problem[] = [
  ...combinationalLogicProblems,
  ...logicGateProblems,
  ...sequenceLogicProblems,
  ...logicGatesBeginnersProblems,
  ...arithmeticCircuitsProblems,
  ...sequentialCircuitsProblems,
  ...digitalSystemsProblems
];

// Re-export the Problem and TestCase types
export * from '../types/problem';
