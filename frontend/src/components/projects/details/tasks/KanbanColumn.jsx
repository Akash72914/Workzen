import { KanbanCard } from "./KanbanCard";
import styles from "./styles/KanbanColumn.module.css";

export function KanbanColumn({
    status,
    title,
    tasks,
    onDrop,
    onDragStart,
    onEdit,
}) {
    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        onDrop(event, status);
    }

    return (
        <section
            className={styles.column}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <header className={styles.header}>
                <div className={styles.heading}>
                    <span className={`${styles.statusDot} ${styles[status]}`} />
                    <h3>{title}</h3>
                    <span className={styles.count}>{tasks.length}</span>
                </div>
            </header>

            <div className={styles.cards}>
                {tasks.length === 0 ? (
                    <div className={styles.empty}>Drop a task here</div>
                ) : (
                    tasks.map((task) => (
                        <KanbanCard
                            key={task.id}
                            task={task}
                            onDragStart={onDragStart}
                            onEdit={onEdit}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
