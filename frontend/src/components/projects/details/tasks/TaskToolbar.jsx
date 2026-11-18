
"use client";

import { FiSearch, FiX } from "react-icons/fi";
import styles from "./styles/TaskToolbar.module.css";

export function TaskToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sortBy,
  onSortChange,
  onClearFilters,
}) {
  const hasFilters =
    search || status !== "ALL" || priority !== "ALL" || sortBy !== "recent";

  return (
    <div className={styles.toolbar}>
      <label className={styles.search}>
        <FiSearch size={16} />
        <input
          type="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Search tasks"
        />
      </label>

      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        aria-label="Filter tasks by status"
      >
        <option value="ALL">All statuses</option>
        <option value="TODO">To do</option>
        <option value="IN_PROGRESS">In progress</option>
        <option value="REVIEW">In review</option>
        <option value="DONE">Done</option>
      </select>

      <select
        value={priority}
        onChange={(event) => onPriorityChange(event.target.value)}
        aria-label="Filter tasks by priority"
      >
        <option value="ALL">All priorities</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="URGENT">Urgent</option>
      </select>

      <select
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
        aria-label="Sort tasks"
      >
        <option value="recent">Recently created</option>
        <option value="oldest">Oldest created</option>
        <option value="due-date">Due date</option>
        <option value="priority">Priority</option>
      </select>

      {hasFilters && (
        <button type="button" onClick={onClearFilters}>
          <FiX size={14} />
          Clear
        </button>
      )}
    </div>
  );
}
    