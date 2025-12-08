
import React, { useMemo, useState, useDeferredValue, useEffect } from 'react';
import { InboxStackIcon, ChevronDownIcon, ExternalLinkIcon, FileTextIcon } from '../components/icons';
import type { ActsByCategory, Act } from '../data/legislation/acts';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { useLazyData } from '../hooks/useLazyData';

interface ActsPageProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const ITEMS_PER_PAGE = 20; // Reduced from 50 to improve initial render performance

const CATEGORY_ORDER: (keyof ActsByCategory)[] = [
  'in force',
  'uncommenced',
  'repealed',
  'county',
  'east african'
];

const createSearchUrl = (actTitle: string, categoryKey?: keyof ActsByCategory) => {
  const baseUrl = 'https://new.kenyalaw.org/kl/index.php?id=search';
  const params = new URLSearchParams({
    'search[search_word]': actTitle
  });

  const categoryToParam: Partial<Record<keyof ActsByCategory, string>> = {
    'in force': 'seasy_bda',
    uncommenced: 'seasy_unc',
    repealed: 'seasy_lca',
    county: 'seasy_srp',
    'east african': 'seasy_eac',
  };

  if (categoryKey && categoryToParam[categoryKey]) {
    params.set(`search[${categoryToParam[categoryKey]}]`, '1');
    if (categoryKey !== 'in force') {
        params.set('search[seasy_bda]', '0');
    }
  }

  return `${baseUrl}?${params.toString()}`;
};

