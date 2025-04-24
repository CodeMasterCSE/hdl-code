import { Problem } from '../../types/problem';
import { multiplexerProblems } from './multiplexers';
import { adderProblems } from './adders';

// Combine all combinational logic problems
export const combinationalLogicProblems: Problem[] = [
  ...multiplexerProblems,
  ...adderProblems
];
