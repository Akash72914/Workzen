"use client";

import { useMemo, useState, useEffect } from "react";
import { mockProjects } from "@/data/projects";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectToolbar } from "./ProjectToolbar";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectList } from "./ProjectList";
import { CreateProjectDialog } from "./CreateProjectDialog";
import styles from "./styles/ProjectsPage.module.css";
import { useRouter } from "next/navigation";
import { getStoredProjects, saveProjects } from "@/utils/projectStorage";

export function ProjectsPage() {
    const [projects, setProjects] = useState(mockProjects);
    const [projectsLoaded, setProjectsLoaded] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");
    const [priority, setPriority] = useState("ALL");
    const [sortBy, setSortBy] = useState("recent");
    const [view, setView] = useState("grid");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const router = useRouter();

    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {
        queueMicrotask(() => {
            setProjects(getStoredProjects());
            setProjectsLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (projectsLoaded) {
            saveProjects(projects);
        }
    }, [projects, projectsLoaded]);

    const filteredProjects = useMemo(() => {
        const query = search.trim().toLowerCase();

        const result = projects.filter((project) => {
            const matchesSearch =
                !query ||
                project.name.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query);

            const matchesStatus = status === "ALL" || project.status === status;

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

        setProjects((current) => [newProject, ...current]);
        setIsCreateDialogOpen(false);
        clearFilters();
    }

    function handleEditProject(projectData) {
        setProjects((current) =>
            current.map((project) =>
                project.id === editingProject.id
                    ? { ...project, ...projectData }
                    : project,
            ),
        );

        setEditingProject(null);
    }

    function handleArchiveProject(project) {
        const confirmed = window.confirm(
            `Are you sure you want to archive "${project.name}"?`,
        );

        if (!confirmed) return;

        setProjects((current) =>
            current.map((item) =>
                item.id === project.id ? { ...item, status: "ARCHIVED" } : item,
            ),
        );
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
                    <ProjectGrid
                        projects={filteredProjects}
                        onOpen={(project) =>
                            router.push(`/projects/${project.id}`)
                        }
                        onEdit={setEditingProject}
                        onArchive={handleArchiveProject}
                    />
                ) : (
                    <ProjectList
                        projects={filteredProjects}
                        onOpen={(project) =>
                            router.push(`/projects/${project.id}`)
                        }
                        onEdit={setEditingProject}
                        onArchive={handleArchiveProject}
                    />
                )}
            </section>

            {isCreateDialogOpen && (
                <CreateProjectDialog
                    onClose={() => setIsCreateDialogOpen(false)}
                    onSubmit={handleCreateProject}
                    projects={projects}
                />
            )}

            {editingProject && (
                <CreateProjectDialog
                    key={editingProject.id}
                    initialProject={editingProject}
                    onClose={() => setEditingProject(null)}
                    onSubmit={handleEditProject}
                    projects={projects}
                />
            )}
        </div>
    );
}
