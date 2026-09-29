"use client";

import { useTheme } from "./ThemeProvider";

function ThemeToggle() {
  const { theme, toggleTheme, isLoaded } = useTheme();

  if (!isLoaded) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="rounded-lg px-3 py-2 text-lg text-white/70"
      >
        ◐
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      title={theme === "light" ? "Dark mode" : "Light mode"}
      className="rounded-lg px-3 py-2 text-lg text-white/85 transition hover:bg-white/10 hover:text-white"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

export default ThemeToggle;
