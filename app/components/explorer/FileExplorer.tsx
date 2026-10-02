"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import FileItem from "./FileItem";
import { CodeFile } from "@/app/types/file";
import { projectFiles } from "@/app/data/files";
import { searchFiles } from "@/app/lib/files";

interface FileExplorerProps {
  selectedFileId: string | null;
  onFileSelect: (file: CodeFile) => void;
}

export default function FileExplorer({
  selectedFileId,
  onFileSelect,
}: FileExplorerProps) {
  const [search, setSearch] = useState("");

  const searchResults = searchFiles(
    projectFiles,
    search
  );

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r bg-white">
      <div className="border-b p-3">
        <p className="mb-3 text-xs font-semibold uppercase text-gray-500">
          Explorer
        </p>

        <div className="flex items-center gap-2 rounded-md border bg-gray-50 px-2.5 py-2">
          <Search
            size={15}
            className="text-gray-400"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search files..."
            className="w-full bg-transparent text-xs outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2">
        {search.trim() ? (
          <div className="py-2">
            {searchResults.length === 0 ? (
              <p className="px-4 py-3 text-xs text-gray-400">
                No files found.
              </p>
            ) : (
              searchResults.map((file) => (
                <button
                  key={file.id}
                  onClick={() => onFileSelect(file)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  <p className="truncate text-sm text-gray-700">
                    {file.name}
                  </p>

                  <p className="truncate text-xs text-gray-400">
                    {file.path}
                  </p>
                </button>
              ))
            )}
          </div>
        ) : (
          projectFiles.map((item) => (
            <FileItem
              key={item.id}
              item={item}
              level={0}
              selectedFileId={selectedFileId}
              onFileSelect={onFileSelect}
            />
          ))
        )}
      </div>
    </aside>
  );
}