
import { TASK_STATUS_OPTIONS } from "@/data/tasks";
import styles from "./styles/TaskRow.module.css";

const priorityLabels = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

function formatDate(date) {
  if (!date) return "Not set";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function TaskRow({ task, onStatusChange }) {
  return (
    <tr>
      <td>
        <div className={styles.taskInfo}>
          <strong>{task.title}</strong>
          <span>{task.description}</span>

          <div className={styles.labels}>
            {task.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </td>

      <td>
        <select
          className={`${styles.status} ${styles[task.status.toLowerCase()]}`}
          value={task.status}
          onChange={(event) =>
            onStatusChange(task.id, event.target.value)
          }
          aria-label={`Status for ${task.title}`}
        >
          {TASK_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>

      <td>
        <span className={`${styles.priority} ${styles[task.priority.toLowerCase()]}`}>
          {priorityLabels[task.priority]}
        </span>
      </td>

      <td>
        <div className={styles.assignee}>
          <span className={styles.avatar}>
            {task.assignee?.initials || "—"}
          </span>
          <span>{task.assignee?.name || "Unassigned"}</span>
        </div>
      </td>

      <td className={styles.dueDate}>
        {formatDate(task.dueDate)}
      </td>
    </tr>
  );
}
