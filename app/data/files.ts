import { CodeFile } from "../types/file";

export const projectFiles: CodeFile[] = [
  {
    id: "src",
    name: "src",
    path: "src",
    type: "folder",
    children: [
      {
        id: "components",
        name: "components",
        path: "src/components",
        type: "folder",
        children: [
          {
            id: "button",
            name: "Button.tsx",
            path: "src/components/Button.tsx",
            type: "file",
            language: "typescript",
            content: `interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({
  label,
  onClick,
}: ButtonProps) {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
}`,
          },
          {
            id: "modal",
            name: "Modal.tsx",
            path: "src/components/Modal.tsx",
            type: "file",
            language: "typescript",
            content: `interface ModalProps {
  open: boolean;
  children: React.ReactNode;
}

export default function Modal({
  open,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div>
      {children}
    </div>
  );
}`,
          },
        ],
      },

      {
        id: "services",
        name: "services",
        path: "src/services",
        type: "folder",
        children: [
          {
            id: "api",
            name: "api.ts",
            path: "src/services/api.ts",
            type: "file",
            language: "typescript",
            content: `export async function getUsers() {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}`,
          },
        ],
      },

      {
        id: "app",
        name: "App.tsx",
        path: "src/App.tsx",
        type: "file",
        language: "typescript",
        content: `import Button from "./components/Button";

export default function App() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <main>
      <h1>Hello DevLens</h1>

      <Button
        label="Click me"
        onClick={handleClick}
      />
    </main>
  );
}`,
      },
    ],
  },

  {
    id: "readme",
    name: "README.md",
    path: "README.md",
    type: "file",
    language: "markdown",
    content: `# E-commerce API

This is an example project used
inside DevLens.

## Features

- Authentication
- User management
- Orders
- Payments
`,
  },

  {
    id: "package",
    name: "package.json",
    path: "package.json",
    type: "file",
    language: "json",
    content: `{
  "name": "ecommerce-api",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`,
  },
];