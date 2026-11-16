import {
  FiCheckCircle,
  FiClipboard,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import styles from "./styles/ProjectStats.module.css";

export function ProjectStats({ project }) {
  const statistics = [
    {
      label: "Total tasks",
      value: project.totalTasks,
      icon: FiClipboard,
    },
    {
      label: "Completed tasks",
      value: project.completedTasks,
      icon: FiCheckCircle,
    },
    {
      label: "Progress",
      value: `${project.progress}%`,
      icon: FiTrendingUp,
    },
    {
      label: "Team members",
      value: project.members.length,
      icon: FiUsers,
    },
  ];

  return (
    <section className={styles.grid} aria-label="Project statistics">
      {statistics.map(({ label, value, icon: Icon }) => (
        <article className={styles.card} key={label}>
          <div className={styles.icon}>
            <Icon size={17} />
          </div>

          <div>
            <p>{label}</p>
            <strong>{value}</strong>
          </div>
        </article>
      ))}
    </section>
  );
}
