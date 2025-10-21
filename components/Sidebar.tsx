import React, { useState } from 'react';
import type { ConstitutionData, SelectedItem } from '../types';
import { ChevronDownIcon, BookOpenIcon, FileTextIcon } from './icons';

interface SidebarProps {
  data: ConstitutionData;
  onSelectItem: (item: SelectedItem) => void;
  selectedItem: SelectedItem;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  language: 'en' | 'sw';
}

interface NavItemProps {
  onClick: () => void;
  isSelected: boolean;
  children: React.ReactNode;
  level?: number;
}

const NavItem: React.FC<NavItemProps> = ({ onClick, isSelected, children, level = 0 }) => {
  const baseClasses = "w-full text-left py-2 text-sm rounded-r-lg transition-colors duration-150 flex items-center";
  const selectedClasses = "bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-300 font-semibold border-l-4 border-green-600 dark:border-green-500";
  const unselectedClasses = "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100";
  const paddingLeft = {
    0: 'pl-4',
    1: 'pl-8',
    2: 'pl-12'
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses + ' pl-3' : unselectedClasses + ' ' + (paddingLeft[level as keyof typeof paddingLeft] || 'pl-4')}`}
    >
      {children}
    </button>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ data, onSelectItem, selectedItem, isOpen, setIsOpen, language }) => {
  const [openChapters, setOpenChapters] = useState<Set<number>>(new Set());

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
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-gray-700 rounded-lg">
                    <BookOpenIcon className="h-6 w-6 text-green-700 dark:text-green-400" />
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">{t.constitution}</h1>
            </div>
             <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            <NavItem
                onClick={() => onSelectItem({ type: 'preamble', id: 'preamble' })}
                isSelected={selectedItem.type === 'preamble'}
            >
                <FileTextIcon className="h-4 w-4 mr-3" /> {t.preamble}
            </NavItem>

            <h2 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t.chapters}</h2>
            {data.chapters.map(chapter => {
                const isChapterSelected = selectedItem.type === 'chapter' && selectedItem.id === chapter.id && !selectedItem.article;
                const isChapterGroupActive = selectedItem.type === 'chapter' && selectedItem.id === chapter.id;
                const chapterTitle = language === 'sw' ? `Sura ${chapter.id}: ${chapter.title}` : `Chapter ${chapter.id}: ${chapter.title}`;

                return (
                <div key={chapter.id}>
                    <div 
                        className={`w-full flex justify-between items-center pr-2 rounded-r-lg group ${isChapterSelected ? 'bg-green-50 dark:bg-green-900/50' : ''} ${!isChapterSelected && isChapterGroupActive ? 'bg-gray-50 dark:bg-gray-700/30' : ''}`}
                    >
                        <NavItem
                            onClick={() => onSelectItem({ type: 'chapter', id: chapter.id })}
                            isSelected={isChapterSelected}
                        >
                            <span className="truncate">{chapterTitle}</span>
                        </NavItem>
                        <ChevronDownIcon
                            onClick={() => toggleChapter(chapter.id)}
                            className={`h-5 w-5 mr-2 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 cursor-pointer group-hover:text-gray-800 dark:group-hover:text-gray-200 ${openChapters.has(chapter.id) ? 'rotate-180' : ''}`}
                        />
                    </div>
                    {openChapters.has(chapter.id) && (
                        <div className="py-1 space-y-1 border-l-2 border-gray-100 dark:border-gray-700 ml-4">
                            {chapter.parts.flatMap(part => part.articles).map(article => {
                                const isArticleSelected = selectedItem.type === 'chapter' && selectedItem.id === chapter.id && selectedItem.article === article.number;
                                const baseArticleClasses = "w-full text-left px-2 py-1.5 text-sm rounded-r-lg flex items-center ml-4 truncate transition-colors";
                                const selectedArticleClasses = "bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-300 font-semibold border-l-4 border-green-600 dark:border-green-500 pl-3";
                                const unselectedArticleClasses = "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 pl-4";
                                return (
                                <a href={`#article-${article.number}`} 
                                    key={article.number}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onSelectItem({ type: 'chapter', id: chapter.id, article: article.number });
                                    }}
                                    className={`${baseArticleClasses} ${isArticleSelected ? selectedArticleClasses : unselectedArticleClasses}`}
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
                <NavItem
                    key={schedule.id}
                    onClick={() => onSelectItem({ type: 'schedule', id: schedule.id })}
                    isSelected={selectedItem.type === 'schedule' && selectedItem.id === schedule.id}
                >
                    <FileTextIcon className="h-4 w-4 mr-3" />
                    {schedule.title}
                </NavItem>
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