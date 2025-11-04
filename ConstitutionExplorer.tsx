import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentDisplay from './components/ContentDisplay';
import SearchBar from './components/SearchBar';
import { constitutionData } from './data/constitution';
import { swahiliConstitutionData } from './data/swahili/constitution';
import { articleSummaries as englishSummaries } from './data/summaries';
import { articleSummaries as swahiliSummaries } from './data/swahili/summaries';
import type { SelectedItem } from './types';

const ConstitutionExplorer: React.FC<{ language: 'en' | 'sw' }> = ({ language }) => {
  const [history, setHistory] = useState<SelectedItem[]>([{ type: 'preamble', id: 'preamble' }]);
  const selectedItem = history[history.length - 1];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentData = language === 'en' ? constitutionData : swahiliConstitutionData;
  const currentSummaries = language === 'en' ? englishSummaries : swahiliSummaries;

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
        setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
  }, []);

  useEffect(() => {
    scrollIntoView(selectedItem);
  }, [selectedItem, scrollIntoView]);

  const handleSelectItem = useCallback((item: SelectedItem) => {
    setHistory(prevHistory => {
        const currentItem = prevHistory[prevHistory.length - 1];
        if (JSON.stringify(currentItem) === JSON.stringify(item)) {
            scrollIntoView(item);
            return prevHistory;
        }
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
        <main className="flex-1 flex flex-col overflow-hidden transition-all duration-300 bg-background dark:bg-dark-background">
          <div className="flex-1 overflow-y-auto">
            <div className="sticky top-0 z-10 bg-background/80 dark:bg-dark-background/80 backdrop-blur-sm border-b border-border dark:border-dark-border">
              <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
                  <div className="flex items-center justify-between mb-4 gap-4">
                      <div className="flex items-center gap-2">
                          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                              </svg>
                          </button>
                          <button
                            onClick={handleBack}
                            disabled={history.length <= 1}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Go back in constitution"
                            title="Go back in constitution"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                          </button>
                      </div>
                  </div>
                <SearchBar onSearch={handleSearch} language={language} />
              </div>
            </div>
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
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