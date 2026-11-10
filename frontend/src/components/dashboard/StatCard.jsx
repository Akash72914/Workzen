import { FiBarChart2, FiCheckCircle, FiClock, FiUsers } from "react-icons/fi";
import styles from "./styles/StatCard.module.css";

const icons = { projects: FiBarChart2, tasks: FiCheckCircle, team: FiUsers, due: FiClock };

export function StatCard({ stat }) {
  const Icon = icons[stat.icon];
  return (
    <article className={styles.card}>
      <div className={styles.heading}>
        <h2>{stat.label}</h2>
        <span className={`${styles.icon} ${styles[stat.tone]}`}><Icon aria-hidden="true" /></span>
      </div>
      <div className={styles.value}>{stat.value}</div>
      <p className={`${styles.trend} ${styles[stat.tone]}`}>{stat.tone === "warning" ? "• " : "↑ "}{stat.trend}</p>
    </article>
  );
}
