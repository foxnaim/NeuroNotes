'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  HiOutlinePlus, 
  HiOutlineHome, 
  HiOutlineDocumentText, 
  HiOutlineCheckCircle, 
  HiOutlineChat, 
  HiOutlineCog,
  HiOutlineLightningBolt
} from 'react-icons/hi';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Главная', icon: HiOutlineHome, isActive: true },
  { id: 'notes', label: 'Заметки', icon: HiOutlineDocumentText },
  { id: 'tasks', label: 'Задачи', icon: HiOutlineCheckCircle },
  { id: 'ai', label: 'AI Помощник', icon: HiOutlineChat },
  { id: 'settings', label: 'Настройки', icon: HiOutlineCog },
];

export default function Sidebar({ isOpen, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('home');

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-background flex flex-col transition-all duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } fixed left-0 top-0 z-40 lg:relative`}>
      <div className={`p-6 ${isCollapsed ? 'px-3' : ''}`}>
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-3">
          <HiOutlineLightningBolt className="text-white text-lg" />
        </div>
        {!isCollapsed && (
          <div>
            <h1 className="text-text-primary font-bold text-lg">NeuroNotes</h1>
            <p className="text-text-secondary text-sm">AI Помощник</p>
          </div>
        )}
      </div>

      {/* Quick Note Button */}
      <button className={`w-full bg-surface border border-border rounded-lg p-3 flex items-center mb-6 hover:bg-gray-50 transition-colors group ${isCollapsed ? 'justify-center' : ''}`}>
        <HiOutlinePlus className="text-text-primary text-lg group-hover:text-primary transition-colors" />
        {!isCollapsed && (
          <span className="text-text-primary font-medium group-hover:text-primary transition-colors ml-3">Быстрая заметка</span>
        )}
      </button>

      {/* Navigation (vertically centered between Quick Note and AI status) */}
      <div className="flex-1 flex flex-col justify-center">
        {!isCollapsed && (
          <h2 className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
            НАВИГАЦИЯ
          </h2>
        )}
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  if (item.id === 'home') router.push('/');
                  if (item.id === 'notes') router.push('/notes');
                  if (item.id === 'tasks') router.push('/tasks');
                  if (item.id === 'ai') router.push('/ai');
                  if (item.id === 'settings') router.push('/settings');
                }}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 p-3 rounded-lg transition-all ${
                  activeItem === item.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'text-text-primary hover:bg-surface'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <IconComponent className="text-xl" />
                {!isCollapsed && (
                  <span className="font-medium text-center">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      </div>

      {/* AI Status pinned to bottom */}
      {!isCollapsed && (
        <div className="mt-auto p-6">
          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-success rounded-full mr-3"></div>
              <span className="text-text-primary font-semibold text-sm">ИИ готов</span>
            </div>
            <p className="text-text-secondary text-xs">
              Готов анализировать ваши заметки и предлагать улучшения
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
