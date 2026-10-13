
import { streamText } from "ai";
import type { ModelMessage } from "ai";
import { getAIModel } from "@/app/lib/ai/provider";
import type { AIModelId } from "@/app/lib/ai/models";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      messages,
      selection,
      model = "openai/gpt-oss-120b",
    } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "A conversation is required." },
        { status: 400 }
      );
    }

    const validMessages = messages.every(
      (message: { role?: string; content?: unknown }) =>
        (message.role === "user" ||
          message.role === "assistant") &&
        typeof message.content === "string"
    );

    if (!validMessages) {
      return Response.json(
        { error: "Invalid conversation messages." },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];

    if (
      lastMessage.role !== "user" ||
      !lastMessage.content.trim()
    ) {
      return Response.json(
        { error: "The latest message must be a user question." },
        { status: 400 }
      );
    }

    const aiModel = getAIModel(model as AIModelId);

    const codeContext = selection
      ? `
Relevant file: ${selection.filePath}
Selected lines: ${selection.startLine}-${selection.endLine}

Selected code:
${selection.code}
`
      : "No code selection was provided.";

    const modelMessages = messages.map(
      (
        message: { role: "user" | "assistant"; content: string },
        index: number
      ) => ({
        role: message.role,
        content:
          index === messages.length - 1
            ? `${codeContext}\n\nDeveloper question:\n${message.content}`
            : message.content,
      })
    ) as ModelMessage[];

    const result = streamText({
      model: aiModel,

      system: `
You are DevLens, an AI coding assistant.

- Explain code in clear, simple language.
- Be technically accurate.
- Mention relevant edge cases.
- Do not invent behavior not supported by the provided context.
- Use earlier conversation messages to understand follow-up questions.
- If information is missing, explain what you need.
- Use Markdown for headings, lists, and code examples.
      `,

      messages: modelMessages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI chat error:", error);

    return Response.json(
      { error: "Failed to process AI request." },
      { status: 500 }
    );
  }
}
