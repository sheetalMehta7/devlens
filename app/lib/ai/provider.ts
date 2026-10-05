import { groq } from "@ai-sdk/groq";
import { AI_MODELS, AIModelId } from "./models";

export function getAIModel(modelId: AIModelId) {
  const model = Object.values(AI_MODELS).find(
    (item) => item.id === modelId
  );

  if (!model) {
    throw new Error(`Unsupported AI model: ${modelId}`);
  }

  if (model.provider === "groq") {
    return groq(model.id);
  }

  throw new Error(`Unsupported AI provider: ${model.provider}`);
}