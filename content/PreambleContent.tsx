import React, { useState } from 'react';
import ContentRenderer from '../components/ContentRenderer';
import type { SelectedItem } from '../types';
import { ChatBubbleOvalLeftEllipsisIcon } from '../components/icons';

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
    const summary = summaries['preamble'];

    return (
        <article id="preamble" className="prose lg:prose-lg max-w-none bg-surface dark:bg-dark-surface p-6 md:p-8 rounded-3xl custom-shadow-lg scroll-mt-24 dark:prose-invert">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center">
                {title}
                {summary && (
                    <div className="relative inline-block ml-3">
                        <ChatBubbleOvalLeftEllipsisIcon
                            className="h-6 w-6 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer transition-colors"
                            onMouseEnter={() => setTooltipVisible(true)}
                            onMouseLeave={() => setTooltipVisible(false)}
                            onClick={() => setTooltipVisible(!isTooltipVisible)}
                        />
                        {isTooltipVisible && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-20 pointer-events-none transition-opacity duration-200">
                                {summary}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900"></div>
                            </div>
                        )}
                    </div>
                )}
            </h2>
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
