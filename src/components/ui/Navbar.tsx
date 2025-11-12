"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "./Button";
import { SUPPORTED_LANGUAGES, type Language } from "@/lib/constants";

export interface NavbarProps {
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
  className?: string;
}

export function Navbar({
  currentLanguage = "ru",
  onLanguageChange,
  className,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Neuro</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/tasks"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              Tasks
            </Link>
            <Link
              href="/goals"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              Goals
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {onLanguageChange && (
              <LanguageSelector
                value={currentLanguage}
                onChange={onLanguageChange}
                className="hidden sm:block"
              />
            )}
            <ThemeSwitcher />
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Sign In
            </Button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/dashboard"
              className="block py-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Dashboard
            </Link>
            <Link
              href="/tasks"
              className="block py-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Tasks
            </Link>
            <Link
              href="/goals"
              className="block py-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Goals
            </Link>
            {onLanguageChange && (
              <div className="pt-2">
                <LanguageSelector
                  value={currentLanguage}
                  onChange={onLanguageChange}
                />
              </div>
            )}
            <Button variant="ghost" size="sm" className="w-full mt-2">
              Sign In
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

