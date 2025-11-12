'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const SettingsClient = dynamic(() => import('@/app/settings/SettingsClient'), {
  loading: () => <div className="flex items-center justify-center h-64"><div className="text-text-secondary">Загрузка настроек...</div></div>,
  ssr: false
});

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-text-primary">Настройки</h1>
      <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="text-text-secondary">Загрузка...</div></div>}>
        <SettingsClient />
      </Suspense>
    </div>
  );
}


