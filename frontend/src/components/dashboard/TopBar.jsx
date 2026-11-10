import { useEffect, useRef, useState } from "react";
import { FiBell, FiMenu, FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import { dashboardData } from "@/data/dashboard";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { SearchField } from "@/components/ui/SearchField";
import styles from "./styles/TopBar.module.css";

export function TopBar({ isMenuOpen, menuButtonRef, onMenuClick, onResultSelect, onSearchChange, onThemePreferenceChange, preference, results, search, theme, workspace }) {
  const [openPanel, setOpenPanel] = useState(null);
  const panelRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    if (!openPanel) return undefined;
    function closePanel(event) {
      if (event.key === "Escape") {
        setOpenPanel(null);
        (openPanel === "notifications" ? notificationRef : profileRef).current?.focus();
      }
      if (event.type === "pointerdown" && !panelRef.current?.contains(event.target)) {
        if (!notificationRef.current?.contains(event.target) && !profileRef.current?.contains(event.target)) {
          setOpenPanel(null);
        }
      }
    }
    document.addEventListener("keydown", closePanel);
    document.addEventListener("pointerdown", closePanel);
    return () => {
      document.removeEventListener("keydown", closePanel);
      document.removeEventListener("pointerdown", closePanel);
    };
  }, [openPanel]);

  const ThemeIcon = preference === "system" ? FiMonitor : theme === "dark" ? FiMoon : FiSun;

  return (
    <header className={styles.topbar}>
      <div className={styles.mobileBrand}>
        <Button ref={menuButtonRef} aria-controls="primary-navigation" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} className={styles.menuButton} onClick={onMenuClick} variant="ghost">
          <FiMenu aria-hidden="true" />
        </Button>
        <span aria-hidden="true" className={styles.brandMark}>W</span>
        <span className={styles.mobileWorkspace}>{workspace.name}</span>
      </div>
      <div aria-label="Breadcrumb" className={styles.breadcrumb}>
        <span>{workspace.name}</span><span aria-hidden="true">/</span><span>Overview</span>
      </div>
      <div className={styles.actions}>
        <SearchField className={styles.search} onChange={onSearchChange} onResultSelect={onResultSelect} results={results} value={search} />
        <label className={styles.themeControl}>
          <ThemeIcon aria-hidden="true" />
          <span className={styles.srOnly}>Theme preference</span>
          <select aria-label="Theme preference" onChange={(event) => onThemePreferenceChange(event.target.value)} value={preference}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <Button
          aria-controls="notifications-popover"
          aria-expanded={openPanel === "notifications"}
          aria-label={`Notifications, ${dashboardData.notifications.filter((notification) => notification.unread).length} unread`}
          className={styles.iconButton}
          onClick={() => setOpenPanel((current) => current === "notifications" ? null : "notifications")}
          ref={notificationRef}
          variant="ghost"
        >
          <FiBell aria-hidden="true" />
          <span aria-hidden="true" className={styles.notificationDot} />
        </Button>
        <button
          aria-controls="profile-popover"
          aria-expanded={openPanel === "profile"}
          aria-label={`Profile menu for ${dashboardData.user.name}`}
          className={styles.profile}
          onClick={() => setOpenPanel((current) => current === "profile" ? null : "profile")}
          ref={profileRef}
          type="button"
        >
          <Avatar initials={dashboardData.user.initials} size="small" />
        </button>
        {openPanel === "notifications" && (
          <section aria-labelledby="notifications-heading" className={styles.popover} id="notifications-popover" ref={panelRef}>
            <div className={styles.popoverHeader}>
              <h2 id="notifications-heading">Notifications</h2>
              <span>{dashboardData.notifications.filter((notification) => notification.unread).length} new</span>
            </div>
            <ul className={styles.notificationList}>
              {dashboardData.notifications.map((notification) => (
                <li className={styles.notificationItem} key={notification.id}>
                  <span aria-hidden="true" className={notification.unread ? styles.unreadDot : styles.readDot} />
                  <span><strong>{notification.title}</strong><small>{notification.detail}</small></span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {openPanel === "profile" && (
          <section aria-labelledby="profile-heading" className={styles.popover} id="profile-popover" ref={panelRef}>
            <div className={styles.profileSummary}>
              <Avatar initials={dashboardData.user.initials} size="large" />
              <span><strong id="profile-heading">{dashboardData.user.name}</strong><small>{dashboardData.user.plan}</small></span>
            </div>
            <p className={styles.placeholder}>Profile and account settings will be available here.</p>
          </section>
        )}
      </div>
    </header>
  );
}
