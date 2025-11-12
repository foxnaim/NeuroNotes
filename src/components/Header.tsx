'use client';

import { useState, useEffect } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowScroll = window.scrollY || document.documentElement.scrollTop;
      const mainElement = document.querySelector('main.content-root');
      const mainScroll = mainElement ? mainElement.scrollTop : 0;
      const scrollPosition = windowScroll || mainScroll;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const mainElement = document.querySelector('main.content-root');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll, { passive: true });
    }

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header 
      className={`sticky top-0 z-50 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 flex items-center justify-between transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-md border-b shadow-sm' 
          : 'backdrop-blur-none border-b border-transparent'
      }`}
      style={{
        backgroundColor: isScrolled 
          ? 'var(--color-surface)' 
          : 'transparent',
        borderColor: isScrolled ? 'var(--color-border)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px) saturate(180%)' : 'blur(0px)',
        WebkitBackdropFilter: isScrolled ? 'blur(12px) saturate(180%)' : 'blur(0px)',
        pointerEvents: 'auto',
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="rounded-full bg-gradient-to-br from-primary to-secondary p-[1px] sm:p-[1.5px]">
            <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden bg-surface border border-border">
              <Image 
                src="/logo.png" 
                alt="NeuroNotes" 
                width={24} 
                height={24} 
                className="logo-auto-contrast w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" 
              />
            </span>
          </span>
          <h1 
            className="text-text-primary font-bold text-base sm:text-lg lg:text-xl"
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            NeuroNotes
          </h1>
        </div>
      </div>

      <nav className="flex items-center gap-1 sm:gap-2">
        <div className="relative hidden md:block">
          <Button
            variant="ghost"
            onClick={() => toggleDropdown('features')}
            className="px-2 sm:px-3 py-1.5 sm:py-2 h-auto text-sm"
            rightIcon={HiOutlineChevronDown}
          >
            <span className="hidden lg:inline">Возможности</span>
          </Button>
          {activeDropdown === 'features' && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
              <div className="absolute top-full right-0 mt-2 w-56 bg-surface border border-border rounded-xl shadow-lg py-2 z-50">
                <Button
                  variant="ghost"
                  onClick={() => { router.push('/notes'); setActiveDropdown(null); }}
                  className="w-full justify-start px-4 py-2"
                >
                  Заметки
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => { router.push('/tasks'); setActiveDropdown(null); }}
                  className="w-full justify-start px-4 py-2"
                >
                  Задачи
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => { router.push('/ai'); setActiveDropdown(null); }}
                  className="w-full justify-start px-4 py-2"
                >
                  ИИ Помощник
                </Button>
              </div>
            </>
          )}
        </div>
        <Button
          variant="ghost"
          onClick={() => router.push('/settings')}
          className="px-2 sm:px-3 py-1.5 sm:py-2 h-auto text-sm hidden lg:inline-flex"
        >
          Настройки
        </Button>
        <Button
          onClick={() => router.push('/ai')}
          size="sm"
          className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm"
        >
          <span className="hidden sm:inline">Начать работу</span>
          <span className="sm:hidden">Начать</span>
        </Button>
      </nav>
    </header>
  );
}
