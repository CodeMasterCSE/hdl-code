import { Problem } from '../../types/problem';

export const srFlipFlopProblems: Problem[] = [
  {
    id: "p015",
    title: "SR Flip-Flop Implementation",
    difficulty: "medium",
    category: "Flip Flops",
    points: 20,
    description: `
Design an SR (Set-Reset) flip-flop using Verilog.

An SR flip-flop has two inputs (S and R) and two outputs (Q and Q_bar).
The flip-flop changes state based on the inputs:
- When S=1, R=0: Q becomes 1 (Set)
- When S=0, R=1: Q becomes 0 (Reset)
- When S=0, R=0: Q maintains its previous state
- When S=1, R=1: Invalid state (should be avoided)

Implement the SR flip-flop with the following specifications:
- Two inputs (S and R)
- One clock input (clk)
- Two outputs (Q and Q_bar)
- Q_bar should always be the complement of Q
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'sr_flipflop'",
      "Inputs and outputs must be as specified in the description",
      "The flip-flop should be edge-triggered (positive edge)"
    ],
    starterCode: `module sr_flipflop(
  input S,
  input R,
  input clk,
  output Q,
  output Q_bar
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { S: "0", R: "0", clk: "1" },
        outputs: { Q: "0", Q_bar: "1" },
        description: "Maintain state when S=0, R=0"
      },
      {
        inputs: { S: "1", R: "0", clk: "1" },
        outputs: { Q: "1", Q_bar: "0" },
        description: "Set Q to 1 when S=1, R=0"
      },
      {
        inputs: { S: "0", R: "1", clk: "1" },
        outputs: { Q: "0", Q_bar: "1" },
        description: "Reset Q to 0 when S=0, R=1"
      }
    ],
    solution: `module sr_flipflop(
  input S,
  input R,
  input clk,
  output reg Q,
  output Q_bar
);
  assign Q_bar = ~Q;
  
  always @(posedge clk) begin
    case({S, R})
      2'b00: Q <= Q;    // Maintain state
      2'b01: Q <= 0;    // Reset
      2'b10: Q <= 1;    // Set
      2'b11: Q <= Q;    // Invalid state, maintain previous state
    endcase
  end
endmodule`
  }
]; 