import { CodeSelection } from "../types/ai";
import { AIModelId } from "./ai/models";


interface AskAIParams {
  question: string;
  selection: CodeSelection | null;
  model?: AIModelId;
}

export async function askAI({
  question,
  selection,
  model = "openai/gpt-oss-120b",
}: AskAIParams): Promise<Response> {
  return fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,

      model,

      file: selection
        ? {
            id: selection.fileId,
            name: selection.fileName,
            path: selection.filePath,
          }
        : null,

      selection,
    }),
  });
}