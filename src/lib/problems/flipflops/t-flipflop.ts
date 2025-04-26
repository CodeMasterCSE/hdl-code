import { Problem } from '../../types/problem';

export const tFlipFlopProblems: Problem[] = [
  {
    id: "p017",
    title: "T Flip-Flop Implementation",
    difficulty: "medium",
    category: "Flip Flops",
    points: 20,
    description: `
Design a T (Toggle) flip-flop using Verilog.

A T flip-flop has one input (T) and two outputs (Q and Q_bar).
The flip-flop toggles its state at the positive edge of the clock when T=1:
- When T=0: Q maintains its previous state
- When T=1: Q toggles (changes to its complement)
- Q_bar should always be the complement of Q

Implement the T flip-flop with the following specifications:
- One input (T)
- One clock input (clk)
- Two outputs (Q and Q_bar)
- Q_bar should always be the complement of Q
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 't_flipflop'",
      "Inputs and outputs must be as specified in the description",
      "The flip-flop should be edge-triggered (positive edge)"
    ],
    starterCode: `module t_flipflop(
  input T,
  input clk,
  output Q,
  output Q_bar
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { T: "0", clk: "1" },
        outputs: { Q: "0", Q_bar: "1" },
        description: "Maintain state when T=0"
      },
      {
        inputs: { T: "1", clk: "1" },
        outputs: { Q: "1", Q_bar: "0" },
        description: "Toggle Q when T=1"
      }
    ],
    solution: `module t_flipflop(
  input T,
  input clk,
  output reg Q,
  output Q_bar
);
  assign Q_bar = ~Q;
  
  always @(posedge clk) begin
    if (T) begin
      Q <= ~Q;
    end
  end
endmodule`
  }
]; 