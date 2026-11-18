
import { TaskRow } from "./TaskRow";
import styles from "./styles/TaskList.module.css";

export function TaskList({ tasks, onStatusChange }) {
  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>No tasks found</h3>
        <p>Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Due date</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
