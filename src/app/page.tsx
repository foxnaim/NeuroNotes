'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineArrowRight
} from 'react-icons/hi';
import { Button, Card } from '@/components/ui';

export default function GreetingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-full relative">
      {/* Hero Section - Dark Theme with Logo (Cybrary Style) */}
      <div className="relative overflow-hidden bg-background">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/20 to-pink-900/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div>
              {/* Main Heading with Gradient Text */}
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontWeight: 700,
                }}
              >
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Умные заметки
                </span>
                {' '}
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  и задачи
                </span>
                {' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  которые реально
                </span>
                {' '}
                <span className="text-white">
                  повышают продуктивность
                </span>
              </h1>
              
              {/* Subtitle */}
              <p 
                className="text-lg sm:text-xl mb-8 leading-relaxed text-gray-300"
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                Структурированное обучение и организация с помощью ИИ помогает вам лучше управлять идеями и задачами. С кураторскими путями развития, программами подготовки и умным анализом мы предлагаем лучшее решение.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button 
                  onClick={() => router.push('/notes')}
                  size="lg"
                  rightIcon={HiOutlineArrowRight}
                >
                  Начать обучение бесплатно
                </Button>
                <Button 
                  onClick={() => router.push('/ai')}
                  variant="secondary"
                  size="lg"
                  className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10"
                >
                  NeuroNotes для бизнеса
                </Button>
              </div>
            </div>

            {/* Right Side - Logo */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-purple-500/30 blur-3xl rounded-full" />
                
                {/* Logo with rotation and perspective */}
                <div 
                  className="relative transform rotate-[-5deg] perspective-1000"
                  style={{
                    transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="NeuroNotes"
                    width={500}
                    height={500}
                    className="w-full h-auto drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learn. Practice. Prove. Section - Exact Cybrary Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              color: 'var(--color-text-primary)',
              fontWeight: 700,
            }}
          >
            Изучайте. Практикуйте. Доказывайте.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Learn Card */}
          <Card className="p-8">
            <h3 
              className="text-xl font-bold mb-3"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Изучайте
            </h3>
            <p 
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Изучайте основные концепции и получайте практический опыт с ключевыми навыками в курсах и лабораториях под руководством экспертов отрасли.
            </p>
            <div 
              className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
            >
              <div className="text-white text-2xl">
                {React.createElement(HiOutlineDocumentText as any)}
              </div>
            </div>
          </Card>

          {/* Practice Card */}
          <Card className="p-8">
            <h3 
              className="text-xl font-bold mb-3"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Практикуйте
            </h3>
            <p 
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Развивайте навыки решения проблем и творческого мышления с помощью интерактивных лабораторий и головоломок, ориентированных на безопасность.
            </p>
            <div 
              className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
            >
              <div className="text-white text-2xl">
                {React.createElement(HiOutlineCheckCircle as any)}
              </div>
            </div>
          </Card>

          {/* Prove Card */}
          <Card className="p-8">
            <h3 
              className="text-xl font-bold mb-3"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Доказывайте
            </h3>
            <p 
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Продемонстрируйте свое мастерство в ключевых темах в оценках и практических тестах.
            </p>
            <div 
              className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
            >
              <div className="text-white text-2xl">
                {React.createElement(HiOutlineLightningBolt as any)}
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Buttons Below Cards - Cybrary Style */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => router.push('/notes')}
            size="lg"
            rightIcon={HiOutlineArrowRight}
          >
            Начать обучение бесплатно
          </Button>
          <Button 
            onClick={() => router.push('/ai')}
            variant="secondary"
            size="lg"
          >
            NeuroNotes для бизнеса
          </Button>
        </div>
      </div>

      {/* NeuroNotes for Business Section - Cybrary Style */}
      <div className="bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                NeuroNotes для бизнеса
              </h3>
              <p 
                className="text-lg mb-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Повысьте квалификацию вашей команды с помощью набора инструментов для обучения и управления NeuroNotes, включая виртуальные лаборатории, пути развития, соответствующие ролям, и персонализированную помощь. Запросите демо и узнайте, как NeuroNotes адаптирует нашу глубокую библиотеку обучения под уникальные потребности вашей команды.
              </p>
              <Button 
                onClick={() => router.push('/ai')}
                size="lg"
              >
                Получить демо
              </Button>
            </div>
            <div className="bg-background border border-border rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-white text-xl">
                      {React.createElement(HiOutlineSparkles as any)}
                    </div>
                  </div>
                  <div>
                    <h4 
                      className="font-bold mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      Виртуальные лаборатории
                    </h4>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                      Практикуйтесь в безопасной среде
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-white text-xl">
                      {React.createElement(HiOutlineDocumentText as any)}
                    </div>
                  </div>
                  <div>
                    <h4 
                      className="font-bold mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      Пути развития
                    </h4>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                      Соответствующие ролям и целям
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-white text-xl">
                      {React.createElement(HiOutlineLightningBolt as any)}
                    </div>
                  </div>
                  <div>
                    <h4 
                      className="font-bold mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      Персонализированная помощь
                    </h4>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                      Адаптированная под ваши потребности
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NeuroNotes for Individuals Section - Cybrary Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-background border border-border rounded-2xl p-8 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="text-white text-xl">
                    {React.createElement(HiOutlineDocumentText as any)}
                  </div>
                </div>
                <div>
                  <h4 
                    className="font-bold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Пути развития
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Соответствующие ролям и карьерным целям
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="text-white text-xl">
                    {React.createElement(HiOutlineCheckCircle as any)}
                  </div>
                </div>
                <div>
                  <h4 
                    className="font-bold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Целевые навыки
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Фокусированное обучение для конкретных целей
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="text-white text-xl">
                    {React.createElement(HiOutlineSparkles as any)}
                  </div>
                </div>
                <div>
                  <h4 
                    className="font-bold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Подготовка к сертификации
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Лучшие в отрасли программы подготовки
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h3 
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              NeuroNotes для частных пользователей
            </h3>
            <p 
              className="text-lg mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Выделитесь из толпы и продвиньте свою карьеру с помощью путей развития NeuroNotes, соответствующих ролям, целевых путей навыков и лучших программ подготовки к сертификации.
            </p>
            <Button 
              onClick={() => router.push('/notes')}
              size="lg"
              rightIcon={HiOutlineArrowRight}
            >
              Начать обучение бесплатно
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
