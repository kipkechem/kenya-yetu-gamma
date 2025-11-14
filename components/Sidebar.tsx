import React, { useState, useEffect } from 'react';
import type { ConstitutionData, SelectedItem } from '../types/index';
import { ChevronDownIcon, BookOpenIcon, FileTextIcon } from './icons';

interface SidebarProps {
  data: ConstitutionData;
  onSelectItem: (item: SelectedItem) => void;
  selectedItem: SelectedItem;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  language: 'en' | 'sw';
}

const Sidebar: React.FC<SidebarProps> = ({ data, onSelectItem, selectedItem, isOpen, setIsOpen, language }) => {
  const [openChapters, setOpenChapters] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (selectedItem.type === 'chapter' && selectedItem.article) {
        setOpenChapters(prev => {
            if (!prev.has(selectedItem.id as number)) {
                const newSet = new Set(prev);
                newSet.add(selectedItem.id as number);
                return newSet;
            }
            return prev;
        });
    }
  }, [selectedItem]);


  const toggleChapter = (chapterId: number) => {
    setOpenChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const t = language === 'sw' 
    ? { constitution: 'Katiba', preamble: 'Utangulizi', chapters: 'Sura', schedules: 'Majedwali', article: 'Kif.' }
    : { constitution: 'The Constitution', preamble: 'Preamble', chapters: 'Chapters', schedules: 'Schedules', article: 'Art.' };
  
  const sidebarContent = (
    <div className="h-full flex flex-col bg-surface dark:bg-dark-surface border-r border-border dark:border-dark-border">
        <div className="p-4 border-b border-border dark:border-dark-border flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-light dark:bg-dark-primary-light rounded-xl">
                    <BookOpenIcon className="h-6 w-6 text-primary dark:text-dark-primary" />
                </div>
                <h1 className="text-xl font-bold text-on-surface dark:text-dark-on-surface tracking-tight">{t.constitution}</h1>
            </div>
             <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-gray-500 dark:text-gray-400 hover:text-on-surface dark:hover:text-dark-on-surface">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            <button
                onClick={() => onSelectItem({ type: 'preamble', id: 'preamble' })}
                className={`w-full text-left p-2.5 text-sm rounded-lg transition-colors duration-200 flex items-center ${selectedItem.type === 'preamble' ? 'bg-primary-light dark:bg-dark-primary-light text-primary dark:text-dark-primary font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-on-surface dark:hover:text-dark-on-surface'}`}
            >
                <FileTextIcon className="h-4 w-4 mr-3" /> {t.preamble}
            </button>

            <h2 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t.chapters}</h2>
            {data.chapters.map(chapter => {
                const isChapterSelected = selectedItem.type === 'chapter' && selectedItem.id === chapter.id && !selectedItem.article;
                const isChapterGroupActive = selectedItem.type === 'chapter' && selectedItem.id === chapter.id;
                const chapterTitle = language === 'sw' ? `Sura ${chapter.id}: ${chapter.title}` : `Chapter ${chapter.id}: ${chapter.title}`;

                return (
                <div key={chapter.id}>
                    <div 
                        className={`w-full flex justify-between items-center pr-2 rounded-lg group ${isChapterSelected ? 'bg-primary-light dark:bg-dark-primary-light' : ''} ${!isChapterSelected && isChapterGroupActive ? 'bg-gray-50 dark:bg-dark-surface/50' : ''}`}
                    >
                       <button
                           onClick={() => onSelectItem({ type: 'chapter', id: chapter.id })}
                           className={`w-full text-left p-2.5 text-sm rounded-lg flex items-center transition-colors ${isChapterSelected ? 'text-primary dark:text-dark-primary font-semibold' : 'text-gray-600 dark:text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-dark-surface'}`}
                        >
                            <span className="truncate">{chapterTitle}</span>
                        </button>
                        <ChevronDownIcon
                            onClick={() => toggleChapter(chapter.id)}
                            className={`h-5 w-5 mr-1 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 cursor-pointer group-hover:text-on-surface dark:group-hover:text-dark-on-surface ${openChapters.has(chapter.id) ? 'rotate-180' : ''}`}
                        />
                    </div>
                    {openChapters.has(chapter.id) && (
                        <div className="py-1 space-y-1 border-l-2 border-gray-100 dark:border-dark-border/50 ml-4 pl-4">
                            {chapter.parts.flatMap(part => part.articles).map(article => {
                                const isArticleSelected = selectedItem.type === 'chapter' && selectedItem.id === chapter.id && selectedItem.article === article.number;
                                return (
                                <a href={`#article-${article.number}`} 
                                    key={article.number}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onSelectItem({ type: 'chapter', id: chapter.id, article: article.number });
                                    }}
                                    className={`block w-full text-left px-3 py-1.5 text-sm rounded-lg truncate transition-colors ${isArticleSelected ? 'bg-primary-light dark:bg-dark-primary-light text-primary dark:text-dark-primary font-semibold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface'}`}
                                >
                                  {`${t.article} ${article.number}: ${article.title}`}
                                </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            )})}

            <h2 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t.schedules}</h2>
            {data.schedules.map(schedule => (
                <button
                    key={schedule.id}
                    onClick={() => onSelectItem({ type: 'schedule', id: schedule.id })}
                    className={`w-full text-left p-2.5 text-sm rounded-lg transition-colors duration-200 flex items-center ${selectedItem.type === 'schedule' && selectedItem.id === schedule.id ? 'bg-primary-light dark:bg-dark-primary-light text-primary dark:text-dark-primary font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-on-surface dark:hover:text-dark-on-surface'}`}
                >
                    <FileTextIcon className="h-4 w-4 mr-3" />
                    {schedule.title}
                </button>
            ))}
        </nav>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-4/5 max-w-xs sm:w-80 lg:w-96 z-40 transform transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} print:hidden`}>
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;