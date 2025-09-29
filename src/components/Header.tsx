'use client';

import { HiOutlineMenu, HiOutlineX, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

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
            <HiOutlineMenu className="text-text-primary text-xl" />
          ) : (
            <HiOutlineX className="text-text-primary text-xl" />
          )}
        </button>
        {isSidebarOpen && onToggleSidebarCollapse && (
          <button
            onClick={onToggleSidebarCollapse}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={isSidebarCollapsed ? 'Развернуть сайдбар' : 'Свернуть сайдбар'}
          >
            {isSidebarCollapsed ? (
              <HiOutlineChevronRight className="text-text-primary text-xl" />
            ) : (
              <HiOutlineChevronLeft className="text-text-primary text-xl" />
            )}
          </button>
        )}
        <h1 className="text-text-primary font-semibold text-lg">Добро пожаловать</h1>
      </div>
    </header>
  );
}
