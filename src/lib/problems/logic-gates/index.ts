import { Problem } from '../../types/problem';
import { basicGateProblems } from './basic-gates';
import { universalGateProblems } from './universal-gates';
 
// Combine all logic gate problems
export const logicGateProblems: Problem[] = [
  ...basicGateProblems,
  ...universalGateProblems
]; 