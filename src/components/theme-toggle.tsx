"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-colors hover:bg-primary-100 dark:bg-slate-800 dark:text-primary-100 dark:hover:bg-slate-700"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 scale-100 transition-all dark:scale-0" />
      <Moon className="absolute h-5 w-5 scale-0 transition-all dark:scale-100" />
    </button>
  );
}
