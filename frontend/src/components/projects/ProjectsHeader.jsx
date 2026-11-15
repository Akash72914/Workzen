
import { FiPlus } from "react-icons/fi";
import styles from "./styles/ProjectsHeader.module.css";

export function ProjectsHeader({ totalProjects }) {
  return (
    <header className={styles.header}>
      <div className={styles.heading}>
        <div>
          <h1>Projects</h1>
          <p>Manage and track all your workspace projects.</p>
        </div>

        <span className={styles.count}>
          {totalProjects} projects
        </span>
      </div>

      <button
        className={styles.createButton}
        type="button"
        disabled
        title="Project creation will be implemented in the next step"
      >
        <FiPlus size={17} />
        <span>Create project</span>
      </button>
    </header>
  );
}
