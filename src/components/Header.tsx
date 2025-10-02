'use client';

import { HiOutlineMenu, HiOutlineX, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Image from 'next/image';

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebarCollapse?: () => void;
}

export default function Header({ isSidebarOpen, onToggleSidebar, isSidebarCollapsed, onToggleSidebarCollapse }: HeaderProps) {
  return (
    <header className="bg-surface border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          aria-label={isSidebarOpen ? 'Скрыть сайдбар' : 'Показать сайдбар'}
        >
          {isSidebarOpen ? (
            <HiOutlineX className="text-text-primary text-xl" />
          ) : (
            <HiOutlineMenu className="text-text-primary text-xl" />
          )}
        </button>
        {onToggleSidebarCollapse && (
          <button
            onClick={onToggleSidebarCollapse}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden lg:inline-flex"
            aria-label={isSidebarCollapsed ? 'Развернуть сайдбар' : 'Свернуть сайдбар'}
          >
            {isSidebarCollapsed ? (
              <HiOutlineChevronRight className="text-text-primary text-xl" />
            ) : (
              <HiOutlineChevronLeft className="text-text-primary text-xl" />
            )}
          </button>
        )}
        <div className="hidden lg:flex items-center gap-3">
          <span className="rounded-full bg-gradient-to-br from-primary to-secondary p-[1.5px]">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full overflow-hidden bg-surface border border-border">
              <Image src="/logo.png" alt="NeuroNotes" width={28} height={28} className="logo-auto-contrast" />
            </span>
          </span>
          <h1 className="text-text-primary font-semibold text-lg">Добро пожаловать</h1>
        </div>
      </div>
    </header>
  );
}
