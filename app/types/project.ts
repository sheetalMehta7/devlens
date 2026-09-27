export type ProjectSource = "upload" | "github";

export interface Project {
  id: string;
  name: string;
  description?: string;
  source: ProjectSource;
  language: string;
  fileCount: number;
  updatedAt: string;
}