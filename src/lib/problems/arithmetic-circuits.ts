
import { Problem } from '../types/problem';

export const arithmeticCircuitsProblems: Problem[] = [
  {
    id: "ac-full-subtractor",
    title: "Full Subtractor",
    difficulty: "easy",
    category: "Arithmetic Circuits",
    description: `
Design a full subtractor circuit using Verilog.

A full subtractor is a combinational logic circuit that performs subtraction of three bits: minuend, subtrahend, and borrow-in. It produces two outputs: difference and borrow-out.

For this problem, implement a full subtractor with the following specifications:
- Three inputs (a, b, and bin)
- Two outputs (diff and bout)

The difference (diff) is calculated as a XOR b XOR bin.
The borrow-out (bout) is calculated as (!a AND b) OR (!a AND bin) OR (b AND bin).

Truth Table:
| a | b | bin | diff | bout |
|---|---|-----|------|------|
| 0 | 0 | 0   | 0    | 0    |
| 0 | 0 | 1   | 1    | 1    |
| 0 | 1 | 0   | 1    | 1    |
| 0 | 1 | 1   | 0    | 1    |
| 1 | 0 | 0   | 1    | 0    |
| 1 | 0 | 1   | 0    | 0    |
| 1 | 1 | 0   | 0    | 0    |
| 1 | 1 | 1   | 1    | 1    |
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'full_subtractor'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module full_subtractor(
  input a,
  input b,
  input bin,
  output diff,
  output bout
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0", bin: "0" },
        outputs: { diff: "0", bout: "0" },
        description: "If a=0, b=0, bin=0, then diff=0, bout=0"
      },
      {
        inputs: { a: "0", b: "0", bin: "1" },
        outputs: { diff: "1", bout: "1" },
        description: "If a=0, b=0, bin=1, then diff=1, bout=1"
      },
      {
        inputs: { a: "0", b: "1", bin: "0" },
        outputs: { diff: "1", bout: "1" },
        description: "If a=0, b=1, bin=0, then diff=1, bout=1"
      },
      {
        inputs: { a: "0", b: "1", bin: "1" },
        outputs: { diff: "0", bout: "1" },
        description: "If a=0, b=1, bin=1, then diff=0, bout=1"
      },
      {
        inputs: { a: "1", b: "0", bin: "0" },
        outputs: { diff: "1", bout: "0" },
        description: "If a=1, b=0, bin=0, then diff=1, bout=0"
      },
      {
        inputs: { a: "1", b: "0", bin: "1" },
        outputs: { diff: "0", bout: "0" },
        description: "If a=1, b=0, bin=1, then diff=0, bout=0"
      },
      {
        inputs: { a: "1", b: "1", bin: "0" },
        outputs: { diff: "0", bout: "0" },
        description: "If a=1, b=1, bin=0, then diff=0, bout=0"
      },
      {
        inputs: { a: "1", b: "1", bin: "1" },
        outputs: { diff: "1", bout: "1" },
        description: "If a=1, b=1, bin=1, then diff=1, bout=1"
      }
    ],
    solution: `module full_subtractor(
  input a,
  input b,
  input bin,
  output reg diff,
  output reg bout
);
  always @(a or b or bin) begin
    diff = a ^ b ^ bin;
    bout = (~a & b) | (~a & bin) | (b & bin);
  end
endmodule`
  },
  {
    id: "ac-ripple-carry-adder",
    title: "4-bit Ripple Carry Adder",
    difficulty: "medium",
    category: "Arithmetic Circuits",
    description: `
Design a 4-bit ripple carry adder using Verilog.

A ripple carry adder is a digital circuit that performs addition of binary numbers. It consists of multiple full adders connected in cascade, where the carry output from each full adder is connected to the carry input of the next full adder.

For this problem, implement a 4-bit ripple carry adder with the following specifications:
- Two 4-bit inputs (a[3:0] and b[3:0])
- One carry input (cin)
- One 4-bit sum output (sum[3:0])
- One carry output (cout)

You may choose to implement the full adder as a separate module or include it directly in your ripple carry adder implementation.
    `,
    constraints: [
      "Use behavioral or structural modeling",
      "Your module must be named 'ripple_carry_adder_4bit'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module ripple_carry_adder_4bit(
  input [3:0] a,
  input [3:0] b,
  input cin,
  output [3:0] sum,
  output cout
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0000", b: "0000", cin: "0" },
        outputs: { sum: "0000", cout: "0" },
        description: "0 + 0 = 0"
      },
      {
        inputs: { a: "1111", b: "0001", cin: "0" },
        outputs: { sum: "0000", cout: "1" },
        description: "15 + 1 = 16 (overflow)"
      },
      {
        inputs: { a: "0101", b: "0011", cin: "0" },
        outputs: { sum: "1000", cout: "0" },
        description: "5 + 3 = 8"
      },
      {
        inputs: { a: "1010", b: "0101", cin: "0" },
        outputs: { sum: "1111", cout: "0" },
        description: "10 + 5 = 15"
      },
      {
        inputs: { a: "1111", b: "1111", cin: "0" },
        outputs: { sum: "1110", cout: "1" },
        description: "15 + 15 = 30 (overflow)"
      },
      {
        inputs: { a: "0111", b: "0001", cin: "1" },
        outputs: { sum: "1001", cout: "0" },
        description: "7 + 1 + 1 = 9"
      }
    ],
    solution: `module ripple_carry_adder_4bit(
  input [3:0] a,
  input [3:0] b,
  input cin,
  output [3:0] sum,
  output cout
);
  wire c1, c2, c3; // Internal carry wires
  
  // Instantiate four full adders
  full_adder fa0(
    .a(a[0]),
    .b(b[0]),
    .cin(cin),
    .sum(sum[0]),
    .cout(c1)
  );
  
  full_adder fa1(
    .a(a[1]),
    .b(b[1]),
    .cin(c1),
    .sum(sum[1]),
    .cout(c2)
  );
  
  full_adder fa2(
    .a(a[2]),
    .b(b[2]),
    .cin(c2),
    .sum(sum[2]),
    .cout(c3)
  );
  
  full_adder fa3(
    .a(a[3]),
    .b(b[3]),
    .cin(c3),
    .sum(sum[3]),
    .cout(cout)
  );
endmodule

// Full adder module
module full_adder(
  input a,
  input b,
  input cin,
  output sum,
  output cout
);
  assign sum = a ^ b ^ cin;
  assign cout = (a & b) | (cin & (a ^ b));
endmodule`
  },
  {
    id: "ac-adder-subtractor",
    title: "4-bit Binary Adder/Subtractor",
    difficulty: "medium",
    category: "Arithmetic Circuits",
    description: `
Design a 4-bit binary adder/subtractor circuit using Verilog.

An adder/subtractor is a combinational logic circuit that can perform both addition and subtraction operations based on a control signal. When the control signal is 0, it performs addition; when the control signal is 1, it performs subtraction.

For this problem, implement a 4-bit adder/subtractor with the following specifications:
- Two 4-bit inputs (a[3:0] and b[3:0])
- One control input (sub) - 0 for addition, 1 for subtraction
- One 4-bit result output (result[3:0])
- One overflow output (overflow)

The subtraction should be implemented using 2's complement: A - B = A + (~B + 1)
    `,
    constraints: [
      "Use behavioral or structural modeling",
      "Your module must be named 'adder_subtractor_4bit'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module adder_subtractor_4bit(
  input [3:0] a,
  input [3:0] b,
  input sub,
  output [3:0] result,
  output overflow
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0101", b: "0011", sub: "0" },
        outputs: { result: "1000", overflow: "0" },
        description: "Addition: 5 + 3 = 8"
      },
      {
        inputs: { a: "0101", b: "0011", sub: "1" },
        outputs: { result: "0010", overflow: "0" },
        description: "Subtraction: 5 - 3 = 2"
      },
      {
        inputs: { a: "0011", b: "0101", sub: "1" },
        outputs: { result: "1110", overflow: "0" },
        description: "Subtraction: 3 - 5 = -2 (in 2's complement)"
      },
      {
        inputs: { a: "1111", b: "0001", sub: "0" },
        outputs: { result: "0000", overflow: "1" },
        description: "Addition with overflow: 15 + 1 = 16"
      },
      {
        inputs: { a: "1000", b: "0001", sub: "1" },
        outputs: { result: "0111", overflow: "1" },
        description: "Subtraction with overflow: -8 - 1 = -9 (out of 4-bit range)"
      }
    ],
    solution: `module adder_subtractor_4bit(
  input [3:0] a,
  input [3:0] b,
  input sub,
  output reg [3:0] result,
  output reg overflow
);
  always @(*) begin
    if (sub == 0) begin
      // Addition
      {overflow, result} = a + b;
    end else begin
      // Subtraction using 2's complement
      {overflow, result} = a + (~b + 1);
      // Adjust overflow for subtraction
      overflow = (a[3] != b[3]) && (result[3] != a[3]);
    end
  end
endmodule`
  }
];
