
import React from 'react';
import { DownloadIcon } from '../components/icons';
import { useLazyData } from '../hooks/useLazyData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import type { SymbolData } from '../types/index';

interface SymbolPageProps {
  symbolId: string;
}

const SymbolPage: React.FC<SymbolPageProps> = ({ symbolId }) => {
  const { data: symbolsData, isLoading, error, refetch } = useLazyData<Record<string, SymbolData>>(
      'symbols-data',
      () => import('../data/symbols').then(m => m.symbolsData)
  );

  if (isLoading) {
      return <LoadingSpinner />;
  }

  if (error || !symbolsData) {
      return <ErrorDisplay message="Failed to load symbol data." onRetry={refetch} />;
  }

  const symbol = symbolsData[symbolId];

  if (!symbol) {
      return <ErrorDisplay message="Symbol not found." onRetry={refetch} />;
  }

  const { title, svgContent, imageUrl, description, fileName } = symbol;

  const handleDownload = async () => {
    if (imageUrl) {
        window.open(imageUrl, "_blank");
    } else if (svgContent) {
        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">{title}</h1>
        </header>

        <div className="bg-surface dark:bg-dark-surface p-6 md:p-12 rounded-[2.5rem] custom-shadow-lg flex flex-col items-center border border-gray-100 dark:border-gray-800">
          <div className="w-full max-w-xl mb-10 flex justify-center bg-gray-50/50 dark:bg-gray-900/50 p-8 rounded-3xl min-h-[300px] items-center">
            {imageUrl ? (
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="max-w-full max-h-[400px] object-contain drop-shadow-md" 
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x400/22c55e/ffffff?text=${encodeURIComponent(title)}`;
                    }}
                />
            ) : svgContent ? (
                <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: svgContent }} />
            ) : null}
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-3xl text-center mb-10">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{description}</p>
          </div>

          <button
            onClick={handleDownload}
            className="inline-flex items-center px-10 py-4 border border-transparent text-base font-bold rounded-full shadow-xl text-white bg-primary hover:bg-primary-dark transition-all transform active:scale-95 hover:shadow-primary/20"
            aria-label={`View or Download ${fileName}`}
          >
            <DownloadIcon className="h-5 w-5 mr-3" />
            {imageUrl?.endsWith('.svg') ? 'View Original SVG' : (imageUrl ? 'View Original' : 'Download SVG')}
          </button>
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">National Symbol of Kenya</p>
        </div>
      </div>
    </div>
  );
};

export default SymbolPage;
