import React from 'react';
import { anthems } from '../data/anthems';
import type { Anthem } from '../types';
import { FlagIcon, DownloadIcon } from './icons';

interface AnthemPageProps {
  anthemId: 'kenyan' | 'east-african';
  language: 'en' | 'sw';
}

const AnthemPage: React.FC<AnthemPageProps> = ({ anthemId, language }) => {
  const anthem = anthems[anthemId];
  const pageTitle = language === 'sw' ? anthem.swahiliTitle : anthem.englishTitle;

  const handleDownload = (lang: 'en' | 'sw') => {
    const title = lang === 'sw' ? anthem.swahiliTitle : anthem.englishTitle;
    const lyrics = anthem.lyrics.map(part => {
      let partTitle = '';
      if (part.type === 'stanza' && part.number) {
        partTitle = `Stanza ${part.number}`;
      } else if (part.type === 'chorus') {
        partTitle = 'Chorus';
      }
      return `${partTitle}\n${lang === 'sw' ? part.swahili : part.english}`;
    }).join('\n\n');

    const fullText = `${title}\n\n${lyrics}`;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `${title.replace(/\s/g, '_')}.txt`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderLyrics = (lang: 'sw' | 'en') => (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {anthem.lyrics.map((part, index) => (
        <div key={index} className="mt-6 first:mt-0">
          {part.type === 'stanza' && part.number && (
            <h3 className="font-semibold italic text-gray-600 dark:text-gray-400">Stanza {part.number}</h3>
          )}
          {part.type === 'chorus' && (
            <h3 className="font-semibold italic text-gray-600 dark:text-gray-400">Chorus</h3>
          )}
          <p className="whitespace-pre-wrap mt-1 text-lg leading-relaxed">
            {lang === 'sw' ? part.swahili : part.english}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <FlagIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">{pageTitle}</h1>
        </header>

        <div className="bg-surface dark:bg-dark-surface p-6 md:p-8 rounded-3xl custom-shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            <div>
              <div className="flex justify-between items-center border-b border-border dark:border-dark-border pb-2 mb-4">
                <h2 className="text-2xl font-bold text-on-surface dark:text-dark-on-surface">Swahili</h2>
                <button
                  onClick={() => handleDownload('sw')}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Download Swahili lyrics"
                  title="Download Swahili lyrics"
                >
                  <DownloadIcon className="h-5 w-5" />
                </button>
              </div>
              {renderLyrics('sw')}
            </div>
            <div>
              <div className="flex justify-between items-center border-b border-border dark:border-dark-border pb-2 mb-4">
                <h2 className="text-2xl font-bold text-on-surface dark:text-dark-on-surface">English</h2>
                <button
                  onClick={() => handleDownload('en')}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Download English lyrics"
                  title="Download English lyrics"
                >
                  <DownloadIcon className="h-5 w-5" />
                </button>
              </div>
              {renderLyrics('en')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnthemPage;
