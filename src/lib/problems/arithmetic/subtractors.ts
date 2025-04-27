import { Problem } from '../../types/problem';

export const subtractorProblems: Problem[] = [
  {
    id: "p011",
    title: "Half Subtractor",
    difficulty: "easy",
    category: "Arithmetic Circuits",
    points: 10,
    description: `
Design a half subtractor circuit using Verilog.

A half subtractor is a combinational logic circuit that subtracts two bits and produces a difference and a borrow output.

For this problem, implement a half subtractor with the following specifications:
- Two inputs (a and b)
- Two outputs (diff and borrow)

The difference output should be the XOR of a and b.
The borrow output should be (NOT a) AND b.
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
    diff = a ^ b;       // XOR operation
    borrow = (~a) & b;  // NOT a AND b
  end
endmodule`
  },
  {
    id: "p012",
    title: "Full Subtractor",
    difficulty: "easy",
    category: "Arithmetic Circuits",
    points: 10,
    description: `
Design a full subtractor circuit using Verilog.

A full subtractor is a combinational logic circuit that subtracts three inputs (two bits and a borrow in) and produces a difference and a borrow output.

For this problem, implement a full subtractor with the following specifications:
- Three inputs (a, b, and bin)
- Two outputs (diff and bout)

The difference output should be a XOR b XOR bin.
The borrow output (bout) should be ((NOT a) AND b) OR (bin AND (a XOR b)).
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'full_subtractor'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module full_subtractor(
  input a,
  input b,
  input bin,
  output diff,
  output bout
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0", bin: "0" },
        outputs: { diff: "0", bout: "0" },
        description: "If a=0, b=0, bin=0, then diff=0, bout=0"
      },
      {
        inputs: { a: "0", b: "0", bin: "1" },
        outputs: { diff: "1", bout: "1" },
        description: "If a=0, b=0, bin=1, then diff=1, bout=1"
      },
      {
        inputs: { a: "0", b: "1", bin: "0" },
        outputs: { diff: "1", bout: "1" },
        description: "If a=0, b=1, bin=0, then diff=1, bout=1"
      },
      {
        inputs: { a: "0", b: "1", bin: "1" },
        outputs: { diff: "0", bout: "1" },
        description: "If a=0, b=1, bin=1, then diff=0, bout=1"
      },
      {
        inputs: { a: "1", b: "0", bin: "0" },
        outputs: { diff: "1", bout: "0" },
        description: "If a=1, b=0, bin=0, then diff=1, bout=0"
      },
      {
        inputs: { a: "1", b: "0", bin: "1" },
        outputs: { diff: "0", bout: "0" },
        description: "If a=1, b=0, bin=1, then diff=0, bout=0"
      },
      {
        inputs: { a: "1", b: "1", bin: "0" },
        outputs: { diff: "0", bout: "0" },
        description: "If a=1, b=1, bin=0, then diff=0, bout=0"
      },
      {
        inputs: { a: "1", b: "1", bin: "1" },
        outputs: { diff: "1", bout: "1" },
        description: "If a=1, b=1, bin=1, then diff=1, bout=1"
      }
    ],
    solution: `module full_subtractor(
  input a,
  input b,
  input bin,
  output reg diff,
  output reg bout
);
  always @(a or b or bin) begin
    diff = a ^ b ^ bin;
    bout = ((~a) & b) | (bin & (a ^ b));
  end
endmodule`
  }
]; 