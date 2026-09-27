"use client";

import { Plus } from "lucide-react";

export default function CreateProjectButton() {
  const handleCreateProject = () => {
    console.log("Create project");
  };

  return (
    <button
      onClick={handleCreateProject}
      className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
    >
      <Plus size={18} />
      New Project
    </button>
  );
}