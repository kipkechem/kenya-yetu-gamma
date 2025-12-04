
import React, { useMemo, useState } from 'react';
import { InboxStackIcon, ChevronDownIcon, ExternalLinkIcon } from './icons';
import { actsOfParliament as actsData, ActsByCategory, Act } from '../data/acts';
import { getCachedData, setCachedData } from '../utils/cache';
import { dispatchNavigate } from '../utils/navigation';

interface ActsPageProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const loadActsData = (): ActsByCategory => {
    const cacheKey = 'acts-data';
    let data = getCachedData<ActsByCategory>(cacheKey);
    if (data) {
        return data;
    }

    data = actsData;
    setCachedData(cacheKey, data);
    return data;
};

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


const ActsPage: React.FC<ActsPageProps> = ({ searchTerm, onSearchChange }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>('in force');

  const actsOfParliament = useMemo(() => loadActsData(), []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
    setOpenAccordion(null);
  };
  
  const allActs = useMemo(() => {
    return Object.values(actsOfParliament).flat().sort((a: Act, b: Act) => a.title.localeCompare(b.title));
  }, [actsOfParliament]);

  const filteredActs = useMemo(() => {
    if (!searchTerm) return [];
    return allActs.filter(act =>
      act.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allActs]);
  
  const toggleAccordion = (category: string) => {
    setOpenAccordion(openAccordion === category ? null : category);
  };

  const formatCategoryTitle = (key: string) => {
    return key.replace(/(-)/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleActClick = (actTitle: string) => {
    dispatchNavigate({ view: 'act-detail', actTitle });
  };

  const renderActItem = (act: Act, categoryKey?: keyof ActsByCategory) => (
    <li key={act.title}>
        <div className="group flex items-center justify-between pr-2 hover:bg-gray-50 dark:hover:bg-black/10 transition-colors">
            <button
                onClick={() => handleActClick(act.title)}
                className="w-full text-left p-4 font-medium text-on-surface dark:text-dark-on-surface group-hover:text-primary dark:group-hover:text-dark-primary"
            >
                {act.title}
            </button>
            <a
                href={act.url || createSearchUrl(act.title, categoryKey)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 flex-shrink-0"
                aria-label={`View ${act.title} on Kenya Law`}
                title={`View ${act.title} on Kenya Law`}
            >
                <ExternalLinkIcon className="h-5 w-5" />
            </a>
        </div>
    </li>
  );

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <InboxStackIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Acts of Parliament</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            A searchable repository of laws enacted by the Parliament of Kenya, sourced from Kenya Law.
          </p>
        </header>

        <div className="mb-8 sticky top-0 py-4 bg-background/80 dark:bg-dark-background/80 backdrop-blur-sm z-10 -mx-4 px-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search all Acts..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-full py-3 pl-12 pr-4 text-on-surface dark:text-dark-on-surface placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent custom-shadow"
              aria-label="Search Acts of Parliament"
            />
          </div>
        </div>

        <div className="bg-surface dark:bg-dark-surface rounded-2xl custom-shadow-lg">
          <div className="max-h-[calc(100vh-25rem)] overflow-y-auto rounded-2xl">
            {searchTerm ? (
              <ul className="divide-y divide-border dark:divide-dark-border">
                {filteredActs.length > 0 ? (
                  filteredActs.map((act) => renderActItem(act))
                ) : (
                  <li className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No acts found matching your search.
                  </li>
                )}
              </ul>
            ) : (
              <div>
                {(Object.keys(actsOfParliament) as Array<keyof ActsByCategory>).map(category => {
                    const acts = actsOfParliament[category].sort((a,b) => a.title.localeCompare(b.title));
                    if (acts.length === 0) return null;
                    return (
                        <div key={category} className="border-b border-border dark:border-dark-border last:border-b-0">
                            <button
                            onClick={() => toggleAccordion(category)}
                            className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            aria-expanded={openAccordion === category}
                            aria-controls={`section-content-${category}`}
                            >
                            <h3 className="text-lg font-bold text-on-surface dark:text-dark-on-surface">{formatCategoryTitle(category)} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({acts.length})</span></h3>
                            <ChevronDownIcon className={`h-6 w-6 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${openAccordion === category ? 'rotate-180' : ''}`} />
                            </button>
                            <div
                            id={`section-content-${category}`}
                            className={`overflow-hidden transition-all duration-300 ease-in-out bg-background dark:bg-black/20 ${openAccordion === category ? 'max-h-[3000px]' : 'max-h-0'}`}
                            >
                              <ul className="divide-y divide-border dark:divide-dark-border">
                                {acts.map((act) => renderActItem(act, category))}
                              </ul>
                            </div>
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