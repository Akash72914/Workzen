"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "workzen-theme";
const VALID_PREFERENCES = ["light", "dark", "system"];
const listeners = new Set();

function getStoredPreference() {
  if (typeof document === "undefined") return "system";
  const attribute = document.documentElement.dataset.themePreference;
  if (VALID_PREFERENCES.includes(attribute)) return attribute;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return VALID_PREFERENCES.includes(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

function resolveTheme(preference) {
  if (preference === "light" || preference === "dark") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getSnapshot() {
  if (typeof document === "undefined") return "system:light";
  const preference = getStoredPreference();
  const theme = document.documentElement.dataset.theme || resolveTheme(preference);
  return `${preference}:${theme}`;
}

function getServerSnapshot() {
  return "system:light";
}

function notifySubscribers() {
  listeners.forEach((listener) => listener());
}

function applyPreference(preference) {
  const safePreference = VALID_PREFERENCES.includes(preference) ? preference : "system";
  const root = document.documentElement;
  root.dataset.themePreference = safePreference;
  root.dataset.theme = resolveTheme(safePreference);
  notifySubscribers();
}

function subscribe(listener) {
  if (typeof window === "undefined") return () => {};
  listeners.add(listener);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemChange = () => {
    if (getStoredPreference() === "system") applyPreference("system");
  };
  const handleStorage = (event) => {
    if (event.key !== STORAGE_KEY) return;
    applyPreference(VALID_PREFERENCES.includes(event.newValue) ? event.newValue : "system");
  };
  media.addEventListener("change", handleSystemChange);
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", handleSystemChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function updatePreference(preference) {
  const safePreference = VALID_PREFERENCES.includes(preference) ? preference : "system";
  try {
    window.localStorage.setItem(STORAGE_KEY, safePreference);
  } catch {
    // The selected preference still applies in this tab when storage is unavailable.
  }
  applyPreference(safePreference);
}

export function ThemeProvider({ children }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [preference, theme] = snapshot.split(":");
  const setPreference = useCallback((nextPreference) => updatePreference(nextPreference), []);
  const value = useMemo(() => ({ preference, setPreference, theme }), [preference, setPreference, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
