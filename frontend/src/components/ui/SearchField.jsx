"use client";

import { useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import styles from "./styles/SearchField.module.css";

export function SearchField({ className = "", onChange, onResultSelect, results = [], value }) {
  const inputRef = useRef(null);
  const [activeResult, setActiveResult] = useState({ query: "", index: -1 });
  const activeIndex = activeResult.query === value ? activeResult.index : -1;
  const showResults = value.trim().length > 0;

  function updateActiveIndex(nextIndex) {
    setActiveResult((current) => {
      const currentIndex = current.query === value ? current.index : -1;
      return { query: value, index: typeof nextIndex === "function" ? nextIndex(currentIndex) : nextIndex };
    });
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown" && results.length) {
      event.preventDefault();
      updateActiveIndex((current) => current < 0 ? 0 : Math.min(current + 1, results.length - 1));
    } else if (event.key === "ArrowUp" && results.length) {
      event.preventDefault();
      updateActiveIndex((current) => current <= 0 ? results.length - 1 : current - 1);
    } else if (event.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      event.preventDefault();
      onResultSelect(results[activeIndex]);
      updateActiveIndex(-1);
    } else if (event.key === "Escape") {
      if (value) {
        event.preventDefault();
        onChange("");
        updateActiveIndex(-1);
      }
    }
  }

  return (
    <div className={`${styles.search} ${className}`}>
      <FiSearch aria-hidden="true" className={styles.searchIcon} />
      <button aria-label="Open search" className={styles.searchTrigger} onClick={() => inputRef.current?.focus()} type="button">
        <FiSearch aria-hidden="true" />
      </button>
      <input
        aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
        aria-autocomplete="list"
        aria-controls={showResults ? `dashboard-search-${results.length ? "listbox" : "status"}` : undefined}
        aria-expanded={showResults}
        aria-label="Search project names and task titles"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search projects, tasks..."
        ref={inputRef}
        role="combobox"
        type="search"
        value={value}
      />
      {value && (
        <button aria-label="Clear search" className={styles.clearButton} onClick={() => onChange("")} type="button">
          <FiX aria-hidden="true" />
        </button>
      )}
      {showResults && (
        results.length ? (
          <div className={`${styles.results} ${styles.resultsList}`} id="dashboard-search-listbox" role="listbox" aria-label="Search results">
            {results.map((result, index) => (
            <button
              aria-selected={activeIndex === index}
              className={`${styles.result} ${activeIndex === index ? styles.resultActive : ""}`}
              id={`search-result-${index}`}
              key={`${result.type}-${result.id}`}
              onClick={() => onResultSelect(result)}
              onMouseDown={(event) => event.preventDefault()}
              role="option"
              tabIndex={-1}
              type="button"
            >
              <span className={styles.resultType}>{result.type}</span>
              <span className={styles.resultText}>
                <span className={styles.resultTitle}>{result.title}</span>
                <span className={styles.resultDetail}>{result.detail}</span>
              </span>
            </button>
            ))}
            <p className={styles.keyboardHint}>Use ↑ ↓ to navigate · Enter to open · Esc to clear</p>
          </div>
        ) : (
          <div className={styles.results} id="dashboard-search-status">
            <p className={styles.noResults} role="status">No projects or tasks match “{value}”.</p>
          </div>
        )
      )}
    </div>
  );
}
