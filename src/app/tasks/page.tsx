import {
  HiOutlineSparkles,
  HiOutlinePlus,
  HiOutlineAdjustments,
  HiOutlineFlag,
  HiOutlineCalendar,
  HiOutlineClock
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
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-1 h-4 w-4 rounded-full border border-border" />
          <div>
            <h3 className="text-text-primary font-semibold text-lg">{title}</h3>
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
        <div>
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

export default function TasksPage() {
  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-text-primary mb-2">Задачи</h1>
          <p className="text-text-secondary">Организуйте и отслеживайте ваши дела с помощью ИИ</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-12 px-5 bg-surface border border-border rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2">
            <HiOutlineSparkles className="text-text-primary" />
            <span className="text-text-primary font-medium">ИИ предложения</span>
          </button>
          <button className="h-12 px-5 bg-gradient-to-r from-primary to-secondary text-white rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity">
            <HiOutlinePlus />
            <span className="font-medium">Новая задача</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        <Stat label="Все" value={5} />
        <Stat label="К Выполнению" value={2} />
        <Stat label="В Процессе" value={1} icon={<HiOutlineClock />} accent="yellow" />
        <Stat label="На Проверке" value={1} accent="blue" />
        <Stat label="Выполнено" value={1} accent="green" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
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
        <TaskCard
          title="Просмотреть и обновить документацию проекта"
          description="Пройти по всей документации проекта и убедиться, что она актуальна с последними изменениями"
          tags={["документация", "обзор"]}
          due="2024-01-16"
          est="2ч"
          source="note"
          priority="высокий"
          priorityTone="red"
        />

        <TaskCard
          title="Реализовать поток аутентификации пользователей"
          description="Настроить функции входа, регистрации и восстановления пароля"
          tags={["разработка", "авторизация"]}
          due="2024-01-18"
          est="6ч"
          source="Manual"
          priority="высокий"
          priorityTone="yellow"
        />
      </div>
    </div>
  );
}


