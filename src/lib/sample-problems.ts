// Sample HDL problems for the platform
export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  category: string;
  starterCode: string;
  testCases: TestCase[];
  constraints: string[];
  solution?: string; // Optional solution code
}

export interface TestCase {
  inputs: Record<string, string>;
  outputs: Record<string, string>;
  description: string;
}

export const sampleProblems: Problem[] = [
  {
    id: "p001",
    title: "2-to-1 Multiplexer",
    difficulty: "easy",
    category: "Combinational Logic",
    description: `
Design a 2-to-1 multiplexer using Verilog.

A multiplexer (MUX) is a digital circuit that selects one of several input signals and forwards the selected input to a single output line. The selection is controlled by select lines.

For this problem, implement a 2-to-1 multiplexer with the following specifications:
- Two data inputs (a and b)
- One select input (sel)
- One output (out)

When sel = 0, out = a
When sel = 1, out = b
    `,
    constraints: [
      "Use only behavioral modeling",
      "Your module must be named 'mux2to1'",
      "Inputs and outputs must be as specified in the description"
    ],
    starterCode: `module mux2to1(
  input a,
  input b,
  input sel,
  output out
);
  // Your code here

endmodule`,
    testCases: [
      {
        inputs: { a: "0", b: "0", sel: "0" },
        outputs: { out: "0" },
        description: "If a=0, b=0, sel=0, then out should be 0"
      },
      {
        inputs: { a: "1", b: "0", sel: "0" },
        outputs: { out: "1" },
        description: "If a=1, b=0, sel=0, then out should be 1"
      },
      {
        inputs: { a: "0", b: "1", sel: "1" },
        outputs: { out: "1" },
        description: "If a=0, b=1, sel=1, then out should be 1"
      },
      {
        inputs: { a: "1", b: "1", sel: "1" },
        outputs: { out: "1" },
        description: "If a=1, b=1, sel=1, then out should be 1"
      }
    ],
    solution: `module mux2to1(
  input a,
  input b,
  input sel,
  output reg out
);
  always @(a or b or sel) begin
    if (sel == 0)
      out = a;
    else
      out = b;
  end
endmodule`
  },
  {
    id: "p004",
    title: "AND Gate Implementation",
    difficulty: "easy",
    category: "Logic Gates",
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
  }
];
