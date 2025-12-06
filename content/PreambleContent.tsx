
import React, { useState } from 'react';
import ContentRenderer from '../components/ContentRenderer';
import type { SelectedItem } from '../types/index';
import { ChatBubbleOvalLeftEllipsisIcon, BookmarkIcon } from '../components/icons';

interface PreambleContentProps {
    searchTerm: string;
    onSelectItem: (item: SelectedItem) => void;
    articleToChapterMap: Map<string, number>;
    language: 'en' | 'sw';
    preamble: { title: string; content: string };
    summaries: { [key: string]: string };
}

const PreambleContent: React.FC<PreambleContentProps> = ({ searchTerm, onSelectItem, articleToChapterMap, language, preamble, summaries }) => {
    const { title, content } = preamble;
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const summary = summaries['preamble'];

    const toggleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsBookmarked(!isBookmarked);
    };

    return (
        <article id="preamble" className="prose lg:prose-lg max-w-none bg-surface dark:bg-dark-surface p-6 md:p-8 rounded-3xl custom-shadow-lg scroll-mt-24 dark:prose-invert">
            <div className="flex justify-between items-start">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight m-0">
                    {title}
                </h2>
                <div className="flex items-center gap-3 not-prose flex-shrink-0 pl-4">
                    {summary && (
                        <div className="relative inline-block">
                            <ChatBubbleOvalLeftEllipsisIcon
                                className="h-6 w-6 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer transition-colors"
                                onMouseEnter={() => setTooltipVisible(true)}
                                onMouseLeave={() => setTooltipVisible(false)}
                                onClick={() => setTooltipVisible(!isTooltipVisible)}
                            />
                            {isTooltipVisible && (
                                <div className="absolute bottom-full right-0 mb-2 w-72 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-20 pointer-events-none transition-opacity duration-200">
                                    {summary}
                                    <div className="absolute top-full right-3 -mr-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900"></div>
                                </div>
                            )}
                        </div>
                    )}
                     <button
                        onClick={toggleBookmark}
                        title={isBookmarked ? "Remove bookmark" : "Bookmark Preamble"}
                        className="focus:outline-none"
                        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark Preamble"}
                     >
                        <BookmarkIcon 
                            className={`h-5 w-5 transition-colors ${isBookmarked ? 'text-primary dark:text-dark-primary' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'}`} 
                            solid={isBookmarked}
                        />
                    </button>
                </div>
            </div>
            <div className="mt-6 space-y-4">
              {content.split('\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                      <ContentRenderer text={paragraph} highlight={searchTerm} onSelectItem={onSelectItem} articleToChapterMap={articleToChapterMap} language={language} />
                  </p>
              ))}
            </div>
        </article>
    );
};

export default PreambleContent;
