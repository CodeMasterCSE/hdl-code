import { Problem } from '../types/problem';

export const counterProblems: Problem[] = [
  {
    id: "p019",
    title: "1-bit Binary Up Counter",
    difficulty: "medium",
    category: "Counters",
    points: 20,
    description: `
Design a 1-bit binary up counter using Verilog.

The counter should:
- Count from 0 to 1 (binary 0 to 1)
- Increment on the positive edge of the clock
- Reset to 0 when the reset signal is high
- Have a synchronous reset

Implement the counter with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One 1-bit output (count)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'binary_up_counter_1bit'",
      "Inputs and outputs must be as specified in the description",
      "The counter should be synchronous"
    ],
    starterCode: `module binary_up_counter_1bit(
  input clk,
  input reset,
  output reg count
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1" },
        outputs: { count: "0" },
        description: "Reset counter to 0"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "1" },
        description: "Increment counter"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "0" },
        description: "Wrap around to 0"
      }
    ],
    solution: `module binary_up_counter_1bit(
  input clk,
  input reset,
  output reg count
);
  always @(posedge clk) begin
    if (reset) begin
      count <= 0;
    end else begin
      count <= ~count;
    end
  end
endmodule`
  },
  {
    id: "p020",
    title: "1-bit Binary Down Counter",
    difficulty: "medium",
    category: "Counters",
    points: 20,
    description: `
Design a 1-bit binary down counter using Verilog.

The counter should:
- Count down from 1 to 0 (binary 1 to 0)
- Decrement on the positive edge of the clock
- Reset to 1 when the reset signal is high
- Have a synchronous reset

Implement the counter with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One 1-bit output (count)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'binary_down_counter_1bit'",
      "Inputs and outputs must be as specified in the description",
      "The counter should be synchronous"
    ],
    starterCode: `module binary_down_counter_1bit(
  input clk,
  input reset,
  output reg count
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1" },
        outputs: { count: "1" },
        description: "Reset counter to 1"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "0" },
        description: "Decrement counter"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "1" },
        description: "Wrap around to 1"
      }
    ],
    solution: `module binary_down_counter_1bit(
  input clk,
  input reset,
  output reg count
);
  always @(posedge clk) begin
    if (reset) begin
      count <= 1;
    end else begin
      count <= ~count;
    end
  end
endmodule`
  },
  {
    id: "p021",
    title: "2-bit Binary Up Counter",
    difficulty: "medium",
    category: "Counters",
    points: 20,
    description: `
Design a 2-bit binary up counter using Verilog.

The counter should:
- Count from 0 to 3 (binary 00 to 11)
- Increment on the positive edge of the clock
- Reset to 0 when the reset signal is high
- Have a synchronous reset

Implement the counter with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One 2-bit output (count)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'binary_up_counter_2bit'",
      "Inputs and outputs must be as specified in the description",
      "The counter should be synchronous"
    ],
    starterCode: `module binary_up_counter_2bit(
  input clk,
  input reset,
  output reg [1:0] count
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1" },
        outputs: { count: "00" },
        description: "Reset counter to 0"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "01" },
        description: "Increment counter"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "10" },
        description: "Increment counter"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "11" },
        description: "Increment counter"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "00" },
        description: "Wrap around to 0"
      }
    ],
    solution: `module binary_up_counter_2bit(
  input clk,
  input reset,
  output reg [1:0] count
);
  always @(posedge clk) begin
    if (reset) begin
      count <= 0;
    end else begin
      count <= count + 1;
    end
  end
endmodule`
  },
  {
    id: "p022",
    title: "2-bit Binary Down Counter",
    difficulty: "medium",
    category: "Counters",
    points: 20,
    description: `
Design a 2-bit binary down counter using Verilog.

The counter should:
- Count down from 3 to 0 (binary 11 to 00)
- Decrement on the positive edge of the clock
- Reset to 3 when the reset signal is high
- Have a synchronous reset

Implement the counter with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One 2-bit output (count)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'binary_down_counter_2bit'",
      "Inputs and outputs must be as specified in the description",
      "The counter should be synchronous"
    ],
    starterCode: `module binary_down_counter_2bit(
  input clk,
  input reset,
  output reg [1:0] count
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1" },
        outputs: { count: "11" },
        description: "Reset counter to 3"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "10" },
        description: "Decrement counter"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "01" },
        description: "Decrement counter"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "00" },
        description: "Decrement counter"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "11" },
        description: "Wrap around to 3"
      }
    ],
    solution: `module binary_down_counter_2bit(
  input clk,
  input reset,
  output reg [1:0] count
);
  always @(posedge clk) begin
    if (reset) begin
      count <= 2;
    end else begin
      count <= count - 1;
    end
  end
endmodule`
  },
  {
    id: "p023",
    title: "4-bit Binary Up Counter",
    difficulty: "medium",
    category: "Counters",
    points: 20,
    description: `
Design a 4-bit binary up counter using Verilog.

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
      "Your module must be named 'binary_up_counter_4bit'",
      "Inputs and outputs must be as specified in the description",
      "The counter should be synchronous"
    ],
    starterCode: `module binary_up_counter_4bit(
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
    solution: `module binary_up_counter_4bit(
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
    id: "p024",
    title: "4-bit Binary Down Counter",
    difficulty: "medium",
    category: "Counters",
    points: 20,
    description: `
Design a 4-bit binary down counter using Verilog.

The counter should:
- Count down from 15 to 0 (binary 1111 to 0000)
- Decrement on the positive edge of the clock
- Reset to 15 when the reset signal is high
- Have a synchronous reset

Implement the counter with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One 4-bit output (count)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'binary_down_counter_4bit'",
      "Inputs and outputs must be as specified in the description",
      "The counter should be synchronous"
    ],
    starterCode: `module binary_down_counter_4bit(
  input clk,
  input reset,
  output reg [3:0] count
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1" },
        outputs: { count: "1111" },
        description: "Reset counter to 15"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { count: "1110" },
        description: "Decrement counter"
      }
    ],
    solution: `module binary_down_counter_4bit(
  input clk,
  input reset,
  output reg [3:0] count
);
  always @(posedge clk) begin
    if (reset) begin
      count <= 4'b1111;
    end else begin
      count <= count - 1;
    end
  end
endmodule`
  },
  {
    id: "p025",
    title: "4-bit Up-Down Counter",
    difficulty: "hard",
    category: "Counters",
    points: 30,
    description: `
Design a 4-bit up-down counter using Verilog.

The counter should:
- Increment when up signal is high
- Decrement when down signal is high
- Maintain its value when both up and down signals are low
- Change on the positive edge of the clock

Implement the counter with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One up signal input (up)
- One down signal input (down)
- One 4-bit output (count)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'up_down_counter'",
      "Inputs and outputs must be as specified in the description",
      "The counter should be synchronous"
    ],
    starterCode: `module up_down_counter(
  input clk,
  input reset,
  input up,
  input down,
  output reg [3:0] count
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1", up: "0", down: "0" },
        outputs: { count: "0000" },
        description: "Reset counter to 0"
      },
      {
        inputs: { clk: "1", reset: "0", up: "1", down: "0" },
        outputs: { count: "0001" },
        description: "Increment counter"
      },
      {
        inputs: { clk: "1", reset: "0", up: "0", down: "1" },
        outputs: { count: "0000" },
        description: "Decrement counter"
      }
    ],
    solution: `module up_down_counter(
  input clk,
  input reset,
  input up,
  input down,
  output reg [3:0] count
);
  always @(posedge clk) begin
    if (reset) begin
      count <= 4'b0000;
    end else if (up) begin
      count <= count + 1;
    end else if (down) begin
      count <= count - 1;
    end
  end
