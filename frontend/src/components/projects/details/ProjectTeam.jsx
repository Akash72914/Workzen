import { FiUsers } from "react-icons/fi";
import styles from "./styles/ProjectTeam.module.css";

export function ProjectTeam({ project }) {
  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <div>
          <h2>Project team</h2>
          <p>People working on this project.</p>
        </div>

        <span>{project.members.length}</span>
      </div>

      <div className={styles.members}>
        {project.members.map((member) => (
          <div className={styles.member} key={member.id}>
            <div className={styles.avatar}>
              {member.initials}
            </div>

            <div className={styles.memberInfo}>
              <strong>{member.name}</strong>
              <span>
                {member.id === project.owner.id
                  ? "Project manager"
                  : "Team member"}
              </span>
            </div>

            {member.id === project.owner.id && (
              <span className={styles.ownerBadge}>Owner</span>
            )}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <FiUsers size={15} />
        <span>Team management will be available soon.</span>
      </div>
    </section>
  );
}
