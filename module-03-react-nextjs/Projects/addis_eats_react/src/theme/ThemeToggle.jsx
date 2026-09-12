import { useTheme } from "./ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
    type="button"
    onClick={toggleTheme}
    aria-label={
        theme === "light"
        ?"switch to dark mode"
        :"switch to light mode"
    }>
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

export default ThemeToggle;
