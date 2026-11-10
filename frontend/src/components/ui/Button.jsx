import styles from "./styles/Button.module.css";

export function Button({ children, className = "", variant = "primary", type = "button", ...props }) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} type={type} {...props}>
      {children}
    </button>
  );
}
