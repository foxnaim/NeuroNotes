"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  HiOutlineViewGrid,
  HiOutlineClipboardList,
  HiOutlineFlag,
  HiOutlineCurrencyDollar,
  HiOutlineCog,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";

export interface SidebarProps {
  className?: string;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: HiOutlineViewGrid },
  { href: "/tasks", label: "Tasks", icon: HiOutlineClipboardList },
  { href: "/goals", label: "Goals", icon: HiOutlineFlag },
  { href: "/finance", label: "Finance", icon: HiOutlineCurrencyDollar },
  { href: "/settings", label: "Settings", icon: HiOutlineCog },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <HiOutlineX size={20} /> : <HiOutlineMenu size={20} />}
      </button>

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <span className="text-xl font-bold text-primary">Neuro</span>
            <button
              className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
              aria-label="Close sidebar"
            >
              <HiOutlineX size={20} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

