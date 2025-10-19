import React from 'react';
import ContentRenderer from '../components/ContentRenderer';
import type { Chapter, SelectedItem } from '../types';

interface ChapterContentProps {
    chapter: Chapter;
    searchTerm: string;
    onSelectItem: (item: SelectedItem) => void;
    articleToChapterMap: Map<string, number>;
}

const ChapterContent: React.FC<ChapterContentProps> = ({ chapter, searchTerm, onSelectItem, articleToChapterMap }) => {
    if (!chapter) {
        return <div>Chapter not found.</div>;
    }

    return (
        <article id={`chapter-${chapter.id}`} className="prose lg:prose-lg max-w-none bg-white p-6 md:p-8 rounded-xl shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-white/10 scroll-mt-20 dark:prose-invert">
            <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
                <p className="text-base font-semibold text-green-600 dark:text-green-400">Chapter {chapter.id}</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">{chapter.title}</h1>
            </header>
            
            {chapter.parts.map((part, partIndex) => (
                <section key={partIndex} className="mt-6">
                    {part.title && <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">{part.title}</h3>}
                    {part.articles.map(article => (
                        <div key={article.number} id={`article-${article.number}`} className="mt-6 py-6 border-t border-gray-100 dark:border-gray-700/50 scroll-mt-20">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 leading-6">
                                <span className="text-gray-500 dark:text-gray-400 mr-2">Article {article.number}:</span>
                                {article.title}
                            </h4>
                            <div className="mt-3 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                                {article.content.split('\n').map((paragraph, pIndex) => (
                                    paragraph.trim() && <p key={pIndex}><ContentRenderer text={paragraph} highlight={searchTerm} onSelectItem={onSelectItem} articleToChapterMap={articleToChapterMap} /></p>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            ))}
        </article>
    );
};

export default ChapterContent;