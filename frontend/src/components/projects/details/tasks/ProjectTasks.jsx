
"use client";

import { useEffect, useMemo, useState } from "react";
import { getStoredTasks, saveTasks } from "@/utils/taskStorage";
import { TaskToolbar } from "./TaskToolbar";
import { TaskList } from "./TaskList";
import styles from "./styles/ProjectTasks.module.css";

export function ProjectTasks({ projectId }) {
  const [allTasks, setAllTasks] = useState(() => getStoredTasks());
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    saveTasks(allTasks);
  }, [allTasks]);

  const projectTasks = useMemo(
    () => allTasks.filter((task) => task.projectId === projectId),
    [allTasks, projectId],
  );

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = projectTasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);

      const matchesStatus =
        status === "ALL" || task.status === status;

      const matchesPriority =
        priority === "ALL" || task.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "due-date":
          return new Date(a.dueDate || "9999-12-31") -
            new Date(b.dueDate || "9999-12-31");
        case "priority":
          return ["URGENT", "HIGH", "MEDIUM", "LOW"].indexOf(a.priority) -
            ["URGENT", "HIGH", "MEDIUM", "LOW"].indexOf(b.priority);
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

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <div>
          <h2>Tasks</h2>
          <p>Manage and track work within this project.</p>
        </div>

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
      />

      <p className={styles.resultCount}>
        Showing {filteredTasks.length} of {projectTasks.length} tasks
      </p>
    </section>
  );
}
