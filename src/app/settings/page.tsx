import SettingsClient from '@/app/settings/SettingsClient';

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-text-primary">Настройки</h1>
      <SettingsClient />
    </div>
  );
}


