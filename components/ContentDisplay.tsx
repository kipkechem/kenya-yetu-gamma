
import React, { useMemo, useState } from 'react';
import PreambleContent from '../content/PreambleContent';
import ChapterContent from '../content/ChapterContent';
import ScheduleContent from '../content/ScheduleContent';
import type { Chapter, Schedule, SelectedItem, ConstitutionData } from '../types/index';

interface ContentDisplayProps {
  searchTerm: string;
  onSelectItem: (item: SelectedItem) => void;
  articleToChapterMap: Map<string, number>;
  language: 'en' | 'sw';
  data: ConstitutionData;
  summaries: { [key: string]: string };
}

type RenderItem = 
  | { type: 'preamble', data: { title: string; content: string } }
  | { type: 'chapter', data: Chapter }
  | { type: 'schedule', data: Schedule };

const ITEMS_LIMIT = 5; // Initial number of heavy items to render in search mode

const ContentDisplay: React.FC<ContentDisplayProps> = ({ searchTerm, onSelectItem, articleToChapterMap, language, data, summaries }) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_LIMIT);

  // Reset limit when search term changes
  React.useEffect(() => {
    setVisibleCount(ITEMS_LIMIT);
  }, [searchTerm]);

  const noResultsText = language === 'sw' 
    ? { title: 'Hakuna matokeo', message: `Utafutaji wako wa "${searchTerm}" haujalingana na maudhui yoyote.` }
    : { title: 'No results found', message: `Your search for "${searchTerm}" did not match any content.` };

  const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
  const isSearching = lowerCaseSearchTerm !== '';

  // 1. Calculate Filtered Content (Search Mode)
  const searchResults = useMemo(() => {
      if (!isSearching) return null;

      // Check Preamble
      const preambleMatches = data.preamble.title.toLowerCase().includes(lowerCaseSearchTerm) || 
                              data.preamble.content.toLowerCase().includes(lowerCaseSearchTerm);

      // Filter Chapters
      const matchingChapters: Chapter[] = [];
      
      for (const chapter of data.chapters) {
          // If chapter title matches, include whole chapter
          if (chapter.title.toLowerCase().includes(lowerCaseSearchTerm)) {
              matchingChapters.push(chapter);
              continue;
          }

          // Otherwise check parts/articles
          const partsWithMatches = chapter.parts.map(part => {
              const articlesWithMatches = part.articles.filter(article => 
                  article.number.toLowerCase() === lowerCaseSearchTerm || // Exact match for article number
                  article.title.toLowerCase().includes(lowerCaseSearchTerm) || 
                  article.content.toLowerCase().includes(lowerCaseSearchTerm)
              );
              if (articlesWithMatches.length > 0) {
                  return { ...part, articles: articlesWithMatches };
              }
              return null;
          }).filter(part => part !== null) as typeof chapter.parts;

          if (partsWithMatches.length > 0) {
              matchingChapters.push({ ...chapter, parts: partsWithMatches });
          }
      }

      // Filter Schedules
      const matchingSchedules = data.schedules.filter(schedule => 
          schedule.title.toLowerCase().includes(lowerCaseSearchTerm) || 
          schedule.content.toLowerCase().includes(lowerCaseSearchTerm)
      );

      return {
          preambleMatches,
          chapters: matchingChapters,
          schedules: matchingSchedules,
          hasResults: preambleMatches || matchingChapters.length > 0 || matchingSchedules.length > 0
      };
  }, [data, lowerCaseSearchTerm, isSearching]);

  // 2. Flatten Content into a Single List for Rendering
  const contentList: RenderItem[] = useMemo(() => {
      const items: RenderItem[] = [];

      if (isSearching) {
          if (!searchResults) return [];
          if (searchResults.preambleMatches) items.push({ type: 'preamble', data: data.preamble });
          searchResults.chapters.forEach(c => items.push({ type: 'chapter', data: c }));
          searchResults.schedules.forEach(s => items.push({ type: 'schedule', data: s }));
      } else {
          // Default View: Add everything in order
          items.push({ type: 'preamble', data: data.preamble });
          data.chapters.forEach(c => items.push({ type: 'chapter', data: c }));
          data.schedules.forEach(s => items.push({ type: 'schedule', data: s }));
      }

      return items;
  }, [data, isSearching, searchResults]);

  // 3. Handle No Results State
  if (isSearching && searchResults && !searchResults.hasResults) {
    return (
        <div className="text-center py-12 bg-surface dark:bg-dark-surface rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 animate-fade-in">
          <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
             <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-on-surface dark:text-dark-on-surface">{noResultsText.title}</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">{noResultsText.message}</p>
        </div>
    );
  }

  // 4. Determine visible items based on search mode
  // In non-search mode, we render everything (browser handles vertical scroll relatively well for static text)
  // In search mode, highlighting is expensive, so we paginate.
  const visibleItems = isSearching ? contentList.slice(0, visibleCount) : contentList;

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Search Summary */}
      {isSearching && searchResults && (
         <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl mb-6 border border-primary/10">
            <p className="text-sm font-medium text-primary dark:text-dark-primary text-center">
               Found matches in {searchResults.preambleMatches ? 'Preamble, ' : ''}
               {searchResults.chapters.length} Chapters, {searchResults.schedules.length} Schedules
            </p>
        </div>
      )}

      {/* Content Stream */}
      {visibleItems.map((item) => {
        // Use a stable key based on type and ID (or preamble) to prevent re-mounting issues
        const key = item.type === 'preamble' ? 'preamble' : 
                   item.type === 'chapter' ? `chapter-${item.data.id}` : 
                   `schedule-${item.data.id}`;

        if (item.type === 'preamble') {
            return (
                <PreambleContent 
                    key={key}
                    searchTerm={searchTerm} 
                    onSelectItem={onSelectItem} 
                    articleToChapterMap={articleToChapterMap} 
                    language={language}
                    preamble={item.data}
                    summaries={summaries}
                />
            );
        } else if (item.type === 'chapter') {
            return (
                <ChapterContent 
                    key={key}
                    chapter={item.data as Chapter}
                    searchTerm={searchTerm} 
                    onSelectItem={onSelectItem}
                    articleToChapterMap={articleToChapterMap} 
                    language={language}
                    summaries={summaries}
                />
            );
        } else {
            return (
                <ScheduleContent 
                    key={key}
                    schedule={item.data as Schedule}
                    searchTerm={searchTerm} 
                    onSelectItem={onSelectItem}
                    articleToChapterMap={articleToChapterMap}
                    language={language}
                    summaries={summaries}
                />
            );
        }
      })}

      {isSearching && contentList.length > visibleCount && (
          <div className="flex justify-center pt-8">
              <button
                  onClick={() => setVisibleCount(prev => prev + ITEMS_LIMIT)}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-medium transition-colors shadow-md"
              >
                  Load More Results ({contentList.length - visibleCount} remaining)
              </button>
          </div>
      )}
    </div>
  );
};

export default ContentDisplay;