const ActItem: React.FC<{ act: Act, categoryKey?: keyof ActsByCategory }> = React.memo(({ act, categoryKey }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasSubsidiary = act.subsidiary && act.subsidiary.length > 0;
    const targetUrl = act.url || createSearchUrl(act.title, categoryKey);

    return (
        <li className="border-b border-gray-100 dark:border-gray-800 last:border-0">
            <div className="flex flex-col">
                <div className="group flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="p-1.5 rounded-lg bg-primary/10 dark:bg-primary/5 text-primary dark:text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <a 
                                href={targetUrl}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-medium text-sm text-gray-700 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-dark-primary text-left leading-snug hover:underline"
                            >
                                {act.title}
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {hasSubsidiary && (
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-1.5 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                                title={isExpanded ? "Hide subsidiary legislation" : "Show subsidiary legislation"}
                            >
                                <ChevronDownIcon className={`h-4 w-4 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                        )}
                        <a
                            href={targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 flex-shrink-0"
                            aria-label={`View ${act.title} on Kenya Law`}
                        >
                            <ExternalLinkIcon className="h-4 w-4" />
                        </a>
                    </div>
                </div>
                
                {/* Subsidiary Legislation List */}
                {hasSubsidiary && isExpanded && (
                    <div className="bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800 pl-12 pr-4 py-2">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 mt-1">Subsidiary Legislation</p>
                        <ul className="space-y-1 mb-2">
                            {act.subsidiary!.map((sub, idx) => (
                                <li key={idx} className="flex items-start gap-2 py-1">
                                    <FileTextIcon className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <a 
                                        href={sub.url || createSearchUrl(sub.title, categoryKey)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-dark-primary hover:underline leading-tight"
                                    >
                                        {sub.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </li>
    );
});

const ActsPage: React.FC<ActsPageProps> = ({ searchTerm, onSearchChange }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>('in force');
  
  // Pagination state for large lists in search results
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Defer the search term to keep the UI responsive during typing
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const { data: actsOfParliament, isLoading, error, refetch } = useLazyData<ActsByCategory>(
      'acts-data',
      () => import('../data/legislation/acts').then(m => m.actsOfParliament),
      [],
      { skipCache: true } // Optimization: Do not store giant dataset in localStorage
  );

  // Reset pagination when search changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    if (deferredSearchTerm) {
        setOpenAccordion(null);
    }
  }, [deferredSearchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };
  
  // Memoize the flattened list separately to avoid re-flattening on every render if acts haven't changed
  const allActs = useMemo(() => {
    if (!actsOfParliament) return [];
    return Object.values(actsOfParliament).flat().sort((a: Act, b: Act) => a.title.localeCompare(b.title));
  }, [actsOfParliament]);

  const filteredActs = useMemo(() => {
    if (!deferredSearchTerm) return [];
    const term = deferredSearchTerm.toLowerCase();
    return allActs.filter(act =>
      act.title.toLowerCase().includes(term) ||
      (act.subsidiary && act.subsidiary.some(sub => sub.title.toLowerCase().includes(term)))
    );
  }, [deferredSearchTerm, allActs]);
  
  const toggleAccordion = (category: string) => {
    setOpenAccordion(openAccordion === category ? null : category);
  };

  const formatCategoryTitle = (key: string) => {
    return key.replace(/(-)/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !actsOfParliament) {
    return <ErrorDisplay message="Failed to load Acts of Parliament." onRetry={refetch} />;
  }

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <InboxStackIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Acts of Parliament</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Browse the Laws of Kenya organized by category. Access full texts directly from Kenya Law.
          </p>
        </header>

        <div className="mb-8 sticky top-0 py-4 bg-background/95 dark:bg-dark-background/95 backdrop-blur-sm z-10 -mx-4 px-4 transition-all">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for an Act..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-full py-3.5 pl-12 pr-12 text-on-surface dark:text-dark-on-surface placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent custom-shadow-lg"
              aria-label="Search Acts of Parliament"
            />
            {searchTerm !== deferredSearchTerm && (
                 <div className="absolute right-4 top-3.5">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                 </div>
            )}
          </div>
        </div>

        <div className="bg-surface dark:bg-dark-surface rounded-2xl custom-shadow-lg overflow-hidden min-h-[400px]">
          <div className="">
            {searchTerm ? (
              <>
                <div className="p-4 border-b border-border dark:border-dark-border bg-gray-50/50 dark:bg-white/5">
                    <h3 className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                        Search Results ({filteredActs.length})
                    </h3>
                </div>
                <ul className="divide-y divide-border dark:divide-dark-border">
                    {filteredActs.slice(0, visibleCount).map((act) => (
                        <ActItem key={act.title} act={act} />
                    ))}
                    
                    {filteredActs.length === 0 && (
                        <li className="p-12 text-center">
                            <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-3">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400">No acts found matching "{searchTerm}".</p>
                        </li>
                    )}
                </ul>
                {filteredActs.length > visibleCount && (
                    <div className="p-6 text-center border-t border-gray-100 dark:border-gray-800">
                         <button 
                            onClick={handleLoadMore}
                            className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary dark:text-dark-primary rounded-full text-sm font-medium transition-colors"
                         >
                             Load More Results
                         </button>
                    </div>
                )}
              </>
            ) : (
              <div>
                {CATEGORY_ORDER.map(category => {
                    if (!actsOfParliament[category]) return null;
                    
                    // Sort acts once, or rely on data file being sorted. Sorting here is safer.
                    const acts = actsOfParliament[category];
                    if (acts.length === 0) return null;
                    
                    const isOpen = openAccordion === category;
                    const displayedActs = isOpen ? acts : []; // Virtualize accordion too by not rendering content if closed
                    
                    return (
                        <div key={category} className="border-b border-border dark:border-dark-border last:border-b-0">
                            <button
                                onClick={() => toggleAccordion(category)}
                                className={`w-full flex justify-between items-center p-5 text-left transition-colors focus:outline-none ${isOpen ? 'bg-gray-50 dark:bg-white/5' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                aria-expanded={isOpen}
                                aria-controls={`section-content-${category}`}
                            >
                                <div className="flex items-center gap-3">
                                    <h3 className={`text-lg font-bold ${isOpen ? 'text-primary dark:text-dark-primary' : 'text-on-surface dark:text-dark-on-surface'}`}>
                                        {formatCategoryTitle(category)} 
                                    </h3>
                                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2.5 py-0.5 rounded-full">
                                        {acts.length}
                                    </span>
                                </div>
                                <div className={`p-1 rounded-full transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'text-gray-400 bg-gray-100 dark:bg-gray-800'}`}>
                                    <ChevronDownIcon className="h-5 w-5" />
                                </div>
                            </button>
                            
                            {isOpen && (
                                <div
                                    id={`section-content-${category}`}
                                    className="bg-gray-50/30 dark:bg-black/10 border-t border-border dark:border-dark-border/50 animate-fade-in"
                                >
                                    <ul className="divide-y divide-border dark:divide-dark-border">
                                        {/* To optimize accordion performance, we only render first 50 initially if opened, unless user scrolls (implementation simplified here to render all for category as categories are usually reasonable size compared to ALL acts, but could apply pagination here too) */}
                                        {displayedActs.map((act) => (
                                            <ActItem key={act.title} act={act} categoryKey={category} />
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActsPage;
