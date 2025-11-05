import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentDisplay from './components/ContentDisplay';
import { constitutionData } from './data/constitution';
import { swahiliConstitutionData } from './data/swahili/constitution';
import { articleSummaries as englishSummaries } from './data/summaries';
import { articleSummaries as swahiliSummaries } from './data/swahili/summaries';
import type { SelectedItem } from './types';

const ConstitutionExplorer: React.FC<{ language: 'en' | 'sw', searchTerm: string }> = ({ language, searchTerm }) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({ type: 'preamble', id: 'preamble' });
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
    if (JSON.stringify(selectedItem) === JSON.stringify(item)) {
        scrollIntoView(item);
        return;
    }
    setSelectedItem(item);

    if(window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  }, [selectedItem, setIsSidebarOpen, scrollIntoView]);
  
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
        <div className="flex-1 overflow-y-auto bg-background dark:bg-dark-background">
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
      </div>
  );
};

export default ConstitutionExplorer;