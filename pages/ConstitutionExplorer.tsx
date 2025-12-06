
import React, { useState, useCallback, useMemo, useEffect, useDeferredValue } from 'react';
import Sidebar from '../components/Sidebar';
import ContentDisplay from '../components/ContentDisplay';
import Breadcrumbs from '../components/Breadcrumbs';
import type { SelectedItem, ConstitutionData } from '../types/index';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { useLazyData } from '../hooks/useLazyData';

const ConstitutionExplorer: React.FC<{ language: 'en' | 'sw', searchTerm: string }> = ({ language, searchTerm }) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({ type: 'preamble', id: 'preamble' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Use deferred value to prevent blocking UI when filtering large content
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Use useLazyData to load constitution data based on language
  const { data: currentData, isLoading: isDataLoading, error: dataError, refetch: refetchData } = useLazyData<ConstitutionData>(
      `constitution-data-${language}`,
      () => language === 'en' 
          ? import('../data/constitution').then(m => m.constitutionData)
          : import('../data/swahili/constitution').then(m => m.swahiliConstitutionData),
      [language] // Dependency to reload when language changes
  );

  // Use useLazyData to load summaries based on language
  const { data: currentSummaries, isLoading: isSummariesLoading, error: summariesError, refetch: refetchSummaries } = useLazyData<{[key: string]: string}>(
      `constitution-summaries-${language}`,
      () => language === 'en'
          ? import('../data/summaries').then(m => m.articleSummaries)
          : import('../data/swahili/summaries').then(m => m.articleSummaries),
      [language]
  );

  const articleToChapterMap = useMemo(() => {
    if (!currentData) return new Map<string, number>();
    const map = new Map<string, number>();
    currentData.chapters.forEach(chapter => {
      chapter.parts.forEach(part => {
        part.articles.forEach(article => {
          map.set(article.number, chapter.id);
        });
      });
    });
    return map;
  }, [currentData]);


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
  
    if(articleToChapterMap.size > 0) {
        handleHashChange(); // Handle initial load only when map is ready
    }
  
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [articleToChapterMap, handleSelectItem, selectedItem]);

  const handleRetry = () => {
      refetchData();
      refetchSummaries();
  };

  if (isDataLoading || isSummariesLoading) {
    return <LoadingSpinner />;
  }

  if (dataError || summariesError || !currentData || !currentSummaries) {
    return (
        <ErrorDisplay 
            message={language === 'sw' ? 'Imeshindwa kupakia data. Tafadhali angalia muunganisho wako.' : 'Failed to load content. Please check your connection.'}
            onRetry={handleRetry}
        />
    );
  }

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
                    searchTerm={deferredSearchTerm} 
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
