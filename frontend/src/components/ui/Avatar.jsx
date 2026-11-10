import styles from "./styles/Avatar.module.css";

export function Avatar({ initials, className = "", size = "medium" }) {
  return (
    <span aria-hidden="true" className={`${styles.avatar} ${styles[size]} ${className}`}>
      {initials}
    </span>
  );
}
