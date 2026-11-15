
import { ProjectCard } from "./ProjectCard";
import styles from "./styles/ProjectGrid.module.css";

export function ProjectGrid({ projects }) {
  if (projects.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No projects found</h3>
        <p>Try adjusting your search or filters to find projects.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
