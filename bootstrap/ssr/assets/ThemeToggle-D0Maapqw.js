import { jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme, mounted]);
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: () => setTheme(isDark ? "light" : "dark"),
      className: `inline-flex h-9 w-9 items-center justify-center border border-border text-text-muted transition-colors duration-200 hover:border-border-strong hover:text-text ${className}`,
      style: { cursor: "pointer" },
      "aria-label": isDark ? "Switch to light theme" : "Switch to dark theme",
      title: isDark ? "Light mode" : "Dark mode",
      children: mounted && isDark ? /* @__PURE__ */ jsx(Sun, { size: 16, strokeWidth: 1.75 }) : /* @__PURE__ */ jsx(Moon, { size: 16, strokeWidth: 1.75 })
    }
  );
}
export {
  ThemeToggle as T
};
