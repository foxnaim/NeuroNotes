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
      {/* Header row: title + action */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-text-primary mb-2">Заметки</h1>
          <p className="text-text-secondary">Захватывайте, организуйте и улучшайте ваши идеи с помощью ИИ</p>
        </div>
        <button onClick={() => setIsNewOpen(true)} className="bg-gradient-to-r from-primary to-secondary text-white rounded-full px-5 py-3 flex items-center gap-2 hover:opacity-90 transition-opacity">
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          className="h-12 w-12 bg-surface border border-border rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center"
          aria-label="Фильтры"
        >
          <HiOutlineAdjustments className="text-text-primary" />
        </button>
        <button onClick={() => setIsAiSearchOpen(true)} className="h-12 px-5 bg-surface border border-border rounded-full hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
          <HiOutlineSparkles className="text-text-primary" />
          <span className="text-text-primary font-medium">ИИ поиск</span>
        </button>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveTag(undefined)} className={`px-3 py-1 rounded-full text-sm ${!activeTag ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-surface border border-border text-text-primary'}`}>Все заметки</button>
        {availableTags.map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)} className={`px-3 py-1 rounded-full text-sm hover:bg-gray-50 transition-colors flex items-center gap-1 ${activeTag===tag ? 'bg-surface border border-primary text-text-primary' : 'bg-surface border border-border text-text-primary'}`}>
            <HiOutlineHashtag />
            <span>{tag}</span>
          </button>
        ))}
      </div>

      {/* New note modal */}
      {isNewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsNewOpen(false)} />
          <div className="relative bg-surface border border-border rounded-2xl p-5 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-text-primary font-semibold text-lg">Новая заметка</h3>
              <button className="h-10 px-4 bg-surface border border-border rounded-full" onClick={() => setIsNewOpen(false)}>Закрыть</button>
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
                <button className="h-10 px-4 bg-surface border border-border rounded-full" onClick={()=>setIsNewOpen(false)}>Отмена</button>
                <button className="h-10 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full" onClick={()=>{ 
                  const tags = newTags.split(',').map(t => t.trim()).filter(Boolean);
                  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
                  setNotes(prev => [{ title, content, tags, metaTime: 'только что', words }, ...prev]);
                  setTitle(''); setContent(''); setNewTags(''); setIsNewOpen(false); 
                }}>Создать</button>
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
              <button className="h-10 px-4 bg-surface border border-border rounded-full" onClick={() => setIsEditOpen(false)}>Закрыть</button>
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
                <button className="h-10 px-4 bg-surface border border-border rounded-full" onClick={() => setIsEditOpen(false)}>Отмена</button>
                <button className="h-10 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full" onClick={saveEdit}>Сохранить</button>
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
              <button className="h-10 px-4 bg-surface border border-border rounded-full" onClick={() => setIsAiSearchOpen(false)}>Закрыть</button>
            </div>
            <div className="space-y-3">
              <input className="w-full h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none" placeholder="Что найти в заметках?" value={query} onChange={(e)=>setQuery(e.target.value)} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input type="date" className="h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none" max={today} />
                <input type="date" className="h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none" max={today} />
                <input className="h-11 bg-surface border border-border rounded-lg px-3 text-text-primary focus:outline-none" placeholder="Теги" />
              </div>
              <div className="flex justify-end">
                <button className="h-10 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full" onClick={()=>setIsAiSearchOpen(false)}>Искать</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View toggles */}
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 rounded-full bg-surface border border-border text-text-primary text-sm">Сетка</button>
        <button className="px-3 py-1 rounded-full bg-surface border border-border text-text-primary text-sm">Список</button>
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredNotes.map((n, i) => (
          <div key={`${n.title}-${i}`} className="bg-surface border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-text-secondary">
                <HiOutlineDocumentText />
              </div>
              <div className="flex items-center gap-2 relative">
                <div className="flex items-center gap-1 text-text-secondary text-xs">
                  <HiOutlineClock />
                  {n.metaTime}
                </div>
                <button
                  className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-surface border border-border hover:bg-gray-50"
                  title="Меню"
                  onClick={() => setOpenMenuIndex(openMenuIndex === i ? null : i)}
                >
                  <HiOutlineDotsHorizontal className="text-text-primary" />
                </button>
                {openMenuIndex === i && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenMenuIndex(null)} />
                    <div className="absolute right-0 top-9 z-50 bg-surface border border-border rounded-lg shadow p-1 w-44">
                      <button
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
                        onClick={() => { setOpenMenuIndex(null); openEdit(i); }}
                      >
                        <HiOutlinePencil className="text-text-primary" />
                        <span className="text-text-primary text-sm">Редактировать</span>
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
                        onClick={() => { setOpenMenuIndex(null); deleteNote(i); }}
                      >
                        <HiOutlineTrash className="text-error" />
                        <span className="text-error text-sm">Удалить</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <h3 className="text-text-primary font-semibold text-lg mb-2">{n.title}</h3>
            <p className="text-text-secondary text-sm mb-4">{n.content}</p>
            <div className="bg-surface border border-border rounded-lg p-3 flex items-center gap-2 mb-4">
              <HiOutlineSparkles className="text-secondary" />
              <div>
                <p className="text-text-primary text-sm font-medium">Резюме ИИ</p>
                <p className="text-text-secondary text-xs">Сгенерированная выжимка ключевых идей</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {n.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-text-secondary text-xs px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="text-text-secondary text-xs">
                {n.words} слов
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


