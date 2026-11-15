export default async function ProjectDetailsPage({ params }) {
    const { projectId } = await params;

    return (
        <section>
            <p>Project ID: {projectId}</p>
            <h1>Project details</h1>
            <p>
                The project details module will be implemented in a later
                milestone.
            </p>
        </section>
    );
}
