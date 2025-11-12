'use client';

import { usePathname, useRouter } from 'next/navigation';
import { 
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineBell
} from 'react-icons/hi';

interface NavItem {
  id: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavItem[] = [
  { id: 'home', path: '/', icon: HiOutlineHome },
  { id: 'notes', path: '/notes', icon: HiOutlineDocumentText },
  { id: 'tasks', path: '/tasks', icon: HiOutlineCheckCircle },
  { id: 'notifications', path: '/settings', icon: HiOutlineBell },
];

export default function BottomNavigationBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Скрываем навигацию на главной странице
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div 
        className="rounded-full px-8 py-4 flex items-center justify-around gap-12 pointer-events-auto shadow-2xl"
        style={{ 
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          minWidth: '280px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className="flex flex-col items-center gap-1.5 relative transition-all"
              aria-label={item.id}
            >
              <IconComponent 
                className="transition-colors"
                style={{ 
                  fontSize: '24px',
                  color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                }}
              />
              {active && (
                <div 
                  className="h-0.5 w-6 rounded-full transition-all"
                  style={{ 
                    backgroundColor: 'var(--color-primary)',
                    minWidth: '24px',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

