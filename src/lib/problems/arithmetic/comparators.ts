import { Problem } from '../../types/problem';

export const comparatorProblems: Problem[] = [
  {
    id: "p040",
    title: "1-Bit Comparator",
    description: `Design a 1-bit comparator circuit that compares two 1-bit inputs A and B. The circuit should have three outputs:
    - EQ (Equal): 1 if A is equal to B, 0 otherwise
    - GT (Greater Than): 1 if A is greater than B, 0 otherwise
    - LT (Less Than): 1 if A is less than B, 0 otherwise`,
    difficulty: "easy",
    category: "Arithmetic Circuits",
    points: 10,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'comparator_1bit'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module comparator_1bit(
    input wire A,
    input wire B,
    output wire EQ,
    output wire GT,
    output wire LT
);
    // Your code here
endmodule`,
    testCases: [
      {
        inputs: { A: "0", B: "0" },
        outputs: { EQ: "1", GT: "0", LT: "0" },
        description: "Equal inputs (0=0)"
      },
      {
        inputs: { A: "0", B: "1" },
        outputs: { EQ: "0", GT: "0", LT: "1" },
        description: "A less than B (0<1)"
      },
      {
        inputs: { A: "1", B: "0" },
        outputs: { EQ: "0", GT: "1", LT: "0" },
        description: "A greater than B (1>0)"
      },
      {
        inputs: { A: "1", B: "1" },
        outputs: { EQ: "1", GT: "0", LT: "0" },
        description: "Equal inputs (1=1)"
      }
    ]
  },
  {
    id: "p041",
    title: "2-Bit Comparator",
    description: `Design a 2-bit comparator circuit that compares two 2-bit inputs A[1:0] and B[1:0]. The circuit should have three outputs:
    - EQ (Equal): 1 if A = B, 0 otherwise
    - GT (Greater Than): 1 if A > B, 0 otherwise
    - LT (Less Than): 1 if A < B, 0 otherwise

    The comparison should be done treating A and B as unsigned 2-bit numbers.
    For example, if A = 2'b10 (decimal 2) and B = 2'b01 (decimal 1), then GT should be 1.`,
    difficulty: "medium",
    category: "Arithmetic Circuits",
    points: 20,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'comparator_2bit'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module comparator_2bit(
    input wire [1:0] A,
    input wire [1:0] B,
    output wire EQ,
    output wire GT,
    output wire LT
);
    // Your code here
endmodule`,
    testCases: [
      {
        inputs: { A: "2", B: "2" },
        outputs: { EQ: "1", GT: "0", LT: "0" },
        description: "Equal inputs (2=2)"
      },
      {
        inputs: { A: "1", B: "2" },
        outputs: { EQ: "0", GT: "0", LT: "1" },
        description: "A less than B (1<2)"
      },
      {
        inputs: { A: "3", B: "1" },
        outputs: { EQ: "0", GT: "1", LT: "0" },
        description: "A greater than B (3>1)"
      },
      {
        inputs: { A: "0", B: "3" },
        outputs: { EQ: "0", GT: "0", LT: "1" },
        description: "A less than B (0<3)"
      }
    ]
  },
  {
    id: "p042",
    title: "4-Bit Comparator",
    description: `Design a 4-bit comparator circuit that compares two 4-bit inputs A[3:0] and B[3:0]. The circuit should have three outputs:
    - EQ (Equal): 1 if A = B, 0 otherwise
    - GT (Greater Than): 1 if A > B, 0 otherwise
    - LT (Less Than): 1 if A < B, 0 otherwise

    The comparison should be done treating A and B as unsigned 4-bit numbers.
    For example, if A = 4'b1010 (decimal 10) and B = 4'b0101 (decimal 5), then GT should be 1.
    
    Hint: You can use a hierarchical design approach by using multiple 2-bit comparators.`,
    difficulty: "hard",
    category: "Arithmetic Circuits",
    points: 30,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'comparator_4bit'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module comparator_4bit(
    input wire [3:0] A,
    input wire [3:0] B,
    output wire EQ,
    output wire GT,
    output wire LT
);
    // Your code here
endmodule`,
    testCases: [
      {
        inputs: { A: "10", B: "10" },
        outputs: { EQ: "1", GT: "0", LT: "0" },
        description: "Equal inputs (10=10)"
      },
      {
        inputs: { A: "5", B: "10" },
        outputs: { EQ: "0", GT: "0", LT: "1" },
        description: "A less than B (5<10)"
      },
      {
        inputs: { A: "15", B: "8" },
        outputs: { EQ: "0", GT: "1", LT: "0" },
        description: "A greater than B (15>8)"
      },
      {
        inputs: { A: "0", B: "15" },
        outputs: { EQ: "0", GT: "0", LT: "1" },
        description: "A less than B (0<15)"
      }
    ]
  }
]; 