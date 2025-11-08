import React, { useMemo } from 'react';
import type { ConstitutionData, SelectedItem, Part, Article } from '../types';
import { HomeIcon } from './icons';

interface BreadcrumbsProps {
  selectedItem: SelectedItem;
  data: ConstitutionData;
  language: 'en' | 'sw';
  onSelectItem: (item: SelectedItem) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ selectedItem, data, language, onSelectItem }) => {
  const breadcrumbs = useMemo(() => {
    const t = language === 'sw' 
      ? { preamble: 'Utangulizi', chapter: 'Sura', article: 'Kifungu', schedules: 'Majedwali' }
      : { preamble: 'Preamble', chapter: 'Chapter', article: 'Article', schedules: 'Schedules' };

    const path: { label: React.ReactNode; item: SelectedItem | null }[] = [];

    const preambleItem = { type: 'preamble' as const, id: 'preamble' };
    path.push({
      label: <HomeIcon className="h-5 w-5" />,
      item: preambleItem,
    });

    if (selectedItem.type === 'chapter') {
      const chapter = data.chapters.find(c => c.id === selectedItem.id);
      if (!chapter) return path;

      const chapterTitle = language === 'sw' ? `${t.chapter} ${chapter.id}` : `${t.chapter} ${chapter.id}`;
      path.push({ label: `${chapterTitle}: ${chapter.title}`, item: { type: 'chapter', id: chapter.id } });

      if (selectedItem.article) {
        let partIndex = -1;
        let foundPart: Part | undefined;
        let foundArticle: Article | undefined;
        
        for (const [pIdx, part] of chapter.parts.entries()) {
          const article = part.articles.find(a => a.number === selectedItem.article);
          if (article) {
            partIndex = pIdx;
            foundPart = part;
            foundArticle = article;
            break;
          }
        }
        
        if (foundPart && foundArticle) {
          if (foundPart.title) {
            path.push({ 
              label: foundPart.title, 
              item: { type: 'chapter', id: chapter.id, part: partIndex + 1 } 
            });
          }
          const articleTitle = language === 'sw' ? `${t.article} ${foundArticle.number}` : `${t.article} ${foundArticle.number}`;
          path.push({ label: articleTitle, item: selectedItem });
        }
      }
    } else if (selectedItem.type === 'schedule') {
      const schedule = data.schedules.find(s => s.id === selectedItem.id);
      if (!schedule) return path;

      // Make the "Schedules" breadcrumb navigate to the first schedule in the list
      path.push({ label: t.schedules, item: { type: 'schedule', id: data.schedules[0].id } });
      
      const scheduleLabel = schedule.title.split('–')[0].trim();
      path.push({ label: scheduleLabel, item: selectedItem });
    }

    return path;
  }, [selectedItem, data, language, onSelectItem]);

  const t = language === 'sw' ? { preamble: 'Utangulizi' } : { preamble: 'Preamble' };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 px-1">
      <ol className="flex items-center space-x-1 text-sm flex-wrap">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-500 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
            )}
            
            {index < breadcrumbs.length - 1 && crumb.item ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (crumb.item) {
                    onSelectItem(crumb.item);
                  }
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-dark-primary transition-colors truncate"
                title={typeof crumb.label === 'string' ? crumb.label : t.preamble}
              >
                {crumb.label}
              </a>
            ) : (
              <span className="font-medium text-on-surface dark:text-dark-on-surface truncate" aria-current="page" title={typeof crumb.label === 'string' ? crumb.label : ''}>
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
