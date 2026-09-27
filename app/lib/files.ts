import { CodeFile } from "@/app/types/file";


export function findFileById(
  files: CodeFile[],
  id: string
): CodeFile | null {
  for (const file of files) {
    if (file.id === id) {
      return file;
    }

    if (file.children) {
      const result = findFileById(
        file.children,
        id
      );

      if (result) {
        return result;
      }
    }
  }

  return null;
}

export function searchFiles(
  files: CodeFile[],
  query: string
): CodeFile[] {
  const results: CodeFile[] = [];

  const normalizedQuery = query
    .trim()
    .toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  function traverse(items: CodeFile[]) {
    for (const item of items) {
      if (
        item.name
          .toLowerCase()
          .includes(normalizedQuery)
      ) {
        results.push(item);
      }

      if (item.children) {
        traverse(item.children);
      }
    }
  }

  traverse(files);

  return results;
}