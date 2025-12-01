
import React, { useState, useMemo, useEffect } from 'react';
import { BuildingLibraryIcon, ChevronDownIcon, ExternalLinkIcon, FileTextIcon, BookOpenIcon } from '../components/icons';
import type { CountyLegislation, CountyLaw } from '../types/index';
import Highlight from '../components/Highlight';
import { dispatchNavigate } from '../utils/navigation';

interface CountyLawsPageProps {
    initialSearchTerm?: string;
}

const CountyLawsPage: React.FC<CountyLawsPageProps> = ({ initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['devolution-laws']));
  const [countyLawsData, setCountyLawsData] = useState<CountyLegislation[] | null>(null);
  const [devolutionLawsData, setDevolutionLawsData] = useState<CountyLaw[] | null>(null);

  useEffect(() => {
    const loadData = async () => {
        const module = await import('../data/county-laws');
        setCountyLawsData(module.countyLawsData);
        setDevolutionLawsData(module.devolutionLawsData);
    };
    loadData();
  }, []);

  useEffect(() => {
      if (initialSearchTerm) {
          setSearchTerm(initialSearchTerm);
      }
  }, [initialSearchTerm]);

  const isSearching = searchTerm.trim().length > 0;
  const lowercasedTerm = searchTerm.toLowerCase();

  const filteredDevolutionLaws = useMemo(() => {
    if (!devolutionLawsData) return [];
    if (!isSearching) return devolutionLawsData;
    return devolutionLawsData.filter(law => law.name.toLowerCase().includes(lowercasedTerm));
  }, [lowercasedTerm, isSearching, devolutionLawsData]);

  const filteredCountyData = useMemo(() => {
    if (!countyLawsData) return [];
    if (!isSearching) {
      return countyLawsData;
    }

    return countyLawsData
      .map(county => {
        const countyNameMatches = county.countyName.toLowerCase().includes(lowercasedTerm);
        const matchingActs = county.acts.filter(act => act.name.toLowerCase().includes(lowercasedTerm));
        const matchingBills = county.bills.filter(bill => bill.name.toLowerCase().includes(lowercasedTerm));

        if (countyNameMatches || matchingActs.length > 0 || matchingBills.length > 0) {
          return {
            ...county,
            acts: countyNameMatches ? county.acts : matchingActs,
            bills: countyNameMatches ? county.bills : matchingBills,
          };
        }
        return null;
      })
      .filter((c): c is CountyLegislation => c !== null);
  }, [lowercasedTerm, isSearching, countyLawsData]);

  const toggleItem = (itemName: string) => {
    if (isSearching) return; // Don't allow toggling when searching
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) newSet.delete(itemName);
      else newSet.add(itemName);
      return newSet;
    });
  };
  
  const handleLawClick = (e: React.MouseEvent, url: string) => {
    if (url.startsWith('#internal:')) {
        e.preventDefault();
        const parts = url.split(':'); // #internal, constitution#chapter-11
        const viewAndHash = parts[1].split('#'); // constitution, chapter-11
        const view = viewAndHash[0] as 'constitution'; 
        const hash = `#${viewAndHash[1]}`;

        window.location.hash = hash;
        dispatchNavigate({ view });
    }
    // External links will proceed as normal due to target="_blank"
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const renderLawList = (laws: CountyLaw[], originalLaws: CountyLaw[] | undefined, lawType: string) => {
    const lawsToRender = isSearching ? laws : originalLaws || [];

    if (lawsToRender.length === 0) {
      if (isSearching && laws.length === 0) {
          return <p className="text-sm text-gray-500 dark:text-gray-400 italic">No matching {lawType} found.</p>;
      }
      if (!isSearching && (!originalLaws || originalLaws.length === 0)) {
          return <p className="text-sm text-gray-500 dark:text-gray-400 italic">No {lawType} available.</p>;
      }
    }
    
    return (
        <ul className="space-y-2">
            {lawsToRender.map(law => (
                <li key={law.name}>
                    <a 
                        href={law.url} 
                        target={law.url.startsWith('#internal:') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        onClick={(e) => handleLawClick(e, law.url)}
                        className="group inline-flex items-start text-sm text-primary dark:text-dark-primary hover:underline"
                    >
                        {law.url.startsWith('#internal:') ? 
                            <BookOpenIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                            : <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-500" />}
                        <span><Highlight text={law.name} highlight={searchTerm} /></span>
                        {!law.url.startsWith('#internal:') && (
                           <ExternalLinkIcon className="h-3.5 w-3.5 ml-1.5 mt-1 flex-shrink-0 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                    </a>
                </li>
            ))}
        </ul>
    );
  }
  
  if (!countyLawsData || !devolutionLawsData) {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-dark-primary"></div>
        </div>
    );
  }

  const hasSearchResults = filteredDevolutionLaws.length > 0 || filteredCountyData.length > 0;
  const devolutionLawsKey = 'devolution-laws';
  const isDevolutionOpen = isSearching ? filteredDevolutionLaws.length > 0 : openItems.has(devolutionLawsKey);

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <BuildingLibraryIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">County Laws</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Explore the national legal framework for devolution and the specific legislation enacted by the 47 county assemblies. Sourced from Kenya Law.
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
              placeholder="Search national or county laws..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-full py-3 pl-12 pr-4 text-on-surface dark:text-dark-on-surface placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent custom-shadow"
              aria-label="Search by county, act, or bill name"
            />
          </div>
        </div>

        <div className="space-y-4">
            {(isSearching ? filteredDevolutionLaws.length > 0 : true) && (
                <div className="bg-surface dark:bg-dark-surface rounded-xl custom-shadow-lg overflow-hidden transition-all duration-300">
                    <button
                        onClick={() => toggleItem(devolutionLawsKey)}
                        className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-expanded={isDevolutionOpen}
                        disabled={isSearching}
                    >
                        <h3 className="font-semibold text-lg">National Devolution Framework</h3>
                        <ChevronDownIcon className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${isDevolutionOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden`}
                        style={{ maxHeight: isDevolutionOpen ? '2000px' : '0px' }}
                    >
                        <div className="px-4 pb-4 border-t border-border dark:border-dark-border/50">
                            <div className="mt-4">
                                {renderLawList(filteredDevolutionLaws, devolutionLawsData, "Laws")}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isSearching && (
                <h2 className="text-2xl font-bold text-on-surface dark:text-dark-on-surface pt-8 pb-2 text-center">
                    County-Specific Legislation
                </h2>
            )}

          {filteredCountyData.length > 0 ? (
            filteredCountyData.map(county => {
                const isCountyOpen = isSearching || openItems.has(county.countyName);
                const originalCountyData = isSearching ? countyLawsData.find(c => c.countyName === county.countyName) : county;

                return (
                    <div key={county.countyName} className="bg-surface dark:bg-dark-surface rounded-xl custom-shadow-lg overflow-hidden transition-all duration-300">
                        <button
                          onClick={() => toggleItem(county.countyName)}
                          className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          aria-expanded={isCountyOpen}
                          disabled={isSearching}
                        >
                            <h3 className="font-semibold text-lg"><Highlight text={`${county.countyName} County`} highlight={searchTerm} /></h3>
                            <ChevronDownIcon className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${isCountyOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden`}
                            style={{ maxHeight: isCountyOpen ? '2000px' : '0px' }}
                        >
                            <div className="px-4 pb-4 border-t border-border dark:border-dark-border/50">
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <div>
                                        <h4 className="font-bold text-on-surface dark:text-dark-on-surface mb-2">Acts</h4>
                                        {renderLawList(county.acts, originalCountyData?.acts, 'Acts')}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-on-surface dark:text-dark-on-surface mb-2">Bills</h4>
                                        {renderLawList(county.bills, originalCountyData?.bills, 'Bills')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
          ) : isSearching && !hasSearchResults ? (
             <div className="text-center py-16 bg-surface dark:bg-dark-surface rounded-2xl custom-shadow-lg">
                <h3 className="text-xl font-medium text-on-surface dark:text-dark-on-surface">No Results Found</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Your search for "{searchTerm}" did not match any national or county laws.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CountyLawsPage;
