
import { Problem } from '../types/problem';

export const combinationalLogicProblems: Problem[] = [
  {
    id: "p001",
    title: "2-to-1 Multiplexer",
    difficulty: "easy",
    category: "Combinational Logic",
    description: `
Design a 2-to-1 multiplexer using Verilog.

A multiplexer (MUX) is a digital circuit that selects one of several input signals and forwards the selected input to a single output line. The selection is controlled by select lines.

For this problem, implement a 2-to-1 multiplexer with the following specifications:
- Two data inputs (a and b)
- One select input (sel)
- One output (out)

When sel = 0, out = a
When sel = 1, out = b
    `,
    constraints: [
      "Use only behavioral modeling",
      "Your module must be named 'mux2to1'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module mux2to1(
  input a,
  input b,
  input sel,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0", sel: "0" },
        outputs: { out: "0" },
        description: "If a=0, b=0, sel=0, then out should be 0"
      },
      {
        inputs: { a: "1", b: "0", sel: "0" },
        outputs: { out: "1" },
        description: "If a=1, b=0, sel=0, then out should be 1"
      },
      {
        inputs: { a: "0", b: "1", sel: "1" },
        outputs: { out: "1" },
        description: "If a=0, b=1, sel=1, then out should be 1"
      },
      {
        inputs: { a: "1", b: "1", sel: "1" },
        outputs: { out: "1" },
        description: "If a=1, b=1, sel=1, then out should be 1"
      }
    ],
    solution: `module mux2to1(
  input a,
  input b,
  input sel,
  output reg out
);
  always @(a or b or sel) begin
    if (sel == 0)
      out = a;
    else
      out = b;
  end
endmodule`
  }
];
