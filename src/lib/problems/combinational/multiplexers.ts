
import { Problem } from '../../types/problem';

export const multiplexerProblems: Problem[] = [
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
  },
  {
    id: "p013",
    title: "4:1 Multiplexer",
    difficulty: "easy",
    category: "Combinational Logic",
    description: `
Design a 4-to-1 multiplexer using Verilog.

A 4-to-1 multiplexer selects one of four input signals and forwards it to the output based on two select lines.

For this problem, implement a 4-to-1 multiplexer with the following specifications:
- Four data inputs (in0, in1, in2, in3)
- Two select inputs (sel[1:0])
- One output (out)

When sel = 00, out = in0
When sel = 01, out = in1
When sel = 10, out = in2
When sel = 11, out = in3
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'mux4to1'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module mux4to1(
  input in0,
  input in1,
  input in2,
  input in3,
  input [1:0] sel,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { in0: "1", in1: "0", in2: "0", in3: "0", sel: "00" },
        outputs: { out: "1" },
        description: "When sel=00, out should equal in0"
      },
      {
        inputs: { in0: "0", in1: "1", in2: "0", in3: "0", sel: "01" },
        outputs: { out: "1" },
        description: "When sel=01, out should equal in1"
      },
      {
        inputs: { in0: "0", in1: "0", in2: "1", in3: "0", sel: "10" },
        outputs: { out: "1" },
        description: "When sel=10, out should equal in2"
      },
      {
        inputs: { in0: "0", in1: "0", in2: "0", in3: "1", sel: "11" },
        outputs: { out: "1" },
        description: "When sel=11, out should equal in3"
      }
    ],
    solution: `module mux4to1(
  input in0,
  input in1,
  input in2,
  input in3,
  input [1:0] sel,
  output reg out
);
  always @(*) begin
    case(sel)
      2'b00: out = in0;
      2'b01: out = in1;
      2'b10: out = in2;
      2'b11: out = in3;
      default: out = 1'bx; // Undefined for invalid select values
    endcase
  end
endmodule`
  }
];
