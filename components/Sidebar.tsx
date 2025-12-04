
import React, { useState, useEffect } from 'react';
import type { ConstitutionData, SelectedItem, Chapter, Part } from '../types/index';
import { ChevronDownIcon, BookOpenIcon, FileTextIcon, HomeIcon } from './icons';

interface SidebarProps {
  data: ConstitutionData;
  onSelectItem: (item: SelectedItem) => void;
  selectedItem: SelectedItem;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  language: 'en' | 'sw';
}

const Sidebar: React.FC<SidebarProps> = ({ data, onSelectItem, selectedItem, isOpen, setIsOpen, language }) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

  // Automatically expand the chapter containing the selected item
  useEffect(() => {
    if (selectedItem.type === 'chapter') {
        setExpandedChapters(prev => {
            const newSet = new Set(prev);
            newSet.add(selectedItem.id as number);
            return newSet;
        });
    }
  }, [selectedItem]);

  const toggleChapter = (id: number) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const t = language === 'sw' 
    ? { 
        constitution: 'Katiba', 
        preamble: 'Utangulizi', 
        chapters: 'Sura', 
        schedules: 'Majedwali', 
        article: 'Kif.',
        part: 'Sehemu'
      }
    : { 
        constitution: 'The Constitution', 
        preamble: 'Preamble', 
        chapters: 'Chapters', 
        schedules: 'Schedules', 
        article: 'Art.',
        part: 'Part'
      };

  // Helper to render articles within a part/chapter
  const ArticleList = ({ part, chapterId }: { part: Part, chapterId: number }) => (
    <ul className="space-y-0.5 mt-1">
      {part.articles.map(article => {
        const isSelected = selectedItem.type === 'chapter' && selectedItem.id === chapterId && selectedItem.article === article.number;
        return (
          <li key={article.number}>
            <button
              onClick={() => onSelectItem({ type: 'chapter', id: chapterId, article: article.number })}
              className={`group flex w-full items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                isSelected 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
               <span className={`text-xs mr-2 font-mono ${isSelected ? 'text-white/80' : 'text-gray-400 group-hover:text-gray-500'}`}>{t.article} {article.number}</span>
               <span className="truncate text-left">{article.title}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div 
        onClick={() => setIsOpen(false)} 
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      
      {/* Sidebar Container */}
      <aside className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-surface dark:bg-dark-surface border-r border-border dark:border-dark-border z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-80 lg:w-96 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'} print:hidden`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border dark:border-dark-border flex-shrink-0">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <BookOpenIcon className="h-6 w-6 text-primary dark:text-dark-primary" />
                </div>
                <h2 className="text-lg font-bold text-on-surface dark:text-dark-on-surface">{t.constitution}</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            
            {/* Preamble Section */}
            <div>
                <button
                    onClick={() => onSelectItem({ type: 'preamble', id: 'preamble' })}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedItem.type === 'preamble' 
                        ? 'bg-primary/10 text-primary dark:text-dark-primary' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                    <HomeIcon className="h-5 w-5" />
                    {t.preamble}
                </button>
            </div>

            {/* Chapters Tree */}
            <div>
                <div className="px-3 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {t.chapters}
                </div>
                <div className="space-y-1">
                    {data.chapters.map((chapter) => {
                        const isExpanded = expandedChapters.has(chapter.id);
                        const isActive = selectedItem.type === 'chapter' && selectedItem.id === chapter.id;
                        // If selected is the chapter itself (overview), not a specific article
                        const isOverviewSelected = isActive && !selectedItem.article;

                        return (
                            <div key={chapter.id} className="rounded-lg overflow-hidden">
                                <div className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                                    isOverviewSelected 
                                    ? 'bg-primary/10 text-primary dark:text-dark-primary' 
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}>
                                    <button 
                                        className="flex-1 text-left text-sm font-medium truncate pr-2"
                                        onClick={() => onSelectItem({ type: 'chapter', id: chapter.id })}
                                    >
                                        <span className="mr-1.5 font-bold text-xs opacity-70 uppercase">{language === 'sw' ? 'Sura' : 'Ch.'} {chapter.id}</span>
                                        <span className="truncate font-semibold">{chapter.title}</span>
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); toggleChapter(chapter.id); }}
                                        className={`p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                        aria-label={isExpanded ? "Collapse chapter" : "Expand chapter"}
                                    >
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </button>
                                </div>

                                {isExpanded && (
                                    <div className="ml-3 pl-3 border-l-2 border-gray-100 dark:border-gray-700 mt-1 mb-2 transition-all duration-300 ease-in-out">
                                        {chapter.parts.map((part, idx) => (
                                            <div key={idx} className="mt-2 first:mt-1">
                                                {part.title && (
                                                    <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                                        {part.title}
                                                    </div>
                                                )}
                                                <ArticleList part={part} chapterId={chapter.id} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Schedules Section */}
            <div className="pb-6">
                 <div className="px-3 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {t.schedules}
                </div>
                <div className="space-y-1">
                    {data.schedules.map((schedule) => {
                         const isSelected = selectedItem.type === 'schedule' && selectedItem.id === schedule.id;
                         return (
                            <button
                                key={schedule.id}
                                onClick={() => onSelectItem({ type: 'schedule', id: schedule.id })}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                                    isSelected
                                    ? 'bg-primary/10 text-primary dark:text-dark-primary' 
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                                <FileTextIcon className="h-4 w-4 flex-shrink-0 opacity-70" />
                                <span className="truncate">{schedule.title}</span>
                            </button>
                         )
                    })}
                </div>
            </div>

        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
