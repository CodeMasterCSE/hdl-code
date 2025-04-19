
import Editor from "@monaco-editor/react";
import { hdlTheme, hdlLanguageDefinition } from "@/components/CodeThemes";
import { useEffect } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  // Setup editor with HDL/Verilog configuration
  useEffect(() => {
    // Monaco is loaded asynchronously
    import("monaco-editor").then(monaco => {
      // Register HDL language
      monaco.languages.register({ id: 'verilog' });
      
      // Register the language's configuration
      monaco.languages.setMonarchTokensProvider('verilog', hdlLanguageDefinition);
      
      // Register the theme
      monaco.editor.defineTheme('hdl-dark', hdlTheme);
    });
  }, []);

  return (
    <Editor
      height="100%"
      defaultLanguage="verilog"
      theme="hdl-dark"
      value={code}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
        tabSize: 2,
        scrollBeyondLastLine: false,
        lineNumbers: "on",
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
