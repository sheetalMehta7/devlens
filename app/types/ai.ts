export interface CodeSelection {
  code: string;
  fileId: string;
  fileName: string;
  filePath: string;
  startLine: number;
  endLine: number;
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}