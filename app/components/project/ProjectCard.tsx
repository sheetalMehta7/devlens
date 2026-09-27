import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block rounded-xl border bg-white p-5 transition hover:border-gray-300 hover:shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
          <FolderGit2 size={20} />
        </div>

        <ArrowUpRight
          size={18}
          className="text-gray-400 transition group-hover:text-gray-900"
        />
      </div>

      <h2 className="mt-4 font-semibold text-gray-900">
        {project.name}
      </h2>

      <p className="mt-2 line-clamp-2 text-sm text-gray-500">
        {project.description}
      </p>

      <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
        <span>{project.language}</span>
        <span>{project.fileCount} files</span>
      </div>

      <div className="mt-3 text-xs text-gray-400">
        Updated {project.updatedAt}
      </div>
    </Link>
  );
}