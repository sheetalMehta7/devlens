export function getEditorLanguage(
  language?: string
): string {
  switch (language) {
    case "typescript":
      return "typescript";

    case "javascript":
      return "javascript";

    case "tsx":
      return "typescript";

    case "jsx":
      return "javascript";

    case "json":
      return "json";

    case "css":
      return "css";

    case "html":
      return "html";

    case "markdown":
      return "markdown";

    default:
      return "plaintext";
  }
}