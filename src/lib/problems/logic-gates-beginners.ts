
import { Problem } from '../types/problem';

export const logicGatesBeginnersProblems: Problem[] = [
  {
    id: "lg-and",
    title: "AND Gate",
    difficulty: "easy",
    category: "Logic Gates",
    description: `
Design a 2-input AND gate using Verilog.

An AND gate is a basic digital logic gate that implements logical conjunction. It outputs 1 (true) only when all of its inputs are 1 (true).

For this problem, implement a 2-input AND gate with the following specifications:
- Two inputs (a and b)
- One output (y)

Truth Table:
| a | b | y |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'and_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module and_gate(
  input a,
  input b,
  output y
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { y: "0" },
        description: "If a=0, b=0, then y=0"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { y: "0" },
        description: "If a=0, b=1, then y=0"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { y: "0" },
        description: "If a=1, b=0, then y=0"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { y: "1" },
        description: "If a=1, b=1, then y=1"
      }
    ],
    solution: `module and_gate(
  input a,
  input b,
  output reg y
);
  always @(a or b) begin
    y = a & b;
  end
endmodule`
  },
  {
    id: "lg-or",
    title: "OR Gate",
    difficulty: "easy",
    category: "Logic Gates",
    description: `
Design a 2-input OR gate using Verilog.

An OR gate is a basic digital logic gate that implements logical disjunction. It outputs 1 (true) when at least one of its inputs is 1 (true).

For this problem, implement a 2-input OR gate with the following specifications:
- Two inputs (a and b)
- One output (y)

Truth Table:
| a | b | y |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'or_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module or_gate(
  input a,
  input b,
  output y
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { y: "0" },
        description: "If a=0, b=0, then y=0"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { y: "1" },
        description: "If a=0, b=1, then y=1"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { y: "1" },
        description: "If a=1, b=0, then y=1"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { y: "1" },
        description: "If a=1, b=1, then y=1"
      }
    ],
    solution: `module or_gate(
  input a,
  input b,
  output reg y
);
  always @(a or b) begin
    y = a | b;
  end
endmodule`
  },
  {
    id: "lg-not",
    title: "NOT Gate",
    difficulty: "easy",
    category: "Logic Gates",
    description: `
Design a NOT gate (inverter) using Verilog.

A NOT gate is a basic digital logic gate that implements logical negation. It outputs the opposite of its input.

For this problem, implement a NOT gate with the following specifications:
- One input (a)
- One output (y)

Truth Table:
| a | y |
|---|---|
| 0 | 1 |
| 1 | 0 |
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'not_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module not_gate(
  input a,
  output y
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0" },
        outputs: { y: "1" },
        description: "If a=0, then y=1"
      },
      {
        inputs: { a: "1" },
        outputs: { y: "0" },
        description: "If a=1, then y=0"
      }
    ],
    solution: `module not_gate(
  input a,
  output reg y
);
  always @(a) begin
    y = ~a;
  end
endmodule`
  },
  {
    id: "lg-nand",
    title: "NAND Gate",
    difficulty: "easy",
    category: "Logic Gates",
    description: `
Design a 2-input NAND gate using Verilog.

A NAND gate (NOT-AND) is a digital logic gate that produces an output that is the inverse of an AND gate. It outputs 0 (false) only when all of its inputs are 1 (true).

For this problem, implement a 2-input NAND gate with the following specifications:
- Two inputs (a and b)
- One output (y)

Truth Table:
| a | b | y |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'nand_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module nand_gate(
  input a,
  input b,
  output y
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { y: "1" },
        description: "If a=0, b=0, then y=1"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { y: "1" },
        description: "If a=0, b=1, then y=1"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { y: "1" },
        description: "If a=1, b=0, then y=1"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { y: "0" },
        description: "If a=1, b=1, then y=0"
      }
    ],
    solution: `module nand_gate(
  input a,
  input b,
  output reg y
);
  always @(a or b) begin
    y = ~(a & b);
  end
endmodule`
  },
  {
    id: "lg-nor",
    title: "NOR Gate",
    difficulty: "easy",
    category: "Logic Gates",
    description: `
Design a 2-input NOR gate using Verilog.

A NOR gate (NOT-OR) is a digital logic gate that produces an output that is the inverse of an OR gate. It outputs 1 (true) only when all of its inputs are 0 (false).

For this problem, implement a 2-input NOR gate with the following specifications:
- Two inputs (a and b)
- One output (y)

Truth Table:
| a | b | y |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'nor_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module nor_gate(
  input a,
  input b,
  output y
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { y: "1" },
        description: "If a=0, b=0, then y=1"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { y: "0" },
        description: "If a=0, b=1, then y=0"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { y: "0" },
        description: "If a=1, b=0, then y=0"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { y: "0" },
        description: "If a=1, b=1, then y=0"
      }
    ],
    solution: `module nor_gate(
  input a,
  input b,
  output reg y
);
  always @(a or b) begin
    y = ~(a | b);
  end
endmodule`
  },
  {
    id: "lg-xor",
    title: "XOR Gate",
    difficulty: "easy",
    category: "Logic Gates",
    description: `
Design a 2-input XOR (Exclusive OR) gate using Verilog.

An XOR gate is a digital logic gate that outputs 1 (true) when the number of 1 inputs is odd.

For this problem, implement a 2-input XOR gate with the following specifications:
- Two inputs (a and b)
- One output (y)

Truth Table:
| a | b | y |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'xor_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module xor_gate(
  input a,
  input b,
  output y
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { y: "0" },
        description: "If a=0, b=0, then y=0"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { y: "1" },
        description: "If a=0, b=1, then y=1"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { y: "1" },
        description: "If a=1, b=0, then y=1"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { y: "0" },
        description: "If a=1, b=1, then y=0"
      }
    ],
    solution: `module xor_gate(
  input a,
  input b,
  output reg y
);
  always @(a or b) begin
    y = a ^ b;
  end
endmodule`
  },
  {
    id: "lg-xnor",
    title: "XNOR Gate",
    difficulty: "easy",
    category: "Logic Gates",
    description: `
Design a 2-input XNOR (Exclusive NOR) gate using Verilog.

An XNOR gate is a digital logic gate that outputs 1 (true) when the number of 1 inputs is even.

For this problem, implement a 2-input XNOR gate with the following specifications:
- Two inputs (a and b)
- One output (y)

Truth Table:
| a | b | y |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'xnor_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module xnor_gate(
  input a,
  input b,
  output y
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { y: "1" },
        description: "If a=0, b=0, then y=1"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { y: "0" },
        description: "If a=0, b=1, then y=0"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { y: "0" },
        description: "If a=1, b=0, then y=0"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { y: "1" },
        description: "If a=1, b=1, then y=1"
      }
    ],
    solution: `module xnor_gate(
  input a,
  input b,
  output reg y
);
  always @(a or b) begin
    y = ~(a ^ b);
  end
endmodule`
  },
  {
    id: "lg-universal",
    title: "Universal Gate Implementation",
    difficulty: "medium",
    category: "Logic Gates",
    description: `
Design a circuit using only NAND gates to implement all other basic logic gates.

NAND gates are considered universal gates because any digital logic function can be implemented using only NAND gates.

For this problem, implement the following gates using only NAND gates:
- NOT gate
- AND gate
- OR gate
- NOR gate
- XOR gate

Your module should have the following interface:
\`\`\`
module universal_gates(
  input a,
  input b,
  output not_out,
  output and_out,
  output or_out,
  output nor_out,
  output xor_out
);
\`\`\`
    `,
    constraints: [
      "Use only NAND gates in your implementation",
      "You can use wire declarations for intermediate signals",
      "Your module must be named 'universal_gates'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module universal_gates(
  input a,
  input b,
  output not_out,
  output and_out,
  output or_out,
  output nor_out,
  output xor_out
);
  // Your code here using only NAND gates
  // Example: wire w1; // Intermediate signal

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { not_out: "1", and_out: "0", or_out: "0", nor_out: "1", xor_out: "0" },
        description: "Test case when a=0, b=0"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { not_out: "1", and_out: "0", or_out: "1", nor_out: "0", xor_out: "1" },
        description: "Test case when a=0, b=1"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { not_out: "0", and_out: "0", or_out: "1", nor_out: "0", xor_out: "1" },
        description: "Test case when a=1, b=0"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { not_out: "0", and_out: "1", or_out: "1", nor_out: "0", xor_out: "0" },
        description: "Test case when a=1, b=1"
      }
    ],
    solution: `module universal_gates(
  input a,
  input b,
  output not_out,
  output and_out,
  output or_out,
  output nor_out,
  output xor_out
);
  // Intermediate wires
  wire nand_a_a;    // NAND(a,a)
  wire nand_b_b;    // NAND(b,b)
  wire nand_a_b;    // NAND(a,b)
  wire nand_not_a_not_b; // NAND(NOT a, NOT b)
  wire nand_not_a_b;     // NAND(NOT a, b)
  wire nand_a_not_b;     // NAND(a, NOT b)
  
  // NOT gate using NAND (NOT a = NAND(a,a))
  assign nand_a_a = ~(a & a);
  assign nand_b_b = ~(b & b);
  assign not_out = nand_a_a;
  
  // AND gate using NAND (a AND b = NOT(NAND(a,b)))
  assign nand_a_b = ~(a & b);
  assign and_out = ~nand_a_b;
  
  // OR gate using NAND (a OR b = NAND(NOT a, NOT b))
  assign nand_not_a_not_b = ~(nand_a_a & nand_b_b);
  assign or_out = nand_not_a_not_b;
  
  // NOR gate using NAND (a NOR b = NOT(a OR b))
  assign nor_out = ~nand_not_a_not_b;
  
  // XOR gate using NAND
  assign nand_not_a_b = ~(nand_a_a & b);
  assign nand_a_not_b = ~(a & nand_b_b);
  assign xor_out = ~(nand_not_a_b & nand_a_not_b);
  
endmodule`
  }
];
