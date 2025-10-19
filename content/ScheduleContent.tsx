import React from 'react';
import ContentRenderer from '../components/ContentRenderer';
import type { Schedule, SelectedItem } from '../types';

interface ScheduleContentProps {
    schedule: Schedule;
    searchTerm: string;
    onSelectItem: (item: SelectedItem) => void;
    articleToChapterMap: Map<string, number>;
}

const ScheduleContent: React.FC<ScheduleContentProps> = ({ schedule, searchTerm, onSelectItem, articleToChapterMap }) => {
    if (!schedule) {
        return <div>Schedule not found.</div>;
    }

    return (
        <article id={`schedule-${schedule.id}`} className="prose lg:prose-lg max-w-none bg-white p-6 md:p-8 rounded-xl shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-white/10 scroll-mt-20 dark:prose-invert">
            <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
                <p className="text-base font-semibold text-green-600 dark:text-green-400">Schedule</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">{schedule.title}</h1>
            </header>
            <div className="mt-4 space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              {schedule.content.split('\n').map((paragraph, pIndex) => (
                paragraph.trim() && <p key={pIndex}><ContentRenderer text={paragraph} highlight={searchTerm} onSelectItem={onSelectItem} articleToChapterMap={articleToChapterMap} /></p>
              ))}
            </div>
        </article>
    );
};

export default ScheduleContent;