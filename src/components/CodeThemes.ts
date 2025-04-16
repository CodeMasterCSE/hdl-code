
// Monaco editor theme customization for HDL code
export const hdlTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A9955' },
    { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
    { token: 'number', foreground: 'B5CEA8' },
    { token: 'string', foreground: 'CE9178' },
    { token: 'identifier', foreground: '9CDCFE' },
    { token: 'type', foreground: '4EC9B0' },
  ],
  colors: {
    'editor.background': '#1E1E1E',
    'editor.foreground': '#D4D4D4',
    'editorCursor.foreground': '#AEAFAD',
    'editor.lineHighlightBackground': '#2D2D30',
    'editorLineNumber.foreground': '#858585',
    'editor.selectionBackground': '#264F78',
    'editor.inactiveSelectionBackground': '#3A3D41',
  },
};

// Custom language definitions for HDL syntax highlighting
export const hdlLanguageDefinition = {
  keywords: [
    'module', 'endmodule', 'input', 'output', 'inout', 'reg', 'wire', 'always',
    'begin', 'end', 'if', 'else', 'case', 'endcase', 'default', 'posedge', 'negedge',
    'assign', 'parameter', 'localparam', 'integer', 'genvar', 'generate', 'endgenerate',
    'function', 'endfunction', 'task', 'endtask', 'initial', 'forever', 'repeat', 'while',
    'for', 'wait', 'disable', 'force', 'release', 'fork', 'join'
  ],
  operators: [
    '=', '+', '-', '*', '/', '%', '&', '|', '^', '~', '<<', '>>', '<<<', '>>>',
    '==', '!=', '===', '!==', '>', '<', '>=', '<=', '&&', '||', '!', '?', ':'
  ],
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  tokenizer: {
    root: [
      { include: '@whitespace' },
      { include: '@numbers' },
      { include: '@strings' },
      
      [/[a-zA-Z_]\w*/, {
        cases: {
          '@keywords': 'keyword',
          '@default': 'identifier'
        }
      }],
      
      [/@symbols/, {
        cases: {
          '@operators': 'operator',
          '@default': 'symbol'
        }
      }]
    ],
    
    whitespace: [
      [/\/\/.*$/, 'comment'],
      [/\/\*/, 'comment', '@comment'],
      [/[ \t\r\n]+/, 'white']
    ],
    
    comment: [
      [/[^\/*]+/, 'comment'],
      [/\*\//, 'comment', '@pop'],
      [/[\/*]/, 'comment']
    ],
    
    numbers: [
      [/\d+'[sS]?[dD][0-9_]+/, 'number'],
      [/\d+'[sS]?[hH][0-9a-fA-F_]+/, 'number'],
      [/\d+'[sS]?[bB][01_]+/, 'number'],
      [/\d+'[sS]?[oO][0-7_]+/, 'number'],
      [/\d+/, 'number']
    ],
    
    strings: [
      [/"([^"\\]|\\.)*$/, 'string.invalid'],
      [/"/, 'string', '@string']
    ],
    
    string: [
      [/[^\\"]+/, 'string'],
      [/\\./, 'string.escape'],
      [/"/, 'string', '@pop']
    ]
  }
};
