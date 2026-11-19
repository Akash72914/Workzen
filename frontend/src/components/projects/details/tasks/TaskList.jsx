import { TaskRow } from "./TaskRow";
import styles from "./styles/TaskList.module.css";

export function TaskList({ tasks, onStatusChange, onEdit }) {
    if (tasks.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>No tasks found</h3>
                <p>Try changing your filters or create a new task.</p>
            </div>
        );
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Assignee</th>
                        <th>Due date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map((task) => (
                        <TaskRow
                            key={task.id}
                            task={task}
                            onStatusChange={onStatusChange}
                            onEdit={onEdit}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
