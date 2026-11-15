
"use client";

import { useEffect, useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import {
  PROJECT_STATUS,
  PROJECT_PRIORITY,
} from "@/data/projects";
import styles from "./styles/CreateProjectDialog.module.css";

const today = new Date().toISOString().slice(0, 10);

export function CreateProjectDialog({ onClose, onSubmit, projects }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: PROJECT_STATUS.PLANNING,
    priority: PROJECT_PRIORITY.MEDIUM,
    startDate: today,
    dueDate: "",
    managerId: projects[0]?.owner?.id || "",
  });

  const [error, setError] = useState("");

  const managers = useMemo(() => {
    const uniqueManagers = new Map();

    projects.forEach((project) => {
      if (project.owner) {
        uniqueManagers.set(project.owner.id, project.owner);
      }
    });

    return [...uniqueManagers.values()];
  }, [projects]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) {
      setError("Project name is required.");
      return;
    }

    if (name.length < 3 || name.length > 80) {
      setError("Project name must be between 3 and 80 characters.");
      return;
    }

    if (
      form.description.trim().length > 500
    ) {
      setError("Description cannot exceed 500 characters.");
      return;
    }

    if (
      form.startDate &&
      form.dueDate &&
      form.dueDate < form.startDate
    ) {
      setError("Due date cannot be earlier than the start date.");
      return;
    }

    const selectedManager = managers.find(
      (manager) => manager.id === form.managerId,
    );

    if (!selectedManager) {
      setError("Please select a project manager.");
      return;
    }

    onSubmit({
      name,
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      startDate: form.startDate,
      dueDate: form.dueDate,
      owner: selectedManager,
      workspace: "Acme Studio",
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
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-project-title"
      >
        <header className={styles.header}>
          <div>
            <h2 id="create-project-title">Create project</h2>
            <p>Set up a new project for your workspace.</p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <FiX size={19} />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <div className={styles.field}>
              <label htmlFor="project-name">
                Project name <span>*</span>
              </label>
              <input
                id="project-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Website redesign"
                maxLength={80}
                required
                autoFocus
              />
              <small>Use between 3 and 80 characters.</small>
            </div>

            <div className={styles.field}>
              <label htmlFor="project-description">
                Description
              </label>
              <textarea
                id="project-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="What is this project about?"
                rows={3}
                maxLength={500}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="project-workspace">Workspace</label>
              <input
                id="project-workspace"
                value="Acme Studio"
                readOnly
                aria-readonly="true"
              />
              <small>Workspace selection will be connected to workspace data later.</small>
            </div>

            <div className={styles.twoColumns}>
              <div className={styles.field}>
                <label htmlFor="project-status">Status</label>
                <select
                  id="project-status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="PLANNING">Planning</option>
                  <option value="ACTIVE">Active</option>
                  <option value="ON_HOLD">On hold</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="project-priority">Priority</label>
                <select
                  id="project-priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
            </div>

            <div className={styles.twoColumns}>
              <div className={styles.field}>
                <label htmlFor="project-start-date">Start date</label>
                <input
                  id="project-start-date"
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="project-due-date">Due date</label>
                <input
                  id="project-due-date"
                  type="date"
                  name="dueDate"
                  min={form.startDate || undefined}
                  value={form.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="project-manager">
                Project manager
              </label>
              <select
                id="project-manager"
                name="managerId"
                value={form.managerId}
                onChange={handleChange}
              >
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.name}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
          </div>

          <footer className={styles.footer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.submitButton}
            >
              Create project
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
