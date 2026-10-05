"use client";

import { useState } from "react";
import { askAI } from "@/app/lib/ai";
import { AIModelId } from "@/app/lib/ai/models";
import { CodeSelection } from "@/app/types/ai";

interface ChatPanelProps {
  selection: CodeSelection | null;
}

export default function ChatPanel({
  selection,
}: ChatPanelProps) {
  const [selectedModel, setSelectedModel] =
    useState<AIModelId>("openai/gpt-oss-120b");

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAskAI = async () => {
    if (!question.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse("");

    try {
      const result = await askAI({
        question,
        selection,
        model: selectedModel,
      });

      if (!result.ok) {
        const data = await result.json().catch(() => null);

        throw new Error(
          data?.error || "Failed to get AI response"
        );
      }

      const text = await result.text();

      setResponse(text);
    } catch (error) {
      console.error("AI request failed:", error);

      setError(
        "Something went wrong while contacting the AI."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="flex w-96 shrink-0 flex-col border-l bg-white">
      {/* Header */}
      <div className="shrink-0 border-b px-4 py-3">
        <p className="text-sm font-semibold">
          AI Assistant
        </p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Model selector */}
        <div className="mb-5">
          <label
            htmlFor="ai-model"
            className="mb-1 block text-xs font-medium text-gray-600"
          >
            AI Model
          </label>

          <select
            id="ai-model"
            value={selectedModel}
            onChange={(event) =>
              setSelectedModel(
                event.target.value as AIModelId
              )
            }
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-gray-400"
          >
            <option value="openai/gpt-oss-120b">
              GPT-OSS 120B
            </option>

            <option value="openai/gpt-oss-20b">
              GPT-OSS 20B
            </option>
          </select>
        </div>

        {/* Selected code */}
        {selection ? (
          <div>
            <div className="mb-3 rounded-lg border bg-gray-50 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-gray-700">
                  Selected code
                </p>

                <span className="text-xs text-gray-400">
                  Lines {selection.startLine}-
                  {selection.endLine}
                </span>
              </div>

              <p className="mt-1 truncate text-xs text-gray-400">
                {selection.filePath}
              </p>
            </div>

            <pre className="max-h-60 overflow-auto rounded-lg bg-gray-950 p-3 text-xs leading-5 text-gray-200">
              <code>{selection.code}</code>
            </pre>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <p className="text-sm text-gray-500">
              Select some code
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Then ask AI to explain it.
            </p>
          </div>
        )}

        {/* AI response */}
        {response && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-medium text-gray-600">
              AI Response
            </p>

            <div className="rounded-lg border bg-gray-50 p-3">
              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-800">
                {response}
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="shrink-0 border-t bg-white p-4">
        <input
          value={question}
          onChange={(event) =>
            setQuestion(event.target.value)
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey
            ) {
              event.preventDefault();
              handleAskAI();
            }
          }}
          placeholder="Ask about your code..."
          disabled={isLoading}
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-gray-400 disabled:bg-gray-100"
        />

        <button
          onClick={handleAskAI}
          disabled={isLoading || !question.trim()}
          className="mt-2 w-full rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Thinking..." : "Ask AI"}
        </button>
      </div>
    </aside>
  );
}