"use client";

import { useState } from "react";
import FileExplorer from "../explorer/FileExplorer";
import CodeViewer from "../editor/CodeViewer";
import ChatPanel from "../chat/ChatPanel";
import { CodeFile } from "@/app/types/file";
import { projectFiles } from "@/app/data/files";

export default function ProjectWorkspace() {
  const [selectedFile, setSelectedFile] =
    useState<CodeFile | null>(null);

  const defaultFile = projectFiles[0]?.children?.[0]?.children?.[0];

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <FileExplorer
        selectedFileId={selectedFile?.id ?? null}
        onFileSelect={setSelectedFile}
      />

      <CodeViewer file={selectedFile ?? defaultFile} />

      <ChatPanel />
    </div>
  );
}