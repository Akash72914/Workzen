import { FiPlusCircle } from "react-icons/fi";
import styles from "./styles/ProjectActivity.module.css";

export function ProjectActivity({ project }) {
  const createdDate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(project.createdAt));

  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <h2>Activity history</h2>
        <p>Updates and events related to this project.</p>
      </div>

      <div className={styles.timeline}>
        <div className={styles.event}>
          <div className={styles.eventIcon}>
            <FiPlusCircle size={17} />
          </div>

          <div className={styles.eventContent}>
            <strong>Project created</strong>
            <p>
              {project.owner.name} created the project &quot;{project.name}&quot;.
            </p>
            <span>{createdDate}</span>
          </div>
        </div>
      </div>

      <p className={styles.note}>
        Task updates, comments, and member activity will appear here when
        activity tracking is implemented.
      </p>
    </section>
  );
}
