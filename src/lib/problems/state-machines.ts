import { Problem } from '../types/problem';

export const stateMachineProblems: Problem[] = [
  {
    id: "p034",
    title: "Sequence Detector (101)",
    difficulty: "hard",
    category: "State Machines",
    points: 30,
    description: `
Design a sequence detector that detects the sequence "101" using Verilog.

The detector should:
- Detect the sequence "101" in a stream of bits
- Output 1 when the sequence is detected
- Output 0 otherwise
- Reset to initial state when reset signal is high
- Have a synchronous reset

Implement the sequence detector with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One data input (data_in)
- One output (detected)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'sequence_detector'",
      "Inputs and outputs must be as specified in the description",
      "The detector should be synchronous"
    ],
    starterCode: `module sequence_detector(
  input clk,
  input reset,
  input data_in,
  output reg detected
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1", data_in: "0" },
        outputs: { detected: "0" },
        description: "Reset detector"
      },
      {
        inputs: { clk: "1", reset: "0", data_in: "1" },
        outputs: { detected: "0" },
        description: "First bit of sequence"
      },
      {
        inputs: { clk: "1", reset: "0", data_in: "0" },
        outputs: { detected: "0" },
        description: "Second bit of sequence"
      },
      {
        inputs: { clk: "1", reset: "0", data_in: "1" },
        outputs: { detected: "1" },
        description: "Sequence detected"
      }
    ],
    solution: `module sequence_detector(
  input clk,
  input reset,
  input data_in,
  output reg detected
);
  reg [1:0] state;
  reg [1:0] next_state;
  
  parameter S0 = 2'b00;  // Initial state
  parameter S1 = 2'b01;  // Received 1
  parameter S2 = 2'b10;  // Received 10
  
  always @(posedge clk) begin
    if (reset) begin
      state <= S0;
      detected <= 0;
    end else begin
      state <= next_state;
      detected <= (state == S2 && data_in == 1);
    end
  end
  
  always @(*) begin
    case(state)
      S0: next_state = data_in ? S1 : S0;
      S1: next_state = data_in ? S1 : S2;
      S2: next_state = data_in ? S1 : S0;
      default: next_state = S0;
    endcase
  end
endmodule`
  },
  {
    id: "p035",
    title: "Traffic Light Controller",
    difficulty: "hard",
    category: "State Machines",
    points: 30,
    description: `
Design a simple traffic light controller using Verilog.

The controller should:
- Cycle through three states: Red, Yellow, Green
- Stay in each state for a specific number of clock cycles
- Have a synchronous reset
- Output the current state using three signals

Implement the controller with the following specifications:
- One clock input (clk)
- One reset input (reset)
- Three outputs (red, yellow, green)
- Stay in each state for 4 clock cycles
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'traffic_light'",
      "Inputs and outputs must be as specified in the description",
      "The controller should be synchronous"
    ],
    starterCode: `module traffic_light(
  input clk,
  input reset,
  output reg red,
  output reg yellow,
  output reg green
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1" },
        outputs: { red: "1", yellow: "0", green: "0" },
        description: "Reset to red state"
      },
      {
        inputs: { clk: "1", reset: "0" },
        outputs: { red: "1", yellow: "0", green: "0" },
        description: "Stay in red state"
      }
    ],
    solution: `module traffic_light(
  input clk,
  input reset,
  output reg red,
  output reg yellow,
  output reg green
);
  reg [1:0] state;
  reg [2:0] count;
  
  parameter RED = 2'b00;
  parameter YELLOW = 2'b01;
  parameter GREEN = 2'b10;
  
  always @(posedge clk) begin
    if (reset) begin
      state <= RED;
      count <= 0;
    end else begin
      if (count == 3) begin
        count <= 0;
        case(state)
          RED: state <= GREEN;
          YELLOW: state <= RED;
          GREEN: state <= YELLOW;
          default: state <= RED;
        endcase
      end else begin
        count <= count + 1;
      end
    end
  end
  
  always @(*) begin
    red = (state == RED);
    yellow = (state == YELLOW);
    green = (state == GREEN);
  end
endmodule`
  },
  {
    id: "p036",
    title: "Moore FSM – Even Parity Detector",
    difficulty: "hard",
    category: "State Machines",
    points: 30,
    description: `
Design a Moore Finite State Machine (FSM) to detect even parity in a stream of bits.

The detector should:
- Detect even parity in a stream of bits
- Output 1 when even parity is detected
- Output 0 otherwise
- Reset to initial state when reset signal is high
- Have a synchronous reset

Implement the even parity detector with the following specifications:
- One clock input (clk)
- One reset input (reset)
- One data input (data_in)
- One output (parity_detected)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'even_parity_detector'",
      "Inputs and outputs must be as specified in the description",
      "The detector should be synchronous"
    ],
    starterCode: `module even_parity_detector(
  input clk,
  input reset,
  input data_in,
  output reg parity_detected
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "1", reset: "1", data_in: "0" },
        outputs: { parity_detected: "1" },
        description: "Reset detector to even parity"
      },
      {
        inputs: { clk: "1", reset: "0", data_in: "1" },
        outputs: { parity_detected: "0" },
        description: "First bit of sequence, odd parity"
      },
      {
        inputs: { clk: "1", reset: "0", data_in: "1" },
        outputs: { parity_detected: "1" },
        description: "Second bit of sequence, even parity"
      },
    ]
  }
]; 