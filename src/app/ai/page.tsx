import {
  HiOutlineLightningBolt,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineLightBulb,
  HiOutlineSparkles,
  HiOutlinePaperAirplane,
} from 'react-icons/hi';

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-text-secondary text-sm">{label}</span>
      <span className="text-text-primary text-sm bg-surface border border-border rounded-full px-2 py-0.5">{value}</span>
    </div>
  );
}

function QuickAction({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <button className="bg-surface border border-border rounded-2xl p-4 text-left hover:bg-gray-50 transition-colors w-full">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 text-secondary flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="text-text-primary font-medium">{title}</div>
          <div className="text-text-secondary text-sm">{subtitle}</div>
        </div>
      </div>
    </button>
  );
}

export default function AIPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center">
            <HiOutlineLightningBolt />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-text-primary">ИИ Помощник</h1>
            <p className="text-text-secondary">Ваш интеллектуальный спутник продуктивности</p>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chat column */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-6 min-h-[420px] md:min-h-[520px]">
            <div className="bg-surface border border-border rounded-xl p-4 max-w-xl md:max-w-2xl">
              <div className="text-text-secondary text-sm mb-1">NeuroNotes AI</div>
              <div className="text-text-primary">
                Привет! Я ваш ИИ-помощник. Я могу помочь вам анализировать заметки,
                организовывать задачи, генерировать идеи и повышать продуктивность.
                Над чем хотели бы поработать сегодня?
              </div>
              <div className="text-text-secondary text-xs mt-2">Только что</div>
            </div>
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 sticky bottom-4">
            <input
              className="flex-1 h-16 bg-surface border border-border rounded-2xl px-5 text-text-primary placeholder:text-text-secondary/70 focus:outline-none shadow-sm"
              placeholder="Спросите меня о ваших заметках, задачах или продуктивности..."
            />
            <button className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center hover:opacity-90 shadow">
              <HiOutlinePaperAirplane />
            </button>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <QuickAction icon={<HiOutlineDocumentText />} title="Резюмировать заметки" subtitle="Получить резюме последних заметок" />
            <QuickAction icon={<HiOutlineClipboardList />} title="Создать задачи" subtitle="Превратить идеи в выполнимые шаги" />
            <QuickAction icon={<HiOutlineLightBulb />} title="Генерировать идеи" subtitle="Мозговой штурм новых концепций" />
            <QuickAction icon={<HiOutlineSparkles />} title="Организовать контент" subtitle="Структурировать и категоризировать" />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineSparkles className="text-secondary" />
              <h3 className="text-text-primary font-semibold text-lg">AI Status</h3>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2.5 w-2.5 rounded-full bg-success inline-block" />
              <span className="text-text-primary font-medium">Готов помочь</span>
            </div>
            <div className="text-text-secondary text-sm space-y-1">
              <div>ИИ модель: GPT-4 Turbo</div>
              <div>Контекст: Ваши заметки и задачи</div>
              <div>Возможности: Анализ, предложения, организация</div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-text-primary font-semibold mb-2">Контекст и память</h3>
            <StatRow label="Проанализировано заметок" value={127} />
            <StatRow label="Задач отслеживается" value={23} />
            <StatRow label="Последнее обновление" value={'2h ago'} />
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-text-primary font-semibold mb-3">Предлагаемые действия</h3>
            <ul className="space-y-3 text-text-primary">
              <li className="font-medium">Просмотреть заметки проекта
                <div className="text-text-secondary text-sm">У вас есть 3 непросмотренные заметки проекта</div>
              </li>
              <li className="font-medium">Организовать исследования
                <div className="text-text-secondary text-sm">Создать структуру для ваших исследовательских заметок</div>
              </li>
              <li className="font-medium">Планировать завтра
                <div className="text-text-secondary text-sm">Создать план действий для предстоящих задач</div>
              </li>
            </ul>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-text-primary font-semibold mb-3">Что я умею</h3>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-center gap-2"><HiOutlineCheckCircle className="text-success" /> Анализировать и резюмировать заметки</li>
              <li className="flex items-center gap-2"><HiOutlineCheckCircle className="text-success" /> Создавать задачи из идей</li>
              <li className="flex items-center gap-2"><HiOutlineCheckCircle className="text-success" /> Генерировать творческие идеи</li>
              <li className="flex items-center gap-2"><HiOutlineCheckCircle className="text-success" /> Организовывать и структурировать контент</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


