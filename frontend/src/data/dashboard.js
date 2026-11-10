export const dashboardData = {
  workspace: {
    id: "acme",
    name: "Acme Studio",
    plan: "Team workspace",
    initials: "A",
  },
  workspaces: [
    { id: "acme", name: "Acme Studio", plan: "Team workspace", initials: "A" },
    { id: "north", name: "Studio North", plan: "Design workspace", initials: "N" },
    { id: "launchpad", name: "Launchpad", plan: "Product workspace", initials: "L" },
  ],
  user: {
    name: "Alex Morgan",
    initials: "AM",
    plan: "Free plan",
  },
  navigation: [
    { id: "overview", label: "Overview", icon: "grid", href: "/" },
    { id: "projects", label: "Projects", icon: "folder", href: "/projects" },
    { id: "tasks", label: "My tasks", icon: "check", href: "/tasks" },
    { id: "calendar", label: "Calendar", icon: "calendar", href: "/calendar" },
    { id: "inbox", label: "Inbox", icon: "inbox", href: "/inbox", count: 3 },
  ],
  workspaceNavigation: [
    { id: "members", label: "Members", icon: "members", href: "/members" },
    { id: "reports", label: "Reports", icon: "reports", href: "/reports" },
    { id: "settings", label: "Settings", icon: "settings", href: "/settings" },
  ],
  statistics: [
    { id: "active-projects", label: "Active projects", value: "12", trend: "2 this month", icon: "projects", tone: "accent" },
    { id: "tasks-completed", label: "Tasks completed", value: "68%", trend: "12% this week", icon: "tasks", tone: "success" },
    { id: "team-members", label: "Team members", value: "8", trend: "2 online", icon: "team", tone: "accent" },
    { id: "due-this-week", label: "Due this week", value: "5", trend: "2 due today", icon: "due", tone: "warning" },
  ],
  projects: [
    { id: "website-redesign", name: "Website redesign", category: "Design", progress: 72, status: "In progress", initials: "W", color: "indigo", dueDate: "Oct 24" },
    { id: "mobile-app", name: "Mobile app launch", category: "Product", progress: 48, status: "In progress", initials: "M", color: "teal", dueDate: "Oct 28" },
    { id: "q4-marketing", name: "Q4 marketing plan", category: "Marketing", progress: 100, status: "Completed", initials: "Q", color: "amber", dueDate: "Oct 18" },
    { id: "customer-portal", name: "Customer portal", category: "Engineering", progress: 31, status: "In progress", initials: "C", color: "violet", dueDate: "Nov 02" },
  ],
  tasks: [
    { id: "onboarding-flow", title: "Review onboarding flow", project: "Website redesign", due: "Today", priority: "High", completed: false },
    { id: "sprint-demo", title: "Prepare sprint demo", project: "Mobile app launch", due: "Today", priority: "Medium", completed: false },
    { id: "api-docs", title: "Update API documentation", project: "Customer portal", due: "Tomorrow", priority: "Low", completed: false },
    { id: "homepage-copy", title: "Approve homepage copy", project: "Q4 marketing plan", due: "Oct 24", priority: "Medium", completed: false },
  ],
  activity: [
    { id: "activity-maya", actor: "Maya Chen", initials: "MC", action: "completed a task in", target: "Website redesign", time: "12 min ago" },
    { id: "activity-jordan", actor: "Jordan Lee", initials: "JL", action: "added a comment to", target: "Mobile app launch", time: "1 hour ago" },
    { id: "activity-alex", actor: "Alex Morgan", initials: "AM", action: "created", target: "Customer portal", time: "Yesterday" },
  ],
  notifications: [
    { id: "notification-comment", title: "Jordan Lee mentioned you", detail: "Mobile app launch · 18 min ago", unread: true },
    { id: "notification-task", title: "A task is due today", detail: "Review onboarding flow · 42 min ago", unread: true },
    { id: "notification-project", title: "Website redesign is on track", detail: "Project update · 2 hours ago", unread: true },
  ],
};
