
import React, { useState } from 'react';
import { BookOpenIcon, ExternalLinkIcon, ChevronDownIcon } from '../components/icons';
import type { DocumentItem, SubDocument } from '../data/knowledge-base/historical-documents';
import { useLazyData } from '../hooks/useLazyData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const DocumentCard: React.FC<{ doc: DocumentItem }> = ({ doc }) => (
  <a
    href={doc.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow-lg transition-transform transform hover:-translate-y-1 hover:custom-shadow-xl"
  >
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-bold text-on-surface dark:text-dark-on-surface">{doc.title}</h3>
      <ExternalLinkIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4 mt-1" />
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{doc.description}</p>
  </a>
);

const CollapsibleDocumentCard: React.FC<{ doc: DocumentItem }> = ({ doc }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-surface dark:bg-dark-surface rounded-2xl custom-shadow-lg overflow-hidden transition-all duration-300 md:col-span-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6"
        aria-expanded={isExpanded}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-on-surface dark:text-dark-on-surface">{doc.title}</h3>
          <ChevronDownIcon className={`h-6 w-6 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4 mt-1 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{doc.description}</p>
      </button>

      <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6 border-t border-border dark:border-dark-border">
          <ul className="mt-4 space-y-3">
            {doc.subDocuments?.map((subDoc: SubDocument) => (
              <li key={subDoc.title}>
                <a
                  href={subDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary dark:text-dark-primary hover:underline group"
                >
                  <ExternalLinkIcon className="h-4 w-4 mr-3 text-gray-400 dark:text-gray-500 transition-colors flex-shrink-0" />
                  <span className="truncate">{subDoc.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const HistoricalDocumentsPage: React.FC = () => {
  const { data: documents, isLoading, error, refetch } = useLazyData<DocumentItem[]>(
    'historical-documents-data',
    () => import('../data/knowledge-base/historical-documents').then(m => m.documentsData)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !documents) {
    return <ErrorDisplay message="Failed to load historical documents." onRetry={refetch} />;
  }

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <BookOpenIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Historical Documents</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            A collection of key papers, drafts, and constitutions that have shaped the legal and political history of Kenya.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          {documents.map(doc => 
            doc.subDocuments ? 
              <CollapsibleDocumentCard key={doc.title} doc={doc} /> :
              <DocumentCard key={doc.title} doc={doc} />
          )}
        </main>
      </div>
    </div>
  );
};

export default HistoricalDocumentsPage;
