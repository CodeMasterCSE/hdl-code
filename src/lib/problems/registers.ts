import { Problem } from '../types/problem';

export const registerProblems: Problem[] = [
  {
    id: "p029",
    title: "4-bit Shift Left Register",
    difficulty: "medium",
    category: "Registers",
    points: 20,
    description: `
Design a 4-bit shift left register using Verilog.

The register should:
- Shift the input data one bit to the left on the positive edge of the clock
- Have a synchronous reset
- Store 4 bits of data

Implement the register with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One 4-bit input (data_in)
- One 4-bit output (data_out)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'shift_left_register_4bit'",
      "Inputs and outputs must be as specified in the description",
      "The register should be synchronous"
    ],
    starterCode: `module shift_left_register_4bit(
  input clk,
  input reset,
  input [3:0] data_in,
  output reg [3:0] data_out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1", data_in: "0000" },
        outputs: { data_out: "0000" },
        description: "Reset register to 0"
      },
      {
        inputs: { clk: "1", reset: "0", data_in: "0001" },
        outputs: { data_out: "0010" },
        description: "Shift left by one bit"
      }
    ],
    solution: `module shift_left_register_4bit(
  input clk,
  input reset,
  input [3:0] data_in,
  output reg [3:0] data_out
);
  always @(posedge clk) begin
    if (reset) begin
      data_out <= 4'b0000;
    end else begin
      data_out <= {data_in[2:0], 1'b0};
    end
  end
endmodule`
  },
  {
    id: "p030",
    title: "4-bit Shift Right Register",
    difficulty: "medium",
    category: "Registers",
    points: 20,
    description: `
Design a 4-bit shift right register using Verilog.

The register should:
- Shift the input data one bit to the right on the positive edge of the clock
- Have a synchronous reset
- Store 4 bits of data

Implement the register with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One 4-bit input (data_in)
- One 4-bit output (data_out)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'shift_right_register_4bit'",
      "Inputs and outputs must be as specified in the description",
      "The register should be synchronous"
    ],
    starterCode: `module shift_right_register_4bit(
  input clk,
  input reset,
  input [3:0] data_in,
  output reg [3:0] data_out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1", data_in: "0000" },
        outputs: { data_out: "0000" },
        description: "Reset register to 0"
      },
      {
        inputs: { clk: "1", reset: "0", data_in: "0001" },
        outputs: { data_out: "0000" },
        description: "Shift right by one bit"
      }
    ],
    solution: `module shift_right_register_4bit(
  input clk,
  input reset,
  input [3:0] data_in,
  output reg [3:0] data_out
);
  always @(posedge clk) begin
    if (reset) begin
      data_out <= 4'b0000;
    end else begin
      data_out <= {1'b0, data_in[3:1]};
    end
  end
endmodule`
  },
  {
    id: "p031",
    title: "4-bit Bidirectional Shift Register",
    difficulty: "hard",
    category: "Registers",
    points: 30,
    description: `
Design a 4-bit bidirectional shift register using Verilog.

The register should:
- Shift the input data one bit to the left or right on the positive edge of the clock
- Have a synchronous reset
- Store 4 bits of data
- Shift direction is controlled by a direction input (dir)

Implement the register with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One direction input (dir)
- One 4-bit input (data_in)
- One 4-bit output (data_out)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'bidirectional_shift_register_4bit'",
      "Inputs and outputs must be as specified in the description",
      "The register should be synchronous"
    ],
    starterCode: `module bidirectional_shift_register_4bit(
  input clk,
  input reset,
  input dir,
  input [3:0] data_in,
  output reg [3:0] data_out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1", dir: "0", data_in: "0000" },
        outputs: { data_out: "0000" },
        description: "Reset register to 0"
      },
      {
        inputs: { clk: "1", reset: "0", dir: "0", data_in: "0001" },
        outputs: { data_out: "0000" },
        description: "Shift right by one bit"
      },
      {
        inputs: { clk: "1", reset: "0", dir: "1", data_in: "0001" },
        outputs: { data_out: "0010" },
        description: "Shift left by one bit"
      }
    ],
    solution: `module bidirectional_shift_register_4bit(
  input clk,
  input reset,
  input dir,
  input [3:0] data_in,
  output reg [3:0] data_out
);
  always @(posedge clk) begin
    if (reset) begin
      data_out <= 4'b0000;
    end else if (dir) begin
      data_out <= {data_in[2:0], 1'b0};
    end else begin
      data_out <= {1'b0, data_in[3:1]};
    end
  end
endmodule`
  },
  {
    id: "p032",
    title: "PISO Register",
    difficulty: "hard",
    category: "Registers",
    points: 30,
    description: `
Design a 4-bit parallel-in serial-out (PISO) register using Verilog.

The register should:
- Load the input data in parallel on the positive edge of the clock
- Shift out the data serially on the positive edge of the clock
- Have a synchronous reset
- Store 4 bits of data

Implement the register with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One 4-bit input (data_in)
- One bit output (data_out)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'piso_register'",
      "Inputs and outputs must be as specified in the description",
      "The register should be synchronous"
    ],
    starterCode: `module piso_register(
  input clk,
  input reset,
  input [3:0] data_in,
  output reg data_out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1", data_in: "0000" },
        outputs: { data_out: "0" },
        description: "Reset register to 0"
      },
      {
        inputs: { clk: "1", reset: "0", data_in: "0001" },
        outputs: { data_out: "1" },
        description: "Shift out data serially"
      }
    ],
    solution: `module piso_register(
  input clk,
  input reset,
  input [3:0] data_in,
  output reg data_out
);
  reg [3:0] data_reg;
  always @(posedge clk) begin
    if (reset) begin
      data_reg <= 4'b0000;
    end else begin
      data_reg <= data_in;
    end
  end
  assign data_out = data_reg[3];
endmodule`
  },
  {
    id: "p033",
    title: "SIPO Register",
    difficulty: "hard",
    category: "Registers",
    points: 30,
    description: `
Design a 4-bit serial-in parallel-out (SIPO) register using Verilog.

The register should:
- Load the input data serially on the positive edge of the clock
- Output the data in parallel
- Have a synchronous reset
- Store 4 bits of data

Implement the register with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One bit input (data_in)
- One 4-bit output (data_out)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'sipo_register'",
      "Inputs and outputs must be as specified in the description",
      "The register should be synchronous"
    ],
    starterCode: `module sipo_register(
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
        description: "Load data serially"
      }
    ],
    solution: `module sipo_register(
  input clk,
  input reset,
  input data_in,
  output reg [3:0] data_out
);
  always @(posedge clk) begin
    if (reset) begin
      data_out <= 4'b0000;
    end else begin
      data_out <= {data_in, data_out[3:1]};
    end
  end
endmodule`
  },
]; 