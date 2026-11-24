"use client";

import { useMemo, useState } from "react";
import { FiCheckCircle, FiClock, FiList, FiAlertCircle } from "react-icons/fi";

import {
    mockTasks,
    TASK_STATUS_OPTIONS,
    TASK_PRIORITY_OPTIONS,
} from "@/data/tasks";
import { mockProjects } from "@/data/projects";
import { getStoredTasks } from "@/utils/taskStorage";
import styles from "./styles/MyTasksPage.module.css";

const CURRENT_USER_ID = "user-001";

const STATUS_LABELS = {
    TODO: "To do",
    IN_PROGRESS: "In progress",
    REVIEW: "In review",
    DONE: "Done",
};

function formatDate(date) {
    if (!date) return "No due date";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function MyTasksPage() {
    const [tasks, setTasks] = useState(() => {
        if (typeof window === "undefined") {
            return mockTasks;
        }

        return getStoredTasks();
    });

    const [loaded, setLoaded] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");
    const [priority, setPriority] = useState("ALL");
    const [sortBy, setSortBy] = useState("dueDate");

    const myTasks = useMemo(() => {
        const query = search.trim().toLowerCase();

        return tasks
            .filter((task) => task.assignee?.id === CURRENT_USER_ID)
            .filter((task) => {
                const project = mockProjects.find(
                    (item) => item.id === task.projectId,
                );

                const matchesSearch =
                    !query ||
                    task.title.toLowerCase().includes(query) ||
                    (task.description || "").toLowerCase().includes(query) ||
                    (project?.name || "").toLowerCase().includes(query);

                const matchesStatus =
                    status === "ALL" || task.status === status;
                const matchesPriority =
                    priority === "ALL" || task.priority === priority;

                return matchesSearch && matchesStatus && matchesPriority;
            })
            .sort((a, b) => {
                if (sortBy === "dueDate") {
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate) - new Date(b.dueDate);
                }

                if (sortBy === "priority") {
                    const order = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
                    return order[a.priority] - order[b.priority];
                }

                return new Date(b.createdAt) - new Date(a.createdAt);
            });
    }, [tasks, search, status, priority, sortBy]);

    const summary = [
        {
            label: "Assigned to me",
            value: tasks.filter((task) => task.assignee?.id === CURRENT_USER_ID)
                .length,
            icon: <FiList />,
        },
        {
            label: "In progress",
            value: tasks.filter(
                (task) =>
                    task.assignee?.id === CURRENT_USER_ID &&
                    task.status === "IN_PROGRESS",
            ).length,
            icon: <FiClock />,
        },
        {
            label: "In review",
            value: tasks.filter(
                (task) =>
                    task.assignee?.id === CURRENT_USER_ID &&
                    task.status === "REVIEW",
            ).length,
            icon: <FiAlertCircle />,
        },
        {
            label: "Completed",
            value: tasks.filter(
                (task) =>
                    task.assignee?.id === CURRENT_USER_ID &&
                    task.status === "DONE",
            ).length,
            icon: <FiCheckCircle />,
        },
    ];

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>PERSONAL WORKSPACE</p>
                    <h1>My Tasks</h1>
                    <p className={styles.subtitle}>
                        Keep track of the work assigned to you across projects.
                    </p>
                </div>
                <span className={styles.taskCount}>
                    {myTasks.length} {myTasks.length === 1 ? "task" : "tasks"}
                </span>
            </header>

            <section className={styles.summaryGrid} aria-label="Task summary">
                {summary.map((item) => (
                    <article className={styles.summaryCard} key={item.label}>
                        <div className={styles.summaryIcon}>{item.icon}</div>
                        <div>
                            <p>{item.label}</p>
                            <strong>{item.value}</strong>
                        </div>
                    </article>
                ))}
            </section>

            <section className={styles.taskSection}>
                <div className={styles.toolbar}>
                    <input
                        type="search"
                        aria-label="Search my tasks"
                        placeholder="Search tasks or projects..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    <select
                        aria-label="Filter by status"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                    >
                        <option value="ALL">All statuses</option>
                        {TASK_STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <select
                        aria-label="Filter by priority"
                        value={priority}
                        onChange={(event) => setPriority(event.target.value)}
                    >
                        <option value="ALL">All priorities</option>
                        {TASK_PRIORITY_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <select
                        aria-label="Sort tasks"
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value)}
                    >
                        <option value="dueDate">Due date</option>
                        <option value="priority">Priority</option>
                        <option value="createdAt">Recently created</option>
                    </select>
                </div>

                {!loaded ? (
                    <p className={styles.message}>Loading your tasks…</p>
                ) : myTasks.length === 0 ? (
                    <div className={styles.emptyState}>
                        <FiCheckCircle />
                        <h2>No tasks found</h2>
                        <p>
                            Try changing your filters, or check back when a task
                            is assigned to you.
                        </p>
                    </div>
                ) : (
                    <div className={styles.taskList}>
                        {myTasks.map((task) => {
                            const project = mockProjects.find(
                                (item) => item.id === task.projectId,
                            );

                            return (
                                <article
                                    className={styles.taskCard}
                                    key={task.id}
                                >
                                    <div className={styles.taskMain}>
                                        <h2>{task.title}</h2>
                                        {task.description && (
                                            <p>{task.description}</p>
                                        )}
                                        <span className={styles.projectName}>
                                            {project?.name || "Project"}
                                        </span>
                                    </div>

                                    <span
                                        className={`${styles.status} ${styles[task.status]}`}
                                    >
                                        {STATUS_LABELS[task.status] ||
                                            task.status}
                                    </span>

                                    <span
                                        className={`${styles.priority} ${styles[task.priority]}`}
                                    >
                                        {task.priority}
                                    </span>

                                    <time className={styles.dueDate}>
                                        {formatDate(task.dueDate)}
                                    </time>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}
