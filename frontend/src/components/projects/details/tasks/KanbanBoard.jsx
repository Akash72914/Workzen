import { KanbanColumn } from "./KanbanColumn";
import styles from "./styles/KanbanBoard.module.css";

const columns = [
    { status: "TODO", title: "To do" },
    { status: "IN_PROGRESS", title: "In progress" },
    { status: "REVIEW", title: "In review" },
    { status: "DONE", title: "Done" },
];

export function KanbanBoard({ tasks, onStatusChange, onEdit }) {
    function handleDragStart(event, task) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", task.id);
    }

    function handleDrop(event, newStatus) {
        const taskId = event.dataTransfer.getData("text/plain");

        if (!taskId) return;

        onStatusChange(taskId, newStatus);
    }

    return (
        <div className={styles.board}>
            {columns.map((column) => (
                <KanbanColumn
                    key={column.status}
                    status={column.status}
                    title={column.title}
                    tasks={tasks.filter(
                        (task) => task.status === column.status,
                    )}
                    onDrop={handleDrop}
                    onDragStart={handleDragStart}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}
