"use client";

import { useState } from "react";
import styles from "./styles/TaskDialog.module.css";
import { TASK_PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from "@/data/tasks";

const emptyForm = {
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    assigneeId: "",
    startDate: "",
    dueDate: "",
    labels: "",
};

function getInitialForm(task) {
    if (!task) return emptyForm;

    return {
        title: task.title || "",
        description: task.description || "",
        status: task.status || "TODO",
        priority: task.priority || "MEDIUM",
        assigneeId: task.assignee?.id || "",
        startDate: task.startDate || "",
        dueDate: task.dueDate || "",
        labels: (task.labels || []).join(", "),
    };
}

export function TaskDialog(props) {
    const { isOpen, initialTask = null } = props;

    if (!isOpen) return null;

    // Mount a fresh form when the dialog opens or switches to another task.
    // This keeps initialization out of an effect and clears stale validation errors.
    return (
        <TaskDialogContent
            key={initialTask?.id ?? "new-task"}
            {...props}
            initialTask={initialTask}
        />
    );
}

function TaskDialogContent({
    isOpen,
    onClose,
    onSubmit,
    project,
    initialTask = null,
}) {
    const [form, setForm] = useState(() => getInitialForm(initialTask));
    const [error, setError] = useState("");

    const isEditing = Boolean(initialTask);

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const title = form.title.trim();
        const description = form.description.trim();

        if (title.length < 3 || title.length > 120) {
            setError("Task title must be between 3 and 120 characters.");
            return;
        }

        if (description.length > 1000) {
            setError("Description cannot exceed 1000 characters.");
            return;
        }

        if (form.startDate && form.dueDate && form.dueDate < form.startDate) {
            setError("Due date cannot be earlier than the start date.");
            return;
        }

        const assignee =
            project.members.find((member) => member.id === form.assigneeId) ||
            null;

        onSubmit({
            title,
            description,
            status: form.status,
            priority: form.priority,
            assignee,
            reporter: initialTask?.reporter || project.owner,
            startDate: form.startDate,
            dueDate: form.dueDate,
            labels: [
                ...new Set(
                    form.labels
                        .split(",")
                        .map((label) => label.trim())
                        .filter(Boolean),
                ),
            ],
        });
    }

    return (
        <div
            className={styles.overlay}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                aria-labelledby="task-dialog-title"
                aria-modal="true"
                className={styles.dialog}
                role="dialog"
            >
                <header className={styles.header}>
                    <div>
                        <h2 id="task-dialog-title">
                            {isEditing ? "Edit task" : "Create task"}
                        </h2>
                        <p>Manage the task details for {project.name}.</p>
                    </div>

                    <button
                        aria-label="Close dialog"
                        className={styles.closeButton}
                        onClick={onClose}
                        type="button"
                    >
                        ×
                    </button>
                </header>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="task-title">Task title *</label>
                        <input
                            autoFocus
                            id="task-title"
                            maxLength={120}
                            name="title"
                            onChange={handleChange}
                            placeholder="e.g. Implement user authentication"
                            required
                            value={form.title}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="task-description">Description</label>
                        <textarea
                            id="task-description"
                            maxLength={1000}
                            name="description"
                            onChange={handleChange}
                            placeholder="Describe what needs to be done..."
                            rows={4}
                            value={form.description}
                        />
                    </div>

                    <div className={styles.twoColumns}>
                        <div className={styles.field}>
                            <label htmlFor="task-status">Status</label>
                            <select
                                id="task-status"
                                name="status"
                                onChange={handleChange}
                                value={form.status}
                            >
                                {TASK_STATUS_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="task-priority">Priority</label>
                            <select
                                id="task-priority"
                                name="priority"
                                onChange={handleChange}
                                value={form.priority}
                            >
                                {TASK_PRIORITY_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="task-assignee">Assignee</label>
                        <select
                            id="task-assignee"
                            name="assigneeId"
                            onChange={handleChange}
                            value={form.assigneeId}
                        >
                            <option value="">Unassigned</option>
                            {project.members.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.twoColumns}>
                        <div className={styles.field}>
                            <label htmlFor="task-start-date">Start date</label>
                            <input
                                id="task-start-date"
                                name="startDate"
                                onChange={handleChange}
                                type="date"
                                value={form.startDate}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="task-due-date">Due date</label>
                            <input
                                id="task-due-date"
                                min={form.startDate || undefined}
                                name="dueDate"
                                onChange={handleChange}
                                type="date"
                                value={form.dueDate}
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="task-labels">Labels</label>
                        <input
                            id="task-labels"
                            name="labels"
                            onChange={handleChange}
                            placeholder="frontend, bug, authentication"
                            value={form.labels}
                        />
                        <small>Separate labels with commas.</small>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <footer className={styles.footer}>
                        <button
                            className={styles.cancelButton}
                            onClick={onClose}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button className={styles.submitButton} type="submit">
                            {isEditing ? "Save changes" : "Create task"}
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    );
}
