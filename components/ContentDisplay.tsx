
import React from 'react';
import type { SelectedItem } from '../types/index';

interface ContentDisplayProps {
  searchTerm: string;
  onSelectItem: (item: SelectedItem) => void;
  articleToChapterMap: Map<string, number>;
  language: 'en' | 'sw';
  data: any; 
  summaries: Record<string, string>;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ searchTerm, language }) => {
  // If we are searching, we show snippets from the RAG (this will be wired in Chat or a dedicated search results view).
  // For standard browsing, the explorer handles individual section rendering.
  if (searchTerm.trim()) {
      return (
          <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 text-center animate-fade-in">
              <p className="text-primary dark:text-dark-primary font-medium">Use the "Constitutional Assistant" for advanced searches across the entire text.</p>
          </div>
      );
  }
  return null;
};

export default ContentDisplay;
