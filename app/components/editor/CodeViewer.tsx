"use client";

import { X } from "lucide-react";
import { CodeFile } from "@/app/types/file";
import CodeEditor from "./CodeEditor";
import { getEditorLanguage } from "@/app/lib/editor";

interface CodeViewerProps {
  file?: CodeFile;
  openFiles: CodeFile[];
  activeFileId: string | null;
  onTabSelect: (fileId: string) => void;
  onTabClose: (fileId: string) => void;
}

export default function CodeViewer({
  file,
  openFiles,
  activeFileId,
  onTabSelect,
  onTabClose,
}: CodeViewerProps) {
  if (!file) {
    return (
      <section className="flex min-w-0 flex-1 items-center justify-center bg-gray-950">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-300">
            No file selected
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Select a file from the explorer.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-gray-950">
      {/* Tabs */}
      <div className="flex h-10 shrink-0 overflow-x-auto border-b border-gray-800 bg-gray-900">
        {openFiles.map((openFile) => {
          const isActive =
            openFile.id === activeFileId;

          return (
            <button
              key={openFile.id}
              onClick={() =>
                onTabSelect(openFile.id)
              }
              className={`group flex min-w-[140px] items-center justify-between gap-3 border-r border-gray-800 px-3 text-xs ${isActive
                ? "bg-gray-950 text-white"
                : "text-gray-400 hover:bg-gray-800"
                }`}
            >
              <span className="truncate">
                {openFile.name}
              </span>

              <X
                size={14}
                className="shrink-0 opacity-0 transition group-hover:opacity-100"
                onClick={(event) => {
                  event.stopPropagation();
                  onTabClose(openFile.id);
                }}
              />
            </button>
          );
        })}
      </div>

      {/* File information */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-gray-800 bg-gray-950 px-4">
        <span className="truncate text-xs text-gray-400">
          {file.path}
        </span>

        <span className="text-xs text-gray-500">
          {file.language}
        </span>
      </div>

      {/* Monaco */}
      <div className="min-h-0 flex-1">
        <CodeEditor
          value={file.content ?? ""}
          language={getEditorLanguage(
            file.language
          )}
        />
      </div>
    </section>
  );
}