'use client';

import { useState } from 'react';
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
}

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Главная', icon: HiOutlineHome, isActive: true },
  { id: 'notes', label: 'Заметки', icon: HiOutlineDocumentText },
  { id: 'tasks', label: 'Задачи', icon: HiOutlineCheckCircle },
  { id: 'ai', label: 'AI Помощник', icon: HiOutlineChat },
  { id: 'settings', label: 'Настройки', icon: HiOutlineCog },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('home');

  return (
    <div className={`w-64 h-screen bg-background flex flex-col p-6 transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } fixed left-0 top-0 z-40 lg:relative`}>
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-3">
          <HiOutlineLightningBolt className="text-white text-lg" />
        </div>
        <div>
          <h1 className="text-text-primary font-bold text-lg">NeuroNotes</h1>
          <p className="text-text-secondary text-sm">AI Помощник</p>
        </div>
      </div>

      {/* Quick Note Button */}
      <button className="w-full bg-surface border border-border rounded-lg p-3 flex items-center mb-8 hover:bg-gray-50 transition-colors group">
        <HiOutlinePlus className="text-text-primary text-lg mr-3 group-hover:text-primary transition-colors" />
        <span className="text-text-primary font-medium group-hover:text-primary transition-colors">Быстрая заметка</span>
      </button>

      {/* Navigation */}
      <div className="flex-1">
        <h2 className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
          НАВИГАЦИЯ
        </h2>
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-all ${
                  activeItem === item.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'text-text-primary hover:bg-surface'
                }`}
              >
                <IconComponent className="text-lg mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* AI Status */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-secondary rounded-full mr-3"></div>
          <span className="text-text-primary font-semibold text-sm">ИИ готов</span>
        </div>
        <p className="text-text-secondary text-xs">
          Готов анализировать ваши заметки и предлагать улучшения
        </p>
      </div>
    </div>
  );
}
