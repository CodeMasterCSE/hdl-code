import { Problem } from '../types/problem';

export const counterProblems: Problem[] = [
  {
    id: "seq001",
    title: "4-bit Binary Counter",
    difficulty: "medium",
    category: "Counters",
    points: 20,
    description: `
Design a 4-bit binary counter using Verilog.

The counter should:
- Count from 0 to 15 (binary 0000 to 1111)
- Increment on the positive edge of the clock
- Reset to 0 when the reset signal is high
- Have a synchronous reset

Implement the counter with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One 4-bit output (count)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'binary_counter'",
      "Inputs and outputs must be as specified in the description",
      "The counter should be synchronous"
    ],
    starterCode: `module binary_counter(
  input clk,
  input reset,
  output reg [3:0] count
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1" },
        outputs: { count: "0000" },
        description: "Reset counter to 0"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "0001" },
        description: "Increment counter"
      }
    ],
    solution: `module binary_counter(
  input clk,
  input reset,
  output reg [3:0] count
);
  always @(posedge clk) begin
    if (reset) begin
      count <= 4'b0000;
    end else begin
      count <= count + 1;
    end
  end
endmodule`
  },
  {
    id: "seq002",
    title: "Modulo-10 Counter",
    difficulty: "medium",
    category: "Counters",
    points: 20,
    description: `
Design a modulo-10 counter using Verilog.

The counter should:
- Count from 0 to 9
- Reset to 0 after reaching 9
- Increment on the positive edge of the clock
- Reset to 0 when the reset signal is high
- Have a synchronous reset

Implement the counter with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One 4-bit output (count)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'mod10_counter'",
      "Inputs and outputs must be as specified in the description",
      "The counter should be synchronous"
    ],
    starterCode: `module mod10_counter(
  input clk,
  input reset,
  output reg [3:0] count
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1" },
        outputs: { count: "0000" },
        description: "Reset counter to 0"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "0001" },
        description: "Increment counter"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "0000" },
        description: "Reset after reaching 9"
      }
    ],
    solution: `module mod10_counter(
  input clk,
  input reset,
  output reg [3:0] count
);
  always @(posedge clk) begin
    if (reset) begin
      count <= 4'b0000;
    end else if (count == 4'b1001) begin
      count <= 4'b0000;
    end else begin
      count <= count + 1;
    end
  end
endmodule`
  }
]; 