endmodule`
  },
  {
    id: "p026",
    title: "BCD Counter",
    difficulty: "hard",
    category: "Counters",
    points: 30,
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
  },
{
  id: "p027",
  title: "4-bit Ring Counter",
  difficulty: "hard",
  category: "Counters",
  points: 30,
  description: `
Design a 4-bit ring counter using Verilog.

The counter should:
- Count in a circular manner (i.e., after reaching the maximum value, it wraps around to 0)
- Count on the positive edge of the clock
- Have a synchronous reset
- Store 4 bits of data

Implement the counter with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One 4-bit output (count)
  `,
  constraints: [
    "Use behavioral modeling",
    "Your module must be named 'ring_counter'",
    "Inputs and outputs must be as specified in the description",
    "The counter should be synchronous"
  ],
  starterCode: `module ring_counter(
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
      description: "Wrap around after reaching maximum value"
    }
  ],
  solution: `module ring_counter(
  input clk,
  input reset,
  output reg [3:0] count
);
  always @(posedge clk) begin
    if (reset) begin
      count <= 4'b0000;
    end else begin
      count <= count + 1;
      if (count == 4'b1111) begin
        count <= 4'b0000;
      end
    end
  end
endmodule`
},
{
  id: "p028",
  title: "4-bit Johnson Counter",
  difficulty: "hard",
  category: "Counters",
  points: 30,
  description: `
Design a 4-bit Johnson counter using Verilog.

The counter should:
- Count in a sequence of 0, 1, 3, 7, 15, 31, 0, ...
- Count on the positive edge of the clock
- Have a synchronous reset
- Store 4 bits of data

Implement the counter with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One 4-bit output (count)
  `,
  constraints: [
    "Use behavioral modeling",
    "Your module must be named 'johnson_counter'",
    "Inputs and outputs must be as specified in the description",
    "The counter should be synchronous"
  ],
  starterCode: `module johnson_counter(
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
      description: "Reset after reaching maximum value"
    }
  ],
  solution: `module johnson_counter(
  input clk,
  input reset,
  output reg [3:0] count
);
  always @(posedge clk) begin
    if (reset) begin
      count <= 4'b0000;
    end else begin
      count <= {count[2:0], count[3]};
    end
  end
endmodule`
}
]; 