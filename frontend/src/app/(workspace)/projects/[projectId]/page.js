import { ProjectDetailsPage } from "@/components/projects/details/ProjectDetailsPage";

export default async function ProjectDetailsRoute({ params }) {
    const { projectId } = await params;

    return <ProjectDetailsPage projectId={projectId} />;
}
