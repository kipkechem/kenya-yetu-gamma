import React, { useEffect, useState, useMemo } from 'react';
import type { SelectedItem } from '../types/index';
import { actContentData } from '../data/act-content';
import ContentRenderer from '../components/ContentRenderer';
import { dispatchNavigate } from '../utils/navigation';
import { InboxStackIcon } from '../components/icons';
import type { ConstitutionData } from '../types/index';

interface ActDetailPageProps {
  actTitle: string;
  language: 'en' | 'sw';
}

const ActDetailPage: React.FC<ActDetailPageProps> = ({ actTitle, language }) => {
  const [constitutionData, setConstitutionData] = useState<ConstitutionData | null>(null);

  useEffect(() => {
    const loadConstitution = async () => {
      // Act content links are currently only parsed for English.
      // We load the english data to build the article map.
      const dataModule = await import('../data/constitution');
      setConstitutionData(dataModule.constitutionData);
    };
    loadConstitution();
  }, []);

  const articleToChapterMap = useMemo(() => {
    if (!constitutionData) return new Map<string, number>();
    const map = new Map<string, number>();
    constitutionData.chapters.forEach(chapter => {
      chapter.parts.forEach(part => {
        part.articles.forEach(article => {
          map.set(article.number, chapter.id);
        });
      });
    });
    return map;
  }, [constitutionData]);

  const content = actContentData[actTitle] || 'Content for this Act is not available.';
  
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