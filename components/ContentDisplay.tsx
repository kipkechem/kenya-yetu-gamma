import React from 'react';
import PreambleContent from '../content/PreambleContent';
import ChapterContent from '../content/ChapterContent';
import ScheduleContent from '../content/ScheduleContent';
import type { Chapter, Schedule, SelectedItem, ConstitutionData } from '../types';

interface ContentDisplayProps {
  searchTerm: string;
  onSelectItem: (item: SelectedItem) => void;
  articleToChapterMap: Map<string, number>;
  language: 'en' | 'sw';
  data: ConstitutionData;
  summaries: { [key: string]: string };
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ searchTerm, onSelectItem, articleToChapterMap, language, data, summaries }) => {
  const noResultsText = language === 'sw' 
    ? { title: 'Hakuna matokeo', message: `Utafutaji wako wa "${searchTerm}" haujalingana na maudhui yoyote.` }
    : { title: 'No results found', message: `Your search for "${searchTerm}" did not match any content.` };

  if (searchTerm.trim() === '') {
    return (
      <div className="space-y-12">
        <PreambleContent 
          searchTerm={searchTerm} 
          onSelectItem={onSelectItem} 
          articleToChapterMap={articleToChapterMap} 
          language={language}
          preamble={data.preamble}
          summaries={summaries}
        />
        
        {data.chapters.map((chapter: Chapter) => (
          <ChapterContent 
            key={`chapter-${chapter.id}`}
            chapter={chapter}
            searchTerm={searchTerm} 
            onSelectItem={onSelectItem}
            articleToChapterMap={articleToChapterMap} 
            language={language}
            summaries={summaries}
          />
        ))}

        {data.schedules.map((schedule: Schedule) => (
          <ScheduleContent 
            key={`schedule-${schedule.id}`}
            schedule={schedule}
            searchTerm={searchTerm} 
            onSelectItem={onSelectItem}
            articleToChapterMap={articleToChapterMap}
            language={language}
            summaries={summaries}
          />
        ))}
      </div>
    );
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const filteredChapters = data.chapters.map(chapter => {
    const partsWithMatches = chapter.parts.map(part => {
      const articlesWithMatches = part.articles.filter(article => 
        article.title.toLowerCase().includes(lowerCaseSearchTerm) || 
        article.content.toLowerCase().includes(lowerCaseSearchTerm)
      );
      return { ...part, articles: articlesWithMatches };
    }).filter(part => part.articles.length > 0);

    const chapterTitleMatches = chapter.title.toLowerCase().includes(lowerCaseSearchTerm);
    if (chapterTitleMatches) {
        return chapter;
    }

    return { ...chapter, parts: partsWithMatches };
  }).filter(chapter => chapter.parts.length > 0 || chapter.title.toLowerCase().includes(lowerCaseSearchTerm));

  const preambleMatches = data.preamble.title.toLowerCase().includes(lowerCaseSearchTerm) || 
                        data.preamble.content.toLowerCase().includes(lowerCaseSearchTerm);

  const filteredSchedules = data.schedules.filter(schedule => 
    schedule.title.toLowerCase().includes(lowerCaseSearchTerm) || 
    schedule.content.toLowerCase().includes(lowerCaseSearchTerm)
  );

  const hasResults = preambleMatches || filteredChapters.length > 0 || filteredSchedules.length > 0;

  return (
    <div className="space-y-12">
      {!hasResults && (
        <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{noResultsText.title}</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{noResultsText.message}</p>
        </div>
      )}
      {preambleMatches && 
        <PreambleContent 
            searchTerm={searchTerm} 
            onSelectItem={onSelectItem} 
            articleToChapterMap={articleToChapterMap} 
            language={language}
            preamble={data.preamble}
            summaries={summaries}
        />
      }
      
      {filteredChapters.map((chapter: Chapter) => (
        <ChapterContent 
          key={`chapter-filtered-${chapter.id}`}
          chapter={chapter}
          searchTerm={searchTerm} 
          onSelectItem={onSelectItem}
          articleToChapterMap={articleToChapterMap} 
          language={language}
          summaries={summaries}
        />
      ))}

      {filteredSchedules.map((schedule: Schedule) => (
        <ScheduleContent 
          key={`schedule-filtered-${schedule.id}`}
          schedule={schedule}
          searchTerm={searchTerm} 
          onSelectItem={onSelectItem}
          articleToChapterMap={articleToChapterMap}
          language={language}
          summaries={summaries}
        />
      ))}
    </div>
  );
};

export default ContentDisplay;