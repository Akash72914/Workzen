"use client";

import { useMemo, useState } from "react";
import { mockProjects } from "@/data/projects";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectToolbar } from "./ProjectToolbar";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectList } from "./ProjectList";
import { CreateProjectDialog } from "./CreateProjectDialog";
import styles from "./styles/ProjectsPage.module.css";

export function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");
  const [sortBy, setSortBy] = useState("recent");
  const [view, setView] = useState("grid");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query);

      const matchesStatus =
        status === "ALL" || project.status === status;

      const matchesPriority =
        priority === "ALL" || project.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "progress-high":
          return b.progress - a.progress;
        case "progress-low":
          return a.progress - b.progress;
        case "due-date":
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "recent":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }, [projects, search, status, priority, sortBy]);

  function clearFilters() {
    setSearch("");
    setStatus("ALL");
    setPriority("ALL");
    setSortBy("recent");
  }

  function handleCreateProject(projectData) {
    const newProject = {
      ...projectData,
      id: crypto.randomUUID(),
      progress: 0,
      completedTasks: 0,
      totalTasks: 0,
      members: [projectData.owner],
      createdAt: new Date().toISOString(),
    };

    setProjects((currentProjects) => [newProject, ...currentProjects]);
    setIsCreateDialogOpen(false);
    setSearch("");
    setStatus("ALL");
    setPriority("ALL");
    setSortBy("recent");
  }

  const hasActiveFilters =
    search !== "" ||
    status !== "ALL" ||
    priority !== "ALL" ||
    sortBy !== "recent";

  return (
    <div className={styles.page}>
      <ProjectsHeader
        totalProjects={projects.length}
        onCreateClick={() => setIsCreateDialogOpen(true)}
      />

      <ProjectToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
        sortBy={sortBy}
        onSortChange={setSortBy}
        view={view}
        onViewChange={setView}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        resultCount={filteredProjects.length}
      />

      <section className={styles.results} aria-live="polite">
        <p className={styles.resultText}>
          Showing <strong>{filteredProjects.length}</strong> of{" "}
          <strong>{projects.length}</strong> projects
        </p>

        {view === "grid" ? (
          <ProjectGrid projects={filteredProjects} />
        ) : (
          <ProjectList projects={filteredProjects} />
        )}
      </section>

      {isCreateDialogOpen && (
        <CreateProjectDialog
          onClose={() => setIsCreateDialogOpen(false)}
          onSubmit={handleCreateProject}
          projects={projects}
        />
      )}
    </div>
  );
}
