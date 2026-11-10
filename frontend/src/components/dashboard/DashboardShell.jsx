"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { dashboardData } from "@/data/dashboard";
import { useTheme } from "@/components/providers/ThemeProvider";
import { ActivityFeed } from "./ActivityFeed";
import { MyTasks } from "./MyTasks";
import { OverviewHeader } from "./OverviewHeader";
import { RecentProjects } from "./RecentProjects";
import { Sidebar } from "./Sidebar";
import { StatCard } from "./StatCard";
import { TopBar } from "./TopBar";
import styles from "./styles/DashboardShell.module.css";

export function DashboardShell() {
  const { preference, setPreference, theme } = useTheme();
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState(dashboardData.tasks);
  const [workspaceId, setWorkspaceId] = useState(dashboardData.workspace.id);
  const menuButtonRef = useRef(null);
  const pathname = usePathname() || "/";
  const workspace = dashboardData.workspaces.find((item) => item.id === workspaceId) || dashboardData.workspace;

  useEffect(() => {
    if (!sidebarOpen) return undefined;
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setSidebarOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    document.querySelector("#primary-navigation button")?.focus();
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [sidebarOpen]);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return dashboardData.projects;
    return dashboardData.projects.filter((project) => project.name.toLowerCase().includes(query));
  }, [search]);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return tasks;
    return tasks.filter((task) => task.title.toLowerCase().includes(query));
  }, [search, tasks]);

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];
    const projects = dashboardData.projects
      .filter((project) => project.name.toLowerCase().includes(query))
      .map((project) => ({
        id: project.id,
        targetId: `project-${project.id}`,
        type: "Project",
        title: project.name,
        detail: `${project.category} · ${project.status}`,
      }));
    const matchingTasks = tasks
      .filter((task) => task.title.toLowerCase().includes(query))
      .map((task) => ({
        id: task.id,
        targetId: `task-${task.id}`,
        type: "Task",
        title: task.title,
        detail: task.project,
      }));
    return [...projects, ...matchingTasks].slice(0, 8);
  }, [search, tasks]);

  function handleTaskChange(taskId) {
    setTasks((currentTasks) => currentTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    ));
  }

  function handleNavigation() {
    setSidebarOpen(false);
    if (window.matchMedia("(max-width: 640px)").matches) {
      window.requestAnimationFrame(() => document.getElementById("main-content")?.focus());
    }
  }

  function handleSearchResult(result) {
    setSearch("");
    window.requestAnimationFrame(() => {
      const target = document.getElementById(result.targetId);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.focus({ preventScroll: true });
    });
  }

  function closeSidebar() {
    setSidebarOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <div className={styles.shell} data-theme={theme}>
      <Sidebar
        isMobileOpen={sidebarOpen}
        onClose={closeSidebar}
        onNavigate={handleNavigation}
        onWorkspaceChange={setWorkspaceId}
        pathname={pathname}
        workspace={workspace}
      />
      <div className={styles.workspace}>
        <TopBar
          isMenuOpen={sidebarOpen}
          menuButtonRef={menuButtonRef}
          onMenuClick={() => setSidebarOpen((isOpen) => !isOpen)}
          onResultSelect={handleSearchResult}
          onSearchChange={setSearch}
          onThemePreferenceChange={setPreference}
          results={searchResults}
          search={search}
          preference={preference}
          theme={theme}
          workspace={workspace}
        />
        <main className={styles.main} id="main-content" tabIndex={-1}>
          <OverviewHeader />
          <section aria-label="Project overview" className={styles.statsGrid}>
            {dashboardData.statistics.map((stat) => <StatCard key={stat.id} stat={stat} />)}
          </section>
          <div className={styles.contentGrid}>
            <RecentProjects projects={filteredProjects} search={search} />
            <MyTasks onTaskChange={handleTaskChange} search={search} tasks={filteredTasks} />
            <ActivityFeed activities={dashboardData.activity} />
          </div>
        </main>
      </div>
      {sidebarOpen && (
        <button
          aria-label="Close navigation menu"
          className={styles.scrim}
          onClick={closeSidebar}
          type="button"
        />
      )}
    </div>
  );
}
