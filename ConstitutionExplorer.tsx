import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentDisplay from './components/ContentDisplay';
import SearchBar from './components/SearchBar';
import { constitutionData } from './data/constitution';
import { swahiliConstitutionData } from './data/swahili/constitution';
import { articleSummaries as englishSummaries } from './data/summaries';
import { articleSummaries as swahiliSummaries } from './data/swahili/summaries';
import type { SelectedItem } from './types';

const ConstitutionExplorer: React.FC = () => {
  const [history, setHistory] = useState<SelectedItem[]>([{ type: 'preamble', id: 'preamble' }]);
  const selectedItem = history[history.length - 1];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<'en' | 'sw'>('en');

  const currentData = language === 'en' ? constitutionData : swahiliConstitutionData;
  const currentSummaries = language === 'en' ? englishSummaries : swahiliSummaries;

  // Consolidated and robust scrolling logic
  const scrollIntoView = useCallback((item: SelectedItem | undefined) => {
    if (!item) return;

    let elementId = '';
    if (item.type === 'preamble') {
        elementId = 'preamble';
    } else if (item.type === 'chapter') {
        elementId = item.article ? `article-${item.article}` : `chapter-${item.id}`;
    } else if (item.type === 'schedule') {
        elementId = `schedule-${item.id}`;
    }

    if (elementId) {
        // The content might not have rendered yet when this is called.
        // We use a small timeout to ensure the element is available in the DOM.
        setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
  }, []);

  useEffect(() => {
    // This effect handles scrolling whenever the selectedItem changes.
    scrollIntoView(selectedItem);
  }, [selectedItem, scrollIntoView]);

  const handleSelectItem = useCallback((item: SelectedItem) => {
    setHistory(prevHistory => {
        const currentItem = prevHistory[prevHistory.length - 1];
        if (JSON.stringify(currentItem) === JSON.stringify(item)) {
            // If the item is already selected, just re-trigger the scroll effect.
            // The useEffect won't run since state doesn't change, so we call it manually.
            scrollIntoView(item);
            return prevHistory;
        }
        // For a new item, update history, which will trigger the useEffect to scroll.
        return [...prevHistory, item];
    });

    if(window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  }, [setIsSidebarOpen, scrollIntoView]);
  
  const handleBack = useCallback(() => {
    setHistory(prevHistory => {
        if (prevHistory.length > 1) {
            return prevHistory.slice(0, -1);
        }
        return prevHistory;
    });
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  const articleToChapterMap = useMemo(() => {
    const map = new Map<string, number>();
    constitutionData.chapters.forEach(chapter => {
      chapter.parts.forEach(part => {
        part.articles.forEach(article => {
          map.set(article.number, chapter.id);
        });
      });
    });
    return map;
  }, []);

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
        <main className="flex-1 flex flex-col overflow-hidden transition-all duration-300 bg-gray-100 dark:bg-gray-900">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 md:p-4 flex items-center justify-between gap-2 shadow-sm z-10 print:hidden shrink-0">
            <div className="flex items-center">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
              </button>
              <button
                onClick={handleBack}
                disabled={history.length <= 1}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                aria-label="Go back"
                title="Go back"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </div>
            <div className="flex items-center p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
                <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${language === 'en' ? 'bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 shadow-sm' : 'text-gray-600 dark:text-gray-300'}`}>
                    English
                </button>
                <button onClick={() => setLanguage('sw')} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${language === 'sw' ? 'bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 shadow-sm' : 'text-gray-600 dark:text-gray-300'}`}>
                    Kiswahili
                </button>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto">
            <div className="sticky top-0 z-10 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
              <div className="max-w-4xl mx-auto px-6 md:px-10 py-4">
                <SearchBar onSearch={handleSearch} language={language} />
              </div>
            </div>
            <div className="max-w-4xl mx-auto px-6 md:px-10 py-8">
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
        </main>
      </div>
  );
};

export default ConstitutionExplorer;