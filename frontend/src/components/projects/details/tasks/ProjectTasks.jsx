"use client";

import { useEffect, useMemo, useState } from "react";
import { getStoredTasks, saveTasks } from "@/utils/taskStorage";
import { TaskToolbar } from "./TaskToolbar";
import { TaskList } from "./TaskList";
import styles from "./styles/ProjectTasks.module.css";
import { TaskDialog } from "./TaskDialog";
import { TASK_PRIORITY } from "@/data/tasks";

export function ProjectTasks({ project }) {
    const [allTasks, setAllTasks] = useState(() => getStoredTasks());
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");
    const [priority, setPriority] = useState("ALL");
    const [sortBy, setSortBy] = useState("recent");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        saveTasks(allTasks);
    }, [allTasks]);

    const projectTasks = allTasks.filter(
  (task) => task.projectId === project.id
);

    const filteredTasks = useMemo(() => {
        const query = search.trim().toLowerCase();

        const result = projectTasks.filter((task) => {
            const matchesSearch =
                !query ||
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query);

            const matchesStatus = status === "ALL" || task.status === status;

            const matchesPriority =
                priority === "ALL" || task.priority === priority;

            return matchesSearch && matchesStatus && matchesPriority;
        });

        return [...result].sort((a, b) => {
            switch (sortBy) {
                case "oldest":
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case "due-date":
                    return (
                        new Date(a.dueDate || "9999-12-31") -
                        new Date(b.dueDate || "9999-12-31")
                    );
                case "priority":
                    return (
                        ["URGENT", "HIGH", "MEDIUM", "LOW"].indexOf(
                            a.priority,
                        ) -
                        ["URGENT", "HIGH", "MEDIUM", "LOW"].indexOf(b.priority)
                    );
                case "recent":
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });
    }, [projectTasks, search, status, priority, sortBy]);

    function handleStatusChange(taskId, nextStatus) {
        setAllTasks((current) =>
            current.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          status: nextStatus,
                          updatedAt: new Date().toISOString(),
                      }
                    : task,
            ),
        );
    }

    function clearFilters() {
        setSearch("");
        setStatus("ALL");
        setPriority("ALL");
        setSortBy("recent");
    }

    function handleCreateTask(taskData) {
        const now = new Date().toISOString();

        const newTask = {
            id: crypto.randomUUID(),
            projectId: project.id,
            ...taskData,
            createdAt: now,
            updatedAt: now,
        };

        setAllTasks((current) => [newTask, ...current]);
        setIsDialogOpen(false);
    }

    function handleEditTask(taskData) {
        setAllTasks((current) =>
            current.map((task) =>
                task.id === editingTask.id
                    ? {
                          ...task,
                          ...taskData,
                          updatedAt: new Date().toISOString(),
                      }
                    : task,
            ),
        );

        setEditingTask(null);
        setIsDialogOpen(false);
    }

    function openEditDialog(task) {
        setEditingTask(task);
        setIsDialogOpen(true);
    }

    function closeTaskDialog() {
        setEditingTask(null);
        setIsDialogOpen(false);
    }

    return (
        <section className={styles.container}>
            <div className={styles.heading}>
                <div>
                    <h2>Tasks</h2>
                    <p>Manage and track work within this project.</p>
                </div>
                <button
  type="button"
  className={styles.addTaskButton}
  onClick={() => {
    setEditingTask(null);
    setIsDialogOpen(true);
  }}
>
  <span className={styles.addIcon}>+</span>
  Add task
</button>

                <span>{projectTasks.length} tasks</span>
            </div>

            <TaskToolbar
                search={search}
                onSearchChange={setSearch}
                status={status}
                onStatusChange={setStatus}
                priority={priority}
                onPriorityChange={setPriority}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClearFilters={clearFilters}
            />

            <TaskList
                tasks={filteredTasks}
                onStatusChange={handleStatusChange}
                onEdit={openEditDialog}
            />

            <p className={styles.resultCount}>
                Showing {filteredTasks.length} of {projectTasks.length} tasks
            </p>

            {isDialogOpen && (
                <TaskDialog
                    key={editingTask?.id || "new-task"}
                    isOpen={isDialogOpen}
                    onClose={closeTaskDialog}
                    onSubmit={editingTask ? handleEditTask : handleCreateTask}
                    project={project}
                    initialTask={editingTask}
                />
            )}
        </section>
    );
}
