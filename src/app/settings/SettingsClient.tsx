"use client";

import { useEffect, useState } from 'react';
import { HiOutlineUser, HiOutlineSparkles, HiOutlineBell, HiOutlinePuzzle, HiOutlineShieldCheck, HiOutlineColorSwatch } from 'react-icons/hi';

type TabKey = 'profile' | 'ai' | 'notifications' | 'integrations' | 'privacy' | 'colors';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'profile', label: 'Профиль' },
  { key: 'ai', label: 'ИИ' },
  { key: 'notifications', label: 'Уведомления' },
  { key: 'integrations', label: 'Интеграции' },
  { key: 'colors', label: 'Цвета' },
  { key: 'privacy', label: 'Конфиденциальность' },
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
  const [theme, setTheme] = useState<string>(() => typeof window !== 'undefined' ? (localStorage.getItem('nn-theme') || 'theme-light-neuro') : 'theme-light-neuro');
  const [custom, setCustom] = useState({
    background: '',
    textPrimary: '',
    textSecondary: '',
    surface: '',
    primary: '',
    secondary: '',
    border: ''
  });

  useEffect(() => {
    const handler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handler);
    setIsFullscreen(Boolean(document.fullscreenElement));
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  useEffect(() => {
    // apply theme class on <html>
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      html.classList.remove('theme-dark','theme-light-neuro','theme-purple-pink','theme-teal-blue');
      html.classList.add(theme);
      localStorage.setItem('nn-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    // apply custom overrides
    if (typeof document !== 'undefined') {
      const s = document.documentElement.style as CSSStyleDeclaration & Record<string,string>;
      if (custom.background) s.setProperty('--color-background', custom.background);
      if (custom.surface) s.setProperty('--color-surface', custom.surface);
      if (custom.textPrimary) s.setProperty('--color-text-primary', custom.textPrimary);
      if (custom.textSecondary) s.setProperty('--color-text-secondary', custom.textSecondary);
      if (custom.primary) s.setProperty('--color-primary', custom.primary);
      if (custom.secondary) s.setProperty('--color-secondary', custom.secondary);
      if (custom.border) s.setProperty('--color-border', custom.border);
      localStorage.setItem('nn-theme-custom', JSON.stringify(custom));
    }
  }, [custom]);

  useEffect(() => {
    // load custom on mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nn-theme-custom');
      if (saved) {
        try { setCustom(JSON.parse(saved)); } catch {}
      }
    }
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
            <SwitchRow title="Темная тема" desc="В настоящее время используется темная тема для продуктивности" defaultChecked />
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

      {active === 'colors' && (
        <section className="bg-surface border border-border rounded-2xl p-4 sm:p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2"><HiOutlineColorSwatch /> Цветовые темы</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PresetCard name="Тёмная (по умолчанию)" className="theme-dark" active={theme==='theme-dark'} onSelect={() => setTheme('theme-dark')} />
            <PresetCard name="Светлая нейроморфная" className="theme-light-neuro" active={theme==='theme-light-neuro'} onSelect={() => setTheme('theme-light-neuro')} />
            <PresetCard name="Фиолетово-розовая" className="theme-purple-pink" active={theme==='theme-purple-pink'} onSelect={() => setTheme('theme-purple-pink')} />
            <PresetCard name="Бирюзово-синяя" className="theme-teal-blue" active={theme==='theme-teal-blue'} onSelect={() => setTheme('theme-teal-blue')} />
          </div>

          <div className="pt-2 space-y-3">
            <h3 className="text-lg font-semibold text-text-primary">Своя тема</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <ColorInput label="Фон" value={custom.background} onChange={(v)=>setCustom({ ...custom, background: v })} />
              <ColorInput label="Поверхность" value={custom.surface} onChange={(v)=>setCustom({ ...custom, surface: v })} />
              <ColorInput label="Текст (основной)" value={custom.textPrimary} onChange={(v)=>setCustom({ ...custom, textPrimary: v })} />
              <ColorInput label="Текст (вторичный)" value={custom.textSecondary} onChange={(v)=>setCustom({ ...custom, textSecondary: v })} />
              <ColorInput label="Primary" value={custom.primary} onChange={(v)=>setCustom({ ...custom, primary: v })} />
              <ColorInput label="Secondary" value={custom.secondary} onChange={(v)=>setCustom({ ...custom, secondary: v })} />
              <ColorInput label="Граница" value={custom.border} onChange={(v)=>setCustom({ ...custom, border: v })} />
            </div>
            <div className="flex gap-3">
              <button className="bg-surface border border-border rounded-full px-4 py-2" onClick={()=>{ setCustom({ background:'', textPrimary:'', textSecondary:'', surface:'', primary:'', secondary:'', border:'' }); localStorage.removeItem('nn-theme-custom'); }}>Сбросить кастомизацию</button>
              <button className="bg-gradient-to-r from-primary to-secondary text-white rounded-full px-5 py-2" onClick={()=>{ /* значения уже сохранены в useEffect */ }}>Сохранить</button>
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

function PresetCard({ name, className, active, onSelect }: { name: string; className: string; active?: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className={`text-left rounded-2xl border ${active ? 'border-primary' : 'border-border'} p-4 transition-shadow hover:shadow-sm`}>
      <div className={`${className} rounded-lg p-3 border border-border`}> 
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded bg-[var(--color-background)] border border-border" />
          <div className="h-8 w-8 rounded bg-[var(--color-surface)] border border-border" />
          <div className="h-8 w-8 rounded bg-[var(--color-primary)]" />
          <div className="h-8 w-8 rounded bg-[var(--color-secondary)]" />
          <div className="h-8 w-8 rounded bg-[var(--color-text-primary)]" />
        </div>
      </div>
      <div className="mt-2 text-text-primary font-medium">{name}</div>
      {active && <div className="text-xs text-success mt-1">Активная</div>}
    </button>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="text-sm text-text-secondary flex items-center gap-2">
      <span className="w-40">{label}</span>
      <input type="color" className="h-9 w-12 p-0 bg-transparent" value={value || '#ffffff'} onChange={(e)=>onChange(e.target.value)} />
      <input className="flex-1 h-10 bg-surface border border-border rounded-lg px-2 text-text-primary" placeholder="#RRGGBB" value={value} onChange={(e)=>onChange(e.target.value)} />
    </label>
  );
}


