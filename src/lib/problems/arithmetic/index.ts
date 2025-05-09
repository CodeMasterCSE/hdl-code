import { Problem } from '../../types/problem';
import { adderProblems } from './adders';
import { subtractorProblems } from './subtractors';
import { comparatorProblems } from './comparators';

// Log the problems being combined
console.log('Adder problems:', adderProblems.map(p => `${p.id}: ${p.title} (${p.category})`));
console.log('Subtractor problems:', subtractorProblems.map(p => `${p.id}: ${p.title} (${p.category})`));
console.log('Comparator problems:', comparatorProblems.map(p => `${p.id}: ${p.title} (${p.category})`));

// Combine all arithmetic circuit problems
export const arithmeticProblems: Problem[] = [
  ...adderProblems,
  ...subtractorProblems,
  ...comparatorProblems
];

// Log the combined problems
console.log('Combined arithmetic problems:', arithmeticProblems.map(p => `${p.id}: ${p.title} (${p.category})`)); 