
import { Problem } from '../../types/problem';

export const subtractorProblems: Problem[] = [
  {
    id: "p012",
    title: "Half Subtractor",
    difficulty: "easy",
    category: "Combinational Logic",
    description: `
Design a half subtractor circuit using Verilog.

A half subtractor is a combinational logic circuit that subtracts two bits and produces a difference and a borrow output.

For this problem, implement a half subtractor with the following specifications:
- Two inputs (a and b)
- Two outputs (diff and borrow)

The diff output should be the XOR of a and b.
The borrow output should be the AND of (NOT a) and b.
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'half_subtractor'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module half_subtractor(
  input a,
  input b,
  output diff,
  output borrow
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { diff: "0", borrow: "0" },
        description: "If a=0, b=0, then diff=0, borrow=0"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { diff: "1", borrow: "1" },
        description: "If a=0, b=1, then diff=1, borrow=1"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { diff: "1", borrow: "0" },
        description: "If a=1, b=0, then diff=1, borrow=0"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { diff: "0", borrow: "0" },
        description: "If a=1, b=1, then diff=0, borrow=0"
      }
    ],
    solution: `module half_subtractor(
  input a,
  input b,
  output reg diff,
  output reg borrow
);
  always @(a or b) begin
    diff = a ^ b;      // XOR operation
    borrow = (~a) & b; // NOT-AND operation
  end
endmodule`
  }
];
