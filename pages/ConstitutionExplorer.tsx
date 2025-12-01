
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ContentDisplay from '../components/ContentDisplay';
import Breadcrumbs from '../components/Breadcrumbs';
import type { SelectedItem, ConstitutionData } from '../types/index';

const ConstitutionExplorer: React.FC<{ language: 'en' | 'sw', searchTerm: string }> = ({ language, searchTerm }) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({ type: 'preamble', id: 'preamble' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentData, setCurrentData] = useState<ConstitutionData | null>(null);
  const [currentSummaries, setCurrentSummaries] = useState<{[key: string]: string} | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try {
          const summariesModule = language === 'en' ? await import('../data/summaries') : await import('../data/swahili/summaries');
          setCurrentSummaries(summariesModule.articleSummaries);

          if (language === 'en') {
              const dataModule = await import('../data/constitution');
              setCurrentData(dataModule.constitutionData);
          } else {
              const dataModule = await import('../data/swahili/constitution');
              setCurrentData(dataModule.swahiliConstitutionData);
          }
      } catch (error) {
          console.error("Failed to load constitution data:", error);
          setError(language === 'sw' ? 'Imeshindwa kupakia data. Tafadhali angalia muunganisho wako.' : 'Failed to load content. Please check your connection.');
      } finally {
          setIsLoading(false);
      }
  }, [language]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-dark-primary"></div>
        </div>
    );
  }

  if (error || !currentData || !currentSummaries) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl text-center max-w-md">
                <svg className="mx-auto h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-lg font-medium text-red-800 dark:text-red-200 mb-6">{error || "Unable to load content."}</p>
                <button 
                    onClick={loadData}
                    className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    {language === 'sw' ? 'Jaribu Tena' : 'Retry'}
                </button>
            </div>
        </div>
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
