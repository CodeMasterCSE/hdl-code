import { Problem } from '../types/problem';

export const logicGateProblems: Problem[] = [
  {
    id: "p004",
    title: "AND Gate Implementation",
    difficulty: "easy",
    category: "Logic Gates",
    points: 10,
    description: `
Design a 2-input AND gate using Verilog.

An AND gate outputs 1 only when both inputs are 1. 
Otherwise, it outputs 0.

Implement the AND gate with the following specifications:
- Two inputs (a and b)
- One output (out)

When a = 1 and b = 1, out should be 1
When any input is 0, out should be 0
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'and_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module and_gate(
  input a,
  input b,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { out: "0" },
        description: "If a=0, b=0, then out should be 0"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { out: "0" },
        description: "If a=1, b=0, then out should be 0"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { out: "1" },
        description: "If a=1, b=1, then out should be 1"
      }
    ],
    solution: `module and_gate(
  input a,
  input b,
  output reg out
);
  always @(a or b) begin
    out = a & b;
  end
endmodule`
  },
  {
    id: "p005",
    title: "OR Gate Implementation",
    difficulty: "easy",
    category: "Logic Gates",
    points: 10,
    description: `
Design a 2-input OR gate using Verilog.

An OR gate outputs 1 if at least one input is 1.
It outputs 0 only when both inputs are 0.

Implement the OR gate with the following specifications:
- Two inputs (a and b)
- One output (out)

When either a or b is 1, out should be 1
When both inputs are 0, out should be 0
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'or_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module or_gate(
  input a,
  input b,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { out: "0" },
        description: "If a=0, b=0, then out should be 0"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { out: "1" },
        description: "If a=1, b=0, then out should be 1"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { out: "1" },
        description: "If a=1, b=1, then out should be 1"
      }
    ],
    solution: `module or_gate(
  input a,
  input b,
  output reg out
);
  always @(a or b) begin
    out = a | b;
  end
endmodule`
  },
  {
    id: "p006",
    title: "NOT Gate Implementation",
    difficulty: "easy",
    category: "Logic Gates",
    points: 10,
    description: `
Design a NOT gate (inverter) using Verilog.

A NOT gate outputs the opposite of its input.
- When input is 0, output should be 1
- When input is 1, output should be 0

Implement the NOT gate with the following specifications:
- One input (a)
- One output (out)
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'not_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module not_gate(
  input a,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0" },
        outputs: { out: "1" },
        description: "If a=0, out should be 1"
      },
      {
        inputs: { a: "1" },
        outputs: { out: "0" },
        description: "If a=1, out should be 0"
      }
    ],
    solution: `module not_gate(
  input a,
  output reg out
);
  always @(a) begin
    out = ~a;
  end
endmodule`
  },
  {
    id: "p007",
    title: "NAND Gate Implementation",
    difficulty: "easy",
    category: "Logic Gates",
    points: 10,
    description: `
Design a 2-input NAND gate using Verilog.

A NAND gate is the negation of an AND gate. It outputs 0 only when both inputs are 1.
Otherwise, it outputs 1.

Implement the NAND gate with the following specifications:
- Two inputs (a and b)
- One output (out)

When a = 1 and b = 1, out should be 0
When any input is 0, out should be 1
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'nand_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module nand_gate(
  input a,
  input b,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { out: "1" },
        description: "If a=0, b=0, then out should be 1"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { out: "1" },
        description: "If a=1, b=0, then out should be 1"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { out: "1" },
        description: "If a=0, b=1, then out should be 1"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { out: "0" },
        description: "If a=1, b=1, then out should be 0"
      }
    ],
    solution: `module nand_gate(
  input a,
  input b,
  output reg out
);
  always @(a or b) begin
    out = ~(a & b);
  end
endmodule`
  },
  {
    id: "p008",
    title: "NOR Gate Implementation",
    difficulty: "easy",
    category: "Logic Gates",
    points: 10,
    description: `
Design a 2-input NOR gate using Verilog.

A NOR gate is the negation of an OR gate. It outputs 1 only when both inputs are 0.
Otherwise, it outputs 0.

Implement the NOR gate with the following specifications:
- Two inputs (a and b)
- One output (out)

When a = 0 and b = 0, out should be 1
When any input is 1, out should be 0
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'nor_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module nor_gate(
  input a,
  input b,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { out: "1" },
        description: "If a=0, b=0, then out should be 1"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { out: "0" },
        description: "If a=1, b=0, then out should be 0"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { out: "0" },
        description: "If a=0, b=1, then out should be 0"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { out: "0" },
        description: "If a=1, b=1, then out should be 0"
      }
    ],
    solution: `module nor_gate(
  input a,
  input b,
  output reg out
);
  always @(a or b) begin
    out = ~(a | b);
  end
endmodule`
  },
  {
    id: "p009",
    title: "XOR Gate Implementation",
    difficulty: "easy",
    category: "Logic Gates",
    points: 10,
    description: `
Design a 2-input XOR (Exclusive OR) gate using Verilog.

An XOR gate outputs 1 when the inputs are different.
It outputs 0 when both inputs are the same.

Implement the XOR gate with the following specifications:
- Two inputs (a and b)
- One output (out)

When a = 0 and b = 0, out should be 0
When a = 1 and b = 1, out should be 0
When a = 0 and b = 1, out should be 1
When a = 1 and b = 0, out should be 1
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'xor_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module xor_gate(
  input a,
  input b,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { out: "0" },
        description: "If a=0, b=0, then out should be 0"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { out: "1" },
        description: "If a=1, b=0, then out should be 1"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { out: "1" },
        description: "If a=0, b=1, then out should be 1"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { out: "0" },
        description: "If a=1, b=1, then out should be 0"
      }
    ],
    solution: `module xor_gate(
  input a,
  input b,
  output reg out
);
  always @(a or b) begin
    out = a ^ b;
  end
endmodule`
  },
  {
    id: "p010",
    title: "XNOR Gate Implementation",
    difficulty: "easy",
    category: "Logic Gates",
    points: 10,
    description: `
Design a 2-input XNOR (Exclusive NOR) gate using Verilog.

An XNOR gate is the negation of an XOR gate. It outputs 1 when both inputs are the same.
It outputs 0 when the inputs are different.

Implement the XNOR gate with the following specifications:
- Two inputs (a and b)
- One output (out)

When a = 0 and b = 0, out should be 1
When a = 1 and b = 1, out should be 1
When a = 0 and b = 1, out should be 0
When a = 1 and b = 0, out should be 0
    `,
    constraints: [
      "Use behavioral modeling",
      "Your module must be named 'xnor_gate'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module xnor_gate(
  input a,
  input b,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { out: "1" },
        description: "If a=0, b=0, then out should be 1"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { out: "0" },
        description: "If a=1, b=0, then out should be 0"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { out: "0" },
        description: "If a=0, b=1, then out should be 0"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { out: "1" },
        description: "If a=1, b=1, then out should be 1"
      }
    ],
    solution: `module xnor_gate(
  input a,
  input b,
  output reg out
);
  always @(a or b) begin
    out = ~(a ^ b);
  end
endmodule`
  },
  {
    id: "p011",
    title: "Universal Gate Implementation",
    difficulty: "medium",
    category: "Logic Gates",
    points: 20,
    description: `
Design a module that demonstrates how NAND gates can be used to implement any basic logic gate.

NAND gates are considered "universal gates" because they can be combined to create any other logic function.

For this problem, implement a module that uses only NAND gates to create:
1. A NOT gate
2. An AND gate
3. An OR gate

Your module should have the following interface:
- Two inputs (a and b)
- Three outputs (not_out, and_out, or_out)

The module should implement:
- not_out = NOT a (using only NAND gates)
- and_out = a AND b (using only NAND gates)
- or_out = a OR b (using only NAND gates)
    `,
    constraints: [
      "Use only NAND gates in your implementation",
      "Your module must be named 'universal_gate'",
      "Inputs and outputs must be as specified in the description",
      "Implementation must be done using structural modeling (gate instantiation)"
    ],
    starterCode: `module universal_gate(
  input a,
  input b,
  output not_out,
  output and_out,
  output or_out
);
  // Your code here
  // Remember: Use only NAND gates!

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0" },
        outputs: { not_out: "1", and_out: "0", or_out: "0" },
        description: "Test with a=0, b=0"
      },
      {
        inputs: { a: "1", b: "0" },
        outputs: { not_out: "0", and_out: "0", or_out: "1" },
        description: "Test with a=1, b=0"
      },
      {
        inputs: { a: "0", b: "1" },
        outputs: { not_out: "1", and_out: "0", or_out: "1" },
        description: "Test with a=0, b=1"
      },
      {
        inputs: { a: "1", b: "1" },
        outputs: { not_out: "0", and_out: "1", or_out: "1" },
        description: "Test with a=1, b=1"
      }
    ],
    solution: `module universal_gate(
  input a,
  input b,
  output not_out,
  output and_out,
  output or_out
);
  // NOT gate using NAND (a NAND a = NOT a)
  nand(not_out, a, a);
  
  // AND gate using NAND (NAND the output of a NAND b)
  wire nand_out;
  nand(nand_out, a, b);
  nand(and_out, nand_out, nand_out);
  
  // OR gate using NAND (NAND the NANDed inputs)
  wire nand_a, nand_b;
  nand(nand_a, a, a);
  nand(nand_b, b, b);
  nand(or_out, nand_a, nand_b);
endmodule`
  }
];
