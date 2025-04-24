import { Problem } from '../types/problem';

export const registerProblems: Problem[] = [
  {
    id: "seq003",
    title: "4-bit Shift Register",
    difficulty: "medium",
    category: "Registers",
    points: 20,
    description: `
Design a 4-bit shift register using Verilog.

The shift register should:
- Shift data in from the right (LSB)
- Shift out from the left (MSB)
- Shift on the positive edge of the clock
- Have a synchronous reset
- Store 4 bits of data

Implement the shift register with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One data input (data_in)
- One 4-bit output (data_out)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'shift_register'",
      "Inputs and outputs must be as specified in the description",
      "The shift register should be synchronous"
    ],
    starterCode: `module shift_register(
  input clk,
  input reset,
  input data_in,
  output reg [3:0] data_out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1", data_in: "0" },
        outputs: { data_out: "0000" },
        description: "Reset register to 0"
      },
      {
        inputs: { clk: "1", reset: "0", data_in: "1" },
        outputs: { data_out: "0001" },
        description: "Shift in 1"
      }
    ],
    solution: `module shift_register(
  input clk,
  input reset,
  input data_in,
  output reg [3:0] data_out
);
  always @(posedge clk) begin
    if (reset) begin
      data_out <= 4'b0000;
    end else begin
      data_out <= {data_out[2:0], data_in};
    end
  end
endmodule`
  },
  {
    id: "seq004",
    title: "4-bit Parallel Load Register",
    difficulty: "medium",
    category: "Registers",
    points: 20,
    description: `
Design a 4-bit parallel load register using Verilog.

The register should:
- Load data in parallel when load signal is high
- Maintain its value when load signal is low
- Load on the positive edge of the clock
- Have a synchronous reset
- Store 4 bits of data

Implement the register with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One load input (load)
- One 4-bit data input (data_in)
- One 4-bit output (data_out)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'parallel_register'",
      "Inputs and outputs must be as specified in the description",
      "The register should be synchronous"
    ],
    starterCode: `module parallel_register(
  input clk,
  input reset,
  input load,
  input [3:0] data_in,
  output reg [3:0] data_out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1", load: "0", data_in: "0000" },
        outputs: { data_out: "0000" },
        description: "Reset register to 0"
      },
      {
        inputs: { clk: "1", reset: "0", load: "1", data_in: "1010" },
        outputs: { data_out: "1010" },
        description: "Load data in parallel"
      }
    ],
    solution: `module parallel_register(
  input clk,
  input reset,
  input load,
  input [3:0] data_in,
  output reg [3:0] data_out
);
  always @(posedge clk) begin
    if (reset) begin
      data_out <= 4'b0000;
    end else if (load) begin
      data_out <= data_in;
    end
  end
endmodule`
  }
]; 