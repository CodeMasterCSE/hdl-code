import { Problem } from '../../types/problem';
import { srFlipFlopProblems } from './sr-flipflop';
import { dFlipFlopProblems } from './d-flipflop';
import { jkFlipFlopProblems } from './jk-flipflop';
import { tFlipFlopProblems } from './t-flipflop';

// Combine all flip-flop problems
export const flipFlopProblems: Problem[] = [
  ...srFlipFlopProblems,
  ...dFlipFlopProblems,
  ...jkFlipFlopProblems,
  ...tFlipFlopProblems
]; 