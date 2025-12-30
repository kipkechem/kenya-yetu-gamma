
import React, { useState } from 'react';
import ContentRenderer from './ContentRenderer';
import type { SelectedItem } from '../types/index';
import { ChatBubbleOvalLeftEllipsisIcon, BookmarkIcon } from './icons';

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

    return (
        <article id="preamble" className="prose lg:prose-lg max-w-none bg-surface dark:bg-dark-surface p-6 md:p-8 rounded-3xl custom-shadow-lg scroll-mt-24 dark:prose-invert">
            <div className="flex justify-between items-start">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight m-0">{title}</h2>
                <div className="flex items-center gap-3 not-prose flex-shrink-0 pl-4">
                    {summary && (
                        <div className="relative">
                            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" onClick={() => setTooltipVisible(!isTooltipVisible)} />
                            {isTooltipVisible && <div className="absolute bottom-full right-0 mb-2 w-72 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-20">{summary}</div>}
                        </div>
                    )}
                    <button onClick={() => setIsBookmarked(!isBookmarked)} className="focus:outline-none"><BookmarkIcon className={`h-5 w-5 ${isBookmarked ? 'text-primary' : 'text-gray-400'}`} solid={isBookmarked} /></button>
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
