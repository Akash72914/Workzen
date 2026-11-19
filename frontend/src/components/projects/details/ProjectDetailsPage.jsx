"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredProject } from "@/utils/projectStorage";

import { ProjectDetailsHeader } from "./ProjectDetailsHeader";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectStats } from "./ProjectStats";
import { ProjectTeam } from "./ProjectTeam";
import { ProjectActivity } from "./ProjectActivity";
import { ProjectTasks } from "./tasks/ProjectTasks";

import styles from "./styles/ProjectDetailsPage.module.css";

export function ProjectDetailsPage({ projectId }) {
    const [project, setProject] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let cancelled = false;

        queueMicrotask(() => {
            if (cancelled) return;

            setProject(getStoredProject(projectId) || null);
            setLoaded(true);
        });

        return () => {
            cancelled = true;
        };
    }, [projectId]);

    if (!loaded) {
        return <div className={styles.state}>Loading project...</div>;
    }

    if (!project) {
        return (
            <div className={styles.state}>
                <h2>Project not found</h2>
                <p>This project may have been removed or is unavailable.</p>
                <Link href="/projects">Back to projects</Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <ProjectDetailsHeader project={project} />

            <ProjectStats project={project} />

            <nav className={styles.tabs} aria-label="Project sections">
                <button
                    type="button"
                    className={activeTab === "overview" ? styles.activeTab : ""}
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </button>

                <button
                    type="button"
                    className={activeTab === "tasks" ? styles.activeTab : ""}
                    onClick={() => setActiveTab("tasks")}
                >
                    Tasks
                </button>

                <button
                    type="button"
                    className={activeTab === "activity" ? styles.activeTab : ""}
                    onClick={() => setActiveTab("activity")}
                >
                    Activity
                </button>
            </nav>

            {activeTab === "overview" && (
                <div className={styles.contentGrid}>
                    <ProjectOverview project={project} />
                    <ProjectTeam project={project} />
                </div>
            )}

            {activeTab === "tasks" && <ProjectTasks project={project} />}

            {activeTab === "activity" && <ProjectActivity project={project} />}
        </div>
    );
}
