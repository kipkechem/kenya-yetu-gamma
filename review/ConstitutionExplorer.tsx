
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentDisplay from './components/ContentDisplay';
import Breadcrumbs from './components/Breadcrumbs';
import { constitutionData as englishData } from './data/constitution';
import { swahiliConstitutionData as swahiliData } from './data/swahili/constitution';
import { articleSummaries as englishSummaries } from './data/summaries';
import { articleSummaries as swahiliSummaries } from './data/swahili/summaries';
import type { SelectedItem, ConstitutionData } from './types';
import { getCachedData, setCachedData } from './utils/cache';

const loadConstitutionData = (language: 'en' | 'sw'): ConstitutionData => {
    const cacheKey = `constitution-data-${language}`;
    let data = getCachedData<ConstitutionData>(cacheKey);
    if (data) {
        return data;
    }

    data = language === 'en' ? englishData : swahiliData;
    setCachedData(cacheKey, data);
    return data;
};


const ConstitutionExplorer: React.FC<{ language: 'en' | 'sw', searchTerm: string, articleToChapterMap: Map<string, number> }> = ({ language, searchTerm, articleToChapterMap }) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({ type: 'preamble', id: 'preamble' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentData = useMemo(() => loadConstitutionData(language), [language]);
  const currentSummaries = language === 'en' ? englishSummaries : swahiliSummaries;

  const scrollIntoView = useCallback((item: SelectedItem | undefined) => {
    if (!item) return;

    let elementId = '';
    if (item.type === 'preamble') {
        elementId = 'preamble';
    } else if (item.type === 'chapter') {
        if (item.article) {
            elementId = `article-${item.article}`;
        } else if (item.part) {
            elementId = `chapter-${item.id}-part-${item.part}`;
        } else {
            elementId = `chapter-${item.id}`;
        }
    } else if (item.type === 'schedule') {
        elementId = `schedule-${item.id}`;
    }

    if (elementId) {
        setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Add a temporary highlight effect
                element.classList.add('animate-highlight');
                setTimeout(() => element.classList.remove('animate-highlight'), 2000);
            }
        }, 100);
    }
  }, []);

  const handleSelectItem = useCallback((item: SelectedItem, shouldUpdateHistory = true) => {
    if (JSON.stringify(selectedItem) === JSON.stringify(item)) {
        scrollIntoView(item);
        return;
    }
    setSelectedItem(item);
    
    if (shouldUpdateHistory) {
      let hash = '';
      if (item.type === 'preamble') {
        hash = '#preamble';
      } else if (item.type === 'schedule') {
        hash = `#schedule-${item.id}`;
      } else if (item.type === 'chapter') {
        if (item.article) {
            hash = `#article-${item.article}`;
        } else if (item.part) {
            hash = `#chapter-${item.id}-part-${item.part}`;
        } else {
            hash = `#chapter-${item.id}`;
        }
      }
      if (window.location.hash !== hash) {
        history.pushState(null, '', hash);
      }
    }


    if(window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  }, [selectedItem, setIsSidebarOpen, scrollIntoView]);

  useEffect(() => {
    scrollIntoView(selectedItem);
  }, [selectedItem, scrollIntoView]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (!hash) {
        handleSelectItem({ type: 'preamble', id: 'preamble' }, false);
        return;
      }
  
      let newItem: SelectedItem | undefined;
      if (hash.startsWith('article-')) {
        const articleNum = hash.substring('article-'.length);
        const chapterId = articleToChapterMap.get(articleNum);
        if (chapterId) {
          newItem = { type: 'chapter', id: chapterId, article: articleNum };
        }
      } else if (hash.startsWith('chapter-') && hash.includes('-part-')) {
        const parts = hash.split('-part-');
        const chapterId = parseInt(parts[0].substring('chapter-'.length), 10);
        const partNum = parseInt(parts[1], 10);
        if (!isNaN(chapterId) && !isNaN(partNum)) {
            newItem = { type: 'chapter', id: chapterId, part: partNum };
        }
      } else if (hash.startsWith('chapter-')) {
        const chapterId = parseInt(hash.substring('chapter-'.length), 10);
        if (!isNaN(chapterId)) {
          newItem = { type: 'chapter', id: chapterId };
        }
      } else if (hash.startsWith('schedule-')) {
        const scheduleId = hash.substring('schedule-'.length);
        newItem = { type: 'schedule', id: scheduleId };
      } else if (hash === 'preamble') {
        newItem = { type: 'preamble', id: 'preamble' };
      }
  
      if (newItem && JSON.stringify(newItem) !== JSON.stringify(selectedItem)) {
        handleSelectItem(newItem, false);
      }
    };
  
    handleHashChange(); // Handle initial load
  
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [articleToChapterMap, handleSelectItem]);


  return (
    <div className="flex h-full w-full overflow-hidden">
        <Sidebar 
          data={currentData} 
          onSelectItem={handleSelectItem} 
          selectedItem={selectedItem}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          language={language}
        />
        <div className="flex-1 overflow-y-auto bg-background dark:bg-dark-background">
             <style>{`
                @keyframes highlight-fade {
                    0% { background-color: rgba(34, 197, 94, 0.2); }
                    100% { background-color: transparent; }
                }
                .animate-highlight {
                    animation: highlight-fade 2s ease-out;
                }
            `}</style>
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
              <Breadcrumbs
                selectedItem={selectedItem}
                data={currentData}
                language={language}
                onSelectItem={handleSelectItem}
              />
              <ContentDisplay 
                    searchTerm={searchTerm} 
                    onSelectItem={handleSelectItem}
                    articleToChapterMap={articleToChapterMap}
                    language={language}
                    data={currentData}
                    summaries={currentSummaries}
                />
            </div>
        </div>
      </div>
  );
};

export default ConstitutionExplorer;
