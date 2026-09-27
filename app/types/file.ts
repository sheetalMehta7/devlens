export type FileType = "file" | "folder";

export interface CodeFile {
  id: string;
  name: string;
  path: string;
  type: FileType;
  language?: string;
  content?: string;
  children?: CodeFile[];
}