"use client";

import { useEffect, useRef, useState } from 'react';
import { HiOutlineUser, HiOutlineSparkles, HiOutlineBell, HiOutlinePuzzle, HiOutlineShieldCheck, HiOutlineColorSwatch, HiOutlineStar, HiStar } from 'react-icons/hi';

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
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [themeName, setThemeName] = useState<string>('dark');
  const [customColors, setCustomColors] = useState<Record<string, string>>({});
  const [presetQuery, setPresetQuery] = useState<string>('');
  const [favoritePresets, setFavoritePresets] = useState<string[]>([]);
  const importFileRef = useRef<HTMLInputElement | null>(null);

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
    emerald: {
      background: '#ECFDF5',
      textPrimary: '#064E3B',
      textSecondary: '#065F46',
      surface: '#FFFFFF',
      primary: '#10B981',
      secondary: '#34D399',
      border: '#D1FAE5',
    },
    amber: {
      background: '#FFFBEB',
      textPrimary: '#78350F',
      textSecondary: '#92400E',
      surface: '#FFFFFF',
      primary: '#F59E0B',
      secondary: '#FCD34D',
      border: '#FDE68A',
    },
    rose: {
      background: '#FFF1F2',
      textPrimary: '#881337',
      textSecondary: '#9F1239',
      surface: '#FFFFFF',
      primary: '#F43F5E',
      secondary: '#FB7185',
      border: '#FECDD3',
    },
    slate: {
      background: '#F1F5F9',
      textPrimary: '#0F172A',
      textSecondary: '#334155',
      surface: '#FFFFFF',
      primary: '#64748B',
      secondary: '#94A3B8',
      border: '#E2E8F0',
    },
    coffee: {
      background: '#FAF7F4',
      textPrimary: '#3E2723',
      textSecondary: '#5D4037',
      surface: '#FFFFFF',
      primary: '#8D6E63',
      secondary: '#BCAAA4',
      border: '#E0D7D1',
    },
    sunset: {
      background: '#FFF7ED',
      textPrimary: '#1F2937',
      textSecondary: '#6B7280',
      surface: '#FFFFFF',
      primary: '#F97316',
      secondary: '#F43F5E',
      border: '#FED7AA',
    },
    ocean: {
      background: '#EFF6FF',
      textPrimary: '#0C4A6E',
      textSecondary: '#075985',
      surface: '#FFFFFF',
      primary: '#2563EB',
      secondary: '#06B6D4',
      border: '#BFDBFE',
    },
    forest: {
      background: '#F0FDF4',
      textPrimary: '#064E3B',
      textSecondary: '#166534',
      surface: '#FFFFFF',
      primary: '#16A34A',
      secondary: '#22C55E',
      border: '#BBF7D0',
    },
    lavender: {
      background: '#F5F3FF',
      textPrimary: '#312E81',
      textSecondary: '#4338CA',
      surface: '#FFFFFF',
      primary: '#8B5CF6',
      secondary: '#C4B5FD',
      border: '#EDE9FE',
    },
    mint: {
      background: '#F0FDFA',
      textPrimary: '#134E4A',
      textSecondary: '#0F766E',
      surface: '#FFFFFF',
      primary: '#14B8A6',
      secondary: '#2DD4BF',
      border: '#CCFBF1',
    },
    graphite: {
      background: '#F5F5F5',
      textPrimary: '#111827',
      textSecondary: '#4B5563',
      surface: '#FFFFFF',
      primary: '#111827',
      secondary: '#6B7280',
      border: '#E5E7EB',
    },
    sepia: {
      background: '#FFFBEB',
      textPrimary: '#7C2D12',
      textSecondary: '#9A3412',
      surface: '#FFFFFF',
      primary: '#D97706',
      secondary: '#F59E0B',
      border: '#FDE68A',
    },
    cyberpunk: {
      background: '#0B1020',
      textPrimary: '#EDE9FE',
      textSecondary: '#A78BFA',
      surface: '#111827',
      primary: '#D946EF',
      secondary: '#22D3EE',
      border: '#1F2937',
    },
    solarizedLight: {
      background: '#FDF6E3',
      textPrimary: '#073642',
      textSecondary: '#586E75',
      surface: '#FFFFFF',
      primary: '#268BD2',
      secondary: '#2AA198',
      border: '#EEE8D5',
    },
    solarizedDark: {
      background: '#002B36',
      textPrimary: '#EEE8D5',
      textSecondary: '#93A1A1',
      surface: '#073642',
      primary: '#268BD2',
      secondary: '#2AA198',
      border: '#0A3742',
    },
    autumn: {
      background: '#FFFBEB',
      textPrimary: '#7C2D12',
      textSecondary: '#9A3412',
      surface: '#FFFFFF',
      primary: '#EA580C',
      secondary: '#F97316',
      border: '#FED7AA',
    },
    berry: {
      background: '#FEF2F2',
      textPrimary: '#4C0519',
      textSecondary: '#9F1239',
      surface: '#FFFFFF',
      primary: '#DB2777',
      secondary: '#EC4899',
      border: '#FBCFE8',
    },
    navy: {
      background: '#EEF2FF',
      textPrimary: '#1E3A8A',
      textSecondary: '#1D4ED8',
      surface: '#FFFFFF',
      primary: '#3B82F6',
      secondary: '#60A5FA',
      border: '#C7D2FE',
    },
    lime: {
      background: '#F7FEE7',
      textPrimary: '#365314',
      textSecondary: '#4D7C0F',
      surface: '#FFFFFF',
      primary: '#84CC16',
      secondary: '#A3E635',
      border: '#E4F1C7',
    },
    pastel: {
      background: '#FFF7F9',
      textPrimary: '#1F2937',
      textSecondary: '#6B7280',
      surface: '#FFFFFF',
      primary: '#F472B6',
      secondary: '#FDE68A',
      border: '#FFE4E6',
    },
    neon: {
      background: '#0B1120',
      textPrimary: '#E2E8F0',
      textSecondary: '#A1A1AA',
      surface: '#111827',
      primary: '#22D3EE',
      secondary: '#A78BFA',
      border: '#1F2937',
    },
    sahara: {
      background: '#FEF3C7',
      textPrimary: '#78350F',
      textSecondary: '#92400E',
      surface: '#FFFFFF',
      primary: '#D97706',
      secondary: '#F59E0B',
      border: '#FDE68A',
    },
    midnight: {
      background: '#0F172A',
      textPrimary: '#CBD5E1',
      textSecondary: '#94A3B8',
      surface: '#111827',
      primary: '#3B82F6',
      secondary: '#60A5FA',
      border: '#1F2937',
    },
    aurora: {
      background: '#F0F9FF',
      textPrimary: '#111827',
      textSecondary: '#475569',
      surface: '#FFFFFF',
      primary: '#10B981',
      secondary: '#06B6D4',
      border: '#BAE6FD',
    },
    wine: {
      background: '#FEF2F2',
      textPrimary: '#4C0519',
      textSecondary: '#7F1D1D',
      surface: '#FFFFFF',
      primary: '#BE123C',
      secondary: '#F43F5E',
      border: '#FECACA',
    },
    blossom: {
      background: '#FFF1F2',
      textPrimary: '#4A044E',
      textSecondary: '#6B21A8',
      surface: '#FFFFFF',
      primary: '#EC4899',
      secondary: '#A78BFA',
      border: '#FBCFE8',
    },
    steel: {
      background: '#F3F4F6',
      textPrimary: '#111827',
      textSecondary: '#4B5563',
      surface: '#FFFFFF',
      primary: '#6B7280',
      secondary: '#9CA3AF',
      border: '#E5E7EB',
    },
    chocolate: {
      background: '#FBF6F1',
      textPrimary: '#3E2723',
      textSecondary: '#5D4037',
      surface: '#FFFFFF',
      primary: '#795548',
      secondary: '#A1887F',
      border: '#EADBC8',
    },
    tealOrange: {
      background: '#ECFEFF',
      textPrimary: '#0F172A',
      textSecondary: '#334155',
      surface: '#FFFFFF',
      primary: '#14B8A6',
      secondary: '#F97316',
      border: '#BAE6FD',
    },
    retro: {
      background: '#FFF7ED',
      textPrimary: '#1F2937',
      textSecondary: '#6B7280',
      surface: '#FFFFFF',
      primary: '#F59E0B',
      secondary: '#10B981',
      border: '#FED7AA',
    },
    matrix: {
      background: '#000000',
      textPrimary: '#D1FAE5',
      textSecondary: '#34D399',
      surface: '#0A0A0A',
      primary: '#22C55E',
      secondary: '#84CC16',
      border: '#111111',
    },
  };

  const presetLabels: Record<string, string> = {
    dark: 'Тёмная',
    light: 'Светлая нейроморфная',
    purplePink: 'Фиолетово-розовая',
    cyanBlue: 'Бирюзово-синяя',
    emerald: 'Изумрудная',
    amber: 'Тёплая янтарная',
    rose: 'Розовая',
    slate: 'Сланцевая',
    coffee: 'Кофейная',
    sunset: 'Закат',
    ocean: 'Океан',
    forest: 'Лесная',
    lavender: 'Лавандовая',
    mint: 'Мятная',
    graphite: 'Графитовая',
    sepia: 'Сепия',
    cyberpunk: 'Киберпанк',
    solarizedLight: 'Solarized Light',
    solarizedDark: 'Solarized Dark',
    autumn: 'Осенняя',
    berry: 'Ягодная',
    navy: 'Морская (Navy)',
    lime: 'Лаймовая',
    pastel: 'Пастельная',
    neon: 'Неоновая',
    sahara: 'Сахара',
    midnight: 'Полуночная',
    aurora: 'Аврора',
    wine: 'Винная',
    blossom: 'Цветение',
    steel: 'Стальная',
    chocolate: 'Шоколадная',
    tealOrange: 'Бирюзово-оранжевая',
    retro: 'Ретро',
    matrix: 'Матрица',
  };

  const categorizedPresets: Record<string, string[]> = {
    'Классические': ['dark', 'light', 'slate', 'graphite', 'solarizedLight', 'solarizedDark', 'steel'],
    'Холодные/спокойные': ['cyanBlue', 'ocean', 'navy', 'mint', 'lavender', 'aurora', 'midnight'],
    'Тёплые/атмосферные': ['amber', 'sepia', 'sunset', 'autumn', 'sahara', 'retro'],
    'Природные': ['emerald', 'forest', 'lime', 'coffee', 'tealOrange'],
    'Яркие/креативные': ['purplePink', 'rose', 'berry', 'cyberpunk', 'pastel', 'neon', 'blossom', 'wine', 'matrix'],
    'Нейтральные/моно': ['chocolate'],
  };

  const renderPresetButton = (key: string) => {
    const colors = presets[key];
    if (!colors) return null;
    const label = presetLabels[key] || key;
    const gradient = `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`;
    return (
      <div key={key} className="relative">
        <button
          className={`w-full text-left bg-background border border-border rounded-xl p-4 hover:bg-gray-50 transition-colors ${themeName===key ? 'ring-2 ring-primary' : ''}`}
          onClick={() => {
            setThemeName(key);
            setCustomColors(colors);
            applyTheme(colors);
            saveTheme(key, colors);
          }}
        >
          <div className="text-text-primary font-medium mb-3">{label}</div>
          <div className="h-2 rounded-full mb-3" style={{ background: gradient }} />
          <div className="flex items-center gap-2">
            {[colors.background, colors.textPrimary, colors.textSecondary, colors.surface, colors.primary, colors.secondary].map((c, i) => (
              <span key={i} className="h-5 w-5 rounded-full border" style={{ backgroundColor: c }} />
            ))}
          </div>
        </button>
        <button
          aria-label="Избранное"
          className="absolute top-2 right-2 h-8 w-8 inline-flex items-center justify-center rounded-full bg-surface border border-border hover:bg-gray-50"
          onClick={(e) => {
            e.stopPropagation();
            const next = favoritePresets.includes(key)
              ? favoritePresets.filter((k) => k !== key)
              : [...favoritePresets, key];
            saveFavorites(next);
          }}
        >
          {favoritePresets.includes(key) ? (
            <HiStar className="text-primary" />
          ) : (
            <HiOutlineStar className="text-text-secondary" />
          )}
        </button>
      </div>
    );
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

  const applyCompact = (enabled: boolean) => {
    const root = document.documentElement;
    root.classList.toggle('compact', enabled);
    try { localStorage.setItem('nn-compact', enabled ? '1' : '0'); } catch {}
  };

  const loadFavorites = () => {
    try {
      const raw = localStorage.getItem('nn-favorite-presets');
      if (raw) setFavoritePresets(JSON.parse(raw));
    } catch {}
  };

  const saveFavorites = (list: string[]) => {
    setFavoritePresets(list);
    try { localStorage.setItem('nn-favorite-presets', JSON.stringify(list)); } catch {}
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
    try {
      const c = localStorage.getItem('nn-compact');
      const enabled = c === '1';
      setIsCompact(enabled);
      applyCompact(enabled);
    } catch {}
    loadFavorites();
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
            <SwitchRow title="Компактный режим" desc="Показать больше контента в меньшем пространстве" checked={isCompact} onChange={() => { const next = !isCompact; setIsCompact(next); applyCompact(next); }} />
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
          <p className="text-text-secondary">Выберите пресет или подберите свои цвета — изменения применяются сразу и сохраняются локально.</p>

          {/* Presets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-text-secondary text-sm">Предустановленные темы</div>
              <input
                className="h-10 w-64 bg-background border border-border rounded-full px-4 text-sm"
                placeholder="Поиск пресета..."
                value={presetQuery}
                onChange={(e) => setPresetQuery(e.target.value)}
              />
            </div>

            {favoritePresets.length > 0 && (
              <div className="space-y-2">
                <div className="text-text-primary font-medium">Избранные</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {favoritePresets
                    .filter((k) => (presetLabels[k] || k).toLowerCase().includes(presetQuery.toLowerCase()))
                    .map((k) => renderPresetButton(k))}
                </div>
              </div>
            )}

            {Object.entries(categorizedPresets).map(([group, keys]) => {
              const visible = keys.filter((k) => (presetLabels[k] || k).toLowerCase().includes(presetQuery.toLowerCase()));
              if (visible.length === 0) return null;
              return (
                <div key={group} className="space-y-2">
                  <div className="text-text-primary font-medium">{group}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {visible.map((k) => renderPresetButton(k))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom colors */}
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
                <div key={f.key} className="bg-background border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-text-primary text-sm">{f.label}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        className="h-9 w-12 cursor-pointer"
                        value={customColors[f.key] || '#ffffff'}
                        onChange={(e) => {
                          const next = { ...customColors, [f.key]: e.target.value };
                          setCustomColors(next);
                          applyTheme(next);
                        }}
                      />
                      <input
                        className="h-9 w-28 bg-surface border border-border rounded-md px-2 text-sm"
                        value={customColors[f.key] || ''}
                        placeholder="#HEX"
                        onChange={(e) => {
                          const v = e.target.value;
                          const ok = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v);
                          const next = { ...customColors, [f.key]: v } as Record<string, string>;
                          setCustomColors(next);
                          if (ok) applyTheme(next);
                        }}
                      />
                    </div>
                  </div>
                </div>
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
              <input ref={importFileRef} type="file" accept="application/json" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  try {
                    const parsed = JSON.parse(String(reader.result));
                    if (parsed && parsed.colors) {
                      setThemeName(parsed.name || 'imported');
                      setCustomColors(parsed.colors);
                      applyTheme(parsed.colors);
                      saveTheme(parsed.name || 'imported', parsed.colors);
                    }
                  } catch {}
                };
                reader.readAsText(file);
                e.currentTarget.value = '';
              }} />
              <button
                className="bg-surface border border-border rounded-full px-5 py-2"
                onClick={() => importFileRef.current?.click()}
              >
                Импорт JSON
              </button>
              <button
                className="bg-surface border border-border rounded-full px-5 py-2"
                onClick={() => {
                  const data = { name: themeName, colors: customColors };
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `neuronotes-theme-${themeName}.json`;
                  document.body.appendChild(a);
                  a.click();
                  URL.revokeObjectURL(url);
                  a.remove();
                }}
              >
                Экспорт JSON
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


