
"use client";

import { useState } from "react";
import { askAI } from "@/app/lib/ai";
import type { AIModelId } from "@/app/lib/ai/models";
import type { ChatMessage, CodeSelection } from "@/app/types/ai";
import MarkdownResponse from "./MarkdownResponse";

interface ChatPanelProps {
  selection: CodeSelection | null;
}

export default function ChatPanel({
  selection,
}: ChatPanelProps) {
  const [selectedModel, setSelectedModel] =
    useState<AIModelId>("openai/gpt-oss-120b");

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAskAI = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedQuestion,
    };

    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };

    const conversation = [...messages, userMessage];

    setMessages([...conversation, assistantMessage]);
    setQuestion("");
    setError(null);
    setIsLoading(true);

    try {
      const result = await askAI({
        messages: conversation,
        selection,
        model: selectedModel,
      });

      if (!result.ok) {
        const data = await result.json().catch(() => null);

        throw new Error(
          data?.error || "Failed to get AI response."
        );
      }

      if (!result.body) {
        throw new Error("No response stream received.");
      }

      const reader = result.body.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value, {
            stream: true,
          });

          if (chunk) {
            setMessages((previous) =>
              previous.map((message) =>
                message.id === assistantMessage.id
                  ? {
                    ...message,
                    content: message.content + chunk,
                  }
                  : message
              )
            );
          }
        }

        const remaining = decoder.decode();

        if (remaining) {
          setMessages((previous) =>
            previous.map((message) =>
              message.id === assistantMessage.id
                ? {
                  ...message,
                  content: message.content + remaining,
                }
                : message
            )
          );
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      console.error("AI request failed:", error);

      // Remove the failed exchange so the user can retry.
      setMessages((previous) =>
        previous.filter(
          (message) =>
            message.id !== userMessage.id &&
            message.id !== assistantMessage.id
        )
      );

      setQuestion(trimmedQuestion);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting the AI."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="flex w-96 shrink-0 flex-col border-l bg-white">
      {/* Header */}
      <div className="shrink-0 border-b px-4 py-3">
        <p className="text-sm font-semibold">AI Assistant</p>
        <p className="mt-1 text-xs text-gray-500">
          Ask questions about your code
        </p>
      </div>

      {/* Model selector */}
      <div className="shrink-0 border-b p-4">
        <label
          htmlFor="ai-model"
          className="mb-1 block text-xs font-medium text-gray-600"
        >
          AI Model
        </label>

        <select
          id="ai-model"
          value={selectedModel}
          disabled={isLoading}
          onChange={(event) =>
            setSelectedModel(event.target.value as AIModelId)
          }
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-gray-400 disabled:opacity-60"
        >
          <option value="openai/gpt-oss-120b">
            GPT-OSS 120B
          </option>
          <option value="openai/gpt-oss-20b">
            GPT-OSS 20B
          </option>
        </select>
      </div>

      {/* Conversation */}
      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        {messages.length === 0 && !selection && (
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <p className="text-sm text-gray-600">
                Start a conversation
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Select code or ask a general coding question.
              </p>
            </div>
          </div>
        )}

        {/* Selected code context */}
        {selection && (
          <div className="rounded-lg border bg-gray-50 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-gray-700">
                Selected code
              </p>
              <span className="text-xs text-gray-400">
                Lines {selection.startLine}-{selection.endLine}
              </span>
            </div>

            <p className="mt-1 truncate text-xs text-gray-400">
              {selection.filePath}
            </p>

            <pre className="mt-3 max-h-40 overflow-auto rounded-lg bg-gray-950 p-3 text-xs leading-5 text-gray-200">
              <code>{selection.code}</code>
            </pre>
          </div>
        )}

        {/* Message history */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user"
                ? "ml-6 rounded-xl bg-gray-100 p-3"
                : "mr-2 min-w-0"
            }
          >
            <p className="mb-2 text-xs font-semibold text-gray-500">
              {message.role === "user" ? "You" : "DevLens AI"}
            </p>

            {message.role === "user" ? (
              <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-800">
                {message.content}
              </p>
            ) : message.content ? (
              <MarkdownResponse content={message.content} />
            ) : isLoading ? (
              <p className="text-sm text-gray-500">
                Thinking...
              </p>
            ) : null}
          </div>
        ))}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        className="shrink-0 border-t bg-white p-4"
        onSubmit={(event) => {
          event.preventDefault();
          void handleAskAI();
        }}
      >
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask a follow-up question..."
          disabled={isLoading}
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-gray-400 disabled:bg-gray-100"
        />

        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="mt-2 w-full rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Thinking..." : "Ask AI"}
        </button>
      </form>
    </aside>
  );
}
