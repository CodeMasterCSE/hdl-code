import { Problem } from '../../types/problem';

export const multiplexerProblems: Problem[] = [
  {
    id: "p013",
    title: "2-to-1 Multiplexer",
    difficulty: "easy",
    category: "Data Selectors",
    points: 10,
    description: `
Design a 2-to-1 multiplexer circuit using Verilog.

A multiplexer (mux) is a combinational logic circuit that selects one of several input signals and forwards it to a single output line.

For this problem, implement a 2-to-1 multiplexer with the following specifications:
- Two data inputs (in0 and in1)
- One select input (sel)
- One output (out)

The multiplexer should select between in0 and in1 based on the select signal:
- When sel = 0, the output should be in0
- When sel = 1, the output should be in1
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'mux_2to1'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module mux_2to1(
  input in0,
  input in1,
  input sel,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { in0: "0", in1: "0", sel: "0" },
        outputs: { out: "0" },
        description: "If in0=0, in1=0, sel=0, then out=0"
      },
      {
        inputs: { in0: "0", in1: "0", sel: "1" },
        outputs: { out: "0" },
        description: "If in0=0, in1=0, sel=1, then out=0"
      },
      {
        inputs: { in0: "0", in1: "1", sel: "0" },
        outputs: { out: "0" },
        description: "If in0=0, in1=1, sel=0, then out=0"
      },
      {
        inputs: { in0: "0", in1: "1", sel: "1" },
        outputs: { out: "1" },
        description: "If in0=0, in1=1, sel=1, then out=1"
      },
      {
        inputs: { in0: "1", in1: "0", sel: "0" },
        outputs: { out: "1" },
        description: "If in0=1, in1=0, sel=0, then out=1"
      },
      {
        inputs: { in0: "1", in1: "0", sel: "1" },
        outputs: { out: "0" },
        description: "If in0=1, in1=0, sel=1, then out=0"
      },
      {
        inputs: { in0: "1", in1: "1", sel: "0" },
        outputs: { out: "1" },
        description: "If in0=1, in1=1, sel=0, then out=1"
      },
      {
        inputs: { in0: "1", in1: "1", sel: "1" },
        outputs: { out: "1" },
        description: "If in0=1, in1=1, sel=1, then out=1"
      }
    ],
    solution: `module mux_2to1(
  input in0,
  input in1,
  input sel,
  output reg out
);
  always @(in0 or in1 or sel) begin
    out = sel ? in1 : in0;
  end
endmodule`
  },
  {
    id: "p014",
    title: "4-to-1 Multiplexer",
    difficulty: "easy",
    category: "Data Selectors",
    points: 10,
    description: `
Design a 4-to-1 multiplexer circuit using Verilog.

A multiplexer (mux) is a combinational logic circuit that selects one of several input signals and forwards it to a single output line.

For this problem, implement a 4-to-1 multiplexer with the following specifications:
- Four data inputs (in0, in1, in2, in3)
- Two select inputs (sel[1:0])
- One output (out)

The multiplexer should select between the four inputs based on the select signal:
- When sel = 2'b00, the output should be in0
- When sel = 2'b01, the output should be in1
- When sel = 2'b10, the output should be in2
- When sel = 2'b11, the output should be in3
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'mux_4to1'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module mux_4to1(
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
        inputs: { in0: "0", in1: "0", in2: "0", in3: "0", sel: "00" },
        outputs: { out: "0" },
        description: "If all inputs=0, sel=00, then out=0"
      },
      {
        inputs: { in0: "0", in1: "0", in2: "0", in3: "0", sel: "01" },
        outputs: { out: "0" },
        description: "If all inputs=0, sel=01, then out=0"
      },
      {
        inputs: { in0: "0", in1: "0", in2: "0", in3: "0", sel: "10" },
        outputs: { out: "0" },
        description: "If all inputs=0, sel=10, then out=0"
      },
      {
        inputs: { in0: "0", in1: "0", in2: "0", in3: "0", sel: "11" },
        outputs: { out: "0" },
        description: "If all inputs=0, sel=11, then out=0"
      },
      {
        inputs: { in0: "1", in1: "0", in2: "0", in3: "0", sel: "00" },
        outputs: { out: "1" },
        description: "If in0=1, others=0, sel=00, then out=1"
      },
      {
        inputs: { in0: "0", in1: "1", in2: "0", in3: "0", sel: "01" },
        outputs: { out: "1" },
        description: "If in1=1, others=0, sel=01, then out=1"
      },
      {
        inputs: { in0: "0", in1: "0", in2: "1", in3: "0", sel: "10" },
        outputs: { out: "1" },
        description: "If in2=1, others=0, sel=10, then out=1"
      },
      {
        inputs: { in0: "0", in1: "0", in2: "0", in3: "1", sel: "11" },
        outputs: { out: "1" },
        description: "If in3=1, others=0, sel=11, then out=1"
      }
    ],
    solution: `module mux_4to1(
  input in0,
  input in1,
  input in2,
  input in3,
  input [1:0] sel,
  output reg out
);
  always @(in0 or in1 or in2 or in3 or sel) begin
    case(sel)
      2'b00: out = in0;
      2'b01: out = in1;
      2'b10: out = in2;
      2'b11: out = in3;
    endcase
  end
endmodule`
  }
]; 