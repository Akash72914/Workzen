import Link from "next/link";
import { FiBarChart2, FiCalendar, FiCheckSquare, FiChevronDown, FiFolder, FiGrid, FiInbox, FiSettings, FiUsers, FiX } from "react-icons/fi";
import { dashboardData } from "@/data/dashboard";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import styles from "./styles/Sidebar.module.css";

const icons = { grid: FiGrid, folder: FiFolder, check: FiCheckSquare, calendar: FiCalendar, inbox: FiInbox };
const workspaceIcons = [FiUsers, FiBarChart2, FiSettings];

function isCurrentRoute(pathname, href) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ isMobileOpen, onClose, onNavigate, onWorkspaceChange, pathname, workspace }) {
  return (
    <>
      <aside aria-label="Workspace navigation" className={`${styles.sidebar} ${isMobileOpen ? styles.mobileOpen : ""}`} id="primary-navigation">
        <div className={styles.brandRow}>
          <a aria-label="Workzen home" className={styles.brand} href="#main-content">
            <span aria-hidden="true" className={styles.brandMark}>W</span>
            <span className={styles.brandName}>Workzen</span>
          </a>
          <Button aria-label="Close navigation" className={styles.closeButton} onClick={onClose} variant="ghost">
            <FiX aria-hidden="true" />
          </Button>
        </div>

        <label className={styles.workspaceSwitch}>
          <span aria-hidden="true" className={styles.workspaceMark}>{workspace.initials}</span>
          <span className={styles.workspaceText}>
            <span className={styles.workspaceName}>{workspace.name}</span>
            <span className={styles.workspacePlan}>{workspace.plan}</span>
          </span>
          <FiChevronDown aria-hidden="true" className={styles.chevron} />
          <select
            aria-label="Select workspace"
            className={styles.workspaceSelect}
            onChange={(event) => onWorkspaceChange(event.target.value)}
            value={workspace.id}
          >
            {dashboardData.workspaces.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </label>

        <nav aria-label="Main" className={styles.primaryNav}>
          {dashboardData.navigation.map((item) => {
            const Icon = icons[item.icon];
            return (
              <Link
                aria-current={isCurrentRoute(pathname, item.href) ? "page" : undefined}
                className={`${styles.navItem} ${isCurrentRoute(pathname, item.href) ? styles.active : ""}`}
                href={item.href}
                key={item.id}
                onClick={onNavigate}
              >
                <Icon aria-hidden="true" className={styles.navIcon} />
                <span className={styles.navLabel}>{item.label}</span>
                {item.count && <span className={styles.navCount}>{item.count}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sectionLabel}>Workspace</div>
        <nav aria-label="Workspace" className={styles.secondaryNav}>
          {dashboardData.workspaceNavigation.map((item, index) => {
            const Icon = workspaceIcons[index];
            return (
              <Link
                aria-current={isCurrentRoute(pathname, item.href) ? "page" : undefined}
                className={`${styles.navItem} ${isCurrentRoute(pathname, item.href) ? styles.active : ""}`}
                href={item.href}
                key={item.id}
                onClick={onNavigate}
              >
                <Icon aria-hidden="true" className={styles.navIcon} />
                <span className={styles.navLabel}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.account}>
          <Avatar className={styles.avatar} initials={dashboardData.user.initials} size="large" />
          <span className={styles.accountText}>
            <span className={styles.accountName}>{dashboardData.user.name}</span>
            <span className={styles.accountPlan}>{dashboardData.user.plan}</span>
          </span>
        </div>
      </aside>

      <nav aria-label="Mobile navigation" className={styles.mobileNav}>
        {dashboardData.navigation.filter((item) => ["overview", "projects", "tasks", "inbox"].includes(item.id)).map((item) => {
          const Icon = icons[item.icon];
          return (
            <Link
              aria-current={isCurrentRoute(pathname, item.href) ? "page" : undefined}
              className={`${styles.mobileNavItem} ${isCurrentRoute(pathname, item.href) ? styles.mobileNavActive : ""}`}
              href={item.href}
              key={item.id}
              onClick={onNavigate}
            >
              <Icon aria-hidden="true" />
              <span>{item.label === "My tasks" ? "Tasks" : item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
