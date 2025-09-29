

import { 
  HiOutlinePlus, 
  HiOutlineSparkles,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineChartBar,
  HiOutlineLightningBolt,
  HiOutlineChat,
  HiOutlineHand
} from 'react-icons/hi';

export default function Home() {
  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-2">
            Доброе утро! <HiOutlineHand />
          </h1>
          <p className="text-text-secondary">
            Давайте организуем ваши мысли и повысим продуктивность сегодня.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface border border-border rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <HiOutlinePlus className="text-text-primary" />
            <span className="text-text-primary font-medium">Быстрая заметка</span>
          </button>
          <button className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:opacity-90 transition-opacity">
            <HiOutlineSparkles />
            <span className="font-medium">Спросить ИИ</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6 relative">
          <div className="absolute top-4 right-4 text-text-secondary">
            <HiOutlineDocumentText className="text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-1">127</h3>
          <p className="text-text-secondary text-sm mb-1">Всего заметок</p>
          <p className="text-success text-sm">+12 за прошлую неделю</p>
        </div>
        
        <div className="bg-surface border border-border rounded-lg p-6 relative">
          <div className="absolute top-4 right-4 text-text-secondary">
            <HiOutlineCheckCircle className="text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-1">23</h3>
          <p className="text-text-secondary text-sm mb-1">Активные задачи</p>
          <p className="text-success text-sm">8 выполнено на этой неделе</p>
        </div>
        
        <div className="bg-surface border border-border rounded-lg p-6 relative">
          <div className="absolute top-4 right-4 text-text-secondary">
            <HiOutlineChartBar className="text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-1">+18%</h3>
          <p className="text-text-secondary text-sm mb-1">Продуктивность</p>
          <p className="text-text-secondary text-sm">по сравнению с прошлым месяцем</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Notes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineDocumentText className="text-text-secondary text-xl" />
            <h2 className="text-xl font-semibold text-text-primary">Последние заметки</h2>
          </div>
          <p className="text-text-secondary text-sm mb-4">Ваши последние мысли и идеи</p>
          
          <div className="space-y-3">
            <div className="bg-surface border border-border rounded-lg p-4">
              <h3 className="font-medium text-text-primary mb-2">Идеи проектов на Q1</h3>
              <p className="text-text-secondary text-sm mb-3">Фокус на улучшении пользовательского опыта...</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-text-secondary text-xs px-2 py-1 rounded-full">планирование</span>
                  <span className="bg-gray-100 text-text-secondary text-xs px-2 py-1 rounded-full">идеи</span>
                </div>
                <span className="text-text-secondary text-xs">2 часа назад</span>
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <h3 className="font-medium text-text-primary mb-2">Заметки со встречи - Синхронизация команды</h3>
              <p className="text-text-secondary text-sm mb-3">Обсудили реализацию новых функций...</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-text-secondary text-xs px-2 py-1 rounded-full">встречи</span>
                  <span className="bg-gray-100 text-text-secondary text-xs px-2 py-1 rounded-full">синхронизация</span>
                </div>
                <span className="text-text-secondary text-xs">1 день назад</span>
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <h3 className="font-medium text-text-primary mb-2">Заметки по исследованию ИИ</h3>
              <p className="text-text-secondary text-sm mb-3">Изучение последних разработок в ML...</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-text-secondary text-xs px-2 py-1 rounded-full">исследования</span>
                  <span className="bg-gray-100 text-text-secondary text-xs px-2 py-1 rounded-full">ии</span>
                </div>
                <span className="text-text-secondary text-xs">3 дня назад</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Today's Tasks */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineCheckCircle className="text-text-secondary text-xl" />
              <h2 className="text-xl font-semibold text-text-primary">Сегодняшние задачи</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-lg">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <div className="flex-1">
                  <p className="text-text-primary font-medium">Просмотреть макеты</p>
                  <p className="text-text-secondary text-sm">Сегодня</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-lg">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <div className="flex-1">
                  <p className="text-text-primary font-medium">Обновить документацию</p>
                  <p className="text-text-secondary text-sm">Завтра</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-lg">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-text-primary font-medium">Подготовка к командному стендапу</p>
                  <p className="text-text-secondary text-sm">Пятница</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineLightningBolt className="text-text-secondary text-xl" />
              <h2 className="text-xl font-semibold text-text-primary">Предложения ИИ</h2>
            </div>
            <p className="text-text-secondary text-sm mb-4">Умные рекомендации для повышения продуктивности</p>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-surface border border-border rounded-lg hover:bg-gray-50 transition-colors">
                <p className="text-text-primary text-sm">Организуйте свои идеи проектов в выполнимые задачи</p>
              </button>
              
              <button className="w-full text-left p-3 bg-surface border border-border rounded-lg hover:bg-gray-50 transition-colors">
                <p className="text-text-primary text-sm">Просмотрите и резюмируйте заметки исследований за эту неделю</p>
              </button>
              
              <button className="w-full text-left p-3 bg-surface border border-border rounded-lg hover:bg-gray-50 transition-colors">
                <p className="text-text-primary text-sm">Создайте план последующих действий на основе недавних заметок встреч</p>
              </button>
              
              <button className="w-full p-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity">
                <p className="text-sm font-medium">Получить больше предложений</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
