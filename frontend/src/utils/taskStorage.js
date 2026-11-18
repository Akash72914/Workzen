import { mockTasks } from "@/data/tasks";

const STORAGE_KEY = "workzen-tasks";

export function getStoredTasks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) return mockTasks;

        const parsed = JSON.parse(stored);

        return Array.isArray(parsed) ? parsed : mockTasks;
    } catch {
        return mockTasks;
    }
}

export function saveTasks(tasks) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Unable to save tasks:", error);
    }
}

export function getTasksByProject(projectId) {
    return getStoredTasks().filter((task) => task.projectId === projectId);
}
