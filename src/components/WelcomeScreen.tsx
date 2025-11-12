"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { type Language, SUPPORTED_LANGUAGES } from "@/lib/constants";

export interface WelcomeScreenProps {
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
}

const aboutHighlights = [
  {
    title: "Оптимизация",
    description:
      "ИИ анализирует процессы, помогает находить узкие места и предлагает, что улучшить в первую очередь.",
  },
  {
    title: "Интеграция",
    description:
      "Neuro соединяет инструменты: Google, Notion, календари, финансовые сервисы — всё в одном потоке.",
  },
  {
    title: "Рост",
    description:
      "Мы помогаем не только управлять делами, но и развивать мышление, привычки и системность.",
  },
];

const problemStatements = [
  "Теряешь фокус между задачами, заметками и финансами?",
  "Сложно понять, куда уходят деньги и время?",
  "Идеи остаются в голове и не превращаются в действие?",
  "Нет единого места, где управлять всем сразу?",
];

const modules = [
  {
    icon: "🗂️",
    title: "Задачи",
    description: "Планируй, анализируй и выполняй с ИИ-приоритетами и фокусом.",
  },
  {
    icon: "💰",
    title: "Финансы",
    description: "Контролируй бюджеты, отслеживай расходы и строй сценарии.",
  },
  {
    icon: "🧠",
    title: "Mind Map",
    description: "Визуализируй идеи, проекты и мышление в живых схемах.",
  },
  {
    icon: "🔗",
    title: "Интеграции",
    description: "Соединяй привычные сервисы и синхронизируй данные автоматом.",
  },
];

export default function WelcomeScreen({
  currentLanguage = "ru",
  onLanguageChange,
}: WelcomeScreenProps) {
  const handleLanguageChange = React.useCallback(
    (lang: Language) => {
      onLanguageChange?.(lang);
    },
    [onLanguageChange]
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-light via-light/60 to-white dark:from-dark dark:via-dark/80 dark:to-[#050507] text-text-light dark:text-text-dark">
      {/* Animated background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-black/5 dark:border-white/10 backdrop-blur-md bg-white/80 dark:bg-black/40">
        <div className="container mx-auto flex flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">Neuro</span>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:text-white dark:bg-primary/30">
                beta
              </span>
            </div>
            <p className="mt-2 max-w-xl text-sm text-gray-600 dark:text-gray-300">
              Интеллект, который помогает думать, планировать и действовать.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {onLanguageChange && (
              <LanguageSelector
                value={currentLanguage}
                onChange={handleLanguageChange}
                className="min-w-[120px]"
              />
            )}
            <ThemeSwitcher />
            <Button variant="ghost" className="px-4 py-2">
              Войти
            </Button>
            <Button variant="secondary" className="px-4 py-2">
              Регистрация
            </Button>
            <Button variant="primary" className="px-5 py-2">
              Изучить возможности
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-6 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold leading-tight text-secondary dark:text-white sm:text-5xl lg:text-6xl"
              >
                Neuro — твой умный ассистент для жизни, бизнеса и мышления
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300"
              >
                Организуй задачи, мысли и финансы. Пусть искусственный интеллект
                оптимизирует твой день, цели и решения.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <Button
                  variant="primary"
                  className="w-full sm:w-auto px-6 py-3 text-base font-semibold"
                >
                  Начать бесплатно
                </Button>
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto px-6 py-3 text-base font-semibold"
                >
                  Посмотреть демо
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative mx-auto h-72 w-full max-w-sm rounded-3xl bg-gradient-to-br from-primary/80 via-primary/40 to-accent/40 p-[1px]"
            >
              <div className="h-full w-full rounded-3xl bg-white/90 p-6 dark:bg-secondary/80">
                <div className="h-full rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-transparent p-6">
                  <p className="text-sm uppercase tracking-widest text-primary/80">
                    Живой интеллект
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-secondary dark:text-white">
                    Нейросеть, которая помогает видеть взаимосвязи и принимать решения.
                  </h3>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    Отслеживай состояние проектов, баланс времени и финансов, получай
                    рекомендации на основе данных.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section className="container mx-auto px-6 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-secondary dark:text-white">
              Что такое Neuro?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Neuro — это цифровой помощник, который соединяет всё, что важно в
              жизни и работе. Задачи, финансы, мысли и цели становятся единой
              системой, управляемой искусственным интеллектом.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {aboutHighlights.map((item) => (
              <Card key={item.title} className="h-full bg-white/70 dark:bg-secondary/70">
                <CardHeader>
                  <CardTitle className="text-xl text-secondary dark:text-white">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Problems */}
        <section className="container mx-auto px-6 pb-16">
          <Card className="bg-white/80 dark:bg-secondary/70">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary dark:text-white">
                Проблемы, которые решает Neuro
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Мы знаем, как сложно удерживать управление всей жизнью в одном поле
                внимания.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                {problemStatements.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <span className="mt-[6px] h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl bg-primary/5 p-6 text-gray-700 dark:text-gray-100">
                <h3 className="text-lg font-semibold text-secondary dark:text-white">
                  Как мы помогаем
                </h3>
                <p className="mt-3">
                  ИИ Neuro сам предлагает приоритеты задач, следит за балансом
                  времени и финансов, помогает формировать цели и видеть связи между
                  событиями. Ты учишься мыслить системно и действовать осознанно.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team */}
        <section className="container mx-auto px-6 pb-16">
          <Card className="bg-white/85 dark:bg-secondary/75">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary dark:text-white">
                Кто создал Neuro
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Проект разработал Максим Антипьев (who you) — разработчик, дизайнер и
                исследователь систем продуктивности.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-200">
              Цель Neuro — сделать управление временем, целями и деньгами умным,
              простым и человечным. Мы создаём инструмент, который поддерживает
              человека и команду каждый день.
            </CardContent>
          </Card>
        </section>

        {/* Modules */}
        <section className="container mx-auto px-6 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-secondary dark:text-white">
              Функциональные модули
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Четыре ядра, которые связывают твою жизнь в единую систему.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {modules.map((module) => (
              <Card
                key={module.title}
                className="group h-full border border-primary/10 bg-white/80 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl dark:bg-secondary/70"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <span className="text-3xl">{module.icon}</span>
                  <CardTitle className="text-xl text-secondary dark:text-white">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                    {module.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="container mx-auto px-6 pb-24">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-transparent border border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl text-secondary dark:text-white">
                Миссия Neuro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-100">
                Neuro создан, чтобы сделать жизнь понятной. Чтобы технологии не
                мешали, а помогали думать, действовать и расти. Мы строим экосистему,
                где осознанность и оптимизация становятся твоим преимуществом.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="relative z-10 border-t border-black/5 bg-white/80 py-10 dark:border-white/10 dark:bg-black/40">
        <div className="container mx-auto flex flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Neuro — интеллект, который помогает думать, планировать и действовать.
            </p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Neuro. Все права защищены.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-secondary dark:text-white">
              Языки:
            </span>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  lang.code === currentLanguage
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <Button variant="primary" className="px-6 py-2 text-sm font-semibold">
            Продолжить
          </Button>
        </div>
      </footer>
    </div>
  );
}
