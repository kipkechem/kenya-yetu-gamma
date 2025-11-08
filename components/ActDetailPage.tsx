import React from 'react';
import type { SelectedItem } from '../types';
import { actContentData } from '../data/act-content';
import ContentRenderer from './ContentRenderer';
import { dispatchNavigate } from '../utils/navigation';
import { InboxStackIcon } from './icons';

interface ActDetailPageProps {
  actTitle: string;
  language: 'en' | 'sw';
  articleToChapterMap: Map<string, number>;
}

const ActDetailPage: React.FC<ActDetailPageProps> = ({ actTitle, language, articleToChapterMap }) => {
  const content = actContentData[actTitle] || 'Content for this Act is not available.';
  
  // This handler will navigate to the constitution view and set the hash
  // so the ConstitutionExplorer can scroll to the correct article.
  const handleSelectItem = (item: SelectedItem) => {
    let hash = '';
    if (item.type === 'chapter' && item.article) {
        hash = `#article-${item.article}`;
    } else if (item.type === 'chapter' && item.id) {
        hash = `#chapter-${item.id}`;
    } else if (item.type === 'schedule' && item.id) {
        hash = `#schedule-${item.id}`;
    }

    if (hash) {
        // We set the hash directly. The ConstitutionExplorer's useEffect will pick it up
        // after we navigate to that view.
        window.location.hash = hash;
    }
    dispatchNavigate({ view: 'constitution' });
  };
  
  if (language === 'sw') {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">{actTitle}</h1>
        <p>Upatikanaji wa maudhui ya sheria hii kwa Kiswahili bado unashughulikiwa.</p>
        <p className="mt-2 text-sm text-gray-500">(Content for Acts is currently available in English only.)</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <article className="prose lg:prose-lg max-w-none bg-surface dark:bg-dark-surface p-6 md:p-8 rounded-3xl custom-shadow-lg dark:prose-invert">
          <header className="border-b border-border dark:border-dark-border pb-4 mb-8">
            <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-light dark:bg-dark-primary-light rounded-xl">
                    <InboxStackIcon className="h-6 w-6 text-primary dark:text-dark-primary" />
                </div>
                <p className="text-base font-semibold text-primary dark:text-dark-primary">Act of Parliament</p>
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">{actTitle}</h1>
          </header>
          <div className="mt-4 space-y-3 leading-relaxed">
            {content.split('\n').map((paragraph, pIndex) => (
              paragraph.trim() && (
                <p key={pIndex}>
                  <ContentRenderer 
                    text={paragraph} 
                    highlight="" 
                    onSelectItem={handleSelectItem}
                    articleToChapterMap={articleToChapterMap}
                    language={language} 
                  />
                </p>
              )
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default ActDetailPage;
