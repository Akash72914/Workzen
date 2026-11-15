
import {
  FiCalendar,
  FiCheckCircle,
  FiMoreHorizontal,
  FiUsers,
} from "react-icons/fi";

import styles from "./styles/ProjectCard.module.css";

const STATUS_LABELS = {
  PLANNING: "Planning",
  ACTIVE: "Active",
  ON_HOLD: "On hold",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};

const PRIORITY_LABELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function ProjectCard({ project }) {
  const {
    name,
    description,
    status,
    priority,
    progress,
    owner,
    members,
    totalTasks,
    completedTasks,
    dueDate,
  } = project;

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.badges}>
          <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
            <span className={styles.statusDot} />
            {STATUS_LABELS[status]}
          </span>

          <span className={`${styles.priority} ${styles[priority.toLowerCase()]}`}>
            {PRIORITY_LABELS[priority]}
          </span>
        </div>

        <button
          className={styles.moreButton}
          type="button"
          aria-label={`More actions for ${name}`}
          disabled
          title="Project actions will be available soon"
        >
          <FiMoreHorizontal size={19} />
        </button>
      </div>

      <div className={styles.projectInfo}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeading}>
          <span>Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-label={`${name} progress`}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className={styles.taskCount}>
          <FiCheckCircle size={14} />
          <span>
            {completedTasks} of {totalTasks} tasks completed
          </span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.owner}>
          <span className={styles.ownerAvatar}>
            {owner.initials}
          </span>
          <span className={styles.ownerName}>{owner.name}</span>
        </div>

        <div className={styles.members} aria-label="Project members">
          <div className={styles.avatarStack}>
            {members.slice(0, 3).map((member, index) => (
              <span
                key={member.id}
                className={`${styles.memberAvatar} ${styles[`avatar${index + 1}`]}`}
                title={member.name}
              >
                {member.initials}
              </span>
            ))}

            {members.length > 3 && (
              <span className={styles.extraMembers}>
                +{members.length - 3}
              </span>
            )}
          </div>
          <FiUsers size={13} />
        </div>
      </div>

      <div className={styles.dueDate}>
        <FiCalendar size={14} />
        <span>Due {formatDate(dueDate)}</span>
      </div>
    </article>
  );
}
