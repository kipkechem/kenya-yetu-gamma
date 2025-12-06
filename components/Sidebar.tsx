
import React, { useState, useEffect, useRef } from 'react';
import type { ConstitutionData, SelectedItem, Chapter, Part } from '../types/index';
import { ChevronDownIcon, BookOpenIcon, FileTextIcon, ChevronDoubleLeftIcon } from './icons';

interface SidebarProps {
  data: ConstitutionData;
  onSelectItem: (item: SelectedItem) => void;
  selectedItem: SelectedItem;
  isOpen: boolean; // Mobile state
  setIsOpen: (isOpen: boolean) => void; // Mobile toggle
  isCollapsed: boolean; // Desktop state
  setIsCollapsed: (collapsed: boolean) => void; // Desktop toggle
  language: 'en' | 'sw';
}

const Sidebar: React.FC<SidebarProps> = ({ 
  data, 
  onSelectItem, 
  selectedItem, 
  isOpen, 
  setIsOpen, 
  isCollapsed,
  setIsCollapsed,
  language 
}) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());
  const navRef = useRef<HTMLElement>(null);

  // Automatically expand the chapter containing the selected item
  useEffect(() => {
    if (selectedItem.type === 'chapter') {
        setExpandedChapters(prev => {
            const newSet = new Set(prev);
            newSet.add(selectedItem.id as number);
            return newSet;
        });
    }
  }, [selectedItem.type, selectedItem.id]);

  // Automatically scroll the selected item into view
  useEffect(() => {
    // Only scroll if visible
    if ((!isOpen && window.innerWidth < 768) || (isCollapsed && window.innerWidth >= 768)) return;

    const timer = setTimeout(() => {
      let elementId = '';
      if (selectedItem.type === 'preamble') {
        elementId = 'sidebar-item-preamble';
      } else if (selectedItem.type === 'chapter') {
        if (selectedItem.article) {
             elementId = `sidebar-item-article-${selectedItem.article}`;
        } else {
             elementId = `sidebar-item-chapter-${selectedItem.id}`;
        }
      } else if (selectedItem.type === 'schedule') {
        elementId = `sidebar-item-schedule-${selectedItem.id}`;
      }

      if (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [selectedItem, isOpen, isCollapsed]);

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

  const ArticleList = ({ part, chapterId }: { part: Part, chapterId: number }) => (
    <ul className="space-y-0.5 mt-1">
      {part.articles.map(article => {
        const isSelected = selectedItem.type === 'chapter' && selectedItem.id === chapterId && selectedItem.article === article.number;
        return (
          <li key={article.number}>
            <button
              id={`sidebar-item-article-${article.number}`}
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
      <aside 
        className={`
            fixed top-0 left-0 h-full z-40 
            bg-surface/95 dark:bg-dark-surface/95 backdrop-blur-md border-r border-border dark:border-dark-border 
            transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col
            shadow-2xl
            
            /* Mobile: control via isOpen */
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
            
            /* Desktop: Absolute positioning, control via isCollapsed */
            md:absolute md:top-0 md:left-0
            ${isCollapsed ? 'md:-translate-x-full' : 'md:translate-x-0'}
            
            w-[85%] max-w-[320px] md:w-80 lg:w-96
            print:hidden
        `}
      >
        
        {/* Toggle Button (Desktop Only) - Acts as the tab on the edge */}
        <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`
                hidden md:flex items-center justify-center
                absolute top-24 -right-10 z-50
                w-10 h-12 rounded-r-xl
                bg-surface dark:bg-dark-surface border-y border-r border-border dark:border-dark-border
                text-gray-500 hover:text-primary dark:hover:text-dark-primary
                shadow-[4px_0_10px_rgba(0,0,0,0.1)] cursor-pointer focus:outline-none
                transition-all duration-300
                group
            `}
            aria-label={isCollapsed ? "Expand Table of Contents" : "Collapse Table of Contents"}
            title={isCollapsed ? "Show Table of Contents" : "Hide Table of Contents"}
        >
            <div className="transition-transform duration-300 group-hover:scale-110">
                 {isCollapsed ? <BookOpenIcon className="h-6 w-6" /> : <ChevronDoubleLeftIcon className="h-5 w-5" />}
            </div>
        </button>

        {/* Sidebar Content Wrapper */}
        <div className="flex flex-col h-full overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border dark:border-dark-border flex-shrink-0 bg-surface dark:bg-dark-surface">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                        <BookOpenIcon className="h-6 w-6 text-primary dark:text-dark-primary" />
                    </div>
                    <h2 className="text-lg font-bold text-on-surface dark:text-dark-on-surface">{t.constitution}</h2>
                </div>
                {/* Mobile close button */}
                <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>

            {/* Navigation Content */}
            <nav ref={navRef} className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 bg-surface/50 dark:bg-dark-surface/50">
                
                {/* Preamble Section */}
                <div>
                    <button
                        id="sidebar-item-preamble"
                        onClick={() => onSelectItem({ type: 'preamble', id: 'preamble' })}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            selectedItem.type === 'preamble' 
                            ? 'bg-primary/10 text-primary dark:text-dark-primary' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        {/* No HomeIcon as requested */}
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
                            const isOverviewSelected = isActive && !selectedItem.article;

                            return (
                                <div key={chapter.id} className="rounded-lg">
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
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleChapter(chapter.id); }}
                                            className={`p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                            aria-label={isExpanded ? "Collapse chapter" : "Expand chapter"}
                                        >
                                            <ChevronDownIcon className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {isExpanded && (
                                        <div className="ml-3 pl-3 border-l-2 border-gray-100 dark:border-gray-700 mt-1 mb-2 animate-fade-in">
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
                                    id={`sidebar-item-schedule-${schedule.id}`}
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
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
