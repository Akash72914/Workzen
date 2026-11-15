
"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiMoreHorizontal,
  FiExternalLink,
  FiEdit2,
  FiArchive,
} from "react-icons/fi";

import styles from "./styles/ProjectActions.module.css";

export function ProjectActions({ project, onOpen, onEdit, onArchive }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleAction(callback) {
    setIsOpen(false);
    callback?.(project);
  }

  return (
    <div className={styles.container} ref={menuRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-label={`Actions for ${project.name}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <FiMoreHorizontal size={19} />
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu">
          <button
            type="button"
            role="menuitem"
            onClick={() => handleAction(onOpen)}
          >
            <FiExternalLink size={15} />
            <span>Open project</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => handleAction(onEdit)}
          >
            <FiEdit2 size={15} />
            <span>Edit project</span>
          </button>

          {project.status !== "ARCHIVED" && (
            <button
              type="button"
              role="menuitem"
              className={styles.archiveAction}
              onClick={() => handleAction(onArchive)}
            >
              <FiArchive size={15} />
              <span>Archive project</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
