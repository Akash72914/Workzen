
"use client";

import { useMemo } from "react";
import { dashboardData } from "@/data/dashboard";
import { useDashboardShell } from "./DashboardShell";

import { ActivityFeed } from "./ActivityFeed";
import { MyTasks } from "./MyTasks";
import { OverviewHeader } from "./OverviewHeader";
import { RecentProjects } from "./RecentProjects";
import { StatCard } from "./StatCard";

import styles from "./styles/DashboardShell.module.css";

export function DashboardContent() {
  const { search, tasks, handleTaskChange } = useDashboardShell();

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return dashboardData.projects;

    return dashboardData.projects.filter((project) =>
      project.name.toLowerCase().includes(query),
    );
  }, [search]);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return tasks;

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(query),
    );
  }, [search, tasks]);

  return (
    <>
      <OverviewHeader />

      <section
        aria-label="Project overview"
        className={styles.statsGrid}
      >
        {dashboardData.statistics.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </section>

      <div className={styles.contentGrid}>
        <RecentProjects
          projects={filteredProjects}
          search={search}
        />

        <MyTasks
          onTaskChange={handleTaskChange}
          search={search}
          tasks={filteredTasks}
        />

        <ActivityFeed activities={dashboardData.activity} />
      </div>
    </>
  );
}
