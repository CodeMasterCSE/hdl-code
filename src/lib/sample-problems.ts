
// Sample HDL problems for the platform
export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  category: string;
  starterCode: string;
  testCases: TestCase[];
  constraints: string[];
  solution?: string; // Optional solution code
}

export interface TestCase {
  inputs: Record<string, string>;
  outputs: Record<string, string>;
  description: string;
}

export const sampleProblems: Problem[] = [
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
    id: "p002",
    title: "4-bit Binary Counter",
    difficulty: "medium",
    category: "Sequential Logic",
    description: `
Design a 4-bit binary counter with the following specifications:
- A clock input (clk)
- A synchronous reset input (reset)
- A 4-bit output (count)

The counter should increment by 1 on each positive edge of the clock. When reset is high, the counter should be reset to 0.
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'counter_4bit'",
      "Counter should increment on the positive edge of the clock",
      "Reset should be synchronous (only applied on clock edge)"
    ],
    starterCode: `module counter_4bit(
  input clk,
  input reset,
  output reg [3:0] count
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "posedge", reset: "1" },
        outputs: { count: "0000" },
        description: "Counter should reset to 0 when reset is high"
      },
      {
        inputs: { clk: "posedge", reset: "0" },
        outputs: { count: "0001" },
        description: "Counter should increment to 1 after reset"
      },
      {
        inputs: { clk: "posedge", reset: "0" },
        outputs: { count: "0010" },
        description: "Counter should increment to 2"
      },
      {
        inputs: { clk: "posedge after 1111", reset: "0" },
        outputs: { count: "0000" },
        description: "Counter should roll over from 15 to 0"
      }
    ],
    solution: `module counter_4bit(
  input clk,
  input reset,
  output reg [3:0] count
);
  always @(posedge clk) begin
    if (reset)
      count <= 4'b0000;
    else
      count <= count + 1;
  end
endmodule`
  },
  {
    id: "p003",
    title: "Traffic Light Controller",
    difficulty: "hard",
    category: "State Machines",
    description: `
Design a simple traffic light controller for a single intersection. The controller should cycle through three states:
- Green (6 clock cycles)
- Yellow (3 clock cycles)
- Red (6 clock cycles)

Implement this using a finite state machine (FSM) approach.

Specifications:
- Clock input (clk)
- Reset input (rst)
- 3-bit output light [2:0], where:
  - light[2] = Red
  - light[1] = Yellow
  - light[0] = Green

Only one light should be on at any given time.
    `,
    constraints: [
      "Use a finite state machine approach",
      "Your module must be named 'traffic_light_controller'",
      "Follow the timing specifications exactly"
    ],
    starterCode: `module traffic_light_controller(
  input clk,
  input rst,
  output reg [2:0] light
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "posedge", rst: "1" },
        outputs: { light: "001" },
        description: "Controller should start with Green light after reset"
      },
      {
        inputs: { clk: "posedge after 6 cycles", rst: "0" },
        outputs: { light: "010" },
        description: "After 6 clock cycles, should change to Yellow"
      },
      {
        inputs: { clk: "posedge after 3 cycles", rst: "0" },
        outputs: { light: "100" },
        description: "After 3 more clock cycles, should change to Red"
      },
      {
        inputs: { clk: "posedge after 6 cycles", rst: "0" },
        outputs: { light: "001" },
        description: "After 6 more clock cycles, should change back to Green"
      }
    ]
  }
];
