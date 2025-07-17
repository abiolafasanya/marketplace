import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  setResolvedTheme: (resolved: "light" | "dark") => void;
  toggleTheme: () => void;
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      resolvedTheme: getSystemTheme(),

      setTheme: (theme) => {
        set({ theme });
        if (theme !== "system") {
          set({ resolvedTheme: theme });
        } else {
          set({ resolvedTheme: getSystemTheme() });
        }
      },

      setResolvedTheme: (resolved) => set({ resolvedTheme: resolved }),

      toggleTheme: () => {
        const { theme } = get();
        if (theme === "dark") {
          set({ theme: "light", resolvedTheme: "light" });
        } else {
          set({ theme: "dark", resolvedTheme: "dark" });
        }
      },
    }),
    {
      name: "marketplace-theme",
    }
  )
);
