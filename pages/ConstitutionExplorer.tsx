
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import type { SelectedItem, Chapter, Schedule, ConstitutionData } from '../types/index';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { useLazyData } from '../hooks/useLazyData';
import PreambleContent from '../components/PreambleContent';
import ChapterContent from '../components/ChapterContent';
import ScheduleContent from '../components/ScheduleContent';

const ConstitutionExplorer: React.FC<{ language: 'en' | 'sw', searchTerm: string }> = ({ language, searchTerm }) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({ type: 'preamble', id: 'preamble' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  // Load the full constitution data. This ensures all chapters are available via static imports defined in data/constitution.ts
  const { data: constitutionData, isLoading, error, refetch } = useLazyData<ConstitutionData>(
      `constitution-full-${language}`,
      () => language === 'en' 
        ? import('../data/constitution').then(m => m.constitutionData)
        : import('../data/swahili/constitution').then(m => m.swahiliConstitutionData),
      [language]
  );

  const { data: summaries } = useLazyData<Record<string, string>>(
      `summaries-${language}`,
      () => language === 'en' 
          ? import('../data/summaries').then(m => m.articleSummaries)
          : import('../data/swahili/summaries').then(m => m.articleSummaries),
      [language]
  );

  // Map article numbers to chapter IDs for quick lookup (e.g. for search or deep links)
  const articleToChapterMap = useMemo(() => {
    if (!constitutionData) return new Map<string, number>();
    const map = new Map<string, number>();
    constitutionData.chapters.forEach(chapter => {
      chapter.parts.forEach(part => {
        part.articles.forEach(article => {
          map.set(article.number, chapter.id);
        });
      });
    });
    return map;
  }, [constitutionData]);

  // Derive the content to display based on selectedItem from the loaded constitutionData
  const activeContent = useMemo(() => {
      if (!constitutionData) return null;
      
      if (selectedItem.type === 'preamble') {
          return constitutionData.preamble;
      } else if (selectedItem.type === 'chapter') {
          // Ensure ID is treated as a number for chapters
          const chapterId = typeof selectedItem.id === 'string' ? parseInt(selectedItem.id, 10) : selectedItem.id;
          return constitutionData.chapters.find(c => c.id === chapterId);
      } else if (selectedItem.type === 'schedule') {
          return constitutionData.schedules.find(s => s.id === selectedItem.id);
      }
      return null;
  }, [constitutionData, selectedItem]);

  const handleSelectItem = useCallback((item: SelectedItem) => {
    setSelectedItem(item);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
    
    let hash = `#${item.type === 'preamble' ? 'preamble' : (item.type === 'chapter' ? 'chapter-' + item.id : 'schedule-' + item.id)}`;
    if (item.article) hash = `#article-${item.article}`;
    if (window.location.hash !== hash) history.pushState(null, '', hash);
  }, []);

  // Handle browser navigation and initial load based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
        const hash = window.location.hash.substring(1);
        if (!hash || hash === 'preamble') {
            setSelectedItem({ type: 'preamble', id: 'preamble' });
            return;
        }
        
        if (hash.startsWith('article-')) {
            const articleNum = hash.replace('article-', '');
            // We depend on articleToChapterMap being ready. If data is loading, this might run again when map updates.
            const chapterId = articleToChapterMap.get(articleNum);
            if (chapterId) {
                setSelectedItem({ type: 'chapter', id: chapterId, article: articleNum });
            }
        } else if (hash.startsWith('chapter-')) {
            if (hash.includes('-part-')) {
                 const parts = hash.split('-part-');
                 const chapterId = parseInt(parts[0].replace('chapter-', ''), 10);
                 const partNum = parseInt(parts[1], 10);
                 if (!isNaN(chapterId)) setSelectedItem({ type: 'chapter', id: chapterId, part: partNum });
            } else {
                const id = parseInt(hash.replace('chapter-', ''), 10);
                if (!isNaN(id)) setSelectedItem({ type: 'chapter', id });
            }
        } else if (hash.startsWith('schedule-')) {
            setSelectedItem({ type: 'schedule', id: hash.replace('schedule-', '') });
        }
    };
    
    // Trigger on mount if map is ready (for deep links)
    if (articleToChapterMap.size > 0) {
        handleHashChange();
    }
    
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, [articleToChapterMap]);

  const renderContent = () => {
      if (isLoading) return <LoadingSpinner />;
      if (error) return <ErrorDisplay message="Failed to load constitution content." onRetry={refetch} />;
      if (!activeContent) return <div className="p-8 text-center text-gray-500">Select a section to view content.</div>;

      if (selectedItem.type === 'preamble') {
          return <PreambleContent preamble={activeContent as any} searchTerm={searchTerm} onSelectItem={handleSelectItem} articleToChapterMap={articleToChapterMap} language={language} summaries={summaries || {}} />;
      } else if (selectedItem.type === 'chapter') {
          return <ChapterContent chapter={activeContent as Chapter} searchTerm={searchTerm} onSelectItem={handleSelectItem} articleToChapterMap={articleToChapterMap} language={language} summaries={summaries || {}} />;
      } else if (selectedItem.type === 'schedule') {
          return <ScheduleContent schedule={activeContent as Schedule} searchTerm={searchTerm} onSelectItem={handleSelectItem} articleToChapterMap={articleToChapterMap} language={language} summaries={summaries || {}} />;
      }
      return null;
  };

  return (
    <div className="flex h-full w-full overflow-hidden relative">
        <Sidebar 
          onSelectItem={handleSelectItem} 
          selectedItem={selectedItem} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
          isCollapsed={isDesktopCollapsed} 
          setIsCollapsed={setIsDesktopCollapsed} 
          language={language} 
        />
        <div className="flex-1 overflow-y-auto bg-background dark:bg-dark-background scroll-smooth">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
                <div className="md:hidden mb-4">
                    <button 
                        onClick={() => setIsSidebarOpen(true)} 
                        className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-md active:scale-95 transition-transform"
                    >
                        Table of Contents
                    </button>
                </div>
                <Breadcrumbs 
                    selectedItem={selectedItem} 
                    data={constitutionData || { preamble: { title: '', content: '' }, chapters: [], schedules: [] }} 
                    language={language} 
                    onSelectItem={handleSelectItem} 
                />
                <div className="animate-fade-in key-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ConstitutionExplorer;
