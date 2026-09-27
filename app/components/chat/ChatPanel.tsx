export default function ChatPanel() {
  return (
    <aside className="flex w-96 shrink-0 flex-col border-l bg-white">
      <div className="border-b px-4 py-3">
        <p className="text-sm font-semibold">
          AI Assistant
        </p>
      </div>

      <div className="flex-1 p-4 text-sm text-gray-500">
        Ask questions about your codebase.
      </div>

      <div className="border-t p-4">
        <input
          placeholder="Ask about your code..."
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
        />
      </div>
    </aside>
  );
}