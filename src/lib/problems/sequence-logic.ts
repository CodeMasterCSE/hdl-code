import { Problem } from "../types/problem";

export const sequenceLogicProblems: Problem[] = [
  {
    id: "seq-counter",
    title: "4-Bit Binary Counter",
    difficulty: "medium",
    category: "Sequential Logic",
    description: `Design a 4-bit binary counter with synchronous reset.

When the reset signal is high, the counter should reset to 0000. Otherwise, on each rising edge of the clock, the counter should increment by 1.

Your module should have the following interface:
\`\`\`
module counter_4bit(
  input wire clk,
  input wire reset,
  output reg [3:0] count
);
\`\`\`

The counter should roll over to 0000 after reaching 1111.`,
    starterCode: `module counter_4bit(
  input wire clk,
  input wire reset,
  output reg [3:0] count
);
  
  // Your code here
  
endmodule`,
    testCases: [
      {
        inputs: { clk: "1→0→1", reset: "0" },
        outputs: { count: "0000→0001" },
        description: "First clock cycle, no reset"
      },
      {
        inputs: { clk: "1→0→1→0→1", reset: "0→0" },
        outputs: { count: "0000→0001→0010" },
        description: "Counter increments on rising edge"
      },
      {
        inputs: { clk: "1→0→1", reset: "1→0" },
        outputs: { count: "0000→0000" },
        description: "Counter holds at reset"
      },
      {
        inputs: { clk: "1→0→1", reset: "1→0→0" },
        outputs: { count: "0000→0001" },
        description: "Counter starts after reset released"
      },
      {
        inputs: { clk: "cycle 16 times", reset: "0" },
        outputs: { count: "1111→0000" },
        description: "Counter rolls over after 1111"
      }
    ],
    constraints: [
      "You must use synchronous reset",
      "The counter must increment on the rising edge of the clock",
      "The counter must roll over to 0000 after reaching 1111"
    ]
  },
  {
    id: "seq-shift-register",
    title: "8-bit Shift Register",
    difficulty: "medium",
    category: "Sequential Logic",
    description: `Design an 8-bit shift register that shifts in data from the right (LSB) and shifts out from the left (MSB).

The shift register should have a serial input, a serial output, a clock input, and a reset input. When reset is high, all bits in the register should be set to 0. On each rising edge of the clock, the register should shift left by one bit, with the serial input being loaded into the rightmost bit.

Your module should have the following interface:
\`\`\`
module shift_register_8bit(
  input wire clk,
  input wire reset,
  input wire serial_in,
  output wire serial_out,
  output wire [7:0] parallel_out
);
\`\`\``,
    starterCode: `module shift_register_8bit(
  input wire clk,
  input wire reset,
  input wire serial_in,
  output wire serial_out,
  output wire [7:0] parallel_out
);
  
  // Your code here
  
endmodule`,
    testCases: [
      {
        inputs: { clk: "1→0→1", reset: "0", serial_in: "1" },
        outputs: { parallel_out: "00000000→00000001", serial_out: "0→0" },
        description: "First bit shifted in"
      },
      {
        inputs: { clk: "1→0→1→0→1", reset: "0", serial_in: "1→0" },
        outputs: { parallel_out: "00000000→00000001→00000010", serial_out: "0→0→0" },
        description: "Two bits shifted in (1 then 0)"
      },
      {
        inputs: { clk: "8 rising edges", reset: "0", serial_in: "1→1→1→1→0→0→0→0" },
        outputs: { parallel_out: "Final: 00001111", serial_out: "Final: 0" },
        description: "8 bits shifted in (4 ones followed by 4 zeros)"
      },
      {
        inputs: { clk: "9 rising edges", reset: "0", serial_in: "1→1→1→1→1→1→1→1→1" },
        outputs: { parallel_out: "Final: 11111111", serial_out: "Final: 1" },
        description: "First bit shifted out after 8 shifts"
      },
      {
        inputs: { clk: "1→0→1", reset: "1→0", serial_in: "1" },
        outputs: { parallel_out: "00000000→00000001", serial_out: "0→0" },
        description: "Reset works correctly"
      }
    ],
    constraints: [
      "You must use synchronous reset",
      "The register must shift on the rising edge of the clock",
      "The serial output should be the MSB (leftmost bit) of the register"
    ]
  },
  {
    id: "seq-fsm",
    title: "Simple FSM Sequence Detector",
    difficulty: "hard",
    category: "Sequential Logic",
    description: `Design a finite state machine (FSM) that detects the sequence "1011" in a serial input stream.

The FSM should output a 1 for one clock cycle when it detects the complete sequence, and 0 otherwise. The sequence detector should work with overlapping sequences.

Your module should have the following interface:
\`\`\`
module sequence_detector(
  input wire clk,
  input wire reset,
  input wire data_in,
  output reg detected
);
\`\`\`

For example, if the input stream is "10111011", the output should be "00010001" (with the 1s aligned to when the sequence is complete).`,
    starterCode: `module sequence_detector(
  input wire clk,
  input wire reset,
  input wire data_in,
  output reg detected
);
  
  // Your code here
  
endmodule`,
    testCases: [
      {
        inputs: { clk: "5 cycles", reset: "0", data_in: "1→0→1→1→0" },
        outputs: { detected: "0→0→0→1→0" },
        description: "Basic sequence detection"
      },
      {
        inputs: { clk: "8 cycles", reset: "0", data_in: "1→0→1→1→1→0→1→1" },
        outputs: { detected: "0→0→0→1→0→0→0→1" },
        description: "Overlapping sequences"
      },
      {
        inputs: { clk: "4 cycles", reset: "1→0→0→0", data_in: "1→0→1→1" },
        outputs: { detected: "0→0→0→1" },
        description: "Reset followed by sequence"
      },
      {
        inputs: { clk: "6 cycles", reset: "0→0→0→1→0→0", data_in: "1→0→1→1→0→1" },
        outputs: { detected: "0→0→0→1→0→0" },
        description: "Reset in middle of sequence"
      },
      {
        inputs: { clk: "10 cycles", reset: "0", data_in: "0→1→0→1→1→0→1→1→0→1" },
        outputs: { detected: "0→0→0→0→1→0→0→1→0→0" },
        description: "Multiple overlapping detections"
      }
    ],
    constraints: [
      "You must use synchronous reset",
      "The detector must recognize overlapping sequences",
      "The output should be high for exactly one clock cycle when the sequence is detected"
    ]
  },
  {
    id: "p014",
    title: "D Flip-Flop",
    difficulty: "medium",
    category: "Sequential Logic",
    description: `
Design a D flip-flop using Verilog.

A D flip-flop (Data or Delay flip-flop) is a sequential circuit that stores and outputs the value of its D input at the time of a positive edge of the clock signal.

For this problem, implement a D flip-flop with the following specifications:
- One data input (d)
- One clock input (clk)
- One reset input (reset)
- One output (q)

When reset is high, q should be set to 0.
When a positive edge of clk occurs, q should take the value of d.
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'd_flip_flop'",
      "Inputs and outputs must be as specified in the description",
      "The flip-flop must be positive-edge triggered",
      "The reset must be synchronous"
    ],
    starterCode: `module d_flip_flop(
  input d,
  input clk,
  input reset,
  output q
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { d: "1", clk: "0→1", reset: "0" },
        outputs: { q: "0→1" },
        description: "Basic D flip-flop operation with d=1"
      },
      {
        inputs: { d: "0", clk: "0→1", reset: "0" },
        outputs: { q: "1→0" },
        description: "Basic D flip-flop operation with d=0"
      },
      {
        inputs: { d: "1", clk: "0→1", reset: "1" },
        outputs: { q: "x→0" },
        description: "Reset operation"
      },
      {
        inputs: { d: "1→0", clk: "0", reset: "0" },
        outputs: { q: "1→1" },
        description: "No change when clock doesn't toggle"
      },
      {
        inputs: { d: "0→1→0", clk: "0→1→0→1", reset: "0" },
        outputs: { q: "0→1→1→0" },
        description: "Multiple clock edges"
      }
    ],
    solution: `module d_flip_flop(
  input d,
  input clk,
  input reset,
  output reg q
);
  always @(posedge clk) begin
    if (reset)
      q <= 0;
    else
      q <= d;
  end
endmodule`
  },
  {
    id: "p015",
    title: "T Flip-Flop",
    difficulty: "medium",
    category: "Sequential Logic",
    description: `
Design a T flip-flop using Verilog.

A T flip-flop (Toggle flip-flop) is a sequential circuit that toggles its output when T=1 and maintains its previous output when T=0.

For this problem, implement a T flip-flop with the following specifications:
- One toggle input (t)
- One clock input (clk)
- One reset input (reset)
- One output (q)

When reset is high, q should be set to 0.
When a positive edge of clk occurs and t=1, q should toggle (invert).
When a positive edge of clk occurs and t=0, q should maintain its value.
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 't_flip_flop'",
      "Inputs and outputs must be as specified in the description",
      "The flip-flop must be positive-edge triggered",
      "The reset must be synchronous"
    ],
    starterCode: `module t_flip_flop(
  input t,
  input clk,
  input reset,
  output q
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { t: "1", clk: "0→1", reset: "0" },
        outputs: { q: "0→1" },
        description: "Toggle with t=1"
      },
      {
        inputs: { t: "1", clk: "0→1→0→1", reset: "0" },
        outputs: { q: "0→1→1→0" },
        description: "Multiple toggles with t=1"
      },
      {
        inputs: { t: "0", clk: "0→1", reset: "0" },
        outputs: { q: "1→1" },
        description: "Hold with t=0"
      },
      {
        inputs: { t: "1", clk: "0→1", reset: "1" },
        outputs: { q: "x→0" },
        description: "Reset operation"
      },
      {
        inputs: { t: "1→0→1", clk: "0→1→0→1→0→1", reset: "0" },
        outputs: { q: "0→1→1→1→1→0" },
        description: "Mixed toggle and hold operations"
      }
    ],
    solution: `module t_flip_flop(
  input t,
  input clk,
  input reset,
  output reg q
);
  always @(posedge clk) begin
    if (reset)
      q <= 0;
    else if (t)
      q <= ~q;
    // else q remains unchanged
  end
endmodule`
  }
];
