import { mockProjects } from "@/data/projects";

const STORAGE_KEY = "workzen-projects";

export function getStoredProjects() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) return mockProjects;

        const parsed = JSON.parse(stored);

        return Array.isArray(parsed) ? parsed : mockProjects;
    } catch {
        return mockProjects;
    }
}

export function saveProjects(projects) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
        console.error("Unable to save projects:", error);
    }
}

export function getStoredProject(projectId) {
    return getStoredProjects().find((project) => project.id === projectId);
}
