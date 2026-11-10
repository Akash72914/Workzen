import { FiArrowUpRight, FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import styles from "./styles/RecentProjects.module.css";

const projectColors = { indigo: "indigo", teal: "teal", amber: "amber", violet: "violet" };

export function RecentProjects({ projects, search }) {
  return (
    <section aria-labelledby="recent-projects-heading" className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <h2 id="recent-projects-heading">Recent projects</h2>
          <p>Keep an eye on your team’s active work.</p>
        </div>
        <Button aria-label="View all projects" className={styles.viewAll} variant="ghost">
          View all <FiArrowUpRight aria-hidden="true" />
        </Button>
      </div>
      {projects.length ? (
        <div className={styles.projectList}>
          {projects.map((project) => (
            <article className={styles.projectRow} id={`project-${project.id}`} key={project.id} tabIndex={-1}>
              <span aria-hidden="true" className={`${styles.projectMark} ${styles[projectColors[project.color]]}`}>
                {project.initials}
              </span>
              <div className={styles.projectInfo}>
                <h3>{project.name}</h3>
                <p>{project.category}</p>
              </div>
              <div className={styles.progressColumn}>
                <div className={styles.progressLabel}>
                  <span>Progress</span><span>{project.progress}%</span>
                </div>
                <progress
                  aria-label={`${project.name} progress`}
                  className={styles.progressTrack}
                  max="100"
                  value={project.progress}
                >
                  {project.progress}%
                </progress>
              </div>
              <StatusBadge tone={project.status === "Completed" ? "success" : "accent"}>
                {project.status}
              </StatusBadge>
              <Button aria-label={`More options for ${project.name}`} className={styles.moreButton} variant="ghost">
                <FiMoreHorizontal aria-hidden="true" />
              </Button>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState} role="status">
          {search ? `No projects match “${search}”.` : "No projects to show yet."}
        </div>
      )}
    </section>
  );
}
