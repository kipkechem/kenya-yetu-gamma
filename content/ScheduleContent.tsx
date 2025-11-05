import React, { useState } from 'react';
import ContentRenderer from '../components/ContentRenderer';
import type { Schedule, SelectedItem } from '../types';
import { ChatBubbleOvalLeftEllipsisIcon } from '../components/icons';

interface ScheduleContentProps {
    schedule: Schedule;
    searchTerm: string;
    onSelectItem: (item: SelectedItem) => void;
    articleToChapterMap: Map<string, number>;
    language: 'en' | 'sw';
    summaries: { [key: string]: string };
}

const ScheduleContent: React.FC<ScheduleContentProps> = ({ schedule, searchTerm, onSelectItem, articleToChapterMap, language, summaries }) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const summary = summaries[schedule.id];

    const t = language === 'sw' ? { schedule: 'Jedwali' } : { schedule: 'Schedule' };

    if (!schedule) {
        return <div>Schedule not found.</div>;
    }

    return (
        <article id={`schedule-${schedule.id}`} className="prose lg:prose-lg max-w-none bg-surface dark:bg-dark-surface p-6 md:p-8 rounded-3xl custom-shadow-lg scroll-mt-24 dark:prose-invert">
            <header className="border-b border-border dark:border-dark-border pb-4 mb-8">
                <p className="text-base font-semibold text-primary dark:text-dark-primary">{t.schedule}</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center">
                    {schedule.title}
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
                </h1>
            </header>
            <div className="mt-4 space-y-3 leading-relaxed">
              {schedule.content.split('\n').map((paragraph, pIndex) => (
                paragraph.trim() && <p key={pIndex}><ContentRenderer text={paragraph} highlight={searchTerm} onSelectItem={onSelectItem} articleToChapterMap={articleToChapterMap} language={language} /></p>
              ))}
            </div>
        </article>
    );
};

export default ScheduleContent;
