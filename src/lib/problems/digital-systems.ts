
import { Problem } from '../types/problem';

export const digitalSystemsProblems: Problem[] = [
  {
    id: "ds-traffic-light",
    title: "Traffic Light Controller",
    difficulty: "hard",
    category: "Digital Systems",
    description: `
Design a traffic light controller for a simple intersection using Verilog.

Your traffic light controller should control the lights for a two-way intersection (North-South and East-West). 
Each direction has three lights: Red, Yellow, and Green.

The controller should follow this sequence:
1. North-South Green (East-West Red) for 30 seconds
2. North-South Yellow (East-West Red) for 5 seconds
3. North-South Red (East-West Green) for 30 seconds
4. North-South Red (East-West Yellow) for 5 seconds
5. Repeat from step 1

For this assignment, use a clock with a 1 second period and implement a simplified timing system where:
- 1 clock cycle = 1 second
- NS Green / EW Red: 3 cycles (simulating 30 seconds)
- NS Yellow / EW Red: 1 cycle (simulating 5 seconds)
- NS Red / EW Green: 3 cycles (simulating 30 seconds)
- NS Red / EW Yellow: 1 cycle (simulating 5 seconds)

Your module should have the following interface:
\`\`\`
module traffic_light_controller(
  input clk,
  input reset,
  output reg [2:0] ns_lights, // [2]=Red, [1]=Yellow, [0]=Green
  output reg [2:0] ew_lights  // [2]=Red, [1]=Yellow, [0]=Green
);
\`\`\`
    `,
    constraints: [
      "Use a finite state machine (FSM) design approach",
      "Your module must be named 'traffic_light_controller'",
      "Inputs and outputs must be as specified in the description",
      "The controller must operate on the positive edge of the clock",
      "The reset must be synchronous and return to the NS Green / EW Red state"
    ],
    starterCode: `module traffic_light_controller(
  input clk,
  input reset,
  output reg [2:0] ns_lights, // [2]=Red, [1]=Yellow, [0]=Green
  output reg [2:0] ew_lights  // [2]=Red, [1]=Yellow, [0]=Green
);
  // Define states and counters
  
  // Your FSM code here

endmodule`,
    testCases: [
      {
        inputs: { clk: "0→1", reset: "1" },
        outputs: { ns_lights: "xxx→001", ew_lights: "xxx→100" },
        description: "Reset to NS Green / EW Red state"
      },
      {
        inputs: { clk: "cycle 3 times", reset: "0" },
        outputs: { ns_lights: "001→001→001→010", ew_lights: "100→100→100→100" },
        description: "NS Green for 3 cycles then change to NS Yellow"
      },
      {
        inputs: { clk: "cycle 1 time from NS Yellow", reset: "0" },
        outputs: { ns_lights: "010→100", ew_lights: "100→001" },
        description: "NS Yellow for 1 cycle then change to NS Red / EW Green"
      },
      {
        inputs: { clk: "cycle 3 times from NS Red / EW Green", reset: "0" },
        outputs: { ns_lights: "100→100→100→100", ew_lights: "001→001→001→010" },
        description: "EW Green for 3 cycles then change to EW Yellow"
      },
      {
        inputs: { clk: "cycle 1 time from NS Red / EW Yellow", reset: "0" },
        outputs: { ns_lights: "100→001", ew_lights: "010→100" },
        description: "EW Yellow for 1 cycle then change back to NS Green / EW Red"
      }
    ],
    solution: `module traffic_light_controller(
  input clk,
  input reset,
  output reg [2:0] ns_lights, // [2]=Red, [1]=Yellow, [0]=Green
  output reg [2:0] ew_lights  // [2]=Red, [1]=Yellow, [0]=Green
);
  // Define states
  parameter NS_GREEN = 2'b00;
  parameter NS_YELLOW = 2'b01;
  parameter EW_GREEN = 2'b10;
  parameter EW_YELLOW = 2'b11;
  
  reg [1:0] state;
  reg [1:0] count;
  
  // State and output logic
  always @(posedge clk) begin
    if (reset) begin
      state <= NS_GREEN;
      count <= 0;
      ns_lights <= 3'b001; // Green
      ew_lights <= 3'b100; // Red
    end else begin
      case(state)
        NS_GREEN: begin
          ns_lights <= 3'b001; // Green
          ew_lights <= 3'b100; // Red
          if (count == 2) begin // After 3 cycles
            state <= NS_YELLOW;
            count <= 0;
          end else begin
            count <= count + 1;
          end
        end
        
        NS_YELLOW: begin
          ns_lights <= 3'b010; // Yellow
          ew_lights <= 3'b100; // Red
          state <= EW_GREEN;  // After 1 cycle
          count <= 0;
        end
        
        EW_GREEN: begin
          ns_lights <= 3'b100; // Red
          ew_lights <= 3'b001; // Green
          if (count == 2) begin // After 3 cycles
            state <= EW_YELLOW;
            count <= 0;
          end else begin
            count <= count + 1;
          end
        end
        
        EW_YELLOW: begin
          ns_lights <= 3'b100; // Red
          ew_lights <= 3'b010; // Yellow
          state <= NS_GREEN;  // After 1 cycle
          count <= 0;
        end
        
        default: begin
          state <= NS_GREEN;
          count <= 0;
          ns_lights <= 3'b001; // Green
          ew_lights <= 3'b100; // Red
        end
      endcase
    end
  end
endmodule`
  },
  {
    id: "ds-7segment",
    title: "7-Segment Display Decoder",
    difficulty: "medium",
    category: "Digital Systems",
    description: `
Design a 7-segment display decoder to convert a 4-bit binary input (representing values 0-9) to the appropriate outputs for a 7-segment display.

A 7-segment display consists of seven LEDs arranged in the shape of an "8". Each segment is labeled from 'a' to 'g'.

Segments:
    a
   ---
 f|   |b
  | g |
   ---
 e|   |c
  |   |
   ---
    d

For this problem, implement a 7-segment display decoder with the following specifications:
- One 4-bit input (bcd[3:0]) representing a BCD digit (0-9)
- One 7-bit output (segments[6:0]) where segments[6]=a, segments[5]=b, ..., segments[0]=g
- The output should be active-low (0 = segment ON, 1 = segment OFF)
    `,
    constraints: [
      "Use either behavioral or combinational modeling",
      "Your module must be named 'seven_segment_decoder'",
      "Inputs and outputs must be as specified in the description",
      "Values 10-15 on the input should turn all segments off"
    ],
    starterCode: `module seven_segment_decoder(
  input [3:0] bcd,
  output [6:0] segments
);
  // Your code here
  // segments[6] = a, segments[5] = b, ..., segments[0] = g

endmodule`,
    testCases: [
      {
        inputs: { bcd: "0000" },
        outputs: { segments: "0000001" },
        description: "0 displays as 0 (all segments except g)"
      },
      {
        inputs: { bcd: "0001" },
        outputs: { segments: "1001111" },
        description: "1 displays as 1 (segments b and c)"
      },
      {
        inputs: { bcd: "0010" },
        outputs: { segments: "0010010" },
        description: "2 displays as 2 (segments a, b, d, e, g)"
      },
      {
        inputs: { bcd: "0111" },
        outputs: { segments: "1001111" },
        description: "7 displays as 7 (segments a, b, c)"
      },
      {
        inputs: { bcd: "1001" },
        outputs: { segments: "0001100" },
        description: "9 displays as 9 (segments a, b, c, f, g)"
      },
      {
        inputs: { bcd: "1010" },
        outputs: { segments: "1111111" },
        description: "Values 10-15 display nothing (all segments off)"
      }
    ],
    solution: `module seven_segment_decoder(
  input [3:0] bcd,
  output reg [6:0] segments
);
  // segments[6:0] = {a,b,c,d,e,f,g}
  always @(bcd) begin
    case(bcd)
      4'd0: segments = 7'b0000001; // 0
      4'd1: segments = 7'b1001111; // 1
      4'd2: segments = 7'b0010010; // 2
      4'd3: segments = 7'b0000110; // 3
      4'd4: segments = 7'b1001100; // 4
      4'd5: segments = 7'b0100100; // 5
      4'd6: segments = 7'b0100000; // 6
      4'd7: segments = 7'b0001111; // 7
      4'd8: segments = 7'b0000000; // 8
      4'd9: segments = 7'b0001100; // 9
      default: segments = 7'b1111111; // All segments off
    endcase
  end
endmodule`
  }
];
