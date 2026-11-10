import styles from "./styles/ActivityFeed.module.css";
import { Avatar } from "@/components/ui/Avatar";

export function ActivityFeed({ activities }) {
  return (
    <section aria-labelledby="activity-heading" className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <h2 id="activity-heading">Recent activity</h2>
          <p>Latest updates from your workspace.</p>
        </div>
        <button aria-label="View all recent activity" className={styles.viewAll} type="button">View all</button>
      </div>
      <ul className={styles.activityList}>
        {activities.map((activity) => (
          <li className={styles.activityRow} key={activity.id}>
            <Avatar className={styles.avatar} initials={activity.initials} size="small" />
            <p><strong>{activity.actor}</strong> {activity.action} <span className={styles.target}>{activity.target}</span></p>
            <time className={styles.time}>{activity.time}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}
