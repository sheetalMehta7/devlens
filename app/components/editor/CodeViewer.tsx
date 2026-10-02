"use client";

import { CodeFile } from "@/app/types/file";
import CodeEditor from "./CodeEditor";
import { getEditorLanguage } from "@/app/lib/editor";

interface CodeViewerProps {
  file?: CodeFile;
}

export default function CodeViewer({
  file,
}: CodeViewerProps) {
  if (!file) {
    return (
      <section className="flex min-w-0 flex-1 items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">
            No file selected
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Select a file from the explorer.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col">
      {/* Editor Header */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b bg-white px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">
              {file.name}
            </p>

            <p className="truncate text-xs text-gray-400">
              {file.path}
            </p>
          </div>
        </div>

        <span className="shrink-0 text-xs text-gray-400">
          {file.language}
        </span>
      </div>

      {/* Monaco */}
      <div className="min-h-0 flex-1">
        <CodeEditor
          value={file.content ?? ""}
          language={getEditorLanguage(file.language)}
        />
      </div>
    </section>
  );
}