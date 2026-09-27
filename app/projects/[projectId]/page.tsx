
import AppLayout from "@/app/components/layout/AppLayout";
import ProjectWorkspace from "@/app/components/project/ProjectWorkspace";
import { projects } from "@/app/data/projects";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { projectId } = await params;

  const project = projects.find(
    (item) => item.id === projectId
  );

  if (!project) {
    notFound();
  }

  return (
    <AppLayout>
      <ProjectWorkspace />
    </AppLayout>
  );
}