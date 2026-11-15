import { FiCalendar } from "react-icons/fi";
import { ProjectActions } from "./ProjectActions";
import styles from "./styles/ProjectList.module.css";

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
    if (!date) return "Not set";

    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
}

export function ProjectList({ projects, onOpen, onEdit, onArchive }) {
    if (projects.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>No projects found</h3>
                <p>Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Status</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Progress</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Due date</th>
                        <th scope="col">Team</th>
                        <th scope="col">
                            <span className={styles.srOnly}>Actions</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>
                                <div className={styles.projectCell}>
                                    <strong>{project.name}</strong>
                                    <span>{project.description}</span>
                                </div>
                            </td>

                            <td>
                                <span
                                    className={`${styles.badge} ${styles[project.status.toLowerCase()]}`}
                                >
                                    {STATUS_LABELS[project.status]}
                                </span>
                            </td>

                            <td>
                                <span
                                    className={`${styles.badge} ${styles[project.priority.toLowerCase()]}`}
                                >
                                    {PRIORITY_LABELS[project.priority]}
                                </span>
                            </td>

                            <td>
                                <div className={styles.progressCell}>
                                    <div
                                        className={styles.progressTrack}
                                        role="progressbar"
                                        aria-label={`${project.name} progress`}
                                        aria-valuenow={project.progress}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className={styles.progressFill}
                                            style={{
                                                width: `${project.progress}%`,
                                            }}
                                        />
                                    </div>
                                    <span>{project.progress}%</span>
                                </div>
                            </td>

                            <td>
                                <div className={styles.ownerCell}>
                                    <span className={styles.avatar}>
                                        {project.owner.initials}
                                    </span>
                                    <span>{project.owner.name}</span>
                                </div>
                            </td>

                            <td>
                                <div className={styles.dateCell}>
                                    <FiCalendar size={14} />
                                    <span>{formatDate(project.dueDate)}</span>
                                </div>
                            </td>

                            <td>
                                <div
                                    className={styles.teamCell}
                                    aria-label={`${project.members.length} team members`}
                                >
                                    {project.members
                                        .slice(0, 3)
                                        .map((member) => (
                                            <span
                                                key={member.id}
                                                className={styles.avatar}
                                                title={member.name}
                                            >
                                                {member.initials}
                                            </span>
                                        ))}

                                    {project.members.length > 3 && (
                                        <span className={styles.extraMembers}>
                                            +{project.members.length - 3}
                                        </span>
                                    )}
                                </div>
                            </td>

                            <td>
                                <ProjectActions
                                    project={project}
                                    onOpen={onOpen}
                                    onEdit={onEdit}
                                    onArchive={onArchive}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
