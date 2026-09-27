import { CodeFile } from "@/app/types/file";


interface CodeViewerProps {
  file?: CodeFile;
}

export default function CodeViewer({
  file,
}: CodeViewerProps) {
  if (!file) {
    return (
      <section className="flex min-w-0 flex-1 items-center justify-center bg-white">
        <p className="text-sm text-gray-400">
          Select a file to view its contents.
        </p>
      </section>
    );
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-white">
      <div className="flex h-12 items-center justify-between border-b px-4">
        <div>
          <p className="text-sm font-medium text-gray-900">
            {file.name}
          </p>

          <p className="text-xs text-gray-400">
            {file.path}
          </p>
        </div>

        <span className="text-xs text-gray-400">
          {file.language}
        </span>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <pre className="text-sm leading-6">
          <code>{file.content}</code>
        </pre>
      </div>
    </section>
  );
}