
import React from 'react';
import { DownloadIcon } from '../components/icons';
import { useLazyData } from '../hooks/useLazyData';
import LoadingSpinner from '../components/LoadingSpinner';
import type { SymbolData } from '../data/culture/symbols';

interface SymbolPageProps {
  symbolId: string;
}

const SymbolPage: React.FC<SymbolPageProps> = ({ symbolId }) => {
  const { data: symbolsData, isLoading } = useLazyData<Record<string, SymbolData>>(
      'symbols-data',
      () => import('../data/culture/symbols').then(m => m.symbolsData)
  );

  if (isLoading || !symbolsData) {
      return <LoadingSpinner />;
  }

  const symbol = symbolsData[symbolId];

  if (!symbol) {
      return <div className="p-10 text-center text-red-500">Symbol not found.</div>;
  }

  const { title, svgContent, description, fileName } = symbol;

  const handleDownload = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">{title}</h1>
        </header>

        <div className="bg-surface dark:bg-dark-surface p-6 md:p-8 rounded-3xl custom-shadow-lg flex flex-col items-center">
          <div className="w-full max-w-lg mb-8" dangerouslySetInnerHTML={{ __html: svgContent }} />
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-center mb-8">
            <p>{description}</p>
          </div>

          <button
            onClick={handleDownload}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:ring-offset-dark-surface transition-all"
            aria-label={`Download ${fileName}`}
          >
            <DownloadIcon className="h-5 w-5 mr-2" />
            Download SVG
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymbolPage;
