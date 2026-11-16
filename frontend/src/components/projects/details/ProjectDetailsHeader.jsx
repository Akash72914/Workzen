import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiEdit2 } from "react-icons/fi";
import styles from "./styles/ProjectDetailsHeader.module.css";

const statusLabels = {
  PLANNING: "Planning",
  ACTIVE: "Active",
  ON_HOLD: "On hold",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};

export function ProjectDetailsHeader({ project }) {
  const dueDate = project.dueDate
    ? new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(`${project.dueDate}T00:00:00`))
    : "Not set";

  return (
    <header className={styles.header}>
      <div className={styles.backRow}>
        <Link href="/projects" className={styles.backLink}>
          <FiArrowLeft size={15} />
          Back to projects
        </Link>
      </div>

      <div className={styles.main}>
        <div className={styles.titleGroup}>
          <div className={styles.icon}>W</div>

          <div>
            <div className={styles.meta}>
              <span>{statusLabels[project.status] || project.status}</span>
              <span className={styles.separator}>/</span>
              <span>{project.priority} priority</span>
            </div>

            <h1>{project.name}</h1>
            <p>{project.description || "No project description added."}</p>
          </div>
        </div>

        <div className={styles.actions}>
          <span className={styles.dueDate}>
            <FiCalendar size={15} />
            Due {dueDate}
          </span>

          <button type="button" disabled title="Editing is available from the Projects page">
            <FiEdit2 size={15} />
            Edit project
          </button>
        </div>
      </div>
    </header>
  );
}
