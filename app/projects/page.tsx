import AppLayout from "../components/layout/AppLayout";
import CreateProjectButton from "../components/project/CreateProjectButton";
import ProjectCard from "../components/project/ProjectCard";
import { projects } from "../data/projects";

export default function ProjectsPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Projects
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and explore your codebases.
            </p>
          </div>

          <CreateProjectButton />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}