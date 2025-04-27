import { Problem } from '../../types/problem';
import { multiplexerProblems } from './multiplexers';
import { demultiplexerProblems } from './demultiplexers';

// Combine all data selector problems
export const dataSelectorProblems: Problem[] = [
  ...multiplexerProblems,
  ...demultiplexerProblems
]; 