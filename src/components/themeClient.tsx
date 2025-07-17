// app/components/ThemeClientWrapper.tsx
"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";

export default function ThemeClientWrapper() {
  const { theme, setResolvedTheme } = useThemeStore();

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  useEffect(() => {
    const root = document.documentElement;

    const handleThemeChange = () => {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (theme === "dark" || (theme === "system" && isSystemDark)) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      setResolvedTheme(theme === "system" ? getSystemTheme() : theme);
    };

    handleThemeChange();

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", handleThemeChange);

    return () => mq.removeEventListener("change", handleThemeChange);
  }, [theme, setResolvedTheme]);

  return null; // This component just applies the theme
}
