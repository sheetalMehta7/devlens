"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  language?: string;
}

export default function CodeEditor({
  value,
  language = "plaintext",
}: CodeEditorProps) {
  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      theme="vs-dark"
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