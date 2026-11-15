
import {
  FiSearch,
  FiGrid,
  FiList,
  FiX,
} from "react-icons/fi";

import styles from "./styles/ProjectToolbar.module.css";

export function ProjectToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sortBy,
  onSortChange,
  view,
  onViewChange,
  onClearFilters,
  hasActiveFilters,
  resultCount,
}) {
  return (
    <section className={styles.toolbar} aria-label="Project controls">
      <div className={styles.controls}>
        <label className={styles.searchBox}>
          <FiSearch size={17} />
          <input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Search projects"
          />
          {search && (
            <button
              type="button"
              className={styles.clearSearch}
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
            >
              <FiX size={15} />
            </button>
          )}
        </label>

        <select
          className={styles.select}
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="ALL">All statuses</option>
          <option value="PLANNING">Planning</option>
          <option value="ACTIVE">Active</option>
          <option value="ON_HOLD">On hold</option>
          <option value="COMPLETED">Completed</option>
          <option value="ARCHIVED">Archived</option>
        </select>

        <select
          className={styles.select}
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
          aria-label="Filter by priority"
        >
          <option value="ALL">All priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        <select
          className={styles.select}
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          aria-label="Sort projects"
        >
          <option value="recent">Recently created</option>
          <option value="oldest">Oldest created</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
          <option value="progress-high">Highest progress</option>
          <option value="progress-low">Lowest progress</option>
          <option value="due-date">Due date</option>
        </select>

        <div className={styles.viewToggle} aria-label="Project view">
          <button
            type="button"
            className={view === "grid" ? styles.activeView : ""}
            onClick={() => onViewChange("grid")}
            aria-label="Grid view"
            aria-pressed={view === "grid"}
          >
            <FiGrid size={17} />
          </button>

          <button
            type="button"
            className={view === "list" ? styles.activeView : ""}
            onClick={() => onViewChange("list")}
            aria-label="List view"
            aria-pressed={view === "list"}
          >
            <FiList size={17} />
          </button>
        </div>
      </div>

      <div className={styles.toolbarFooter}>
        <span>
          {resultCount} {resultCount === 1 ? "result" : "results"}
        </span>

        {hasActiveFilters && (
          <button
            type="button"
            className={styles.clearFilters}
            onClick={onClearFilters}
          >
            <FiX size={14} />
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}
