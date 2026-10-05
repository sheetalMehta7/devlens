"use client";

import { useState } from "react";
import FileExplorer from "../explorer/FileExplorer";
import CodeViewer from "../editor/CodeViewer";
import ChatPanel from "../chat/ChatPanel";
import { CodeFile } from "@/app/types/file";
import { CodeSelection } from "@/app/types/ai";

export default function ProjectWorkspace() {
  const [openFiles, setOpenFiles] = useState<CodeFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [codeSelection, setCodeSelection] = useState<CodeSelection | null>(null);

  const activeFile =
    openFiles.find(
      (file) => file.id === activeFileId
    ) ?? null;

  const handleFileSelect = (file: CodeFile) => {
    setCodeSelection(null);

    setOpenFiles((currentFiles) => {
      const alreadyOpen = currentFiles.some(
        (item) => item.id === file.id
      );

      if (alreadyOpen) {
        return currentFiles;
      }

      return [...currentFiles, file];
    });

    setActiveFileId(file.id);
  };

  const handleTabSelect = (fileId: string) => {
    setCodeSelection(null);
    setActiveFileId(fileId);
  };

  const handleTabClose = (fileId: string) => {
    setOpenFiles((currentFiles) => {
      const closedIndex = currentFiles.findIndex(
        (file) => file.id === fileId
      );

      const remainingFiles = currentFiles.filter(
        (file) => file.id !== fileId
      );

      if (fileId === activeFileId) {
        const nextFile =
          remainingFiles[closedIndex] ??
          remainingFiles[closedIndex - 1] ??
          null;

        setActiveFileId(nextFile?.id ?? null);
      }

      return remainingFiles;
    });
  };

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <FileExplorer
        selectedFileId={activeFileId}
        onFileSelect={handleFileSelect}
      />

      <CodeViewer
        file={activeFile ?? undefined}
        openFiles={openFiles}
        activeFileId={activeFileId}
        onTabSelect={handleTabSelect}
        onTabClose={handleTabClose}
        onCodeSelect={setCodeSelection}
      />

      <ChatPanel selection={codeSelection} />
    </div>
  );
}