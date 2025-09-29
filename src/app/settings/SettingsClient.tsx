"use client";

import { useState } from 'react';
import { HiOutlineUser, HiOutlineSparkles, HiOutlineBell, HiOutlinePuzzle, HiOutlineShieldCheck, HiOutlineColorSwatch } from 'react-icons/hi';

type TabKey = 'profile' | 'ai' | 'notifications' | 'integrations' | 'privacy';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'profile', label: 'Профиль' },
  { key: 'ai', label: 'ИИ' },
  { key: 'notifications', label: 'Уведомления' },
  { key: 'integrations', label: 'Интеграции' },
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
  return (
    <div className="space-y-6">
      <TabBar active={active} onChange={setActive} />

      {active === 'profile' && (
        <>
          <section className="bg-surface border border-border rounded-2xl p-6 space-y-6">
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
          <section className="bg-surface border border-border rounded-2xl p-6 space-y-5">
            <h3 className="text-2xl font-semibold text-text-primary flex items-center gap-2"><HiOutlineColorSwatch /> Внешний вид</h3>
            <ToggleRow title="Темная тема" desc="В настоящее время используется темная тема для продуктивности" defaultChecked />
            <ToggleRow title="Компактный режим" desc="Показать больше контента в меньшем пространстве" />
          </section>
        </>
      )}

      {active === 'ai' && (
        <section className="bg-surface border border-border rounded-2xl p-6 space-y-5">
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
        <section className="bg-surface border border-border rounded-2xl p-6 space-y-5">
          <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2"><HiOutlineBell /> Настройки уведомлений</h2>
          <ToggleRow title="Напоминания о задачах" desc="Получать уведомления о приближающихся сроках" defaultChecked />
          <ToggleRow title="ИИ инсайты" desc="Еженедельные инсайты и предложения по продуктивности" defaultChecked />
          <ToggleRow title="Ежедневное резюме" desc="Утреннее резюме приоритетов вашего дня" />
          <ToggleRow title="Обновления совместной работы" desc="Когда кто-то делится заметками или задачами с вами" defaultChecked />
        </section>
      )}

      {active === 'integrations' && (
        <section className="bg-surface border border-border rounded-2xl p-6 space-y-5">
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


