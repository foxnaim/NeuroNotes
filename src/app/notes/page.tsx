import { 
  HiOutlineSearch,
  HiOutlineAdjustments,
  HiOutlineSparkles,
  HiOutlineDocumentText,
  HiOutlineHashtag,
  HiOutlineClock,
  HiOutlinePlus
} from 'react-icons/hi';

export default function NotesPage() {
  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
      {/* Header row: title + action */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-text-primary mb-2">Заметки</h1>
          <p className="text-text-secondary">Захватывайте, организуйте и улучшайте ваши идеи с помощью ИИ</p>
        </div>
        <button className="bg-gradient-to-r from-primary to-secondary text-white rounded-full px-5 py-3 flex items-center gap-2 hover:opacity-90 transition-opacity">
          <HiOutlinePlus />
          <span className="font-medium">Новая заметка</span>
        </button>
      </div>

      {/* Search row */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex-1 relative">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            className="w-full h-12 bg-surface border border-border rounded-full pl-12 pr-3 sm:pr-4 text-text-primary placeholder:text-text-secondary/70 focus:outline-none"
            placeholder="Поиск заметок, тегов или содержимого..."
          />
        </div>
        <button
          className="h-12 w-12 bg-surface border border-border rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center"
          aria-label="Фильтры"
        >
          <HiOutlineAdjustments className="text-text-primary" />
        </button>
        <button className="h-12 px-5 bg-surface border border-border rounded-full hover:bg-gray-50 transition-colors hidden sm:inline-flex items-center gap-2">
          <HiOutlineSparkles className="text-text-primary" />
          <span className="text-text-primary font-medium">ИИ поиск</span>
        </button>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm">Все заметки</button>
        {['планирование','дорожная-карта','2024','встречи','спринт','исследования','ии','машинное-обучение','исследование-пользователей','инсайты','ux'].map(tag => (
          <button key={tag} className="px-3 py-1 rounded-full bg-surface border border-border text-text-primary text-sm hover:bg-gray-50 transition-colors flex items-center gap-1">
            <HiOutlineHashtag />
            <span>{tag}</span>
          </button>
        ))}
      </div>

      {/* View toggles */}
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 rounded-full bg-surface border border-border text-text-primary text-sm">Сетка</button>
        <button className="px-3 py-1 rounded-full bg-surface border border-border text-text-primary text-sm">Список</button>
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {[1,2,3].map((i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-text-secondary">
                <HiOutlineDocumentText />
              </div>
              <div className="flex items-center gap-1 text-text-secondary text-xs">
                <HiOutlineClock />
                {i === 1 ? '2 часа назад' : i === 2 ? '1 день назад' : '3 дня назад'}
              </div>
            </div>
            <h3 className="text-text-primary font-semibold text-lg mb-2">
              {i === 1 && 'Дорожная карта проекта Q1 2024'}
              {i === 2 && 'Заметки встречи – Планирование спринта'}
              {i === 3 && 'Исследование ИИ – Последние разработки'}
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              {i === 1 && 'Цели проекта. Реализовать аутентификацию пользователя. Разработать новую панель управления...'}
              {i === 2 && 'Повестка дня: обзор предыдущего спринта, обсуждение предстоящих функций...'}
              {i === 3 && 'Недавние прорывы в машинном обучении и их практические применения...'}
            </p>
            <div className="bg-surface border border-border rounded-lg p-3 flex items-center gap-2 mb-4">
              <HiOutlineSparkles className="text-secondary" />
              <div>
                <p className="text-text-primary text-sm font-medium">Резюме ИИ</p>
                <p className="text-text-secondary text-xs">Сгенерированная выжимка ключевых идей</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {(i===1 ? ['планирование','дорожная-карта','2024'] : i===2 ? ['встречи','спринт','планирование'] : ['исследования','ии','машинное-обучение']).map(tag => (
                  <span key={tag} className="bg-gray-100 text-text-secondary text-xs px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="text-text-secondary text-xs">
                {i === 1 && '1250 слов'}
                {i === 2 && '890 слов'}
                {i === 3 && '2100 слов'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


