import { streamText } from "ai";
import { getAIModel } from "@/app/lib/ai/provider";
import { AIModelId } from "@/app/lib/ai/models";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      question,
      file,
      selection,
      model = "openai/gpt-oss-120b",
    } = body as {
      question: string;
      file?: {
        id: string;
        name: string;
        path: string;
      } | null;
      selection?: {
        code: string;
        fileId: string;
        fileName: string;
        filePath: string;
        startLine: number;
        endLine: number;
      } | null;
      model?: AIModelId;
    };

    if (!question?.trim()) {
      return Response.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const aiModel = getAIModel(model);

    const result = streamText({
      model: aiModel,

      system: `
You are DevLens, an AI coding assistant.

Your job is to help developers understand and work with their code.

Rules:
- Explain code clearly.
- Use simple language.
- Be technically accurate.
- Mention important edge cases.
- Do not invent behavior that is not present in the provided code.
- If information is missing, explicitly say what is missing.
- When useful, provide small code examples.
- Prefer practical explanations over unnecessary theory.
      `,

      prompt: `
File:
${file?.path ?? "No file selected"}

Selected code:
${selection?.code ?? "No code selected"}

Selected lines:
${
  selection
    ? `${selection.startLine}-${selection.endLine}`
    : "N/A"
}

Developer question:
${question}
      `,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI chat error:", error);

    return Response.json(
      {
        error: "Failed to process AI request",
      },
      {
        status: 500,
      }
    );
  }
}