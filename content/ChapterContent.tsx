import React, { useState } from 'react';
import ContentRenderer from '../components/ContentRenderer';
import type { Chapter, SelectedItem } from '../types';
import { ChatBubbleOvalLeftEllipsisIcon } from '../components/icons';

interface ChapterContentProps {
    chapter: Chapter;
    searchTerm: string;
    onSelectItem: (item: SelectedItem) => void;
    articleToChapterMap: Map<string, number>;
    language: 'en' | 'sw';
    summaries: { [key: string]: string };
}

const ChapterContent: React.FC<ChapterContentProps> = ({ chapter, searchTerm, onSelectItem, articleToChapterMap, language, summaries }) => {
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    const t = language === 'sw' 
        ? { chapter: 'Sura', article: 'Kifungu' }
        : { chapter: 'Chapter', article: 'Article' };

    if (!chapter) {
        return <div>Chapter not found.</div>;
    }

    return (
        <article id={`chapter-${chapter.id}`} className="prose lg:prose-lg max-w-none bg-white p-6 md:p-8 rounded-xl shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-white/10 scroll-mt-20 dark:prose-invert">
            <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
                <p className="text-base font-semibold text-green-600 dark:text-green-400">{t.chapter} {chapter.id}</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">{chapter.title}</h1>
            </header>
            
            {chapter.parts.map((part, partIndex) => (
                <section key={partIndex} className="mt-6">
                    {part.title && <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">{part.title}</h3>}
                    {part.articles.map(article => {
                        const summary = summaries[article.number];
                        return (
                            <div key={article.number} id={`article-${article.number}`} className="mt-6 py-6 border-t border-gray-100 dark:border-gray-700/50 scroll-mt-20">
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 leading-6 flex items-center">
                                    <span className="text-gray-500 dark:text-gray-400 mr-2">{t.article} {article.number}:</span>
                                    {article.title}
                                    {summary && (
                                        <div className="relative inline-block ml-2">
                                            <ChatBubbleOvalLeftEllipsisIcon
                                                className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer transition-colors"
                                                onMouseEnter={() => setActiveTooltip(article.number)}
                                                onMouseLeave={() => setActiveTooltip(null)}
                                                onClick={() => setActiveTooltip(activeTooltip === article.number ? null : article.number)}
                                            />
                                            {activeTooltip === article.number && (
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-20 pointer-events-none transition-opacity duration-200">
                                                    {summary}
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900"></div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </h4>
                                <div className="mt-3 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {article.content.split('\n').map((paragraph, pIndex) => (
                                        paragraph.trim() && <p key={pIndex}><ContentRenderer text={paragraph} highlight={searchTerm} onSelectItem={onSelectItem} articleToChapterMap={articleToChapterMap} language={language} /></p>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </section>
            ))}
        </article>
    );
};

export default ChapterContent;