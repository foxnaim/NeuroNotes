"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

export function ThemeSwitcher({ className }: { className?: string }) {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", prefersDark);
    setIsDark(prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300",
        className
      )}
      aria-label="Toggle theme"
    >
      {isDark ? <HiOutlineMoon size={18} /> : <HiOutlineSun size={18} />}
    </button>
  );
}

