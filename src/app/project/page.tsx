

"use client";

import { useState } from 'react';
import { 
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineChartBar,
  HiOutlineLightningBolt
} from 'react-icons/hi';
import { Button, Card, Modal, Input, Textarea, StatCard, Badge } from '@/components/ui';

export default function Home() {
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [quickText, setQuickText] = useState('');
  const [ask, setAsk] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Section - Cybrary Style */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-4 sm:mb-6 leading-tight">
              Умные заметки и задачи с ИИ
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary mb-8 sm:mb-10 max-w-2xl">
              NeuroNotes помогает вам организовывать мысли, создавать задачи и повышать продуктивность с помощью искусственного интеллекта. Резюмируйте, анализируйте и структурируйте ваши идеи.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Button 
                onClick={() => setIsQuickOpen(true)} 
                size="lg"
                variant="primary"
              >
                Начать работу
              </Button>
              <Button 
                onClick={() => setIsAskAiOpen(true)} 
                size="lg"
                variant="secondary"
              >
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isQuickOpen}
        onClose={() => setIsQuickOpen(false)}
        title="Быстрая заметка"
        size="md"
      >
        <div className="space-y-4">
          <Input
            placeholder="Заголовок"
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
          />
          <Textarea
            placeholder="Текст"
            value={quickText}
            onChange={(e) => setQuickText(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsQuickOpen(false)}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                setQuickTitle('');
                setQuickText('');
                setIsQuickOpen(false);
              }}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isAskAiOpen}
        onClose={() => setIsAskAiOpen(false)}
        title="Спросить ИИ"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            placeholder="Ваш вопрос"
            value={ask}
            onChange={(e) => setAsk(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setAnswer(ask ? 'Черновой ответ ИИ: я бы предложил начать с... (демо)' : null);
              }}
            >
              Спросить
            </Button>
          </div>
          {answer && (
            <Card className="p-4">
              <p className="text-text-primary">{answer}</p>
            </Card>
          )}
        </div>
      </Modal>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
      {/* Features Section - Cybrary Style */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Изучайте. Практикуйте. Доказывайте.</h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          NeuroNotes предоставляет все инструменты для организации ваших мыслей и повышения продуктивности
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
        <Card hover className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HiOutlineDocumentText className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-3">Изучайте</h3>
          <p className="text-text-secondary">
            Создавайте заметки, структурируйте идеи и получайте резюме от ИИ
          </p>
        </Card>
        
        <Card hover className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HiOutlineCheckCircle className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-3">Практикуйте</h3>
          <p className="text-text-secondary">
            Превращайте идеи в выполнимые задачи и отслеживайте прогресс
          </p>
        </Card>
        
        <Card hover className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HiOutlineChartBar className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-3">Доказывайте</h3>
          <p className="text-text-secondary">
            Анализируйте продуктивность и получайте инсайты от ИИ
          </p>
        </Card>
      </div>

      {/* Stats Cards - Cybrary Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          value={127}
          label="Всего заметок"
          trend={{ value: '+12 за прошлую неделю', positive: true }}
          icon={<HiOutlineDocumentText className="text-2xl" />}
        />
        
        <StatCard
          value={23}
          label="Активные задачи"
          trend={{ value: '8 выполнено на этой неделе', positive: true }}
          icon={<HiOutlineCheckCircle className="text-2xl" />}
        />
        
        <StatCard
          value="+18%"
          label="Продуктивность"
          description="по сравнению с прошлым месяцем"
          icon={<HiOutlineChartBar className="text-2xl" />}
        />
      </div>

      {/* Popular Content Section - Cybrary Style */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">Популярные заметки и задачи</h2>
          <Button variant="ghost" className="text-primary font-medium text-sm hover:underline p-0 h-auto">Просмотреть все</Button>
        </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Notes - Card Style */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <HiOutlineDocumentText className="text-primary text-xl" />
            <h2 className="text-xl font-bold text-text-primary">Последние заметки</h2>
          </div>
          
          <div className="space-y-4">
            <Card hover className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-text-primary mb-2">Идеи проектов на Q1</h3>
                <Badge variant="default">2ч назад</Badge>
              </div>
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">Фокус на улучшении пользовательского опыта и внедрении новых функций для повышения вовлеченности...</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="primary">планирование</Badge>
                <Badge variant="secondary">идеи</Badge>
              </div>
            </Card>
            
            <Card hover className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-text-primary mb-2">Заметки со встречи - Синхронизация команды</h3>
                <Badge variant="default">1 день назад</Badge>
              </div>
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">Обсудили реализацию новых функций и синхронизацию работы между отделами...</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="primary">встречи</Badge>
                <Badge variant="secondary">синхронизация</Badge>
              </div>
            </Card>
            
            <Card hover className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-text-primary mb-2">Заметки по исследованию ИИ</h3>
                <Badge variant="default">3 дня назад</Badge>
              </div>
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">Изучение последних разработок в машинном обучении и их практических применений...</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="primary">исследования</Badge>
                <Badge variant="secondary">ии</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Today's Tasks - Card Style */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <HiOutlineCheckCircle className="text-primary text-xl" />
              <h2 className="text-xl font-bold text-text-primary">Сегодняшние задачи</h2>
            </div>
            
            <div className="space-y-3">
              <Card hover className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-error rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-text-primary font-semibold mb-1">Просмотреть макеты</p>
                    <p className="text-text-secondary text-sm">Сегодня</p>
                  </div>
                </div>
              </Card>
              
              <Card hover className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-warning rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-text-primary font-semibold mb-1">Обновить документацию</p>
                    <p className="text-text-secondary text-sm">Завтра</p>
                  </div>
                </div>
              </Card>
              
              <Card hover className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-success rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-text-primary font-semibold mb-1">Подготовка к командному стендапу</p>
                    <p className="text-text-secondary text-sm">Пятница</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* AI Suggestions - Card Style */}
          <Card gradient className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineLightningBolt className="text-secondary text-xl" />
              <h2 className="text-xl font-bold text-text-primary">Предложения ИИ</h2>
            </div>
            <p className="text-text-secondary text-sm mb-6">Умные рекомендации для повышения продуктивности</p>
            
            <div className="space-y-3">
              <Button variant="ghost" fullWidth className="justify-start text-left">
                Организуйте свои идеи проектов в выполнимые задачи
              </Button>
              
              <Button variant="ghost" fullWidth className="justify-start text-left">
                Просмотрите и резюмируйте заметки исследований за эту неделю
              </Button>
              
              <Button variant="ghost" fullWidth className="justify-start text-left">
                Создайте план последующих действий на основе недавних заметок встреч
              </Button>
              
              <Button 
                onClick={() => setIsAskAiOpen(true)}
                fullWidth
                size="lg"
              >
                Получить больше предложений
              </Button>
            </div>
          </Card>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
