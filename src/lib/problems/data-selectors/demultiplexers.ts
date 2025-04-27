import { Problem } from '../../types/problem';

export const demultiplexerProblems: Problem[] = [
  {
    id: "p015",
    title: "1-to-2 Demultiplexer",
    difficulty: "easy",
    category: "Data Selectors",
    points: 10,
    description: `
Design a 1-to-2 demultiplexer circuit using Verilog.

A demultiplexer (demux) is a combinational logic circuit that takes a single input and routes it to one of multiple outputs based on select lines.

For this problem, implement a 1-to-2 demultiplexer with the following specifications:
- One data input (in)
- One select input (sel)
- Two outputs (out0 and out1)

The demultiplexer should route the input signal to either out0 or out1 based on the select signal:
- When sel = 0, the input should be routed to out0
- When sel = 1, the input should be routed to out1
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'demux_1to2'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module demux_1to2(
  input in,
  input sel,
  output out0,
  output out1
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { in: "0", sel: "0" },
        outputs: { out0: "0", out1: "0" },
        description: "If in=0, sel=0, then out0=0, out1=0"
      },
      {
        inputs: { in: "0", sel: "1" },
        outputs: { out0: "0", out1: "0" },
        description: "If in=0, sel=1, then out0=0, out1=0"
      },
      {
        inputs: { in: "1", sel: "0" },
        outputs: { out0: "1", out1: "0" },
        description: "If in=1, sel=0, then out0=1, out1=0"
      },
      {
        inputs: { in: "1", sel: "1" },
        outputs: { out0: "0", out1: "1" },
        description: "If in=1, sel=1, then out0=0, out1=1"
      }
    ],
    solution: `module demux_1to2(
  input in,
  input sel,
  output reg out0,
  output reg out1
);
  always @(in or sel) begin
    out0 = (sel == 0) ? in : 0;
    out1 = (sel == 1) ? in : 0;
  end
endmodule`
  },
  {
    id: "p016",
    title: "1-to-4 Demultiplexer",
    difficulty: "easy",
    category: "Data Selectors",
    points: 10,
    description: `
Design a 1-to-4 demultiplexer circuit using Verilog.

A demultiplexer (demux) is a combinational logic circuit that takes a single input and routes it to one of multiple outputs based on select lines.

For this problem, implement a 1-to-4 demultiplexer with the following specifications:
- One data input (in)
- Two select inputs (sel[1:0])
- Four outputs (out0, out1, out2, out3)

The demultiplexer should route the input signal to one of the four outputs based on the select signal:
- When sel = 2'b00, the input should be routed to out0
- When sel = 2'b01, the input should be routed to out1
- When sel = 2'b10, the input should be routed to out2
- When sel = 2'b11, the input should be routed to out3
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'demux_1to4'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module demux_1to4(
  input in,
  input [1:0] sel,
  output out0,
  output out1,
  output out2,
  output out3
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { in: "0", sel: "00" },
        outputs: { out0: "0", out1: "0", out2: "0", out3: "0" },
        description: "If in=0, sel=00, then out0=0, others=0"
      },
      {
        inputs: { in: "0", sel: "01" },
        outputs: { out0: "0", out1: "0", out2: "0", out3: "0" },
        description: "If in=0, sel=01, then out1=0, others=0"
      },
      {
        inputs: { in: "0", sel: "10" },
        outputs: { out0: "0", out1: "0", out2: "0", out3: "0" },
        description: "If in=0, sel=10, then out2=0, others=0"
      },
      {
        inputs: { in: "0", sel: "11" },
        outputs: { out0: "0", out1: "0", out2: "0", out3: "0" },
        description: "If in=0, sel=11, then out3=0, others=0"
      },
      {
        inputs: { in: "1", sel: "00" },
        outputs: { out0: "1", out1: "0", out2: "0", out3: "0" },
        description: "If in=1, sel=00, then out0=1, others=0"
      },
      {
        inputs: { in: "1", sel: "01" },
        outputs: { out0: "0", out1: "1", out2: "0", out3: "0" },
        description: "If in=1, sel=01, then out1=1, others=0"
      },
      {
        inputs: { in: "1", sel: "10" },
        outputs: { out0: "0", out1: "0", out2: "1", out3: "0" },
        description: "If in=1, sel=10, then out2=1, others=0"
      },
      {
        inputs: { in: "1", sel: "11" },
        outputs: { out0: "0", out1: "0", out2: "0", out3: "1" },
        description: "If in=1, sel=11, then out3=1, others=0"
      }
    ],
    solution: `module demux_1to4(
  input in,
  input [1:0] sel,
  output reg out0,
  output reg out1,
  output reg out2,
  output reg out3
);
  always @(in or sel) begin
    out0 = (sel == 2'b00) ? in : 0;
    out1 = (sel == 2'b01) ? in : 0;
    out2 = (sel == 2'b10) ? in : 0;
    out3 = (sel == 2'b11) ? in : 0;
  end
endmodule`
  }
]; 