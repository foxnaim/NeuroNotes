"use client";

import { useMemo, useState } from 'react';
import {
  HiOutlineSparkles,
  HiOutlinePlus,
  HiOutlineAdjustments,
  HiOutlineFlag,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineX
} from 'react-icons/hi';

function Stat({ label, value, icon, accent }: { label: string; value: number | string; icon?: React.ReactNode; accent?: 'green' | 'yellow' | 'blue' }) {
  return (
    <div className="flex items-center gap-4 bg-surface border border-border rounded-2xl px-6 py-4">
      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
        accent === 'green' ? 'bg-success/10 text-success' : accent === 'yellow' ? 'bg-warning/10 text-warning' : 'bg-secondary/10 text-secondary'
      }`}>{icon}</div>
      <div>
        <div className="text-text-secondary text-sm">{label}</div>
        <div className="text-text-primary text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="bg-gray-100 text-text-secondary text-xs px-2 py-1 rounded-full">{children}</span>;
}

function TaskCard({
  title,
  description,
  tags,
  due,
  est,
  source,
  priority,
  priorityTone
}: {
  title: string;
  description: string;
  tags: string[];
  due: string;
  est: string;
  source: string;
  priority: 'высокий' | 'средний' | 'низкий';
  priorityTone?: 'red' | 'yellow' | 'green';
}) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="mt-1 h-4 w-4 rounded-full border border-border" />
          <div>
            <h3 className="text-text-primary font-semibold text-lg sm:text-xl">{title}</h3>
            <p className="text-text-secondary mt-1">{description}</p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
              <span className="text-text-secondary text-xs flex items-center gap-1 ml-2"><HiOutlineCalendar /> Due: {due}</span>
              <span className="text-text-secondary text-xs flex items-center gap-1"><HiOutlineClock /> Est: {est}</span>
              <span className="text-text-secondary text-xs">From {source}</span>
            </div>
          </div>
        </div>
        <div className="sm:self-start mt-2 sm:mt-0">
          <span className={`text-xs px-2 py-1 rounded-full border ${
            priorityTone === 'red' ? 'text-error border-error/30 bg-error/10' : priorityTone === 'yellow' ? 'text-warning border-warning/30 bg-warning/10' : 'text-success border-success/30 bg-success/10'
          }`}> {priority} </span>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl mt-4 p-3">
        <div className="flex items-start gap-2 text-text-primary">
          <HiOutlineSparkles className="text-secondary mt-0.5" />
          <div>
            <div className="text-sm font-medium">ИИ предложение</div>
            <div className="text-text-secondary text-sm">Разбейте это на более мелкие подзадачи для лучшего отслеживания</div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Task = {
  title: string;
  description: string;
  tags: string[];
  due: string;
  est: string;
  source: string;
  priority: 'высокий' | 'средний' | 'низкий';
  priorityTone?: 'red' | 'yellow' | 'green';
};

function Modal({ children, title, onClose }: { children: React.ReactNode; title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-surface border border-border rounded-2xl p-5 w-full max-w-xl shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-text-primary font-semibold text-lg">{title}</h3>
          <button aria-label="Закрыть" onClick={onClose} className="p-2 rounded-lg hover:bg-gray-50">
            <HiOutlineX className="text-text-primary" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      title: 'Просмотреть и обновить документацию проекта',
      description: 'Пройти по всей документации проекта и убедиться, что она актуальна с последними изменениями',
      tags: ['документация', 'обзор'],
      due: '2024-01-16',
      est: '2ч',
      source: 'note',
      priority: 'высокий',
      priorityTone: 'red',
    },
    {
      title: 'Реализовать поток аутентификации пользователей',
      description: 'Настроить функции входа, регистрации и восстановления пароля',
      tags: ['разработка', 'авторизация'],
      due: '2024-01-18',
      est: '6ч',
      source: 'Manual',
      priority: 'высокий',
      priorityTone: 'yellow',
    },
  ]);

  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const [newTask, setNewTask] = useState<Task>({
    title: '',
    description: '',
    tags: [],
    due: '',
    est: '1ч',
    source: 'Manual',
    priority: 'средний',
    priorityTone: 'green',
  });

  const totalStats = useMemo(() => ({
    all: tasks.length,
    toDo: tasks.length,
  }), [tasks.length]);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-text-primary mb-2">Задачи</h1>
          <p className="text-text-secondary">Организуйте и отслеживайте ваши дела с помощью ИИ</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setIsAiOpen(true)} className="h-12 px-5 bg-surface border border-border rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2">
            <HiOutlineSparkles className="text-text-primary" />
            <span className="text-text-primary font-medium">ИИ предложения</span>
          </button>
          <button onClick={() => setIsNewTaskOpen(true)} className="h-12 px-5 bg-gradient-to-r from-primary to-secondary text-white rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity">
            <HiOutlinePlus />
            <span className="font-medium">Новая задача</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        <Stat label="Все" value={totalStats.all} />
        <Stat label="К Выполнению" value={totalStats.toDo} />
        <Stat label="В Процессе" value={1} icon={<HiOutlineClock />} accent="yellow" />
        <Stat label="На Проверке" value={1} accent="blue" />
        <Stat label="Выполнено" value={1} accent="green" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <button className="h-10 px-4 bg-surface border border-border rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2">
          <HiOutlineAdjustments className="text-text-primary" />
          <span className="text-text-primary">Фильтр</span>
        </button>
        <button className="h-10 px-4 bg-surface border border-border rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2">
          <HiOutlineFlag className="text-text-primary" />
          <span className="text-text-primary">Приоритет</span>
        </button>
        <button className="h-10 px-4 bg-surface border border-border rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2">
          <HiOutlineCalendar className="text-text-primary" />
          <span className="text-text-primary">Срок выполнения</span>
        </button>
      </div>

      {/* Tasks list */}
      <div className="space-y-4 sm:space-y-6">
        {tasks.map((t, idx) => (
          <TaskCard key={`${t.title}-${idx}`} {...t} />
        ))}
      </div>

      {isNewTaskOpen && (
        <Modal title="Новая задача" onClose={() => setIsNewTaskOpen(false)}>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!newTask.title.trim()) return;
              setTasks((prev) => [newTask, ...prev]);
              setNewTask({ title: '', description: '', tags: [], due: '', est: '1ч', source: 'Manual', priority: 'средний', priorityTone: 'green' });
              setIsNewTaskOpen(false);
            }}
          >
            <input
              className="w-full h-11 bg-surface border border-border rounded-lg px-3 text-text-primary placeholder:text-text-secondary/70 focus:outline-none"
              placeholder="Заголовок"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              className="w-full min-h-24 bg-surface border border-border rounded-lg px-3 py-2 text-text-primary placeholder:text-text-secondary/70 focus:outline-none"
              placeholder="Описание"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="date"
                className="h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none"
                value={newTask.due}
                min={today}
                onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
              />
              <input
                className="h-11 bg-surface border border-border rounded-lg px-3 text-text-primary placeholder:text-text-secondary/70 focus:outline-none"
                placeholder="Оценка (например 2ч)"
                value={newTask.est}
                onChange={(e) => setNewTask({ ...newTask, est: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                className="h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
              >
                <option value="высокий">Высокий</option>
                <option value="средний">Средний</option>
                <option value="низкий">Низкий</option>
              </select>
              <input
                className="h-11 bg-surface border border-border rounded-lg px-3 text-text-primary placeholder:text-text-secondary/70 focus:outline-none"
                placeholder="Теги через запятую"
                value={newTask.tags.join(', ')}
                onChange={(e) => setNewTask({ ...newTask, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsNewTaskOpen(false)} className="h-10 px-4 bg-surface border border-border rounded-full hover:bg-gray-50 text-text-primary">
                Отмена
              </button>
              <button type="submit" className="h-10 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:opacity-90">
                Добавить
              </button>
            </div>
          </form>
        </Modal>
      )}

      {isAiOpen && (
        <Modal title="ИИ предложения" onClose={() => setIsAiOpen(false)}>
          <div className="space-y-3">
            {[
              { title: 'Убраться в задачах бэклога', description: 'Разгруппировать и приоритезировать накопившиеся задачи', tags: ['организация', 'приоритеты'], est: '1ч', due: '', priority: 'средний', priorityTone: 'yellow' },
              { title: 'Составить план запуска функции', description: 'Определить этапы, риски и ответственных', tags: ['планирование'], est: '2ч', due: '', priority: 'высокий', priorityTone: 'red' },
              { title: 'Ретроспектива спринта', description: 'Записать выводы и действия по улучшению процессов', tags: ['ретро', 'команда'], est: '45м', due: '', priority: 'средний', priorityTone: 'green' },
            ].map((s, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl p-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-text-primary font-medium">{s.title}</div>
                  <div className="text-text-secondary text-sm">{s.description}</div>
                </div>
                <button
                  className="px-3 h-9 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
                  onClick={() => {
                    setTasks((prev) => [
                      {
                        title: s.title,
                        description: s.description,
                        tags: s.tags as string[],
                        due: s.due as string,
                        est: s.est as string,
                        source: 'AI',
                        priority: s.priority as Task['priority'],
                        priorityTone: s.priorityTone as Task['priorityTone'],
                      },
                      ...prev,
                    ]);
                  }}
                >
                  Добавить
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={() => setIsAiOpen(false)} className="h-10 px-4 bg-surface border border-border rounded-full hover:bg-gray-50 text-text-primary">Готово</button>
          </div>
        </Modal>
      )}
    </div>
  );
}


