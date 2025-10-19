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
};

export default ContentDisplay;