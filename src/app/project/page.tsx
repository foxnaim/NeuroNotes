'use client';

import React, { useMemo } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui";
import { 
  HiOutlineCurrencyDollar, 
  HiOutlineTrendingUp, 
  HiOutlineTrendingDown,
  HiOutlineClock,
  HiOutlineLightningBolt,
  HiOutlineStar,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineExclamationCircle,
  HiOutlineFire,
  HiOutlineChartBar,
  HiOutlineRefresh
} from 'react-icons/hi';

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const habitCategories = [
  {
    title: "Здоровье",
    habits: ["Утреннее чтение с кофе", "Растяжка 15 мин"],
  },
  {
    title: "Работа",
    habits: ["Созвон с директором", "Работа в офисе — 5 часов"],
  },
  {
    title: "Личное",
    habits: ["Ozon отправить товары — 2 часа", "Спортзал в 19:00", "Побыть наедине"],
  },
];

const weeklyStats = [
  { week: "Неделя 1", completed: [3, 4, 5, 6, 5, 2, 3], color: "from-rose-500 to-pink-500", done: 28, total: 49, percent: 57 },
  { week: "Неделя 2", completed: [6, 5, 4, 6, 7, 5, 6], color: "from-purple-500 to-indigo-500", done: 34, total: 49, percent: 69 },
  { week: "Неделя 3", completed: [4, 5, 6, 5, 3, 6, 5], color: "from-sky-500 to-cyan-500", done: 28, total: 49, percent: 57 },
  { week: "Неделя 4", completed: [3, 5, 6, 5, 3, 6, 4], color: "from-amber-500 to-orange-500", done: 25, total: 49, percent: 51 },
  { week: "Доп.", completed: [5, 4, 3, 4, 5], color: "from-emerald-500 to-teal-500", done: 12, total: 21, percent: 57 },
];

const monthlyProgress = [
  { label: "Здоровье", value: 39 },
  { label: "Работа", value: 81 },
  { label: "Личное", value: 71 },
  { label: "Учёба", value: 84 },
  { label: "Финансы", value: 81 },
  { label: "Отношения", value: 45 },
];

const topTasks = Array.from({ length: 28 }, (_, i) => i + 1);

const yearlyGoals = [
  {
    title: "Финансы",
    daily: "Накопить 300к к концу года",
    weekly: "Отказ от импульсивных покупок",
    monthly: "Анализ расходов",
  },
  {
    title: "Духовность",
    daily: "Не заказывать доставку еды",
    weekly: "Найти, на чем можно сэкономить",
    monthly: "Отложить 25к",
  },
  { title: "Карьера" },
  { title: "Здоровье" },
  { title: "Отношения" },
  { title: "Творчество" },
];

// Финансовые данные
const financialData = {
  income: 150000,
  expenses: 95000,
  savings: 55000,
  goal: 300000,
  categories: [
    { name: "Еда", amount: 25000, color: "from-orange-500 to-red-500" },
    { name: "Транспорт", amount: 15000, color: "from-blue-500 to-cyan-500" },
    { name: "Развлечения", amount: 20000, color: "from-pink-500 to-purple-500" },
    { name: "Покупки", amount: 35000, color: "from-green-500 to-emerald-500" },
  ],
  monthlyTrend: [45000, 52000, 48000, 55000, 62000, 58000, 95000],
};

// История транзакций
const transactions = [
  { id: 1, date: "11 авг", description: "Продукты в Пятёрочке", amount: -2500, category: "Еда", type: "expense" },
  { id: 2, date: "10 авг", description: "Зарплата", amount: 150000, category: "Доходы", type: "income" },
  { id: 3, date: "10 авг", description: "Такси", amount: -450, category: "Транспорт", type: "expense" },
  { id: 4, date: "9 авг", description: "Кино", amount: -800, category: "Развлечения", type: "expense" },
  { id: 5, date: "9 авг", description: "Онлайн курс", amount: -3500, category: "Образование", type: "expense" },
  { id: 6, date: "8 авг", description: "Кафе", amount: -1200, category: "Еда", type: "expense" },
];

// Бюджет по категориям
const budgetCategories = [
  { name: "Еда", budget: 30000, spent: 25000, color: "from-orange-500 to-red-500" },
  { name: "Транспорт", budget: 20000, spent: 15000, color: "from-blue-500 to-cyan-500" },
  { name: "Развлечения", budget: 25000, spent: 20000, color: "from-pink-500 to-purple-500" },
  { name: "Покупки", budget: 40000, spent: 35000, color: "from-green-500 to-emerald-500" },
  { name: "Образование", budget: 15000, spent: 3500, color: "from-purple-500 to-indigo-500" },
];

// Финансовые цели
const financialGoals = [
  { title: "Накопить на отпуск", target: 200000, current: 120000, deadline: "Дек 2025", icon: "✈️" },
  { title: "Резервный фонд", target: 500000, current: 55000, deadline: "2026", icon: "💰" },
  { title: "Новый ноутбук", target: 150000, current: 45000, deadline: "Окт 2025", icon: "💻" },
];

// Подписки и регулярные платежи
const subscriptions = [
  { name: "Netflix", amount: 599, period: "мес", nextPayment: "15 авг", category: "Развлечения" },
  { name: "Spotify", amount: 299, period: "мес", nextPayment: "20 авг", category: "Развлечения" },
  { name: "Gym", amount: 3000, period: "мес", nextPayment: "1 сен", category: "Здоровье" },
  { name: "Интернет", amount: 800, period: "мес", nextPayment: "25 авг", category: "Коммунальные" },
];

// Улучшенные задачи с приоритетами
const tasks = [
  { id: 1, title: "Завершить проект NeuroNotes", priority: "high", category: "Работа", deadline: "15 авг", completed: false },
  { id: 2, title: "Подготовить презентацию", priority: "medium", category: "Работа", deadline: "12 авг", completed: false },
  { id: 3, title: "Купить продукты", priority: "low", category: "Личное", deadline: "11 авг", completed: true },
  { id: 4, title: "Встреча с командой", priority: "high", category: "Работа", deadline: "11 авг", completed: false },
  { id: 5, title: "Тренировка в спортзале", priority: "medium", category: "Здоровье", deadline: "11 авг", completed: true },
];

// Стрики (дни подряд)
const streaks = [
  { habit: "Утреннее чтение с кофе", days: 31, icon: "🔥" },
  { habit: "Работа в офисе", days: 28, icon: "💼" },
  { habit: "Спортзал", days: 15, icon: "💪" },
];

// Достижения
const achievements = [
  { title: "Неделя без пропусков", description: "Выполнил все привычки 7 дней подряд", icon: "🏆", unlocked: true },
  { title: "Финансовая дисциплина", description: "Сэкономил 50к за месяц", icon: "💰", unlocked: true },
  { title: "Мастер продуктивности", description: "100 выполненных задач", icon: "⭐", unlocked: false },
];

// События календаря
const calendarEvents = [
  { date: 12, title: "Встреча с директором", time: "10:00", type: "work" },
  { date: 15, title: "Дедлайн проекта", time: "18:00", type: "urgent" },
  { date: 20, title: "День рождения друга", time: "19:00", type: "personal" },
  { date: 25, title: "Презентация", time: "14:00", type: "work" },
];

