import { FiCalendar, FiFlag, FiUser } from "react-icons/fi";
import styles from "./styles/ProjectOverview.module.css";

function formatDate(date) {
  if (!date) return "Not set";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function ProjectOverview({ project }) {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <h2>Project overview</h2>
        <p>Basic information about this project.</p>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeading}>
          <span>Overall progress</span>
          <strong>{project.progress}%</strong>
        </div>

        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-label="Overall project progress"
          aria-valuenow={project.progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${project.progress}%` }}
          />
        </div>

        <p>
          {project.completedTasks} of {project.totalTasks} tasks completed
        </p>
      </div>

      <div className={styles.details}>
        <div>
          <span><FiUser size={15} /> Project manager</span>
          <strong>{project.owner.name}</strong>
        </div>

        <div>
          <span><FiCalendar size={15} /> Start date</span>
          <strong>{formatDate(project.startDate)}</strong>
        </div>

        <div>
          <span><FiCalendar size={15} /> Due date</span>
          <strong>{formatDate(project.dueDate)}</strong>
        </div>

        <div>
          <span><FiFlag size={15} /> Priority</span>
          <strong>{project.priority}</strong>
        </div>
      </div>
    </section>
  );
}
