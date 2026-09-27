"use client";

import { CodeFile } from "@/app/types/file";
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
} from "lucide-react";
import { useState } from "react";


interface FileItemProps {
  item: CodeFile;
  level: number;
  selectedFileId: string | null;
  onFileSelect: (file: CodeFile) => void;
}

export default function FileItem({
  item,
  level,
  selectedFileId,
  onFileSelect,
}: FileItemProps) {
  const [isOpen, setIsOpen] = useState(level === 0);


  return (
    <div>
      <button
        onClick={() => {
          if (item.type === "folder") {
            setIsOpen((previous) => !previous);
            return;
          }

          onFileSelect(item);
        }}
        className={`flex w-full items-center gap-1 py-1.5 text-left text-sm hover:bg-gray-100 ${selectedFileId === item.id
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600"
          }`}
        style={{
          paddingLeft: `${level * 16 + 8}px`,
        }}
      >
        {item.type === "folder" ? (
          <>
            {isOpen ? (
              <ChevronDown size={15} />
            ) : (
              <ChevronRight size={15} />
            )}
            {isOpen ? (
              <FolderOpen size={16} />
            ) : (
              <Folder size={16} />
            )}
          </>
        ) : (
          <>
            <span className="w-[15px]" />
            <File size={16} />
          </>
        )}

        <span className="truncate">
          {item.name}
        </span>
      </button>

      {item.type === "folder" &&
        isOpen &&
        item.children?.map((child) => (
          <FileItem
            key={child.id}
            item={child}
            level={level + 1}
            selectedFileId={selectedFileId}
            onFileSelect={onFileSelect}
          />
        ))}
    </div>
  );
}