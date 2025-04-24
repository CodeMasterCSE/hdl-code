import { Problem } from '../../types/problem';

export const universalGateProblems: Problem[] = [
  {
    id: "p007",
    title: "NAND Gate Implementation",
    difficulty: "easy",
    category: "Logic Gates",
    points: 10,
    description: `
Design a 2-input NAND gate using Verilog.

A NAND gate is the negation of an AND gate. It outputs 0 only when both inputs are 1.
Otherwise, it outputs 1.

Implement the NAND gate with the following specifications:
- Two inputs (a and b)
- One output (out)

When a = 1 and b = 1, out should be 0
When any input is 0, out should be 1
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'nand_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module nand_gate(
  input a,
  input b,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { out: "1" },
        description: "If a=0, b=0, then out should be 1"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { out: "1" },
        description: "If a=1, b=0, then out should be 1"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { out: "1" },
        description: "If a=0, b=1, then out should be 1"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { out: "0" },
        description: "If a=1, b=1, then out should be 0"
      }
    ],
    solution: `module nand_gate(
  input a,
  input b,
  output reg out
);
  always @(a or b) begin
    out = ~(a & b);
  end
endmodule`
  },
  {
    id: "p008",
    title: "NOR Gate Implementation",
    difficulty: "easy",
    category: "Logic Gates",
    points: 10,
    description: `
Design a 2-input NOR gate using Verilog.

A NOR gate is the negation of an OR gate. It outputs 1 only when both inputs are 0.
Otherwise, it outputs 0.

Implement the NOR gate with the following specifications:
- Two inputs (a and b)
- One output (out)

When a = 0 and b = 0, out should be 1
When any input is 1, out should be 0
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'nor_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module nor_gate(
  input a,
  input b,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { out: "1" },
        description: "If a=0, b=0, then out should be 1"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { out: "0" },
        description: "If a=1, b=0, then out should be 0"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { out: "0" },
        description: "If a=0, b=1, then out should be 0"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { out: "0" },
        description: "If a=1, b=1, then out should be 0"
      }
    ],
    solution: `module nor_gate(
  input a,
  input b,
  output reg out
);
  always @(a or b) begin
    out = ~(a | b);
  end
endmodule`
  }
]; 