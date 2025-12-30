import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import type { SelectedItem } from '../types/index.ts';
import { chaptersMeta, schedulesMeta, swahiliChaptersMeta } from '../data/constitution-meta.ts';
import { ChevronDownIcon, BookOpenIcon, FileTextIcon, ChevronDoubleLeftIcon } from './icons.tsx';

interface SidebarProps {
  onSelectItem: (item: SelectedItem) => void;
  selectedItem: SelectedItem;
  isOpen: boolean; 
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  language: 'en' | 'sw';
}

const ChapterItem = memo(({ chapter, isExpanded, selectedItem, language, onSelectItem, toggleChapter, t }: any) => {
    const isActive = selectedItem.type === 'chapter' && selectedItem.id === chapter.id;
    const isOverviewSelected = isActive && !selectedItem.article;

    return (
        <div className="rounded-lg">
            <div className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                isOverviewSelected 
                ? 'bg-primary/10 text-primary dark:text-dark-primary' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}>
                <button 
                    id={`sidebar-item-chapter-${chapter.id}`}
                    className="flex-1 text-left text-sm font-medium truncate pr-2"
                    onClick={() => onSelectItem({ type: 'chapter', id: chapter.id })}
                >
                    <span className="mr-1.5 font-bold text-xs opacity-70 uppercase">{language === 'sw' ? 'Sura' : 'Ch.'} {chapter.id}</span>
                    <span className="truncate font-semibold">{chapter.title}</span>
                </button>
            </div>
        </div>
    );
});

const Sidebar: React.FC<SidebarProps> = ({ 
  onSelectItem, 
  selectedItem, 
  isOpen, 
  setIsOpen, 
  isCollapsed,
  setIsCollapsed,
  language 
}) => {
  const navRef = useRef<HTMLElement>(null);

  const t = useMemo(() => language === 'sw' 
    ? { constitution: 'Katiba', preamble: 'Utangulizi', chapters: 'Sura', schedules: 'Majedwali' }
    : { constitution: 'The Constitution', preamble: 'Preamble', chapters: 'Chapters', schedules: 'Schedules' }, [language]);

  const currentChapters = language === 'sw' ? swahiliChaptersMeta : chaptersMeta;

  return (
    <>
      <div onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
      
      <aside className={`fixed top-0 left-0 h-full z-40 bg-surface/95 dark:bg-dark-surface/95 backdrop-blur-md border-r border-border dark:border-dark-border transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:absolute md:top-0 md:left-0 ${isCollapsed ? 'md:-translate-x-full' : 'md:translate-x-0'} w-[85%] max-w-[320px] md:w-80 lg:w-96 print:hidden`}>
        
        <button onClick={() => setIsCollapsed(!isCollapsed)} className={`hidden md:flex items-center justify-center absolute top-24 -right-10 z-50 w-10 h-12 rounded-r-xl bg-surface dark:bg-dark-surface border-y border-r border-border dark:border-dark-border text-gray-500 hover:text-primary shadow-[4px_0_10px_rgba(0,0,0,0.1)] transition-all duration-300 group`}>
            <div className="transition-transform duration-300 group-hover:scale-110">
                 {isCollapsed ? <BookOpenIcon className="h-6 w-6" /> : <ChevronDoubleLeftIcon className="h-5 w-5" />}
            </div>
        </button>

        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border dark:border-dark-border flex-shrink-0 bg-surface dark:bg-dark-surface">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg"><BookOpenIcon className="h-6 w-6 text-primary" /></div>
                    <h2 className="text-lg font-bold text-on-surface dark:text-dark-on-surface">{t.constitution}</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
            </div>

            <nav ref={navRef} className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 bg-surface/50 dark:bg-dark-surface/50">
                <div>
                    <button id="sidebar-item-preamble" onClick={() => onSelectItem({ type: 'preamble', id: 'preamble' })} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${selectedItem.type === 'preamble' ? 'bg-primary/10 text-primary dark:text-dark-primary' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>{t.preamble}</button>
                </div>

                <div>
                    <div className="px-3 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{t.chapters}</div>
                    <div className="space-y-1">
                        {currentChapters.map((chapter) => (
                             <ChapterItem key={chapter.id} chapter={chapter} selectedItem={selectedItem} language={language} onSelectItem={onSelectItem} t={t} />
                        ))}
                    </div>
                </div>

                <div className="pb-6">
                    <div className="px-3 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{t.schedules}</div>
                    <div className="space-y-1">
                        {schedulesMeta.map((schedule) => {
                            const isSelected = selectedItem.type === 'schedule' && selectedItem.id === schedule.id;
                            return (
                                <button key={schedule.id} id={`sidebar-item-schedule-${schedule.id}`} onClick={() => onSelectItem({ type: 'schedule', id: schedule.id })} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${isSelected ? 'bg-primary/10 text-primary dark:text-dark-primary' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                    <FileTextIcon className="h-4 w-4 flex-shrink-0 opacity-70" />
                                    <span className="truncate">{schedule.title}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </nav>
        </div>
      </aside>
    </>
  );
};

export default memo(Sidebar);