export const dFlipFlopProblems = [
  {
    id: "ff002",
    title: "D Flip-Flop Implementation",
    difficulty: "medium",
    category: "Flip Flops",
    description: `
Design a D (Data) flip-flop using Verilog.

A D flip-flop has one data input (D) and two outputs (Q and Q_bar).
The flip-flop stores the value of D at the positive edge of the clock:
- When clk rises, Q becomes equal to D
- Q_bar should always be the complement of Q

Implement the D flip-flop with the following specifications:
- One data input (D)
- One clock input (clk)
- Two outputs (Q and Q_bar)
- Q_bar should always be the complement of Q
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'd_flipflop'",
      "Inputs and outputs must be as specified in the description",
      "The flip-flop should be edge-triggered (positive edge)"
    ],
    starterCode: `module d_flipflop(
  input D,
  input clk,
  output Q,
  output Q_bar
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { D: "0", clk: "1" },
        outputs: { Q: "0", Q_bar: "1" },
        description: "Store 0 when D=0"
      },
      {
        inputs: { D: "1", clk: "1" },
        outputs: { Q: "1", Q_bar: "0" },
        description: "Store 1 when D=1"
      }
    ],
    solution: `module d_flipflop(
  input D,
  input clk,
  output reg Q,
  output Q_bar
);
  assign Q_bar = ~Q;
  
  always @(posedge clk) begin
    Q <= D;
  end
endmodule`
  }
]; 