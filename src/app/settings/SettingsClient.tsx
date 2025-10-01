"use client";

import { useEffect, useState } from 'react';
import { HiOutlineUser, HiOutlineSparkles, HiOutlineBell, HiOutlinePuzzle, HiOutlineShieldCheck, HiOutlineColorSwatch } from 'react-icons/hi';

type TabKey = 'profile' | 'ai' | 'notifications' | 'integrations' | 'privacy' | 'colors';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'profile', label: 'Профиль' },
  { key: 'ai', label: 'ИИ' },
  { key: 'notifications', label: 'Уведомления' },
  { key: 'integrations', label: 'Интеграции' },
  { key: 'privacy', label: 'Конфиденциальность' },
  { key: 'colors', label: 'Цвета' },
];

function TabBar({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  return (
    <div className="flex items-center bg-surface border border-border rounded-xl p-1 w-full overflow-auto">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`px-5 py-2 rounded-lg text-sm whitespace-nowrap ${
            active === t.key ? 'bg-background text-text-primary' : 'text-text-secondary hover:bg-gray-50'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default function SettingsClient() {
  const [active, setActive] = useState<TabKey>('profile');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [themeName, setThemeName] = useState<string>('dark');
  const [customColors, setCustomColors] = useState<Record<string, string>>({});

  const presets: Record<string, Record<string, string>> = {
    dark: {
      background: '#0F172A',
      textPrimary: '#F8FAFC',
      textSecondary: '#CBD5E1',
      surface: '#1E293B',
      primary: '#6366F1',
      secondary: '#22D3EE',
      border: '#334155',
    },
    light: {
      background: '#F4F7FB',
      textPrimary: '#1E293B',
      textSecondary: '#475569',
      surface: '#FFFFFF',
      primary: '#4F46E5',
      secondary: '#22D3EE',
      border: '#E2E8F0',
    },
    purplePink: {
      background: '#FDF4FF',
      textPrimary: '#2D0B4E',
      textSecondary: '#6B21A8',
      surface: '#FFFFFF',
      primary: '#C026D3',
      secondary: '#F472B6',
      border: '#F3E8FF',
    },
    cyanBlue: {
      background: '#ECFEFF',
      textPrimary: '#0F172A',
      textSecondary: '#334155',
      surface: '#FFFFFF',
      primary: '#0891B2',
      secondary: '#38BDF8',
      border: '#BAE6FD',
    },
  };

  const applyTheme = (colors: Record<string, string>) => {
    const root = document.documentElement;
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-text-primary', colors.textPrimary);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-border', colors.border);
  };

  const saveTheme = (name: string, colors: Record<string, string>) => {
    try {
      localStorage.setItem('nn-theme', JSON.stringify({ name, colors }));
    } catch {}
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handler);
    setIsFullscreen(Boolean(document.fullscreenElement));
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('nn-theme');
      if (raw) {
        const parsed = JSON.parse(raw);
        setThemeName(parsed.name);
        setCustomColors(parsed.colors || {});
        applyTheme(parsed.colors);
      } else {
        // default to dark
        setThemeName('dark');
        applyTheme(presets.dark);
        saveTheme('dark', presets.dark);
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (e) {
      // swallow silently; could show toast in real app
      console.error('Fullscreen toggle failed', e);
    }
  };
  return (
    <div className="space-y-6">
      <TabBar active={active} onChange={setActive} />

      {active === 'profile' && (
        <>
          <section className="bg-surface border border-border rounded-2xl p-4 sm:p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2"><HiOutlineUser /> Информация профиля</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-text-secondary">Имя</label>
                <input className="w-full bg-surface border border-border rounded-lg px-3 py-2" defaultValue="Иван" />
              </div>
              <div>
                <label className="text-sm text-text-secondary">Фамилия</label>
                <input className="w-full bg-surface border border-border rounded-lg px-3 py-2" defaultValue="Петров" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-text-secondary">Электронная почта</label>
                <input className="w-full bg-surface border border-border rounded-lg px-3 py-2" defaultValue="ivan@example.com" />
              </div>
            </div>
            <div>
              <button className="bg-gradient-to-r from-primary to-secondary text-white rounded-full px-5 py-2">Сохранить изменения</button>
            </div>
          </section>

          {/* Appearance section */}
          <section className="bg-surface border border-border rounded-2xl p-4 sm:p-6 space-y-5">
            <h3 className="text-2xl font-semibold text-text-primary flex items-center gap-2"><HiOutlineColorSwatch /> Внешний вид</h3>
            <SwitchRow title="Компактный режим" desc="Показать больше контента в меньшем пространстве" />
            <SwitchRow title="Полноэкранный режим" desc="Развернуть интерфейс на весь экран" checked={isFullscreen} onChange={toggleFullscreen} />
          </section>
        </>
      )}

      {active === 'ai' && (
        <section className="bg-surface border border-border rounded-2xl p-4 sm:p-6 space-y-5">
          <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2"><HiOutlineSparkles /> Настройки ИИ помощника</h2>
          <ToggleRow title="Автоанализ заметок" desc="Автоматически генерировать резюме и инсайты для новых заметок" defaultChecked />
          <ToggleRow title="Умное создание задач" desc="Предлагать задачи на основе содержания заметок" defaultChecked />
          <ToggleRow title="Проактивные предложения" desc="Ежедневные рекомендации по продуктивности" />

          <div className="bg-background border border-border rounded-xl p-4">
            <div className="text-sm text-text-secondary mb-2">Предпочтение модели ИИ</div>
            <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-3 py-1">
              <span className="text-text-primary">GPT-4 Turbo</span>
              <span className="text-success text-xs bg-success/10 rounded-full px-2 py-0.5">Активный</span>
            </div>
          </div>
        </section>
      )}

      {active === 'notifications' && (
        <section className="bg-surface border border-border rounded-2xl p-4 sm:p-6 space-y-5">
          <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2"><HiOutlineBell /> Настройки уведомлений</h2>
          <ToggleRow title="Напоминания о задачах" desc="Получать уведомления о приближающихся сроках" defaultChecked />
          <ToggleRow title="ИИ инсайты" desc="Еженедельные инсайты и предложения по продуктивности" defaultChecked />
          <ToggleRow title="Ежедневное резюме" desc="Утреннее резюме приоритетов вашего дня" />
          <ToggleRow title="Обновления совместной работы" desc="Когда кто-то делится заметками или задачами с вами" defaultChecked />
        </section>
      )}

      {active === 'integrations' && (
        <section className="bg-surface border border-border rounded-2xl p-4 sm:p-6 space-y-5">
          <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2"><HiOutlinePuzzle /> Подключенные сервисы</h2>
          <IntegrationRow name="Google Календарь" desc="Синхронизировать задачи с вашим календарем" action="Подключить" />
          <IntegrationRow name="GitHub" desc="Импортировать задачи и заметки проекта" action="Подключить" />
          <IntegrationRow name="Slack" desc="Делиться заметками и получать ИИ инсайты в Slack" action="Управлять" active />
        </section>
      )}

      {active === 'privacy' && (
        <section className="bg-surface border border-border rounded-2xl p-6 space-y-5">
          <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2"><HiOutlineShieldCheck /> Конфиденциальность и безопасность</h2>
          <ToggleRow title="Аналитика данных" desc="Помогать улучшать NeuroNotes с помощью аналитики использования" defaultChecked />
          <ToggleRow title="Обучение модели ИИ" desc="Разрешить анонимные данные для улучшения моделей ИИ" />

          <div className="flex items-center gap-3">
            <button className="bg-surface border border-border rounded-full px-4 py-2">Экспортировать мои данные</button>
            <button className="text-error bg-error/10 border border-error/30 rounded-full px-4 py-2">Удалить аккаунт</button>
          </div>

          <div className="bg-background border border-border rounded-xl p-4 text-text-secondary">
            Ваши заметки и задачи обрабатываются безопасно и хранятся с end-to-end шифрованием. Анализ ИИ происходит
            в изолированных средах, и ваши данные никогда не передаются третьим лицам без вашего явного согласия.
          </div>
        </section>
      )}

      {active === 'colors' && (
        <section className="bg-surface border border-border rounded-2xl p-4 sm:p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2"><HiOutlineColorSwatch /> Цветовые темы</h2>
          <div className="space-y-3">
            <div className="text-text-secondary text-sm">Предустановленные темы</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { key: 'dark', label: 'Тёмная' },
                { key: 'light', label: 'Светлая нейроморфная' },
                { key: 'purplePink', label: 'Фиолетово-розовая' },
                { key: 'cyanBlue', label: 'Бирюзово-синяя' },
              ].map((p) => (
                <button
                  key={p.key}
                  className={`text-left bg-background border border-border rounded-xl p-4 hover:bg-gray-50 transition-colors ${themeName===p.key ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => {
                    const colors = presets[p.key];
                    setThemeName(p.key);
                    setCustomColors(colors);
                    applyTheme(colors);
                    saveTheme(p.key, colors);
                  }}
                >
                  <div className="text-text-primary font-medium mb-2">{p.label}</div>
                  <div className="flex items-center gap-2">
                    {Object.values(presets[p.key]).slice(0,6).map((c, i) => (
                      <span key={i} className="h-5 w-5 rounded-full border" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-text-secondary text-sm">Кастомные цвета</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { key: 'background', label: 'Фон (bg)' },
                { key: 'textPrimary', label: 'Текст основной' },
                { key: 'textSecondary', label: 'Текст вторичный' },
                { key: 'surface', label: 'Поверхность (cards)' },
                { key: 'primary', label: 'Primary' },
                { key: 'secondary', label: 'Secondary' },
                { key: 'border', label: 'Границы' },
              ].map((f) => (
                <label key={f.key} className="flex items-center justify-between bg-background border border-border rounded-lg p-3">
                  <span className="text-text-primary text-sm">{f.label}</span>
                  <input
                    type="color"
                    value={customColors[f.key] || '#ffffff'}
                    onChange={(e) => {
                      const next = { ...customColors, [f.key]: e.target.value };
                      setCustomColors(next);
                      applyTheme(next);
                    }}
                  />
                </label>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                className="bg-gradient-to-r from-primary to-secondary text-white rounded-full px-5 py-2"
                onClick={() => { saveTheme('custom', customColors); setThemeName('custom'); }}
              >
                Сохранить тему
              </button>
              <button
                className="bg-surface border border-border rounded-full px-5 py-2"
                onClick={() => { const colors = presets.dark; setThemeName('dark'); setCustomColors(colors); applyTheme(colors); saveTheme('dark', colors); }}
              >
                Сбросить к тёмной
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ToggleRow({ title, desc, defaultChecked }: { title: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-text-primary font-medium">{title}</div>
        <div className="text-text-secondary text-sm">{desc}</div>
      </div>
      <input type="checkbox" defaultChecked={defaultChecked} className="h-6 w-10 rounded-full accent-primary" />
    </div>
  );
}

function SwitchRow({ title, desc, defaultChecked, checked, onChange }: { title: string; desc: string; defaultChecked?: boolean; checked?: boolean; onChange?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-text-primary font-medium">{title}</div>
        <div className="text-text-secondary text-sm">{desc}</div>
      </div>
      <button
        onClick={onChange}
        aria-pressed={checked}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ?? defaultChecked ? 'bg-primary/80' : 'bg-gray-300'}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${checked ?? defaultChecked ? 'translate-x-5' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}

function IntegrationRow({ name, desc, action, active }: { name: string; desc: string; action: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between bg-background border border-border rounded-xl p-4">
      <div>
        <div className="text-text-primary font-medium">{name}</div>
        <div className="text-text-secondary text-sm">{desc}</div>
      </div>
      <button className={`rounded-full px-4 py-2 ${active ? 'bg-surface border border-border' : 'bg-surface border border-border'}`}>{action}</button>
    </div>
  );
}


