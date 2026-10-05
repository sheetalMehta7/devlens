"use client";

import Editor, {
  OnMount,
} from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  language?: string;
  onCodeSelect?: (
    code: string,
    startLine: number,
    endLine: number
  ) => void;
}
export default function CodeEditor({
  value,
  language = "plaintext",
  onCodeSelect,
}: CodeEditorProps) {

  const handleEditorMount: OnMount = (editor) => {
    editor.onDidChangeCursorSelection(() => {
      const selection = editor.getSelection();

      if (!selection || selection.isEmpty()) {
        onCodeSelect?.("", 0, 0);
        return;
      }

      const model = editor.getModel();

      if (!model) {
        return;
      }

      const selectedCode = model.getValueInRange(
        selection
      );

      onCodeSelect?.(
        selectedCode,
        selection.startLineNumber,
        selection.endLineNumber
      );
    });
  };

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      theme="vs-dark"
      onMount={handleEditorMount}
      options={{
        readOnly: true,
        minimap: {
          enabled: false,
        },
        fontSize: 14,
        lineNumbers: "on",
        wordWrap: "on",
        padding: {
          top: 16,
        },
        scrollBeyondLastLine: false,
      }}
    />
  );
}