
import { Problem } from '../types/problem';
import { logicGateProblems } from './logic-gates';
import { combinationalLogicProblems } from './combinational-logic';

export const sampleProblems: Problem[] = [
  ...combinationalLogicProblems,
  ...logicGateProblems
];

export * from '../types/problem';