// Трекинг времени
const timeTracking = [
  { category: "Работа", hours: 35, target: 40, color: "from-blue-500 to-cyan-500" },
  { category: "Учёба", hours: 12, target: 15, color: "from-purple-500 to-pink-500" },
  { category: "Спорт", hours: 8, target: 10, color: "from-green-500 to-emerald-500" },
  { category: "Отдых", hours: 20, target: 25, color: "from-orange-500 to-yellow-500" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'habits' | 'finance' | 'tasks' | 'calendar'>('habits');

  const handleTabChange = (tabId: 'habits' | 'finance' | 'tasks' | 'calendar') => {
    setActiveTab(tabId);
  };

  // Мемоизация данных для круговой диаграммы
  const pieChartData = useMemo(() => {
    const total = financialData.categories.reduce((sum, cat) => sum + cat.amount, 0);
    let currentAngle = 0;
    return financialData.categories.map((cat, idx) => {
      const percentage = (cat.amount / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;
      const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = 100 + 80 * Math.cos((currentAngle - 90) * Math.PI / 180);
      const y2 = 100 + 80 * Math.sin((currentAngle - 90) * Math.PI / 180);
      const largeArc = angle > 180 ? 1 : 0;
      return {
        ...cat,
        idx,
        path: `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`,
        percentage: Math.round(percentage)
      };
    });
  }, []);

  // Мемоизация фильтрованных задач
  const taskStats = useMemo(() => ({
    total: tasks.length,
    urgent: tasks.filter(t => t.priority === 'high' && !t.completed).length,
    inProgress: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    highPriority: tasks.filter(t => !t.completed && t.priority === 'high'),
    mediumPriority: tasks.filter(t => !t.completed && t.priority === 'medium'),
    lowPriority: tasks.filter(t => !t.completed && t.priority === 'low'),
    done: tasks.filter(t => t.completed)
  }), []);

  const mixWithNeutral = (colorVar: string, weight: number, neutralVar = 'var(--color-neutral-light)') =>
    `color-mix(in srgb, ${colorVar} ${weight}%, ${neutralVar} ${100 - weight}%)`;

  const glowGradient = (primaryWeight = 12, secondaryWeight = 8, neutralVar = 'var(--color-neutral-lighter)') =>
    `linear-gradient(135deg, color-mix(in srgb, var(--color-primary) ${primaryWeight}%, var(--color-surface) ${100 - primaryWeight}%) 0%, color-mix(in srgb, var(--color-secondary) ${secondaryWeight}%, var(--color-surface) ${100 - secondaryWeight}%) 100%)`;

  const surfaceSoft = (weight = 12) =>
    `color-mix(in srgb, var(--color-surface) ${100 - weight}%, var(--color-background) ${weight}%)`;

  const borderSoft = (weight = 20) =>
    `color-mix(in srgb, var(--color-border) ${100 - weight}%, var(--color-primary) ${weight}%)`;

  const shadowSoft = (colorVar = 'var(--color-primary)', opacity = 0.22) =>
    `0 24px 48px -30px color-mix(in srgb, ${colorVar} 25%, rgba(0, 0, 0, ${opacity}))`;

  return (
    <div className="min-h-full px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Табы для переключения между секциями */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'habits', label: 'Привычки' },
            { id: 'finance', label: 'Финансы' },
            { id: 'tasks', label: 'Задачи' },
            { id: 'calendar', label: 'Календарь' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-surface/80 text-text-secondary hover:bg-surface border border-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Секция привычек - улучшенная версия */}
        {activeTab === 'habits' && (
        <div className="space-y-6">
          {/* Быстрый обзор на сегодня */}
          <motion.section 
            className="border rounded-3xl p-6 sm:p-8 backdrop-blur-xl"
            style={{
              background: glowGradient(8, 6),
              borderColor: borderSoft(15),
              boxShadow: shadowSoft('var(--color-primary)', 0.24)
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div>
                <motion.h1 
                  className="text-3xl sm:text-4xl font-bold flex items-center gap-3" 
                  style={{ color: 'var(--color-text-primary)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.div 
                    className="p-2 rounded-xl text-white"
                    style={{
                      background: `linear-gradient(135deg, var(--color-success) 0%, var(--color-secondary) 100%)`
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                  >
                    {React.createElement(HiOutlineFire as any)}
                  </motion.div>
                  Сегодня
            </motion.h1>
                <motion.p 
                  className="mt-2" 
                  style={{ color: 'var(--color-text-secondary)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  11 августа 2025 • Понедельник
                </motion.p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Добавить привычку</Button>
                <Button size="sm" variant="secondary">
                  Экспорт отчёта
              </Button>
            </div>
          </div>

            {/* Быстрые привычки на сегодня */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {habitCategories.flatMap((category, idx) =>
                category.habits.slice(0, 1).map((habit) => (
                  <motion.div
                    key={habit}
                    className="border rounded-xl p-4 transition-all cursor-pointer group habit-card"
                    style={{
                      background: glowGradient(6, 4),
                      borderColor: borderSoft(12),
                      boxShadow: shadowSoft('var(--color-primary)', 0.2)
                    }}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{habit}</span>
                      <button 
                        className="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all habit-checkbox"
                        style={{
                          borderColor: 'var(--color-border)'
                        }}
                      >
                        <div 
                          className="w-3 h-3 rounded transition-opacity habit-checkbox-inner"
                          style={{
                            backgroundColor: 'var(--color-primary)',
                            opacity: 0
                          }}
                        />
                      </button>
        </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <span>{category.title}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {React.createElement(HiOutlineFire as any)} 31 день
                      </span>
          </div>
        </motion.div>
                ))
              )}
      </div>

            {/* Прогресс на сегодня */}
            <motion.div 
              className="border rounded-2xl p-4"
              style={{
                background: surfaceSoft(8),
                borderColor: borderSoft(15),
                boxShadow: shadowSoft('var(--color-primary)', 0.22)
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Прогресс на сегодня</span>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>3 / 5 привычек</span>
              </div>
              <div 
                className="h-3 rounded-full overflow-hidden"
                style={{
                  backgroundColor: surfaceSoft(10)
                }}
              >
                <motion.div
                  className="h-full rounded-full animate-pulse"
                  style={{ 
                    background: `linear-gradient(90deg, var(--color-success) 0%, var(--color-secondary) 50%, var(--color-success) 100%)`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                <span>Осталось 2 привычки</span>
                <motion.span 
                  className="font-semibold" 
                  style={{ color: 'var(--color-success)' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1 }}
                >
                  60%
                </motion.span>
              </div>
            </motion.div>
          </motion.section>

          {/* Основной календарь привычек - Учись постоянно */}
          <motion.section 
            className="border rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl"
            style={{
              background: glowGradient(7, 5),
              borderColor: borderSoft(15),
              boxShadow: shadowSoft('var(--color-primary)', 0.26)
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div>
                <motion.h1 
                  className="text-3xl sm:text-4xl font-bold" 
                  style={{ color: 'var(--color-text-primary)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Учись постоянно.
                </motion.h1>
                <motion.p 
                  className="mt-2" 
                  style={{ color: 'var(--color-text-secondary)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  11 августа 2025
                </motion.p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Добавить привычку</Button>
                <Button size="sm" variant="secondary">
                  Экспорт отчёта
            </Button>
          </div>
        </div>

            <div className="overflow-x-auto">
              <div className="min-w-[1100px] space-y-6">
                <div className="grid grid-cols-[160px_1fr] gap-4">
                  <div className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>
                    Недели месяца
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-xs text-center" style={{ color: 'var(--color-text-secondary)' }}>
                    {["НЕДЕЛЯ 1", "НЕДЕЛЯ 2", "НЕДЕЛЯ 3", "НЕДЕЛЯ 4", "Доп."].map((week) => (
                      <div
                        key={week}
                        className="rounded-xl py-2 font-semibold"
                        style={{
                          background: glowGradient(6, 4),
                          borderColor: borderSoft(12),
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          color: 'var(--color-text-primary)',
                          boxShadow: shadowSoft('var(--color-primary)', 0.2)
                        }}
                      >
                        {week}
          </div>
                    ))}
        </div>
                </div>

                <div className="grid grid-cols-[160px_1fr] gap-4">
        <div className="space-y-4">
                    {habitCategories.map((category) => (
                      <div key={category.title}>
                        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                          {category.title}
                        </p>
                        <div className="space-y-2">
                          {category.habits.map((habit) => (
                            <div
                              key={habit}
                              className="text-sm"
                              style={{ color: 'color-mix(in srgb, var(--color-text-primary) 90%, transparent)' }}
                            >
                              {habit}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div 
                    className="rounded-2xl border p-4"
                    style={{
                      borderColor: borderSoft(12),
                      background: surfaceSoft(8),
                      boxShadow: shadowSoft('var(--color-primary)', 0.18)
                    }}
                  >
                    <div className="grid grid-cols-7 gap-2 text-[11px] mb-3 font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                      {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                        <span key={day} className="text-center">
                          {day}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-[repeat(31,minmax(0,1fr))] gap-[6px] mb-4">
                      {days.map((day) => {
                        const isHighlighted = day === 7 || day === 23;
                        return (
                          <div
                            key={day}
                            className="h-6 w-6 flex items-center justify-center rounded-md text-[11px] font-semibold"
                            style={{
                              background: isHighlighted ? glowGradient(8, 6) : surfaceSoft(10),
                              color: isHighlighted ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                              boxShadow: isHighlighted ? shadowSoft('var(--color-primary)', 0.2) : 'none',
                              border: `1px solid ${isHighlighted ? borderSoft(15) : borderSoft(12)}`
                            }}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                    <div className="space-y-3">
                      {habitCategories.flatMap((category) =>
                        category.habits.map((habit, idx) => (
                          <div key={`${category.title}-${habit}`} className="grid grid-cols-[repeat(31,minmax(0,1fr))] gap-[6px]">
                            {days.map((day) => (
                              <span
                                key={day}
                                className="h-5 w-5 rounded-sm border flex items-center justify-center text-[10px]"
                                style={{
                                  background: (day + idx) % 3 === 0 ? glowGradient(8, 6) : surfaceSoft(8),
                                  borderColor: (day + idx) % 3 === 0 ? borderSoft(15) : borderSoft(10),
                                  color: (day + idx) % 3 === 0 ? 'var(--color-text-primary)' : 'transparent',
                                  boxShadow: (day + idx) % 3 === 0 ? shadowSoft('var(--color-primary)', 0.18) : 'none'
                                }}
                              >
                                {(day + idx) % 3 === 0 ? "✓" : ""}
                              </span>
                            ))}
          </div>
                        ))
          )}
        </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

        {/* Статистика и аналитика */}
        <section className="grid lg:grid-cols-3 gap-6">
          {/* Heatmap активности (как GitHub) */}
          <motion.div 
            className="lg:col-span-2 border rounded-3xl p-6 backdrop-blur-xl"
            style={{
              background: glowGradient(6, 5),
              borderColor: borderSoft(15),
              boxShadow: shadowSoft('var(--color-primary)', 0.24)
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                <div style={{ color: 'var(--color-success)' }}>
                  {React.createElement(HiOutlineChartBar as any)}
                </div>
                Heatmap активности
              </h3>
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Последние 12 месяцев</span>
            </div>
            <div className="space-y-3">
              {['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'].map((month, monthIdx) => (
                <div key={month} className="flex items-center gap-2">
                  <span className="text-xs w-10" style={{ color: 'var(--color-text-secondary)' }}>{month}</span>
                  <div className="flex gap-1 flex-1">
                    {Array.from({ length: 31 }, (_, day) => {
                      const intensity = Math.floor(Math.random() * 5); // 0-4 для разных уровней активности
                      const opacity = intensity === 0 ? 0.3 : intensity === 1 ? 0.3 : intensity === 2 ? 0.5 : intensity === 3 ? 0.7 : 1;
                      return (
                        <div
                          key={day}
                          className="w-3 h-3 rounded-sm"
                          style={{
                            backgroundColor: intensity === 0 
                              ? 'color-mix(in srgb, var(--color-background) 30%, transparent)'
                              : `color-mix(in srgb, var(--color-success) ${opacity * 100}%, transparent)`
                          }}
                          title={`${day + 1} ${month}`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-end gap-4 mt-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                <span>Меньше</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--color-background) 30%, transparent)' }} />
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--color-success) 30%, transparent)' }} />
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--color-success) 50%, transparent)' }} />
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--color-success) 70%, transparent)' }} />
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--color-success)' }} />
                </div>
                <span>Больше</span>
              </div>
            </div>
      </motion.div>

          {/* Статистика по дням недели */}
          <motion.div 
            className="border rounded-3xl p-6 backdrop-blur-xl"
            style={{
              background: glowGradient(6, 4),
              borderColor: borderSoft(15),
              boxShadow: shadowSoft('var(--color-primary)', 0.22)
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              <div style={{ color: 'var(--color-primary)' }}>
                {React.createElement(HiOutlineChartBar as any)}
              </div>
              Лучший день недели
            </h3>
            <div className="space-y-3">
              {[
                { day: 'Понедельник', value: 75 },
                { day: 'Вторник', value: 82 },
                { day: 'Среда', value: 68 },
                { day: 'Четверг', value: 90 },
                { day: 'Пятница', value: 65 },
                { day: 'Суббота', value: 45 },
                { day: 'Воскресенье', value: 40 },
              ].map((item, idx) => (
                <motion.div 
                  key={item.day}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + idx * 0.05 }}
                >
                  <div className="flex justify-between text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>{item.day}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div 
                    className="h-2 rounded-full"
                    style={{
                      backgroundColor: surfaceSoft(10)
                    }}
                  >
                    <motion.div
                      className="h-full rounded-full animate-pulse"
                      style={{ 
                        background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%)`
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.8, delay: 0.7 + idx * 0.05, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="mt-4 p-3 border rounded-xl"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
                borderColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 }}
            >
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>Самый продуктивный день</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Четверг — 90%</p>
          </motion.div>
        </motion.div>
        </section>

        {/* Сравнение с прошлым месяцем */}
        <motion.section 
          className="border rounded-3xl p-6 backdrop-blur-xl"
          style={{
            background: glowGradient(6, 4),
            borderColor: borderSoft(15),
            boxShadow: shadowSoft('var(--color-primary)', 0.22)
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              <div style={{ color: 'var(--color-secondary)' }}>
                {React.createElement(HiOutlineRefresh as any)}
          </div>
              Сравнение с прошлым месяцем
            </h3>
            <Button size="sm" variant="secondary">Подробнее</Button>
        </div>
          <div className="grid md:grid-cols-4 gap-4">
            <motion.div 
              className="border rounded-xl p-4"
              style={{
                backgroundColor: surfaceSoft(8),
                borderColor: borderSoft(12),
                boxShadow: shadowSoft('var(--color-success)', 0.18)
              }}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Выполнено привычек</span>
                <div style={{ color: 'var(--color-success)' }}>
                  {React.createElement(HiOutlineTrendingUp as any)}
                </div>
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>127</p>
              <p className="text-xs" style={{ color: 'var(--color-success)' }}>+12% к прошлому месяцу</p>
            </motion.div>
            <motion.div 
              className="border rounded-xl p-4"
              style={{
                backgroundColor: surfaceSoft(8),
                borderColor: borderSoft(12),
                boxShadow: shadowSoft('var(--color-primary)', 0.18)
              }}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Средний прогресс</span>
                <div style={{ color: 'var(--color-primary)' }}>
                  {React.createElement(HiOutlineTrendingUp as any)}
                </div>
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>67%</p>
              <p className="text-xs" style={{ color: 'var(--color-primary)' }}>+5% к прошлому месяцу</p>
            </motion.div>
            <motion.div 
              className="border rounded-xl p-4"
              style={{
                backgroundColor: surfaceSoft(8),
                borderColor: borderSoft(12),
                boxShadow: shadowSoft('var(--color-warning)', 0.18)
              }}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Самый длинный стрик</span>
                <div style={{ color: 'var(--color-warning)' }}>
                  {React.createElement(HiOutlineFire as any)}
                </div>
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>31</p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>дней подряд</p>
            </motion.div>
            <motion.div 
              className="border rounded-xl p-4"
              style={{
                backgroundColor: surfaceSoft(8),
                borderColor: borderSoft(12),
                boxShadow: shadowSoft('var(--color-secondary)', 0.18)
              }}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Активных привычек</span>
                <div style={{ color: 'var(--color-secondary)' }}>
                  {React.createElement(HiOutlineStar as any)}
                </div>
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>8</p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>всего</p>
            </motion.div>
          </div>
        </motion.section>
        </div>
        )}

        {/* Еженедельный обзор и прогресс - только для таба habits */}
        {activeTab === 'habits' && (
        <section className="grid lg:grid-cols-[2fr_1fr] gap-6">
          <div 
            className="border rounded-3xl p-6 space-y-6 backdrop-blur-xl"
            style={{
              background: glowGradient(6, 4),
              borderColor: borderSoft(15),
              boxShadow: shadowSoft('var(--color-primary)', 0.24)
            }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>Еженедельный обзор</h2>
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Общий прогресс 127 / 217 (59%)</span>
      </div>

            <div className="space-y-5">
              {weeklyStats.map((week, weekIdx) => (
                <motion.div 
                  key={week.week} 
                  className="rounded-2xl border p-4 shadow-inner"
                  style={{
                    backgroundColor: surfaceSoft(10),
                    borderColor: borderSoft(12)
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: weekIdx * 0.1 }}
                >
                  <div className="flex items-center justify-between text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    <span>{week.week}</span>
                    <span>
                      {week.done}/{week.total} — {week.percent}%
                    </span>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {week.completed.map((value, index) => (
                      <motion.div
                        key={index}
                        className="flex-1 rounded-t-lg shadow-lg"
                        style={{ 
                          background: `linear-gradient(to top, var(--color-primary) 0%, var(--color-secondary) 100%)`
                        }}
                        initial={{ height: 0 }}
                        animate={{ height: `${value * 12}px` }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.05, ease: "easeOut" }}
                      />
                    ))}
          </div>
        </motion.div>
              ))}
        </div>
          </div>
          
          <div className="space-y-6">
            <div 
              className="border rounded-3xl p-6 backdrop-blur-xl"
              style={{
                background: glowGradient(6, 4),
                borderColor: borderSoft(15),
                boxShadow: shadowSoft('var(--color-primary)', 0.2)
              }}
            >
              <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>Прогресс за месяц</h3>
        <div className="space-y-4">
                {monthlyProgress.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div 
                      className="h-2 rounded-full"
                      style={{
                        backgroundColor: surfaceSoft(10)
                      }}
                    >
                      <motion.div
                        className="h-full rounded-full animate-pulse"
                        style={{ 
                          background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%)`
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                      />
          </div>
              </div>
                ))}
              </div>
              </div>

            <div 
              className="border rounded-3xl p-6 flex flex-col items-center justify-center backdrop-blur-xl"
              style={{
                background: glowGradient(6, 4),
                borderColor: borderSoft(15),
                boxShadow: shadowSoft('var(--color-primary)', 0.22)
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Задачи выполнено</h3>
              <div className="relative w-44 h-44">
                <div className="absolute inset-0 rounded-full border-[18px]" style={{ borderColor: 'var(--color-surface)' }} />
                <div className="absolute inset-0 rounded-full border-[18px] border-r-transparent border-b-transparent rotate-45" style={{ borderLeftColor: 'var(--color-primary)', borderTopColor: 'var(--color-primary)' }} />
                <div 
                  className="absolute inset-[32%] rounded-full flex items-center justify-center text-xl font-bold"
                  style={{
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  59%
          </div>
              </div>
              <div className="mt-6 w-full flex justify-between text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <span>Выполнены</span>
                <span>Осталось</span>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Топ-3 задачи на день - только для таба habits */}
        {activeTab === 'habits' && (
        <section className="bg-surface/80 border border-border rounded-3xl p-6 space-y-6 backdrop-blur-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-text-primary">Топ-3 задачи на день</h2>
            <span className="text-text-secondary text-sm">Август 2025</span>
        </div>

          <div className="overflow-x-auto">
            <div className="min-w-[1100px] grid grid-cols-4 gap-4">
              {topTasks.map((day) => (
                <div key={day} className="bg-background/75 border border-border rounded-2xl p-4 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <span>{day} день</span>
                    <span className="w-2 h-2 rounded-full bg-primary/70" />
      </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((task) => (
                      <div key={task} className="flex items-center justify-between text-sm text-text-primary/90">
                        <span>Задача {task}</span>
                        <span className="h-4 w-4 rounded border border-border" />
            </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Цели на год и привычки - только для таба habits */}
        {activeTab === 'habits' && (
        <section className="bg-surface/80 border border-border rounded-3xl p-6 space-y-6 backdrop-blur-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-text-primary">Цели на год и привычки</h2>
            <Button size="sm" variant="secondary">
              Добавить цель
            </Button>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[1100px] grid grid-cols-[180px_repeat(3,_1fr)] gap-4 text-sm">
              <div className="text-text-secondary uppercase tracking-wide">Категория</div>
              <div className="text-text-secondary uppercase tracking-wide">Ежедневные</div>
              <div className="text-text-secondary uppercase tracking-wide">Еженедельные</div>
              <div className="text-text-secondary uppercase tracking-wide">Ежемесячные</div>

              {yearlyGoals.map((row) => (
                <div key={row.title} className="contents">
                  <div className="bg-background/75 border border-border rounded-xl p-3 font-semibold text-text-primary">
                    {row.title}
          </div>
                  <div className="bg-background/60 border border-border rounded-xl p-3 text-text-secondary">
                    {row.daily || ""}
                  </div>
                  <div className="bg-background/60 border border-border rounded-xl p-3 text-text-secondary">
                    {row.weekly || ""}
                  </div>
                  <div className="bg-background/60 border border-border rounded-xl p-3 text-text-secondary">
                    {row.monthly || ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Финансовый трекер - улучшенная версия */}
        {activeTab === 'finance' && (
        <div className="space-y-6">
            {/* Основные метрики */}
            <section 
              className="border border-border rounded-3xl p-6 sm:p-8 backdrop-blur-xl"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, var(--color-success) 10%, transparent) 0%, var(--color-surface) 50%, color-mix(in srgb, var(--color-primary) 10%, transparent) 100%)`
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                  <div 
                    className="p-2 rounded-xl text-white"
                    style={{
                      background: `linear-gradient(135deg, var(--color-success) 0%, var(--color-secondary) 100%)`
                    }}
                  >
                    {React.createElement(HiOutlineCurrencyDollar as any)}
          </div>
                  Финансовый обзор
                </h2>
                <Button size="sm">Добавить транзакцию</Button>
      </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div 
                  className="border rounded-2xl p-5 backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, var(--color-success) 20%, transparent) 0%, color-mix(in srgb, var(--color-success) 20%, transparent) 100%)`,
                    borderColor: 'color-mix(in srgb, var(--color-success) 30%, transparent)'
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-text-secondary text-sm font-medium">Доходы</span>
                    <div 
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--color-success) 20%, transparent)',
                        color: 'var(--color-success)'
                      }}
                    >
                      {React.createElement(HiOutlineTrendingUp as any)}
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-text-primary mb-1">{financialData.income.toLocaleString()} ₽</p>
                  <p className="text-xs" style={{ color: 'var(--color-success)' }}>+12% к прошлому месяцу</p>
                </div>
                <div 
                  className="border rounded-2xl p-5 backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, var(--color-error) 20%, transparent) 0%, color-mix(in srgb, var(--color-error) 20%, transparent) 100%)`,
                    borderColor: 'color-mix(in srgb, var(--color-error) 30%, transparent)'
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-text-secondary text-sm font-medium">Расходы</span>
                    <div 
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--color-error) 20%, transparent)',
                        color: 'var(--color-error)'
                      }}
                    >
                      {React.createElement(HiOutlineTrendingDown as any)}
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-text-primary mb-1">{financialData.expenses.toLocaleString()} ₽</p>
                  <p className="text-xs" style={{ color: 'var(--color-error)' }}>-5% к прошлому месяцу</p>
                </div>
                <div 
                  className="border rounded-2xl p-5 backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 20%, transparent) 0%, color-mix(in srgb, var(--color-secondary) 20%, transparent) 100%)`,
                    borderColor: 'color-mix(in srgb, var(--color-primary) 30%, transparent)'
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-text-secondary text-sm font-medium">Баланс</span>
                    <div 
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)',
                        color: 'var(--color-primary)'
                      }}
                    >
                      {React.createElement(HiOutlineCurrencyDollar as any)}
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-text-primary mb-1">{(financialData.income - financialData.expenses).toLocaleString()} ₽</p>
                  <p className="text-xs text-text-secondary">Доступно</p>
                </div>
            </div>
            
              {/* Прогноз на конец месяца */}
              <div className="bg-background/60 border border-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-text-primary">Прогноз на конец месяца</span>
                  <span className="text-xs text-text-secondary">На основе текущих трат</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-3 rounded-full bg-background/70 mb-2">
                      <motion.div
                        className="h-full rounded-full animate-pulse"
                        style={{ 
                          background: `linear-gradient(90deg, var(--color-warning) 0%, var(--color-error) 50%, var(--color-warning) 100%)`
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: '63%' }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      />
                    </div>
                    <p className="text-xs text-text-secondary">Ожидаемые расходы: ~120,000 ₽</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-text-primary">~30,000 ₽</p>
                    <p className="text-xs text-text-secondary">Остаток</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Круговая диаграмма и детали */}
            <section className="grid lg:grid-cols-[1fr_1.5fr] gap-6">
              {/* Круговая диаграмма расходов */}
              <div className="bg-surface/80 border border-border rounded-3xl p-6 backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-text-primary mb-6">Распределение расходов</h3>
                <div className="relative w-48 h-48 mx-auto mb-6">
                  {/* Круговая диаграмма через SVG */}
                  <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="var(--color-background)"
                      strokeWidth="30"
                    />
                    {pieChartData.map((item) => (
                      <path
                        key={item.name}
                        d={item.path}
                        fill={`url(#gradient-${item.idx})`}
                        opacity="0.8"
                      />
                    ))}
                    <defs>
                      {financialData.categories.map((cat, idx) => (
                        <linearGradient key={idx} id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={cat.color.includes('orange') ? '#f97316' : cat.color.includes('blue') ? '#3b82f6' : cat.color.includes('pink') ? '#ec4899' : '#10b981'} />
                          <stop offset="100%" stopColor={cat.color.includes('orange') ? '#ef4444' : cat.color.includes('blue') ? '#06b6d4' : cat.color.includes('pink') ? '#a855f7' : '#34d399'} />
                        </linearGradient>
                      ))}
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-text-primary">{Math.round((financialData.expenses / financialData.income) * 100)}%</p>
                      <p className="text-xs text-text-secondary">от дохода</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {financialData.categories.map((cat) => {
                    const percentage = Math.round((cat.amount / financialData.expenses) * 100);
                    return (
                      <div key={cat.name} className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{
                            background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-text-primary">{cat.name}</span>
                            <span className="text-text-secondary">{percentage}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-background/70">
                            <motion.div
                              className="h-full rounded-full animate-pulse"
                              style={{ 
                                background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%)`
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Детальная статистика */}
              <div className="space-y-6">
                <div className="bg-surface/80 border border-border rounded-3xl p-6 backdrop-blur-xl">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Тренд расходов (7 месяцев)</h3>
                  <div className="flex items-end gap-2 h-48 mb-4">
                    {financialData.monthlyTrend.map((value, index) => {
                      const maxValue = Math.max(...financialData.monthlyTrend);
                      const height = (value / maxValue) * 100;
                      return (
                        <motion.div 
                          key={index} 
                          className="flex-1 flex flex-col items-center group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <div className="w-full flex flex-col items-center mb-2">
                            <motion.div
                              className="w-full rounded-t-lg transition-all group-hover:opacity-80"
                              style={{ 
                                minHeight: '4px',
                                background: `linear-gradient(to top, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%)`
                              }}
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                            />
                          </div>
                          <span className="text-[10px] text-text-secondary mt-2">{index + 1}</span>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                            <span className="text-[10px] text-text-primary font-semibold">{value.toLocaleString()}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
      </div>

                {/* Накопления и цели */}
                <motion.div 
                  className="border rounded-3xl p-6 backdrop-blur-xl"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 10%, transparent) 0%, color-mix(in srgb, var(--color-secondary) 10%, transparent) 100%)`,
                    borderColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Цель накоплений</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                      <span>Накоплено</span>
                      <span>{financialData.savings.toLocaleString()} / {financialData.goal.toLocaleString()} ₽</span>
        </div>
                    <div 
                      className="h-4 rounded-full overflow-hidden"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--color-background) 70%, transparent)'
                      }}
                    >
                      <motion.div
                        className="h-full rounded-full animate-pulse"
                        style={{ 
                          background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%)`
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(financialData.savings / financialData.goal) * 100}%` }}
                        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                      {Math.round((financialData.savings / financialData.goal) * 100)}% выполнено • Осталось {(financialData.goal - financialData.savings).toLocaleString()} ₽
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div 
                      className="rounded-xl p-3"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--color-background) 60%, transparent)'
                      }}
                    >
                      <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>Средний темп</p>
                      <p className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>18,300 ₽/мес</p>
                    </div>
                    <div 
                      className="rounded-xl p-3"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--color-background) 60%, transparent)'
                      }}
                    >
                      <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>До цели</p>
                      <p className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>~13 мес</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* История транзакций */}
            <section className="bg-surface/80 border border-border rounded-3xl p-6 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                  <div style={{ color: 'var(--color-primary)' }}>
                    {React.createElement(HiOutlineClock as any)}
          </div>
                  Последние транзакции
                </h3>
                <Button size="sm" variant="secondary">Все транзакции</Button>
              </div>
              <div className="space-y-2">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-background/60 border border-border rounded-xl hover:bg-background/80 transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: transaction.type === 'income' 
                          ? 'color-mix(in srgb, var(--color-success) 20%, transparent)' 
                          : 'color-mix(in srgb, var(--color-error) 20%, transparent)',
                        color: transaction.type === 'income' ? 'var(--color-success)' : 'var(--color-error)'
                      }}
                    >
                        {transaction.type === 'income' ? '+' : '-'}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{transaction.description}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-text-secondary">{transaction.category}</span>
                          <span className="text-xs text-text-secondary">•</span>
                          <span className="text-xs text-text-secondary">{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="text-sm font-bold"
                      style={{
                        color: transaction.type === 'income' ? 'var(--color-success)' : 'var(--color-error)'
                      }}
                    >
                      {transaction.type === 'income' ? '+' : ''}{transaction.amount.toLocaleString()} ₽
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Бюджет по категориям */}
            <section className="bg-surface/80 border border-border rounded-3xl p-6 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                  <div style={{ color: 'var(--color-secondary)' }}>
                    {React.createElement(HiOutlineChartBar as any)}
                  </div>
                  Бюджет по категориям
                </h3>
                <Button size="sm" variant="secondary">Настроить</Button>
              </div>
          <div className="space-y-4">
                {budgetCategories.map((cat) => {
                  const percentage = Math.round((cat.spent / cat.budget) * 100);
                  const isOverBudget = percentage > 100;
                  return (
                    <div key={cat.name}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{
                              background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
                            }}
                          />
                          <span className="text-sm font-medium text-text-primary">{cat.name}</span>
              </div>
                        <div className="text-right">
                          <span 
                            className="text-sm font-bold"
                            style={{ color: isOverBudget ? 'var(--color-error)' : 'var(--color-text-primary)' }}
                          >
                            {cat.spent.toLocaleString()} / {cat.budget.toLocaleString()} ₽
                          </span>
                          <span 
                            className="text-xs ml-2"
                            style={{ color: isOverBudget ? 'var(--color-error)' : 'var(--color-text-secondary)' }}
                          >
                            {percentage}%
                          </span>
              </div>
                      </div>
                      <div className="h-2 rounded-full bg-background/70 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${isOverBudget ? 'animate-pulse' : 'animate-pulse'}`}
                          style={{ 
                            background: isOverBudget 
                              ? `linear-gradient(90deg, var(--color-error) 0%, var(--color-warning) 50%, var(--color-error) 100%)`
                              : `linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%)`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(percentage, 100)}%` }}
                          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        />
                      </div>
                      {isOverBudget && (
                        <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>
                          Превышен на {(cat.spent - cat.budget).toLocaleString()} ₽
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Финансовые цели */}
            <section 
              className="border border-border rounded-3xl p-6 backdrop-blur-xl"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, var(--color-warning) 10%, transparent) 0%, var(--color-surface) 50%, color-mix(in srgb, var(--color-warning) 10%, transparent) 100%)`
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                  <div style={{ color: 'var(--color-warning)' }}>
                    {React.createElement(HiOutlineStar as any)}
              </div>
                  Финансовые цели
                </h3>
                <Button size="sm" variant="secondary">Добавить цель</Button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {financialGoals.map((goal, idx) => {
                  const progress = Math.round((goal.current / goal.target) * 100);
                  return (
                    <div key={idx} className="bg-background/60 border border-border rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{goal.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-text-primary">{goal.title}</p>
                          <p className="text-xs text-text-secondary">{goal.deadline}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-text-secondary mb-1">
                          <span>{goal.current.toLocaleString()} ₽</span>
                          <span>{goal.target.toLocaleString()} ₽</span>
                        </div>
                        <div className="h-2 rounded-full bg-background/70">
                          <motion.div
                            className="h-full rounded-full animate-pulse"
                            style={{ 
                              background: `linear-gradient(90deg, var(--color-warning) 0%, var(--color-primary) 50%, var(--color-warning) 100%)`
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                          />
                        </div>
                        <p className="text-xs text-text-secondary mt-1">{progress}% выполнено</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Подписки и регулярные платежи */}
            <section className="bg-surface/80 border border-border rounded-3xl p-6 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                  <div style={{ color: 'var(--color-secondary)' }}>
                    {React.createElement(HiOutlineCalendar as any)}
              </div>
                  Подписки и платежи
                </h3>
                <Button size="sm" variant="secondary">Управление</Button>
              </div>
              <div className="space-y-3">
                {subscriptions.map((sub, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-background/60 border border-border rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        {React.createElement(HiOutlineCurrencyDollar as any)}
          </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{sub.name}</p>
                        <p className="text-xs text-text-secondary">{sub.category}</p>
        </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-text-primary">{sub.amount.toLocaleString()} ₽ / {sub.period}</p>
                      <p className="text-xs text-text-secondary">Следующий платёж: {sub.nextPayment}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-background/60 border border-border rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-text-primary">Всего в месяц</span>
                    <span className="text-lg font-bold text-text-primary">
                      {subscriptions.reduce((sum, sub) => sum + sub.amount, 0).toLocaleString()} ₽
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Сравнение доходов и расходов */}
            <section className="bg-surface/80 border border-border rounded-3xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
                <div style={{ color: 'var(--color-success)' }}>
                  {React.createElement(HiOutlineTrendingUp as any)}
                </div>
                Сравнение доходов и расходов
              </h3>
          <div className="space-y-4">
                {[
                  { month: "Январь", income: 140000, expenses: 85000 },
                  { month: "Февраль", income: 145000, expenses: 90000 },
                  { month: "Март", income: 150000, expenses: 88000 },
                  { month: "Апрель", income: 148000, expenses: 92000 },
                  { month: "Май", income: 152000, expenses: 87000 },
                  { month: "Июнь", income: 150000, expenses: 95000 },
                  { month: "Июль", income: 150000, expenses: 95000 },
                ].map((item, idx) => {
                  const balance = item.income - item.expenses;
                  const maxValue = Math.max(item.income, item.expenses);
                  return (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-text-primary">{item.month}</span>
                        <span 
                          className="text-sm font-bold"
                          style={{ color: balance > 0 ? 'var(--color-success)' : 'var(--color-error)' }}
                        >
                          {balance > 0 ? '+' : ''}{balance.toLocaleString()} ₽
                        </span>
            </div>
                      <div className="flex items-end gap-2 h-8">
                        <div className="flex-1 flex flex-col">
                          <div
                            className="w-full rounded-t mb-0.5"
                            style={{ 
                              height: `${(item.income / maxValue) * 100}%`, 
                              minHeight: '4px',
                              background: `linear-gradient(to top, var(--color-success) 0%, var(--color-secondary) 100%)`
                            }}
                          />
                          <span className="text-[9px] text-center" style={{ color: 'var(--color-success)' }}>Доход</span>
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div
                            className="w-full rounded-t mb-0.5"
                            style={{ 
                              height: `${(item.expenses / maxValue) * 100}%`, 
                              minHeight: '4px',
                              background: `linear-gradient(to top, var(--color-error) 0%, var(--color-warning) 100%)`
                            }}
                          />
                          <span className="text-[9px] text-center" style={{ color: 'var(--color-error)' }}>Расход</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* Канбан-доска для задач */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <section 
              className="border border-border rounded-3xl p-6 sm:p-8 backdrop-blur-xl"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 10%, transparent) 0%, var(--color-surface) 50%, color-mix(in srgb, var(--color-secondary) 10%, transparent) 100%)`
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                  <div 
                    className="p-2 rounded-xl text-white"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
                    }}
                  >
                    {React.createElement(HiOutlineCheckCircle as any)}
                  </div>
                  Канбан-доска задач
                </h2>
                <Button size="sm">Добавить задачу</Button>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-background/60 border border-border rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-text-primary">{taskStats.total}</p>
                  <p className="text-xs text-text-secondary">Всего</p>
                </div>
                <div 
                  className="border rounded-xl p-3 text-center"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
                    borderColor: 'color-mix(in srgb, var(--color-error) 30%, transparent)'
                  }}
                >
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-error)' }}>{taskStats.urgent}</p>
                  <p className="text-xs" style={{ color: 'var(--color-error)' }}>Срочные</p>
                </div>
                <div 
                  className="border rounded-xl p-3 text-center"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)',
                    borderColor: 'color-mix(in srgb, var(--color-warning) 30%, transparent)'
                  }}
                >
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-warning)' }}>{taskStats.inProgress}</p>
                  <p className="text-xs" style={{ color: 'var(--color-warning)' }}>В работе</p>
                </div>
                <div 
                  className="border rounded-xl p-3 text-center"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)',
                    borderColor: 'color-mix(in srgb, var(--color-success) 30%, transparent)'
                  }}
                >
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>{taskStats.completed}</p>
                  <p className="text-xs" style={{ color: 'var(--color-success)' }}>Выполнено</p>
                </div>
              </div>

              {/* Канбан колонки */}
              <div className="grid md:grid-cols-4 gap-4">
                {/* Сделать */}
                <div className="bg-background/60 border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">Сделать</h3>
                    <span className="text-xs text-text-secondary bg-surface px-2 py-1 rounded-full">
                      {taskStats.highPriority.length + taskStats.mediumPriority.length + taskStats.lowPriority.length}
                    </span>
                  </div>
            <div className="space-y-3">
                    {taskStats.highPriority.map((task) => (
                      <div
                        key={task.id}
                        className="bg-surface/80 border rounded-xl p-3 hover:shadow-lg transition-all cursor-pointer"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--color-error) 30%, transparent)'
                        }}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <div 
                            className="w-4 h-4 rounded border-2 mt-0.5 flex-shrink-0"
                            style={{
                              borderColor: 'var(--color-error)'
                            }}
                          />
                  <div className="flex-1">
                            <p className="text-sm font-medium text-text-primary">{task.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span 
                                className="text-[10px] text-text-secondary px-1.5 py-0.5 rounded"
                                style={{
                                  backgroundColor: 'color-mix(in srgb, var(--color-error) 20%, transparent)',
                                  color: 'var(--color-error)'
                                }}
                              >
                                {React.createElement(HiOutlineExclamationCircle as any)} Высокий
                              </span>
                  </div>
                </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                          <span>{task.category}</span>
                          <span>{task.deadline}</span>
                        </div>
                      </div>
                    ))}
                    {taskStats.mediumPriority.map((task) => (
                      <div
                        key={task.id}
                        className="bg-surface/80 border rounded-xl p-3 hover:shadow-lg transition-all cursor-pointer"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--color-warning) 30%, transparent)'
                        }}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <div 
                            className="w-4 h-4 rounded border-2 mt-0.5 flex-shrink-0"
                            style={{
                              borderColor: 'var(--color-warning)'
                            }}
                          />
                  <div className="flex-1">
                            <p className="text-sm font-medium text-text-primary">{task.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span 
                                className="text-[10px] text-text-secondary px-1.5 py-0.5 rounded"
                                style={{
                                  backgroundColor: 'color-mix(in srgb, var(--color-warning) 20%, transparent)',
                                  color: 'var(--color-warning)'
                                }}
                              >
                                Средний
                              </span>
                  </div>
                </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                          <span>{task.category}</span>
                          <span>{task.deadline}</span>
                        </div>
                      </div>
                    ))}
                    {taskStats.lowPriority.map((task) => (
                      <div
                        key={task.id}
                        className="bg-surface/80 border rounded-xl p-3 hover:shadow-lg transition-all cursor-pointer"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--color-success) 30%, transparent)'
                        }}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <div 
                            className="w-4 h-4 rounded border-2 mt-0.5 flex-shrink-0"
                            style={{
                              borderColor: 'var(--color-success)'
                            }}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-text-primary">{task.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span 
                                className="text-[10px] text-text-secondary px-1.5 py-0.5 rounded"
                                style={{
                                  backgroundColor: 'color-mix(in srgb, var(--color-success) 20%, transparent)',
                                  color: 'var(--color-success)'
                                }}
                              >
                                Низкий
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                          <span>{task.category}</span>
                          <span>{task.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* В процессе */}
                <div className="bg-background/60 border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">В процессе</h3>
                    <span className="text-xs text-text-secondary bg-surface px-2 py-1 rounded-full">1</span>
                  </div>
                  <div className="space-y-3">
                    <div 
                      className="bg-surface/80 border rounded-xl p-3"
                      style={{
                        borderColor: 'color-mix(in srgb, var(--color-primary) 30%, transparent)'
                      }}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <div 
                          className="w-4 h-4 rounded border-2 mt-0.5 flex-shrink-0"
                          style={{
                            borderColor: 'var(--color-primary)'
                          }}
                        />
                  <div className="flex-1">
                          <p className="text-sm font-medium text-text-primary">Изучить новый фреймворк</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span 
                              className="text-[10px] text-text-secondary px-1.5 py-0.5 rounded"
                              style={{
                                backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)',
                                color: 'var(--color-primary)'
                              }}
                            >
                              Средний
                            </span>
                  </div>
                </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-text-secondary">
                        <span>Учёба</span>
                        <span>20 авг</span>
                      </div>
                    </div>
            </div>
          </div>

                {/* На проверке */}
                <div className="bg-background/60 border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">На проверке</h3>
                    <span className="text-xs text-text-secondary bg-surface px-2 py-1 rounded-full">0</span>
            </div>
                  <div className="space-y-3">
                    <div className="bg-surface/40 border border-border rounded-xl p-3 text-center">
                      <p className="text-xs text-text-secondary">Нет задач</p>
                    </div>
                  </div>
                </div>

                {/* Готово */}
                <div className="bg-background/60 border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">Готово</h3>
                    <span className="text-xs text-text-secondary bg-surface px-2 py-1 rounded-full">
                      {taskStats.completed}
                    </span>
                  </div>
            <div className="space-y-3">
                    {taskStats.done.map((task) => (
                      <div
                        key={task.id}
                        className="bg-surface/40 border rounded-xl p-3 opacity-75"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--color-success) 30%, transparent)'
                        }}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <div 
                            className="w-4 h-4 rounded border-2 mt-0.5 flex-shrink-0 flex items-center justify-center"
                            style={{
                              backgroundColor: 'var(--color-success)',
                              borderColor: 'var(--color-success)'
                            }}
                          >
                            <div className="text-white text-[10px]">
                              {React.createElement(HiOutlineCheckCircle as any)}
                            </div>
                          </div>
                  <div className="flex-1">
                            <p className="text-sm font-medium text-text-secondary line-through">{task.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span 
                                className="text-[10px] text-text-secondary px-1.5 py-0.5 rounded"
                                style={{
                                  backgroundColor: 'color-mix(in srgb, var(--color-success) 20%, transparent)',
                                  color: 'var(--color-success)'
                                }}
                              >
                                Выполнено
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                          <span>{task.category}</span>
                          <span>{task.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Продуктивность */}
            <section className="bg-surface/80 border border-border rounded-3xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Продуктивность по дням</h3>
              <div className="flex items-end gap-2 h-32">
                {[3, 5, 4, 6, 5, 7, 4, 5, 6, 5, 4, 6, 5, 3].map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div
                      className="w-full rounded-t-lg transition-all group-hover:opacity-80"
                      style={{ 
                        height: `${(value / 7) * 100}%`, 
                        minHeight: '8px',
                        background: `linear-gradient(to top, var(--color-primary) 0%, var(--color-secondary) 100%)`
                      }}
                    />
                    <span className="text-[10px] text-text-secondary mt-1">{index + 1}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-secondary mt-4 text-center">Выполнено задач за последние 14 дней</p>
            </section>
          </div>
        )}

        {/* Календарь событий - улучшенная версия */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            {/* Заголовок и переключатель вида */}
            <section 
              className="border border-border rounded-3xl p-6 sm:p-8 backdrop-blur-xl"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, var(--color-secondary) 10%, transparent) 0%, var(--color-surface) 50%, color-mix(in srgb, var(--color-primary) 10%, transparent) 100%)`
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                  <div 
                    className="p-2 rounded-xl text-white"
                    style={{
                      background: `linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)`
                    }}
                  >
                    {React.createElement(HiOutlineCalendar as any)}
                  </div>
                  Календарь событий
                </h2>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">Месяц</Button>
                  <Button size="sm">Неделя</Button>
                  <Button size="sm" variant="secondary">День</Button>
                  <Button size="sm">Добавить событие</Button>
                </div>
              </div>

              {/* Ближайшие события */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {calendarEvents.slice(0, 3).map((event, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl p-4 border"
                    style={{
                      backgroundColor: event.type === 'urgent' 
                        ? 'color-mix(in srgb, var(--color-error) 10%, transparent)' 
                        : event.type === 'work'
                        ? 'color-mix(in srgb, var(--color-primary) 10%, transparent)'
                        : 'color-mix(in srgb, var(--color-secondary) 10%, transparent)',
                      borderColor: event.type === 'urgent' 
                        ? 'color-mix(in srgb, var(--color-error) 30%, transparent)' 
                        : event.type === 'work'
                        ? 'color-mix(in srgb, var(--color-primary) 30%, transparent)'
                        : 'color-mix(in srgb, var(--color-secondary) 30%, transparent)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span 
                        className="text-xs font-semibold"
                        style={{
                          color: event.type === 'urgent' ? 'var(--color-error)' :
                            event.type === 'work' ? 'var(--color-primary)' :
                            'var(--color-secondary)'
                        }}
                      >
                        {event.date} августа
                      </span>
                      <span className="text-xs text-text-secondary">{event.time}</span>
            </div>
                    <p className="text-sm font-medium text-text-primary">{event.title}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span 
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: event.type === 'urgent' 
                            ? 'color-mix(in srgb, var(--color-error) 20%, transparent)' 
                            : event.type === 'work' 
                            ? 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
                            : 'color-mix(in srgb, var(--color-secondary) 20%, transparent)',
                          color: event.type === 'urgent' ? 'var(--color-error)' :
                            event.type === 'work' ? 'var(--color-primary)' :
                            'var(--color-secondary)'
                        }}
                      >
                        {event.type === 'urgent' ? 'Срочно' : event.type === 'work' ? 'Работа' : 'Личное'}
                      </span>
        </div>
      </div>
                ))}
      </div>

              {/* Месячный календарь */}
              <div className="bg-background/60 border border-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Август 2025</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg bg-surface text-text-secondary text-sm hover:bg-surface/80">
                      ←
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-surface text-text-secondary text-sm hover:bg-surface/80">
                      →
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                    <div key={day} className="text-center text-xs text-text-secondary font-semibold py-2">
                      {day}
                    </div>
                  ))}
                  {days.map((day) => {
                    const event = calendarEvents.find(e => e.date === day);
                    const isToday = day === 11;
                    return (
                      <div
                        key={day}
                        className={`min-h-[90px] border rounded-xl p-2 transition-all hover:shadow-lg cursor-pointer ${
                          isToday 
                            ? 'bg-primary/20 border-primary/50 shadow-lg' 
                            : 'bg-background/40 border-border hover:bg-background/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-semibold ${
                            isToday ? 'text-primary' : 'text-text-secondary'
                          }`}>
                            {day}
                          </span>
                          {event && (
                            <div 
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor: event.type === 'urgent' ? 'var(--color-error)' :
                                  event.type === 'work' ? 'var(--color-primary)' :
                                  'var(--color-secondary)'
                              }}
                            />
                          )}
                        </div>
                        {event && (
                          <div 
                            className="mt-1 p-1.5 rounded-lg text-[10px] border"
                            style={{
                              backgroundColor: event.type === 'urgent' 
                                ? 'color-mix(in srgb, var(--color-error) 20%, transparent)' 
                                : event.type === 'work'
                                ? 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
                                : 'color-mix(in srgb, var(--color-secondary) 20%, transparent)',
                              color: event.type === 'urgent' ? 'var(--color-error)' :
                                event.type === 'work' ? 'var(--color-primary)' :
                                'var(--color-secondary)',
                              borderColor: event.type === 'urgent' 
                                ? 'color-mix(in srgb, var(--color-error) 30%, transparent)' 
                                : event.type === 'work'
                                ? 'color-mix(in srgb, var(--color-primary) 30%, transparent)'
                                : 'color-mix(in srgb, var(--color-secondary) 30%, transparent)'
                            }}
                          >
                            <p className="font-semibold mb-0.5">{event.time}</p>
                            <p className="leading-tight">{event.title}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Статистика времени */}
            <section className="grid md:grid-cols-3 gap-4">
              <div className="bg-surface/80 border border-border rounded-2xl p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-text-secondary">Рабочие часы</span>
                  <div style={{ color: 'var(--color-primary)' }}>
                    {React.createElement(HiOutlineClock as any)}
                  </div>
                </div>
                <p className="text-2xl font-bold text-text-primary mb-1">42 ч</p>
                <p className="text-xs text-text-secondary">В этом месяце</p>
              </div>
              <div className="bg-surface/80 border border-border rounded-2xl p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-text-secondary">События</span>
                  <div style={{ color: 'var(--color-secondary)' }}>
                    {React.createElement(HiOutlineCalendar as any)}
                  </div>
                </div>
                <p className="text-2xl font-bold text-text-primary mb-1">{calendarEvents.length}</p>
                <p className="text-xs text-text-secondary">Запланировано</p>
              </div>
              <div className="bg-surface/80 border border-border rounded-2xl p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-text-secondary">Свободное время</span>
                  <div style={{ color: 'var(--color-success)' }}>
                    {React.createElement(HiOutlineCheckCircle as any)}
                  </div>
                </div>
                <p className="text-2xl font-bold text-text-primary mb-1">18 ч</p>
                <p className="text-xs text-text-secondary">На этой неделе</p>
              </div>
            </section>
          </div>
        )}

        {/* Мотивация: Стрики и достижения */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface/80 border border-border rounded-3xl p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <div style={{ color: 'var(--color-warning)' }}>
                {React.createElement(HiOutlineLightningBolt as any)}
              </div>
              Стрики (дни подряд)
            </h3>
            <div className="space-y-3">
              {streaks.map((streak) => (
                <div key={streak.habit} className="bg-background/75 border border-border rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{streak.icon}</span>
                      <span className="text-sm text-text-primary">{streak.habit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>{streak.days}</span>
                      <span className="text-xs text-text-secondary">дней</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface/80 border border-border rounded-3xl p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <div style={{ color: 'var(--color-warning)' }}>
                {React.createElement(HiOutlineStar as any)}
            </div>
              Достижения
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className={`bg-background/75 border rounded-xl p-3 ${
                    achievement.unlocked ? '' : 'opacity-50'
                  }`}
                  style={{
                    borderColor: achievement.unlocked 
                      ? 'color-mix(in srgb, var(--color-warning) 50%, transparent)' 
                      : 'var(--color-border)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${achievement.unlocked ? 'text-text-primary' : 'text-text-secondary'}`}>
                        {achievement.title}
                      </p>
                      <p className="text-xs text-text-secondary">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <div style={{ color: 'var(--color-success)' }}>
                        {React.createElement(HiOutlineCheckCircle as any)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Трекинг времени */}
        <section className="bg-surface/80 border border-border rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <div style={{ color: 'var(--color-primary)' }}>
                {React.createElement(HiOutlineClock as any)}
              </div>
              Трекинг времени
            </h3>
            <Button size="sm" variant="secondary">Начать сессию</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {timeTracking.map((track) => (
              <div key={track.category} className="bg-background/75 border border-border rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-text-primary">{track.category}</span>
                  <span className="text-sm text-text-secondary">
                    {track.hours} / {track.target} ч
                  </span>
                </div>
                <div className="h-3 rounded-full bg-background/70">
                  <motion.div
                    className="h-full rounded-full animate-pulse"
                    style={{ 
                      background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%)`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(track.hours / track.target) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  />
        </div>
                <p className="text-xs text-text-secondary mt-1">
                  {Math.round((track.hours / track.target) * 100)}% выполнено
                </p>
      </div>
            ))}
      </div>
        </section>
      </div>
    </div>
  );
}
