import { Problem } from '../../types/problem';

export const adderProblems: Problem[] = [
  {
    id: "p009",
    title: "Half Adder",
    difficulty: "easy",
    category: "Combinational Circuits",
    points: 10,
    description: `
Design a half adder circuit using Verilog.

A half adder is a combinational logic circuit that adds two bits and produces a sum and a carry output.

For this problem, implement a half adder with the following specifications:
- Two inputs (a and b)
- Two outputs (sum and carry)

The sum output should be the XOR of a and b.
The carry output should be the AND of a and b.
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'half_adder'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module half_adder(
  input a,
  input b,
  output sum,
  output carry
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { sum: "0", carry: "0" },
        description: "If a=0, b=0, then sum=0, carry=0"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { sum: "1", carry: "0" },
        description: "If a=0, b=1, then sum=1, carry=0"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { sum: "1", carry: "0" },
        description: "If a=1, b=0, then sum=1, carry=0"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { sum: "0", carry: "1" },
        description: "If a=1, b=1, then sum=0, carry=1"
      }
    ],
    solution: `module half_adder(
  input a,
  input b,
  output reg sum,
  output reg carry
);
  always @(a or b) begin
    sum = a ^ b;    // XOR operation
    carry = a & b;  // AND operation
  end
endmodule`
  },
  {
    id: "p010",
    title: "Full Adder",
    difficulty: "easy",
    category: "Combinational Circuits",
    points: 10,
    description: `
Design a full adder circuit using Verilog.

A full adder is a combinational logic circuit that adds three inputs (two bits and a carry in) and produces a sum and a carry output.

For this problem, implement a full adder with the following specifications:
- Three inputs (a, b, and cin)
- Two outputs (sum and cout)

The sum output should be a XOR b XOR cin.
The carry output (cout) should be (a AND b) OR (cin AND (a XOR b)).
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'full_adder'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module full_adder(
  input a,
  input b,
  input cin,
  output sum,
  output cout
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0", cin: "0" },
        outputs: { sum: "0", cout: "0" },
        description: "If a=0, b=0, cin=0, then sum=0, cout=0"
      },
      {
        inputs: { a: "0", b: "0", cin: "1" },
        outputs: { sum: "1", cout: "0" },
        description: "If a=0, b=0, cin=1, then sum=1, cout=0"
      },
      {
        inputs: { a: "0", b: "1", cin: "0" },
        outputs: { sum: "1", cout: "0" },
        description: "If a=0, b=1, cin=0, then sum=1, cout=0"
      },
      {
        inputs: { a: "0", b: "1", cin: "1" },
        outputs: { sum: "0", cout: "1" },
        description: "If a=0, b=1, cin=1, then sum=0, cout=1"
      },
      {
        inputs: { a: "1", b: "0", cin: "0" },
        outputs: { sum: "1", cout: "0" },
        description: "If a=1, b=0, cin=0, then sum=1, cout=0"
      },
      {
        inputs: { a: "1", b: "0", cin: "1" },
        outputs: { sum: "0", cout: "1" },
        description: "If a=1, b=0, cin=1, then sum=0, cout=1"
      },
      {
        inputs: { a: "1", b: "1", cin: "0" },
        outputs: { sum: "0", cout: "1" },
        description: "If a=1, b=1, cin=0, then sum=0, cout=1"
      },
      {
        inputs: { a: "1", b: "1", cin: "1" },
        outputs: { sum: "1", cout: "1" },
        description: "If a=1, b=1, cin=1, then sum=1, cout=1"
      }
    ],
    solution: `module full_adder(
  input a,
  input b,
  input cin,
  output reg sum,
  output reg cout
);
  always @(a or b or cin) begin
    sum = a ^ b ^ cin;
    cout = (a & b) | (cin & (a ^ b));
  end
endmodule`
  }
];
