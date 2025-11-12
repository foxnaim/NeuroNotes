"use client";

import { useMemo, useState } from 'react';
import { 
  HiOutlineSearch,
  HiOutlineAdjustments,
  HiOutlineSparkles,
  HiOutlineDocumentText,
  HiOutlineHashtag,
  HiOutlineClock,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineDotsHorizontal
} from 'react-icons/hi';
import { Button } from '@/components/ui';

export default function NotesPage() {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isAiSearchOpen, setIsAiSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  type Note = {
    title: string;
    content: string;
    tags: string[];
    metaTime: string;
    words: number;
  };

  const [notes, setNotes] = useState<Note[]>([
    {
      title: 'Дорожная карта проекта Q1 2024',
      content: 'Цели проекта. Реализовать аутентификацию пользователя. Разработать новую панель управления...',
      tags: ['планирование','дорожная-карта','2024'],
      metaTime: '2 часа назад',
      words: 1250,
    },
    {
      title: 'Заметки встречи – Планирование спринта',
      content: 'Повестка дня: обзор предыдущего спринта, обсуждение предстоящих функций...',
      tags: ['встречи','спринт','планирование'],
      metaTime: '1 день назад',
      words: 890,
    },
    {
      title: 'Исследование ИИ – Последние разработки',
      content: 'Недавние прорывы в машинном обучении и их практические применения...',
      tags: ['исследования','ии','машинное-обучение'],
      metaTime: '3 дня назад',
      words: 2100,
    }
  ]);

  const availableTags = useMemo(() => {
    const set = new Set<string>();
    notes.forEach(n => n.tags.forEach(t => set.add(t)));
    return Array.from(set);
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notes.filter(n => {
      const byQuery = !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tags.some(t => t.includes(q));
      const byTag = !activeTag || n.tags.includes(activeTag);
      return byQuery && byTag;
    });
  }, [notes, query, activeTag]);

  const openEdit = (idx: number) => {
    const n = notes[idx];
    setEditingIndex(idx);
    setEditTitle(n.title);
    setEditContent(n.content);
    setEditTags(n.tags.join(', '));
    setIsEditOpen(true);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const tags = editTags.split(',').map(t => t.trim()).filter(Boolean);
    const words = editContent.trim() ? editContent.trim().split(/\s+/).length : 0;
    setNotes(prev => prev.map((n, i) => i === editingIndex ? { ...n, title: editTitle, content: editContent, tags, metaTime: 'обновлено только что', words } : n));
    setIsEditOpen(false);
    setEditingIndex(null);
  };

  const deleteNote = (idx: number) => {
    if (typeof window !== 'undefined' && window.confirm('Удалить заметку?')) {
      setNotes(prev => prev.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
      {/* Header row: title + action - Cybrary Style */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-3">Заметки</h1>
            <p className="text-lg text-text-secondary max-w-2xl">Захватывайте, организуйте и улучшайте ваши идеи с помощью ИИ. Создавайте заметки, получайте резюме и структурируйте мысли.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsNewOpen(true)} 
            leftIcon={HiOutlinePlus}
            size="lg"
          >
            Новая заметка
          </Button>
          <Button 
            onClick={() => setIsAiSearchOpen(true)} 
            variant="secondary"
            leftIcon={HiOutlineSparkles}
            size="lg"
          >
            ИИ поиск
          </Button>
        </div>
      </div>

      {/* Search row */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex-1 relative">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            className="w-full h-12 bg-surface border border-border rounded-full pl-12 pr-3 sm:pr-4 text-text-primary placeholder:text-text-secondary/70 focus:outline-none"
            placeholder="Поиск заметок, тегов или содержимого..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button
          variant="secondary"
          className="h-12 w-12 p-0"
          aria-label="Фильтры"
        >
          <HiOutlineAdjustments className="text-text-primary" />
        </Button>
        <Button onClick={() => setIsAiSearchOpen(true)} variant="secondary" className="h-12" leftIcon={HiOutlineSparkles}>
          ИИ поиск
        </Button>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={() => setActiveTag(undefined)} 
          size="sm"
          variant={!activeTag ? 'primary' : 'secondary'}
          className="px-3 py-1"
        >
          Все заметки
        </Button>
        {availableTags.map(tag => (
          <Button 
            key={tag} 
            onClick={() => setActiveTag(tag)} 
            size="sm"
            variant={activeTag===tag ? 'outline' : 'secondary'}
            leftIcon={HiOutlineHashtag}
            className="px-3 py-1"
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* New note modal */}
      {isNewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsNewOpen(false)} />
          <div className="relative bg-surface border border-border rounded-2xl p-5 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-text-primary font-semibold text-lg">Новая заметка</h3>
              <Button variant="secondary" onClick={() => setIsNewOpen(false)}>Закрыть</Button>
            </div>
            <div className="space-y-3">
              <input className="w-full h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none" placeholder="Заголовок" value={title} onChange={(e)=>setTitle(e.target.value)} />
              <textarea className="w-full min-h-40 bg-surface border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none" placeholder="Текст заметки" value={content} onChange={(e)=>setContent(e.target.value)} />
              <input className="w-full h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none" placeholder="Теги через запятую" value={newTags} onChange={(e)=>setNewTags(e.target.value)} />
              <div className="flex flex-wrap gap-2">
                {newTags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                  <span key={t} className="bg-gray-100 text-text-secondary text-xs px-2 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={()=>setIsNewOpen(false)}>Отмена</Button>
                <Button onClick={()=>{ 
                  const tags = newTags.split(',').map(t => t.trim()).filter(Boolean);
                  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
                  setNotes(prev => [{ title, content, tags, metaTime: 'только что', words }, ...prev]);
                  setTitle(''); setContent(''); setNewTags(''); setIsNewOpen(false); 
                }}>Создать</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit note modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsEditOpen(false)} />
          <div className="relative bg-surface border border-border rounded-2xl p-5 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-text-primary font-semibold text-lg">Редактировать заметку</h3>
              <Button variant="secondary" onClick={() => setIsEditOpen(false)}>Закрыть</Button>
            </div>
            <div className="space-y-3">
              <input className="w-full h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none" placeholder="Заголовок" value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} />
              <textarea className="w-full min-h-40 bg-surface border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none" placeholder="Текст заметки" value={editContent} onChange={(e)=>setEditContent(e.target.value)} />
              <input className="w-full h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none" placeholder="Теги через запятую" value={editTags} onChange={(e)=>setEditTags(e.target.value)} />
              <div className="flex flex-wrap gap-2">
                {editTags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                  <span key={t} className="bg-gray-100 text-text-secondary text-xs px-2 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setIsEditOpen(false)}>Отмена</Button>
                <Button onClick={saveEdit}>Сохранить</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI search modal */}
      {isAiSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsAiSearchOpen(false)} />
          <div className="relative bg-surface border border-border rounded-2xl p-5 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-text-primary font-semibold text-lg">ИИ поиск</h3>
              <Button variant="secondary" onClick={() => setIsAiSearchOpen(false)}>Закрыть</Button>
            </div>
            <div className="space-y-3">
              <input className="w-full h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none" placeholder="Что найти в заметках?" value={query} onChange={(e)=>setQuery(e.target.value)} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input type="date" className="h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none" max={today} />
                <input type="date" className="h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none" max={today} />
                <input className="h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none" placeholder="Теги" />
              </div>
              <div className="flex justify-end">
                <Button onClick={()=>setIsAiSearchOpen(false)}>Искать</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View toggles */}
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" className="px-3 py-1">Сетка</Button>
        <Button variant="secondary" size="sm" className="px-3 py-1">Список</Button>
      </div>

      {/* Notes grid - Cybrary Card Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredNotes.map((n, i) => (
          <div key={`${n.title}-${i}`} className="bg-surface border border-border rounded-2xl p-6 hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <HiOutlineDocumentText className="text-white text-lg" />
                  </div>
                  <span className="text-xs text-text-secondary bg-gray-100 px-2 py-1 rounded-full">{n.metaTime}</span>
                </div>
                <h3 className="text-text-primary font-bold text-xl mb-3 group-hover:text-primary transition-colors">{n.title}</h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-3">{n.content}</p>
              </div>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                title="Меню"
                onClick={() => setOpenMenuIndex(openMenuIndex === i ? null : i)}
              >
                <HiOutlineDotsHorizontal className="text-text-primary" />
                {openMenuIndex === i && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenMenuIndex(null)} />
                    <div className="absolute right-0 top-10 z-50 bg-surface border border-border rounded-xl shadow-lg p-2 w-48">
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-2"
                        leftIcon={HiOutlinePencil}
                        onClick={() => { setOpenMenuIndex(null); openEdit(i); }}
                      >
                        Редактировать
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-2 text-error"
                        leftIcon={HiOutlineTrash}
                        onClick={() => { setOpenMenuIndex(null); deleteNote(i); }}
                      >
                        Удалить
                      </Button>
                    </div>
                  </>
                )}
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <HiOutlineSparkles className="text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-text-primary text-sm font-semibold mb-1">Резюме ИИ</p>
                  <p className="text-text-secondary text-xs">Сгенерированная выжимка ключевых идей из заметки</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {n.tags.map(tag => (
                  <span key={tag} className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">{tag}</span>
                ))}
              </div>
              <div className="text-text-secondary text-xs font-medium">
                {n.words} слов
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


