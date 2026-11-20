import styles from "./styles/KanbanCard.module.css";

export function KanbanCard({ task, onDragStart, onEdit }) {
    return (
        <article
            className={styles.card}
            draggable
            onDragStart={(event) => onDragStart(event, task)}
        >
            <div className={styles.topRow}>
                <span className={`${styles.priority} ${styles[task.priority]}`}>
                    {task.priority}
                </span>

                <button
                    type="button"
                    className={styles.editButton}
                    onClick={() => onEdit(task)}
                    aria-label={`Edit ${task.title}`}
                    draggable={false}
                >
                    Edit
                </button>
            </div>

            <h4 className={styles.title}>{task.title}</h4>

            {task.description && (
                <p className={styles.description}>{task.description}</p>
            )}

            {task.labels?.length > 0 && (
                <div className={styles.labels}>
                    {task.labels.map((label) => (
                        <span key={label} className={styles.label}>
                            {label}
                        </span>
                    ))}
                </div>
            )}

            <div className={styles.footer}>
                <span className={styles.assignee}>
                    {task.assignee?.initials || "—"}
                </span>

                <span className={styles.dueDate}>
                    {task.dueDate
                        ? new Date(
                              `${task.dueDate}T00:00:00`,
                          ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                          })
                        : "No due date"}
                </span>
            </div>
        </article>
    );
}
