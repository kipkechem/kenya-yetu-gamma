import React from 'react';
import PreambleContent from '../content/PreambleContent';
import ChapterContent from '../content/ChapterContent';
import ScheduleContent from '../content/ScheduleContent';
import { constitutionData } from '../data/constitution';
import type { Chapter, Schedule, SelectedItem } from '../types';

interface ContentDisplayProps {
  searchTerm: string;
  onSelectItem: (item: SelectedItem) => void;
  articleToChapterMap: Map<string, number>;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ searchTerm, onSelectItem, articleToChapterMap }) => {
  if (searchTerm.trim() === '') {
    return (
      <div className="space-y-12">
        <PreambleContent searchTerm={searchTerm} onSelectItem={onSelectItem} articleToChapterMap={articleToChapterMap} />
        
        {constitutionData.chapters.map((chapter: Chapter) => (
          <ChapterContent 
            key={`chapter-${chapter.id}`}
            chapter={chapter}
            searchTerm={searchTerm} 
            onSelectItem={onSelectItem}
            articleToChapterMap={articleToChapterMap} 
          />
        ))}

        {constitutionData.schedules.map((schedule: Schedule) => (
          <ScheduleContent 
            key={`schedule-${schedule.id}`}
            schedule={schedule}
            searchTerm={searchTerm} 
            onSelectItem={onSelectItem}
            articleToChapterMap={articleToChapterMap}
          />
        ))}
      </div>
    );
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const filteredChapters = constitutionData.chapters.map(chapter => {
    const partsWithMatches = chapter.parts.map(part => {
      const articlesWithMatches = part.articles.filter(article => 
        article.title.toLowerCase().includes(lowerCaseSearchTerm) || 
        article.content.toLowerCase().includes(lowerCaseSearchTerm)
      );
      return { ...part, articles: articlesWithMatches };
    }).filter(part => part.articles.length > 0);

    // Also check if chapter title matches
    const chapterTitleMatches = chapter.title.toLowerCase().includes(lowerCaseSearchTerm);
    if (chapterTitleMatches) {
        // If title matches, include all parts and articles, and let Highlight do its job.
        return chapter;
    }

    return { ...chapter, parts: partsWithMatches };
  }).filter(chapter => chapter.parts.length > 0 || chapter.title.toLowerCase().includes(lowerCaseSearchTerm));

  const preambleMatches = constitutionData.preamble.title.toLowerCase().includes(lowerCaseSearchTerm) || 
                        constitutionData.preamble.content.toLowerCase().includes(lowerCaseSearchTerm);

  const filteredSchedules = constitutionData.schedules.filter(schedule => 
    schedule.title.toLowerCase().includes(lowerCaseSearchTerm) || 
    schedule.content.toLowerCase().includes(lowerCaseSearchTerm)
  );

  const hasResults = preambleMatches || filteredChapters.length > 0 || filteredSchedules.length > 0;

  return (
    <div className="space-y-12">
      {!hasResults && (
        <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">No results found</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Your search for "{searchTerm}" did not match any content.</p>
        </div>
      )}
      {preambleMatches && <PreambleContent searchTerm={searchTerm} onSelectItem={onSelectItem} articleToChapterMap={articleToChapterMap} />}
      
      {filteredChapters.map((chapter: Chapter) => (
        <ChapterContent 
          key={`chapter-filtered-${chapter.id}`}
          chapter={chapter}
          searchTerm={searchTerm} 
          onSelectItem={onSelectItem}
          articleToChapterMap={articleToChapterMap} 
        />
      ))}

      {filteredSchedules.map((schedule: Schedule) => (
        <ScheduleContent 
          key={`schedule-filtered-${schedule.id}`}
          schedule={schedule}
          searchTerm={searchTerm} 
          onSelectItem={onSelectItem}
          articleToChapterMap={articleToChapterMap}
        />
      ))}
    </div>
  );
};

export default ContentDisplay;
