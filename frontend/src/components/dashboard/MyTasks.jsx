import { FiCheck } from "react-icons/fi";
import { StatusBadge } from "@/components/ui/StatusBadge";
import styles from "./styles/MyTasks.module.css";

export function MyTasks({ onTaskChange, search, tasks }) {
  const dueToday = tasks.filter((task) => task.due === "Today" && !task.completed).length;
  return (
    <section aria-labelledby="my-tasks-heading" className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <h2 id="my-tasks-heading">My tasks</h2>
          <p>Your next steps, all in one place.</p>
        </div>
        <StatusBadge tone={dueToday ? "warning" : "neutral"}>{dueToday} due today</StatusBadge>
      </div>
      {tasks.length ? (
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li className={`${styles.taskRow} ${task.completed ? styles.completed : ""}`} id={`task-${task.id}`} key={task.id} tabIndex={-1}>
              <label className={styles.taskCheck}>
                <input
                  checked={task.completed}
                  onChange={() => onTaskChange(task.id)}
                  type="checkbox"
                />
                <span aria-hidden="true" className={styles.checkVisual}><FiCheck /></span>
                <span className={styles.srOnly}>{task.completed ? "Mark incomplete" : "Complete"} {task.title}</span>
              </label>
              <div className={styles.taskInfo}>
                <span className={styles.taskTitle}>{task.title}</span>
                <span className={styles.taskProject}>{task.project}</span>
              </div>
              <span className={`${styles.due} ${task.due === "Today" && !task.completed ? styles.dueToday : ""}`}>
                {task.completed ? "Done" : task.due}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyState} role="status">
          {search ? `No tasks match “${search}”.` : "You’re all caught up."}
        </div>
      )}
    </section>
  );
}
