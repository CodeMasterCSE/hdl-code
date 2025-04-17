
import { Problem } from '../types/problem';

export const sequentialCircuitsProblems: Problem[] = [
  {
    id: "sc-sr-flip-flop",
    title: "SR Flip-Flop",
    difficulty: "medium",
    category: "Sequential Circuits",
    description: `
Design an SR flip-flop using Verilog.

An SR flip-flop (Set-Reset flip-flop) is a sequential circuit that has two inputs: S (Set) and R (Reset). 
- When S=1, R=0, the output Q is set to 1
- When S=0, R=1, the output Q is reset to 0
- When S=0, R=0, the output Q maintains its previous state
- When S=1, R=1, the output is undefined (avoid this condition)

For this problem, implement an SR flip-flop with the following specifications:
- Two inputs (s and r)
- One clock input (clk)
- One output (q)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'sr_flip_flop'",
      "Inputs and outputs must be as specified in the description",
      "The flip-flop must be positive-edge triggered",
      "Handle the case where both s and r are 1 by setting q to 0 (this is implementation-specific)"
    ],
    starterCode: `module sr_flip_flop(
  input s,
  input r,
  input clk,
  output q
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { s: "1", r: "0", clk: "0→1" },
        outputs: { q: "0→1" },
        description: "Set operation: s=1, r=0"
      },
      {
        inputs: { s: "0", r: "1", clk: "0→1" },
        outputs: { q: "1→0" },
        description: "Reset operation: s=0, r=1"
      },
      {
        inputs: { s: "0", r: "0", clk: "0→1" },
        outputs: { q: "1→1" },
        description: "Hold operation: s=0, r=0, previous q=1"
      },
      {
        inputs: { s: "1", r: "1", clk: "0→1" },
        outputs: { q: "1→0" },
        description: "Invalid condition: s=1, r=1, setting q=0"
      },
      {
        inputs: { s: "1→0", r: "0", clk: "1" },
        outputs: { q: "1→1" },
        description: "No change when clock doesn't toggle"
      }
    ],
    solution: `module sr_flip_flop(
  input s,
  input r,
  input clk,
  output reg q
);
  always @(posedge clk) begin
    case({s, r})
      2'b00: q <= q;     // Hold
      2'b01: q <= 0;     // Reset
      2'b10: q <= 1;     // Set
      2'b11: q <= 0;     // Invalid (implementation-specific)
    endcase
  end
endmodule`
  },
  {
    id: "sc-jk-flip-flop",
    title: "JK Flip-Flop",
    difficulty: "medium",
    category: "Sequential Circuits",
    description: `
Design a JK flip-flop using Verilog.

A JK flip-flop is a sequential circuit that has two inputs: J and K. 
- When J=0, K=0, the output Q maintains its previous state
- When J=0, K=1, the output Q is reset to 0
- When J=1, K=0, the output Q is set to 1
- When J=1, K=1, the output Q toggles (inverts)

For this problem, implement a JK flip-flop with the following specifications:
- Two inputs (j and k)
- One clock input (clk)
- One reset input (reset)
- One output (q)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'jk_flip_flop'",
      "Inputs and outputs must be as specified in the description",
      "The flip-flop must be positive-edge triggered",
      "The reset must be synchronous"
    ],
    starterCode: `module jk_flip_flop(
  input j,
  input k,
  input clk,
  input reset,
  output q
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { j: "0", k: "0", clk: "0→1", reset: "0" },
        outputs: { q: "1→1" },
        description: "Hold operation: j=0, k=0, previous q=1"
      },
      {
        inputs: { j: "0", k: "1", clk: "0→1", reset: "0" },
        outputs: { q: "1→0" },
        description: "Reset operation: j=0, k=1"
      },
      {
        inputs: { j: "1", k: "0", clk: "0→1", reset: "0" },
        outputs: { q: "0→1" },
        description: "Set operation: j=1, k=0"
      },
      {
        inputs: { j: "1", k: "1", clk: "0→1", reset: "0" },
        outputs: { q: "1→0" },
        description: "Toggle operation: j=1, k=1, previous q=1"
      },
      {
        inputs: { j: "1", k: "0", clk: "0→1", reset: "1" },
        outputs: { q: "1→0" },
        description: "Reset has priority: reset=1"
      }
    ],
    solution: `module jk_flip_flop(
  input j,
  input k,
  input clk,
  input reset,
  output reg q
);
  always @(posedge clk) begin
    if (reset)
      q <= 0;
    else
      case({j, k})
        2'b00: q <= q;     // Hold
        2'b01: q <= 0;     // Reset
        2'b10: q <= 1;     // Set
        2'b11: q <= ~q;    // Toggle
      endcase
  end
endmodule`
  },
  {
    id: "sc-shift-register-lr",
    title: "4-bit Shift Register (Left/Right)",
    difficulty: "medium",
    category: "Sequential Circuits",
    description: `
Design a 4-bit bidirectional shift register using Verilog.

A bidirectional shift register can shift its data either to the left or to the right, depending on a control signal.

For this problem, implement a 4-bit bidirectional shift register with the following specifications:
- One 4-bit parallel input (data_in[3:0])
- One serial input for left shift (left_in)
- One serial input for right shift (right_in)
- One direction control input (dir) - 0 for right shift, 1 for left shift
- One clock input (clk)
- One reset input (reset)
- One load control input (load) - 1 to load parallel data, 0 to shift
- One 4-bit parallel output (data_out[3:0])
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'shift_register_4bit'",
      "Inputs and outputs must be as specified in the description",
      "The register must operate on the positive edge of the clock",
      "The reset must be synchronous"
    ],
    starterCode: `module shift_register_4bit(
  input [3:0] data_in,
  input left_in,
  input right_in,
  input dir,
  input clk,
  input reset,
  input load,
  output [3:0] data_out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { data_in: "1010", left_in: "0", right_in: "0", dir: "0", clk: "0→1", reset: "0", load: "1" },
        outputs: { data_out: "0000→1010" },
        description: "Load parallel data"
      },
      {
        inputs: { data_in: "1010", left_in: "0", right_in: "1", dir: "0", clk: "0→1", reset: "0", load: "0" },
        outputs: { data_out: "1010→0101" },
        description: "Shift right with right_in=1"
      },
      {
        inputs: { data_in: "1010", left_in: "1", right_in: "0", dir: "1", clk: "0→1", reset: "0", load: "0" },
        outputs: { data_out: "1010→0101" },
        description: "Shift left with left_in=1"
      },
      {
        inputs: { data_in: "1010", left_in: "0", right_in: "0", dir: "0", clk: "0→1", reset: "1", load: "0" },
        outputs: { data_out: "1010→0000" },
        description: "Reset operation"
      },
      {
        inputs: { data_in: "1111", left_in: "0", right_in: "0", dir: "1", clk: "0→1→0→1", reset: "0", load: "1→0→0" },
        outputs: { data_out: "0000→1111→1110→1100" },
        description: "Load then shift left twice"
      }
    ],
    solution: `module shift_register_4bit(
  input [3:0] data_in,
  input left_in,
  input right_in,
  input dir,
  input clk,
  input reset,
  input load,
  output reg [3:0] data_out
);
  always @(posedge clk) begin
    if (reset)
      data_out <= 4'b0000;
    else if (load)
      data_out <= data_in;
    else if (dir) // Left shift
      data_out <= {data_out[2:0], left_in};
    else // Right shift
      data_out <= {right_in, data_out[3:1]};
  end
endmodule`
  }
];
