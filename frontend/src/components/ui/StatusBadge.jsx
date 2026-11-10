import styles from "./styles/StatusBadge.module.css";

export function StatusBadge({ children, tone = "accent" }) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}
