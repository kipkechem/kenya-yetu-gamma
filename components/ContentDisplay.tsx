
import React, { useMemo, useState, useEffect } from 'react';
import type { SelectedItem, ConstitutionData } from '../types/index';
import { retrieveRelevantContext } from '../utils/constitution-rag';
import Highlight from './Highlight';
import { BookOpenIcon, ChevronDoubleRightIcon } from './icons';

interface ContentDisplayProps {
  searchTerm: string;
  onSelectItem: (item: SelectedItem) => void;
  articleToChapterMap: Map<string, number>;
  language: 'en' | 'sw';
  data: ConstitutionData; 
  summaries: Record<string, string>;
}

const SearchResultChunk: React.FC<{ 
    title: string; 
    content: string; 
    type: string; 
    id: string; 
    searchTerm: string; 
    onClick: () => void 
}> = ({ title, content, type, id, searchTerm, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-surface dark:bg-dark-surface p-5 rounded-2xl border border-gray-100 dark:border-gray-800 custom-shadow hover:custom-shadow-md hover:border-primary/30 transition-all cursor-pointer group"
    >
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-primary/10 text-primary dark:text-dark-primary text-[10px] font-bold uppercase rounded-md">
                    {type} {id === 'Preamble' ? '' : id}
                </span>
                <h3 className="font-bold text-on-surface dark:text-dark-on-surface group-hover:text-primary transition-colors">
                    <Highlight text={title} highlight={searchTerm} />
                </h3>
            </div>
            <ChevronDoubleRightIcon className="h-4 w-4 text-gray-300 group-hover:text-primary transition-colors" />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
            <Highlight text={content} highlight={searchTerm} />
        </div>
    </div>
);

const ContentDisplay: React.FC<ContentDisplayProps> = ({ searchTerm, language, onSelectItem, articleToChapterMap }) => {
  const [chunks, setChunks] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
        setChunks([]);
        return;
    }

    const performSearch = async () => {
        setIsSearching(true);
        // We use the RAG utility for optimized chunked searching
        const context = await retrieveRelevantContext(searchTerm, language);
        
        // Parse the formatted RAG output back into chunks for the UI
        // In a real app, retrieveRelevantContext would return objects directly, 
        // but since we want to reuse the citations logic, we keep it simple here.
        if (context) {
            const parts = context.split('\n\n---\n\n');
            const resultChunks = parts.map(p => {
                const headerMatch = p.match(/\[SOURCE: (Article|Schedule|Preamble) (.*?) - (.*?)\]/);
                if (headerMatch) {
                    return {
                        type: headerMatch[1],
                        id: headerMatch[2].trim(),
                        title: headerMatch[3].trim(),
                        content: p.replace(headerMatch[0], '').trim()
                    };
                }
                return null;
            }).filter(Boolean);
            setChunks(resultChunks);
        } else {
            setChunks([]);
        }
        setIsSearching(false);
    };

    const timer = setTimeout(performSearch, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, language]);

  const handleChunkClick = (chunk: any) => {
      if (chunk.type === 'Preamble') {
          onSelectItem({ type: 'preamble', id: 'preamble' });
      } else if (chunk.type === 'Article') {
          const chapterId = articleToChapterMap.get(chunk.id);
          if (chapterId) {
              onSelectItem({ type: 'chapter', id: chapterId, article: chunk.id });
          }
      } else if (chunk.type === 'Schedule') {
          onSelectItem({ type: 'schedule', id: chunk.id });
      }
  };

  if (!searchTerm.trim()) return null;

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-light dark:bg-dark-primary-light rounded-xl">
                <BookOpenIcon className="h-5 w-5 text-primary dark:text-dark-primary" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-on-surface dark:text-dark-on-surface">Search Results</h2>
                <p className="text-sm text-gray-500">Optimized chunks from the Constitution of Kenya</p>
            </div>
        </div>

        {isSearching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
                ))}
            </div>
        ) : chunks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chunks.map((chunk, idx) => (
                    <SearchResultChunk 
                        key={idx} 
                        {...chunk} 
                        searchTerm={searchTerm} 
                        onClick={() => handleChunkClick(chunk)} 
                    />
                ))}
            </div>
        ) : (
            <div className="p-12 text-center bg-surface dark:bg-dark-surface rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-gray-500">No specific sections found matching your query. Try different keywords or the Constitutional Assistant chat.</p>
            </div>
        )}

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-400">
                Tips: Search for specific rights (e.g. "Article 43") or themes (e.g. "Devolution").
            </p>
        </div>
    </div>
  );
};

export default ContentDisplay;
