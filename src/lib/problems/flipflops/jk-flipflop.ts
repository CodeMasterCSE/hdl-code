import { Problem } from '../../types/problem';

export const jkFlipFlopProblems: Problem[] = [
  {
    id: "p018",
    title: "JK Flip-Flop Implementation",
    difficulty: "medium",
    category: "Flip Flops",
    points: 20,
    description: `
Design a JK flip-flop using Verilog.

A JK flip-flop has two inputs (J and K) and two outputs (Q and Q_bar).
The flip-flop changes state based on the inputs at the positive edge of the clock:
- When J=0, K=0: Q maintains its previous state
- When J=0, K=1: Q becomes 0 (Reset)
- When J=1, K=0: Q becomes 1 (Set)
- When J=1, K=1: Q toggles (changes to its complement)

Implement the JK flip-flop with the following specifications:
- Two inputs (J and K)
- One clock input (clk)
- Two outputs (Q and Q_bar)
- Q_bar should always be the complement of Q
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'jk_flipflop'",
      "Inputs and outputs must be as specified in the description",
      "The flip-flop should be edge-triggered (positive edge)"
    ],
    starterCode: `module jk_flipflop(
  input J,
  input K,
  input clk,
  output Q,
  output Q_bar
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { J: "0", K: "0", clk: "1" },
        outputs: { Q: "0", Q_bar: "1" },
        description: "Maintain state when J=0, K=0"
      },
      {
        inputs: { J: "0", K: "1", clk: "1" },
        outputs: { Q: "0", Q_bar: "1" },
        description: "Reset Q to 0 when J=0, K=1"
      },
      {
        inputs: { J: "1", K: "0", clk: "1" },
        outputs: { Q: "1", Q_bar: "0" },
        description: "Set Q to 1 when J=1, K=0"
      },
      {
        inputs: { J: "1", K: "1", clk: "1" },
        outputs: { Q: "1", Q_bar: "0" },
        description: "Toggle Q when J=1, K=1"
      }
    ],
    solution: `module jk_flipflop(
  input J,
  input K,
  input clk,
  output reg Q,
  output Q_bar
);
  assign Q_bar = ~Q;
  
  always @(posedge clk) begin
    case({J, K})
      2'b00: Q <= Q;        // Maintain state
      2'b01: Q <= 0;        // Reset
      2'b10: Q <= 1;        // Set
      2'b11: Q <= ~Q;       // Toggle
    endcase
  end
endmodule`
  }
]; 