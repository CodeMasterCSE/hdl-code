import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Code, BookOpen, Cpu, CircuitBoard, Calculator, Clock, Layers, Memory, TestTube, Wrench, Zap } from 'lucide-react';

const Learning = () => {
  const [activeTopic, setActiveTopic] = useState('basics');

  const topics = {
    basics: {
      title: 'Verilog HDL Basics',
      content: [
        {
          title: 'Introduction to Verilog',
          description: 'Verilog is a hardware description language used to model electronic systems. It is primarily used in the design and verification of digital circuits at the register-transfer level of abstraction.',
          code: `// Basic module structure
module example(
  input wire a,
  input wire b,
  output wire c
);
  // Module body
  assign c = a & b;
endmodule`
        },
        {
          title: 'Data Types',
          description: 'Verilog has several data types for modeling hardware. The most common are wire (for connections) and reg (for storage elements).',
          code: `// Data type examples
module data_types;
  wire a;          // Single bit wire
  wire [7:0] b;    // 8-bit bus
  reg c;           // Single bit register
  reg [3:0] d;     // 4-bit register
  integer e;       // 32-bit integer
  real f;          // Double precision real number
endmodule`
        },
        {
          title: 'Operators',
          description: 'Verilog provides various operators for arithmetic, logical, and bitwise operations.',
          code: `// Operator examples
module operators;
  wire [3:0] a = 4'b1010;
  wire [3:0] b = 4'b1100;
  
  wire [3:0] sum = a + b;        // Addition
  wire [3:0] diff = a - b;       // Subtraction
  wire [3:0] and_result = a & b; // Bitwise AND
  wire [3:0] or_result = a | b;  // Bitwise OR
  wire [3:0] xor_result = a ^ b; // Bitwise XOR
endmodule`
        },
        {
          title: 'Number Formats',
          description: 'Verilog supports various number formats including binary, decimal, hexadecimal, and octal.',
          code: `// Number format examples
module number_formats;
  // Binary numbers
  wire [3:0] binary = 4'b1010;    // 4-bit binary
  wire [7:0] binary_long = 8'b1010_1010;  // 8-bit binary with underscore
  
  // Decimal numbers
  wire [3:0] decimal = 4'd10;     // 4-bit decimal
  wire [7:0] decimal_long = 8'd170;  // 8-bit decimal
  
  // Hexadecimal numbers
  wire [3:0] hex = 4'hA;          // 4-bit hex
  wire [7:0] hex_long = 8'hAA;    // 8-bit hex
  
  // Octal numbers
  wire [3:0] octal = 4'o12;       // 4-bit octal
  wire [7:0] octal_long = 8'o252; // 8-bit octal
endmodule`
        }
      ]
    },
    combinational: {
      title: 'Combinational Logic',
      content: [
        {
          title: 'Basic Gates',
          description: 'Basic logic gates are the fundamental building blocks of digital circuits.',
          code: `// Basic gates implementation
module basic_gates(
  input wire a,
  input wire b,
  output wire and_out,
  output wire or_out,
  output wire not_out,
  output wire nand_out,
  output wire nor_out,
  output wire xor_out,
  output wire xnor_out
);
  assign and_out = a & b;     // AND gate
  assign or_out = a | b;      // OR gate
  assign not_out = ~a;        // NOT gate
  assign nand_out = ~(a & b); // NAND gate
  assign nor_out = ~(a | b);  // NOR gate
  assign xor_out = a ^ b;     // XOR gate
  assign xnor_out = ~(a ^ b); // XNOR gate
endmodule`
        },
        {
          title: 'Multiplexers',
          description: 'Multiplexers (MUX) are combinational circuits that select one of many inputs based on select signals.',
          code: `// 4-to-1 Multiplexer
module mux_4to1(
  input wire [3:0] data,
  input wire [1:0] sel,
  output wire out
);
  // Using case statement
  reg out_reg;
  always @(*) begin
    case (sel)
      2'b00: out_reg = data[0];
      2'b01: out_reg = data[1];
      2'b10: out_reg = data[2];
      2'b11: out_reg = data[3];
      default: out_reg = 1'b0;
    endcase
  end
  assign out = out_reg;
endmodule`
        },
        {
          title: 'Decoders',
          description: 'Decoders convert binary inputs into a one-hot output, where only one output is active at a time.',
          code: `// 2-to-4 Decoder
module decoder_2to4(
  input wire [1:0] in,
  input wire enable,
  output wire [3:0] out
);
  // Using case statement
  reg [3:0] out_reg;
  always @(*) begin
    if (!enable)
      out_reg = 4'b0000;
    else begin
      case (in)
        2'b00: out_reg = 4'b0001;
        2'b01: out_reg = 4'b0010;
        2'b10: out_reg = 4'b0100;
        2'b11: out_reg = 4'b1000;
        default: out_reg = 4'b0000;
      endcase
    end
  end
  assign out = out_reg;
endmodule`
        },
        {
          title: 'Arithmetic Circuits',
          description: 'Arithmetic circuits perform mathematical operations on binary numbers.',
          code: `// 4-bit Adder
module adder_4bit(
  input wire [3:0] a,
  input wire [3:0] b,
  input wire cin,
  output wire [3:0] sum,
  output wire cout
);
  wire [4:0] temp;
  assign temp = a + b + cin;
  assign sum = temp[3:0];
  assign cout = temp[4];
endmodule

// 4-bit Subtractor
module subtractor_4bit(
  input wire [3:0] a,
  input wire [3:0] b,
  input wire bin,
  output wire [3:0] diff,
  output wire bout
);
  wire [4:0] temp;
  assign temp = a - b - bin;
  assign diff = temp[3:0];
  assign bout = temp[4];
endmodule`
        }
      ]
    },
    sequential: {
      title: 'Sequential Logic',
      content: [
        {
          title: 'Flip-Flops',
          description: 'Flip-flops are basic storage elements in sequential circuits. The D flip-flop is the most common type.',
          code: `// D Flip-Flop
module d_ff(
  input wire clk,
  input wire rst,
  input wire d,
  output reg q
);
  always @(posedge clk or posedge rst) begin
    if (rst)
      q <= 1'b0;
    else
      q <= d;
  end
endmodule

// T Flip-Flop
module t_ff(
  input wire clk,
  input wire rst,
  input wire t,
  output reg q
);
  always @(posedge clk or posedge rst) begin
    if (rst)
      q <= 1'b0;
    else if (t)
      q <= ~q;
  end
endmodule

// JK Flip-Flop
module jk_ff(
  input wire clk,
  input wire rst,
  input wire j,
  input wire k,
  output reg q
);
  always @(posedge clk or posedge rst) begin
    if (rst)
      q <= 1'b0;
    else begin
      case ({j,k})
        2'b00: q <= q;     // Hold
        2'b01: q <= 1'b0;  // Reset
        2'b10: q <= 1'b1;  // Set
        2'b11: q <= ~q;    // Toggle
      endcase
    end
  end
endmodule`
        },
        {
          title: 'Counters',
          description: 'Counters are sequential circuits that count through a sequence of states.',
          code: `// 4-bit Counter
module counter_4bit(
  input wire clk,
  input wire rst,
  input wire en,
  output reg [3:0] count
);
  always @(posedge clk or posedge rst) begin
    if (rst)
      count <= 4'b0000;
    else if (en)
      count <= count + 1'b1;
  end
endmodule

// Modulo-N Counter
module mod_n_counter #(
  parameter N = 10
)(
  input wire clk,
  input wire rst,
  output reg [3:0] count
);
  always @(posedge clk or posedge rst) begin
    if (rst)
      count <= 4'b0000;
    else if (count == N-1)
      count <= 4'b0000;
    else
      count <= count + 1'b1;
  end
endmodule`
        },
        {
          title: 'Shift Registers',
          description: 'Shift registers are sequential circuits that shift data through a chain of flip-flops.',
          code: `// 4-bit Shift Register
module shift_reg(
  input wire clk,
  input wire rst,
  input wire in,
  output wire [3:0] out
);
  reg [3:0] data;
  
  always @(posedge clk or posedge rst) begin
    if (rst)
      data <= 4'b0000;
    else
      data <= {data[2:0], in};
  end
  
  assign out = data;
endmodule

// Universal Shift Register
module universal_shift_reg(
  input wire clk,
  input wire rst,
  input wire [1:0] mode,
  input wire [3:0] parallel_in,
  input wire serial_in,
  output reg [3:0] q
);
  // mode: 00-hold, 01-shift right, 10-shift left, 11-parallel load
  always @(posedge clk or posedge rst) begin
    if (rst)
      q <= 4'b0000;
    else begin
      case (mode)
        2'b00: q <= q;           // Hold
        2'b01: q <= {serial_in, q[3:1]};  // Shift right
        2'b10: q <= {q[2:0], serial_in};  // Shift left
        2'b11: q <= parallel_in;  // Parallel load
      endcase
    end
  end
endmodule`
        }
      ]
    },
    fsm: {
      title: 'Finite State Machines',
      content: [
        {
          title: 'Moore Machine',
          description: 'In a Moore machine, the outputs depend only on the current state.',
          code: `// Moore Machine Example
module moore_fsm(
  input wire clk,
  input wire rst,
  input wire x,
  output reg y
);
  // State definitions
  localparam S0 = 2'b00;
  localparam S1 = 2'b01;
  localparam S2 = 2'b10;
  
  reg [1:0] state, next_state;
  
  // State register
  always @(posedge clk or posedge rst) begin
    if (rst)
      state <= S0;
    else
      state <= next_state;
  end
  
  // Next state logic
  always @(*) begin
    case (state)
      S0: next_state = x ? S1 : S0;
      S1: next_state = x ? S2 : S0;
      S2: next_state = x ? S2 : S0;
      default: next_state = S0;
    endcase
  end
  
  // Output logic
  always @(*) begin
    case (state)
      S0: y = 1'b0;
      S1: y = 1'b0;
      S2: y = 1'b1;
      default: y = 1'b0;
    endcase
  end
endmodule`
        },
        {
          title: 'Mealy Machine',
          description: 'In a Mealy machine, the outputs depend on both the current state and inputs.',
          code: `// Mealy Machine Example
module mealy_fsm(
  input wire clk,
  input wire rst,
  input wire x,
  output reg y
);
  // State definitions
  localparam S0 = 1'b0;
  localparam S1 = 1'b1;
  
  reg state, next_state;
  
  // State register
  always @(posedge clk or posedge rst) begin
    if (rst)
      state <= S0;
    else
      state <= next_state;
  end
  
  // Next state and output logic
  always @(*) begin
    case (state)
      S0: begin
        next_state = x ? S1 : S0;
        y = x;
      end
      S1: begin
        next_state = x ? S1 : S0;
        y = ~x;
      end
      default: begin
        next_state = S0;
        y = 1'b0;
      end
    endcase
  end
endmodule`
        },
        {
          title: 'Traffic Light Controller',
          description: 'A practical example of a state machine controlling a traffic light system.',
          code: `// Traffic Light Controller
module traffic_light_controller(
  input wire clk,
  input wire rst,
  input wire sensor,
  output reg [2:0] main_light,  // RGB for main road
  output reg [2:0] side_light   // RGB for side road
);
  // State definitions
  localparam MAIN_GREEN = 3'b000;
  localparam MAIN_YELLOW = 3'b001;
  localparam SIDE_GREEN = 3'b010;
  localparam SIDE_YELLOW = 3'b011;
  
  reg [1:0] state, next_state;
  reg [3:0] timer;
  
  // State register
  always @(posedge clk or posedge rst) begin
    if (rst) begin
      state <= MAIN_GREEN;
      timer <= 4'd0;
    end else begin
      if (timer == 4'd0) begin
        state <= next_state;
        timer <= 4'd10;  // Reset timer
      end else
        timer <= timer - 1'b1;
    end
  end
  
  // Next state logic
  always @(*) begin
    case (state)
      MAIN_GREEN: next_state = sensor ? MAIN_YELLOW : MAIN_GREEN;
      MAIN_YELLOW: next_state = SIDE_GREEN;
      SIDE_GREEN: next_state = SIDE_YELLOW;
      SIDE_YELLOW: next_state = MAIN_GREEN;
      default: next_state = MAIN_GREEN;
    endcase
  end
  
  // Output logic
  always @(*) begin
    case (state)
      MAIN_GREEN: begin
        main_light = 3'b010;  // Green
        side_light = 3'b100;  // Red
      end
      MAIN_YELLOW: begin
        main_light = 3'b100;  // Yellow
        side_light = 3'b100;  // Red
      end
      SIDE_GREEN: begin
        main_light = 3'b100;  // Red
        side_light = 3'b010;  // Green
      end
      SIDE_YELLOW: begin
        main_light = 3'b100;  // Red
        side_light = 3'b100;  // Yellow
      end
      default: begin
        main_light = 3'b100;  // Red
        side_light = 3'b100;  // Red
      end
    endcase
  end
endmodule`
        }
      ]
    },
    memory: {
      title: 'Memory and Storage',
      content: [
        {
          title: 'RAM Implementation',
          description: 'Random Access Memory (RAM) implementation in Verilog with synchronous read and write operations.',
          code: `// Single Port RAM
module single_port_ram #(
  parameter DATA_WIDTH = 8,
  parameter ADDR_WIDTH = 4
)(
  input wire clk,
  input wire we,
  input wire [ADDR_WIDTH-1:0] addr,
  input wire [DATA_WIDTH-1:0] data_in,
  output reg [DATA_WIDTH-1:0] data_out
);
  // Memory array
  reg [DATA_WIDTH-1:0] mem [(1<<ADDR_WIDTH)-1:0];
  
  // Write operation
  always @(posedge clk) begin
    if (we)
      mem[addr] <= data_in;
  end
  
  // Read operation
  always @(posedge clk) begin
    data_out <= mem[addr];
  end
endmodule

// Dual Port RAM
module dual_port_ram #(
  parameter DATA_WIDTH = 8,
  parameter ADDR_WIDTH = 4
)(
  input wire clk,
  input wire we_a,
  input wire [ADDR_WIDTH-1:0] addr_a,
  input wire [DATA_WIDTH-1:0] data_in_a,
  output reg [DATA_WIDTH-1:0] data_out_a,
  input wire we_b,
  input wire [ADDR_WIDTH-1:0] addr_b,
  input wire [DATA_WIDTH-1:0] data_in_b,
  output reg [DATA_WIDTH-1:0] data_out_b
);
  // Memory array
  reg [DATA_WIDTH-1:0] mem [(1<<ADDR_WIDTH)-1:0];
  
  // Port A operations
  always @(posedge clk) begin
    if (we_a)
      mem[addr_a] <= data_in_a;
    data_out_a <= mem[addr_a];
  end
  
  // Port B operations
  always @(posedge clk) begin
    if (we_b)
      mem[addr_b] <= data_in_b;
    data_out_b <= mem[addr_b];
  end
endmodule`
        },
        {
          title: 'ROM Implementation',
          description: 'Read-Only Memory (ROM) implementation with pre-programmed data.',
          code: `// ROM with Pre-programmed Data
module rom #(
  parameter DATA_WIDTH = 8,
  parameter ADDR_WIDTH = 4
)(
  input wire [ADDR_WIDTH-1:0] addr,
  output reg [DATA_WIDTH-1:0] data_out
);
  // Pre-programmed data
  reg [DATA_WIDTH-1:0] mem [(1<<ADDR_WIDTH)-1:0];
  
  initial begin
    // Initialize ROM with some data
    mem[0] = 8'h00;
    mem[1] = 8'h01;
    mem[2] = 8'h02;
    mem[3] = 8'h03;
    // ... more initialization
  end
  
  // Read operation
  always @(*) begin
    data_out = mem[addr];
  end
endmodule`
        },
        {
          title: 'FIFO Buffer',
          description: 'First-In-First-Out (FIFO) buffer implementation with status flags.',
          code: `// FIFO Buffer
module fifo #(
  parameter DATA_WIDTH = 8,
  parameter ADDR_WIDTH = 4
)(
  input wire clk,
  input wire rst,
  input wire wr_en,
  input wire rd_en,
  input wire [DATA_WIDTH-1:0] data_in,
  output reg [DATA_WIDTH-1:0] data_out,
  output reg full,
  output reg empty,
  output reg [ADDR_WIDTH:0] count
);
  // Memory array
  reg [DATA_WIDTH-1:0] mem [(1<<ADDR_WIDTH)-1:0];
  reg [ADDR_WIDTH-1:0] wr_ptr, rd_ptr;
  
  // Write pointer
  always @(posedge clk or posedge rst) begin
    if (rst)
      wr_ptr <= 0;
    else if (wr_en && !full)
      wr_ptr <= wr_ptr + 1;
  end
  
  // Read pointer
  always @(posedge clk or posedge rst) begin
    if (rst)
      rd_ptr <= 0;
    else if (rd_en && !empty)
      rd_ptr <= rd_ptr + 1;
  end
  
  // Write operation
  always @(posedge clk) begin
    if (wr_en && !full)
      mem[wr_ptr] <= data_in;
  end
  
  // Read operation
  always @(posedge clk) begin
    if (rd_en && !empty)
      data_out <= mem[rd_ptr];
  end
  
  // Status flags
  always @(posedge clk or posedge rst) begin
    if (rst) begin
      count <= 0;
      full <= 0;
      empty <= 1;
    end else begin
      case ({wr_en, rd_en})
        2'b10: if (!full) count <= count + 1;
        2'b01: if (!empty) count <= count - 1;
        default: count <= count;
      endcase
      full <= (count == (1<<ADDR_WIDTH));
      empty <= (count == 0);
    end
  end
endmodule`
        }
      ]
    },
    testbench: {
      title: 'Testbenches and Verification',
      content: [
        {
          title: 'Basic Testbench Structure',
          description: 'Basic testbench structure with clock generation and stimulus application.',
          code: `// Testbench for a D Flip-Flop
module d_ff_tb;
  // Testbench signals
  reg clk, rst, d;
  wire q;
  
  // Instantiate the DUT
  d_ff dut (
    .clk(clk),
    .rst(rst),
    .d(d),
    .q(q)
  );
  
  // Clock generation
  initial begin
    clk = 0;
    forever #5 clk = ~clk;
  end
  
  // Test stimulus
  initial begin
    // Initialize
    rst = 1;
    d = 0;
    
    // Reset
    #20;
    rst = 0;
    
    // Test cases
    #10 d = 1;
    #10 d = 0;
    #10 d = 1;
    
    // End simulation
    #20 $finish;
  end
  
  // Monitor
  initial begin
    $monitor("Time=%0t rst=%b d=%b q=%b", $time, rst, d, q);
  end
endmodule`
        },
        {
          title: 'Self-Checking Testbench',
          description: 'Self-checking testbench with automatic verification of results.',
          code: `// Self-checking testbench for an adder
module adder_tb;
  // Testbench signals
  reg [3:0] a, b;
  reg cin;
  wire [3:0] sum;
  wire cout;
  
  // Expected results
  reg [4:0] expected;
  
  // Instantiate the DUT
  adder_4bit dut (
    .a(a),
    .b(b),
    .cin(cin),
    .sum(sum),
    .cout(cout)
  );
  
  // Test stimulus and checking
  initial begin
    // Test case 1
    a = 4'b0001;
    b = 4'b0010;
    cin = 0;
    expected = 5'b00011;
    #10;
    check_result();
    
    // Test case 2
    a = 4'b1111;
    b = 4'b0001;
    cin = 0;
    expected = 5'b10000;
    #10;
    check_result();
    
    // More test cases...
    
    $finish;
  end
  
  // Result checking task
  task check_result;
    if ({cout, sum} !== expected)
      $display("Error: Time=%0t a=%b b=%b cin=%b sum=%b cout=%b expected=%b",
               $time, a, b, cin, sum, cout, expected);
    else
      $display("Pass: Time=%0t a=%b b=%b cin=%b sum=%b cout=%b",
               $time, a, b, cin, sum, cout);
  endtask
endmodule`
        },
        {
          title: 'Random Testing',
          description: 'Testbench with random stimulus generation for comprehensive testing.',
          code: `// Random testing for a multiplier
module multiplier_tb;
  // Testbench signals
  reg [3:0] a, b;
  wire [7:0] product;
  
  // Instantiate the DUT
  multiplier_4bit dut (
    .a(a),
    .b(b),
    .product(product)
  );
  
  // Random testing
  initial begin
    // Seed the random number generator
    $random(123);
    
    // Run 100 random tests
    repeat (100) begin
      // Generate random inputs
      a = $random;
      b = $random;
      
      // Wait for combinational logic to settle
      #1;
      
      // Check result
      if (product !== a * b)
        $display("Error: Time=%0t a=%d b=%d product=%d expected=%d",
                 $time, a, b, product, a * b);
      else
        $display("Pass: Time=%0t a=%d b=%d product=%d",
                 $time, a, b, product);
      
      // Wait between tests
      #9;
    end
    
    $finish;
  end
endmodule`
        }
      ]
    },
    synthesis: {
      title: 'Synthesis and Optimization',
      content: [
        {
          title: 'Synthesis Guidelines',
          description: 'Best practices for writing synthesizable Verilog code.',
          code: `// Example of synthesis-friendly code
module synthesis_example(
  input wire clk,
  input wire rst,
  input wire [3:0] data_in,
  output reg [3:0] data_out
);
  // Use non-blocking assignments in sequential logic
  always @(posedge clk or posedge rst) begin
    if (rst)
      data_out <= 4'b0000;
    else
      data_out <= data_in;
  end
  
  // Use blocking assignments in combinational logic
  always @(*) begin
    // Combinational logic here
  end
  
  // Avoid latches by providing default assignments
  always @(*) begin
    case (data_in)
      4'b0000: data_out = 4'b0001;
      4'b0001: data_out = 4'b0010;
      default: data_out = 4'b0000;  // Default case
    endcase
  end
endmodule`
        },
        {
          title: 'Resource Optimization',
          description: 'Techniques for optimizing resource usage in synthesized designs.',
          code: `// Resource-optimized multiplier
module optimized_multiplier(
  input wire [3:0] a,
  input wire [3:0] b,
  output wire [7:0] product
);
  // Use shift and add method instead of direct multiplication
  wire [7:0] shifted_a;
  wire [7:0] shifted_b;
  wire [7:0] shifted_c;
  wire [7:0] shifted_d;
  
  assign shifted_a = {4'b0000, a};
  assign shifted_b = {3'b000, a, 1'b0};
  assign shifted_c = {2'b00, a, 2'b00};
  assign shifted_d = {1'b0, a, 3'b000};
  
  assign product = (b[0] ? shifted_a : 8'b0) +
                  (b[1] ? shifted_b : 8'b0) +
                  (b[2] ? shifted_c : 8'b0) +
                  (b[3] ? shifted_d : 8'b0);
endmodule`
        },
        {
          title: 'Timing Optimization',
          description: 'Techniques for improving timing performance in synthesized designs.',
          code: `// Timing-optimized adder with pipelining
module pipelined_adder(
  input wire clk,
  input wire rst,
  input wire [7:0] a,
  input wire [7:0] b,
  output reg [8:0] sum
);
  // Pipeline registers
  reg [3:0] a_low, b_low;
  reg [3:0] a_high, b_high;
  reg [4:0] sum_low;
  
  // First pipeline stage: Split operands
  always @(posedge clk or posedge rst) begin
    if (rst) begin
      a_low <= 0;
      b_low <= 0;
      a_high <= 0;
      b_high <= 0;
    end else begin
      a_low <= a[3:0];
      b_low <= b[3:0];
      a_high <= a[7:4];
      b_high <= b[7:4];
    end
  end
  
  // Second pipeline stage: Add lower bits
  always @(posedge clk or posedge rst) begin
    if (rst)
      sum_low <= 0;
    else
      sum_low <= a_low + b_low;
  end
  
  // Third pipeline stage: Add upper bits with carry
  always @(posedge clk or posedge rst) begin
    if (rst)
      sum <= 0;
    else
      sum <= {a_high + b_high + sum_low[4], sum_low[3:0]};
  end
endmodule`
        }
      ]
    }
  };

  const currentTopic = topics[activeTopic as keyof typeof topics];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Verilog HDL Learning</h1>
        
        <Tabs defaultValue="basics" onValueChange={setActiveTopic}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="combinational">Combinational</TabsTrigger>
            <TabsTrigger value="sequential">Sequential</TabsTrigger>
            <TabsTrigger value="fsm">FSMs</TabsTrigger>
            <TabsTrigger value="memory">Memory</TabsTrigger>
            <TabsTrigger value="testbench">Testbenches</TabsTrigger>
            <TabsTrigger value="synthesis">Synthesis</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTopic} className="mt-6">
            <div className="space-y-8">
              {currentTopic.content.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{section.description}</p>
                    <div className="relative">
                      <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
                        <code className="text-sm font-mono">{section.code}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => navigator.clipboard.writeText(section.code)}
                      >
                        <Code className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learning; 