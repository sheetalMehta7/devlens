
import type { CodeSelection, ChatMessage } from "@/app/types/ai";
import type { AIModelId } from "@/app/lib/ai/models";

interface AskAIParams {
  messages: ChatMessage[];
  selection: CodeSelection | null;
  model: AIModelId;
}

export async function askAI({
  messages,
  selection,
  model,
}: AskAIParams): Promise<Response> {
  return fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: messages.map(({ role, content }) => ({
        role,
        content,
      })),
      selection,
      model,
    }),
  });
}
