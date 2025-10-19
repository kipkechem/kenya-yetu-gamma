import React from 'react';
import { constitutionData } from '../data/constitution';
import ContentRenderer from '../components/ContentRenderer';
import type { SelectedItem } from '../types';

interface PreambleContentProps {
    searchTerm: string;
    onSelectItem: (item: SelectedItem) => void;
    articleToChapterMap: Map<string, number>;
}

const PreambleContent: React.FC<PreambleContentProps> = ({ searchTerm, onSelectItem, articleToChapterMap }) => {
    const { title, content } = constitutionData.preamble;
    return (
        <article id="preamble" className="prose lg:prose-lg max-w-none bg-white p-6 md:p-8 rounded-xl shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-white/10 scroll-mt-20 dark:prose-invert">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">{title}</h2>
            <div className="mt-6 space-y-4">
              {content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      <ContentRenderer text={paragraph} highlight={searchTerm} onSelectItem={onSelectItem} articleToChapterMap={articleToChapterMap} />
                  </p>
              ))}
            </div>
        </article>
    );
};

export default PreambleContent;