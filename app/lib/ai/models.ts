export const AI_MODELS = {
  GROQ_GPT_OSS_120B: {
    id: "openai/gpt-oss-120b",
    provider: "groq",
    name: "GPT-OSS 120B",
  },

  GROQ_GPT_OSS_20B: {
    id: "openai/gpt-oss-20b",
    provider: "groq",
    name: "GPT-OSS 20B",
  },
} as const;

export type AIModelId =
  (typeof AI_MODELS)[keyof typeof AI_MODELS]["id"];