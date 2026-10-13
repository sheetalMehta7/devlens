
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MarkdownResponseProps {
  content: string;
}

export default function MarkdownResponse({
  content,
}: MarkdownResponseProps) {
  return (
    <div className="markdown-response min-w-0 text-sm leading-6 text-gray-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-3 mt-5 text-xl font-bold text-gray-950 first:mt-0">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-2 mt-5 text-lg font-semibold text-gray-950 first:mt-0">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-2 mt-4 text-base font-semibold text-gray-950">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-3 whitespace-pre-wrap break-words last:mb-0">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="mb-3 list-disc space-y-1 pl-5">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-3 list-decimal space-y-1 pl-5">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="pl-1">{children}</li>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold text-gray-950">
              {children}
            </strong>
          ),

          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-4 border-gray-300 pl-3 text-gray-600">
              {children}
            </blockquote>
          ),

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline underline-offset-2"
            >
              {children}
            </a>
          ),

          pre: ({ children }) => (
            <pre className="my-3 max-w-full overflow-x-auto rounded-lg bg-gray-950 p-4 text-xs leading-5">
              {children}
            </pre>
          ),

          code: ({ className, children, ...props }) => {
            const isBlock = Boolean(className);

            if (isBlock) {
              return (
                <code
                  className={`${className ?? ""} font-mono`}
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <code
                className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.85em] text-pink-700"
                {...props}
              >
                {children}
              </code>
            );
          },

          table: ({ children }) => (
            <div className="my-3 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),

          th: ({ children }) => (
            <th className="border bg-gray-100 px-3 py-2 font-semibold">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border px-3 py-2">
              {children}
            </td>
          ),

          hr: () => <hr className="my-4 border-gray-200" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
