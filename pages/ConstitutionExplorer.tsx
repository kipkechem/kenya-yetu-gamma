
import React, { useState, useCallback, useMemo, useEffect, useDeferredValue } from 'react';
import Sidebar from '../components/Sidebar';
import ContentDisplay from '../components/ContentDisplay';
import Breadcrumbs from '../components/Breadcrumbs';
import type { SelectedItem, ConstitutionData } from '../types/index';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { useLazyData } from '../hooks/useLazyData';
import { ChevronDoubleLeftIcon, BookOpenIcon } from '../components/icons';

const ConstitutionExplorer: React.FC<{ language: 'en' | 'sw', searchTerm: string }> = ({ language, searchTerm }) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({ type: 'preamble', id: 'preamble' });
  
  // Navigation History Stack
  const [historyStack, setHistoryStack] = useState<SelectedItem[]>([]);

  // Sidebar states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile overlay state
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(true); // Desktop collapsed state (floating pane closed by default)
  
  // Use deferred value to prevent blocking UI when filtering large content
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Use useLazyData to load constitution data based on language
  const { data: currentData, isLoading: isDataLoading, error: dataError, refetch: refetchData } = useLazyData<ConstitutionData>(
      `constitution-data-${language}`,
      () => language === 'en' 
          ? import('../data/constitution').then(m => m.constitutionData)
          : import('../data/swahili/constitution').then(m => m.swahiliConstitutionData),
      [language],
      { skipCache: true } 
  );

  // Use useLazyData to load summaries based on language
  const { data: currentSummaries, isLoading: isSummariesLoading, error: summariesError, refetch: refetchSummaries } = useLazyData<{[key: string]: string}>(
      `constitution-summaries-${language}`,
      () => language === 'en'
          ? import('../data/summaries').then(m => m.articleSummaries)
          : import('../data/swahili/summaries').then(m => m.articleSummaries),
      [language],
      { skipCache: true }
  );

  // Calculate the map internally once data is loaded.
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

    // Small timeout to allow DOM to render
    setTimeout(() => {
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
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                element.classList.add('animate-highlight');
                setTimeout(() => element.classList.remove('animate-highlight'), 2000);
            }
        }
    }, 200);
  }, []);

  const handleSelectItem = useCallback((item: SelectedItem, shouldUpdateHistory = true) => {
    // Avoid duplicates in history or navigation loops
    setSelectedItem(prevItem => {
        if (JSON.stringify(prevItem) === JSON.stringify(item)) {
            scrollIntoView(item);
            return prevItem;
        }
        
        if (shouldUpdateHistory) {
            setHistoryStack(prevStack => [...prevStack, prevItem]);
            
            // Update URL hash
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
        return item;
    });

    if(window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  }, [scrollIntoView]);

  const handleBack = () => {
      if (historyStack.length > 0) {
          const previousItem = historyStack[historyStack.length - 1];
          setHistoryStack(prev => prev.slice(0, -1)); // Remove last item
          setSelectedItem(previousItem);
          scrollIntoView(previousItem);
      }
  };

  // Trigger scroll when item changes state
  useEffect(() => {
    if (currentData) {
        scrollIntoView(selectedItem);
    }
  }, [selectedItem, currentData, scrollIntoView]);

  // Initial Hash Handling
  useEffect(() => {
    if (!currentData || articleToChapterMap.size === 0) return;

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (!hash) {
        if (selectedItem.id !== 'preamble') {
            handleSelectItem({ type: 'preamble', id: 'preamble' }, false);
        }
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
  
      if (newItem) {
          // Just select it, don't push to history stack on hash change (browser handles history)
          setSelectedItem(newItem);
          scrollIntoView(newItem);
      }
    };
  
    handleHashChange();
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [currentData, articleToChapterMap, handleSelectItem, scrollIntoView]); 

  const handleRetry = () => {
      refetchData();
      refetchSummaries();
  };

  if (isDataLoading || isSummariesLoading || !currentData || !currentSummaries) {
    return <LoadingSpinner />;
  }

  if (dataError || summariesError) {
    return (
        <ErrorDisplay 
            message={language === 'sw' ? 'Imeshindwa kupakia data. Tafadhali angalia muunganisho wako.' : 'Failed to load content. Please check your connection.'}
            onRetry={handleRetry}
        />
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden relative">
        <Sidebar 
          data={currentData} 
          onSelectItem={handleSelectItem} 
          selectedItem={selectedItem}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          isCollapsed={isDesktopCollapsed}
          setIsCollapsed={setIsDesktopCollapsed}
          language={language}
        />
        <div className="flex-1 overflow-y-auto bg-background dark:bg-dark-background scroll-smooth w-full relative">
             <style>{`
                @keyframes highlight-fade {
                    0% { background-color: rgba(34, 197, 94, 0.2); }
                    100% { background-color: transparent; }
                }
                .animate-highlight {
                    animation: highlight-fade 2s ease-out;
                }
            `}</style>
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 pb-24">
              
              {/* Mobile Sidebar Trigger & Back Button (Inline) */}
              <div className="flex items-center gap-2 mb-4">
                  {/* Sidebar Toggle for Mobile - kept for context at top */}
                  <button 
                      onClick={() => setIsSidebarOpen(true)}
                      className="md:hidden inline-flex items-center px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
                  >
                      <BookOpenIcon className="h-4 w-4 mr-2 text-primary" />
                      Contents
                  </button>

                  {/* History Back Button */}
                  {historyStack.length > 0 && (
                      <button 
                          onClick={handleBack}
                          className="inline-flex items-center text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-dark-primary transition-colors ml-auto md:ml-0"
                      >
                          <ChevronDoubleLeftIcon className="h-4 w-4 mr-1" />
                          Back
                      </button>
                  )}
              </div>

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

            {/* Mobile Floating Action Button (FAB) for Table of Contents */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden fixed bottom-6 right-6 z-30 p-4 bg-primary text-white rounded-full shadow-xl hover:bg-primary-dark transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:ring-offset-gray-900"
                aria-label="Open Table of Contents"
                title="Table of Contents"
            >
                <BookOpenIcon className="h-6 w-6" />
            </button>
        </div>
      </div>
  );
};

export default ConstitutionExplorer;
