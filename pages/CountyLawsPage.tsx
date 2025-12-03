
import React, { useState, useMemo, useEffect } from 'react';
import { BuildingLibraryIcon, ChevronDownIcon, ExternalLinkIcon, FileTextIcon, BookOpenIcon, ChevronDoubleRightIcon, ScaleIcon, MapPinIcon } from '../components/icons';
import type { CountyLegislation, CountyLaw } from '../types/index';
import Highlight from '../components/Highlight';
import { dispatchNavigate } from '../utils/navigation';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLazyData } from '../hooks/useLazyData';
import { countiesData } from '../data/counties/index';

interface CountyLawsPageProps {
    initialSearchTerm?: string;
}

const CountyTile: React.FC<{ name: string, count?: number, onClick: () => void }> = ({ name, count, onClick }) => (
    <button
        onClick={onClick}
        className="bg-surface dark:bg-dark-surface p-5 rounded-2xl custom-shadow-lg hover:custom-shadow-xl hover:-translate-y-1 transform-gpu transition-all duration-300 flex flex-col items-center justify-center text-center h-full min-h-[140px] border border-transparent hover:border-primary/20 group"
    >
        <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-3 text-primary dark:text-dark-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <ScaleIcon className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-on-surface dark:text-dark-on-surface mb-1 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">{name}</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
            {count !== undefined ? `${count} Laws` : 'View Laws'}
        </span>
    </button>
);

const CountyLawsPage: React.FC<CountyLawsPageProps> = ({ initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCountyName, setSelectedCountyName] = useState<string | null>(null);
  const [isDevolutionOpen, setIsDevolutionOpen] = useState(false);

  // Load data using the lazy hook
  const { data: countyLawsData, isLoading: isCountyLoading } = useLazyData<CountyLegislation[]>(
      'county-laws-data',
      () => import('../data/county-laws').then(m => m.countyLawsData)
  );

  const { data: devolutionLawsData, isLoading: isDevolutionLoading } = useLazyData<CountyLaw[]>(
      'devolution-laws-data',
      () => import('../data/county-laws').then(m => m.devolutionLawsData)
  );

  useEffect(() => {
      if (initialSearchTerm) {
          setSearchTerm(initialSearchTerm);
      }
  }, [initialSearchTerm]);

  const isSearching = searchTerm.trim().length > 0;
  const lowercasedTerm = searchTerm.toLowerCase();

  // Filtered counties for the grid view (based on name match)
  const visibleCounties = useMemo(() => {
      // Use the imported countiesData for the grid list to ensure all 47 are represented nicely
      // even if laws data is still loading in the background
      return countiesData
        .filter(c => c.name.toLowerCase().includes(lowercasedTerm))
        .sort((a,b) => a.name.localeCompare(b.name));
  }, [lowercasedTerm]);

  // Get laws data specifically for the selected county
  const selectedCountyLaws = useMemo(() => {
      if (!selectedCountyName || !countyLawsData) return null;
      return countyLawsData.find(c => c.countyName.toLowerCase() === selectedCountyName.toLowerCase());
  }, [selectedCountyName, countyLawsData]);

  // Filter laws within the selected county view
  const filteredSelectedCountyLaws = useMemo(() => {
      if (!selectedCountyLaws) return { acts: [], bills: [] };
      if (!isSearching) return selectedCountyLaws;

      return {
          acts: selectedCountyLaws.acts.filter(l => l.name.toLowerCase().includes(lowercasedTerm)),
          bills: selectedCountyLaws.bills.filter(l => l.name.toLowerCase().includes(lowercasedTerm))
      };
  }, [selectedCountyLaws, lowercasedTerm, isSearching]);

  // Global search logic (when not inside a county view)
  const globalSearchResults = useMemo(() => {
      if (!isSearching || selectedCountyName || !countyLawsData) return null;
      
      const results: { county: string; matches: CountyLaw[] }[] = [];
      
      countyLawsData.forEach(county => {
          const matches = [
              ...county.acts.filter(l => l.name.toLowerCase().includes(lowercasedTerm)),
              ...county.bills.filter(l => l.name.toLowerCase().includes(lowercasedTerm))
          ];
          if (matches.length > 0) {
              results.push({ county: county.countyName, matches });
          }
      });
      return results;
  }, [isSearching, selectedCountyName, countyLawsData, lowercasedTerm]);


  const handleLawClick = (e: React.MouseEvent, url: string) => {
    if (url.startsWith('#internal:')) {
        e.preventDefault();
        const parts = url.split(':'); 
        const viewAndHash = parts[1].split('#'); 
        const view = viewAndHash[0] as 'constitution'; 
        const hash = `#${viewAndHash[1]}`;

        window.location.hash = hash;
        dispatchNavigate({ view });
    }
  };

  const renderLawList = (laws: CountyLaw[], title: string) => {
    if (!laws || laws.length === 0) return null;
    return (
        <div className="mb-8">
            <h4 className="font-bold text-lg text-on-surface dark:text-dark-on-surface mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
                <FileTextIcon className="h-5 w-5 mr-2 text-primary dark:text-dark-primary" />
                {title} 
                <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">{laws.length}</span>
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {laws.map((law, idx) => (
                    <li key={`${law.name}-${idx}`}>
                        <a 
                            href={law.url} 
                            target={law.url.startsWith('#internal:') ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            onClick={(e) => handleLawClick(e, law.url)}
                            className="flex items-start p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 hover:border-primary/50 dark:hover:border-dark-primary/50 hover:shadow-md transition-all group h-full"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors line-clamp-2">
                                    <Highlight text={law.name} highlight={searchTerm} />
                                </p>
                            </div>
                            {!law.url.startsWith('#internal:') && (
                                <ExternalLinkIcon className="h-4 w-4 ml-2 text-gray-400 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors mt-0.5" />
                            )}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
  };

  // If specific county is selected, show its details
  if (selectedCountyName) {
      return (
          <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
              <div className="max-w-5xl mx-auto">
                  <button 
                    onClick={() => { setSelectedCountyName(null); setSearchTerm(''); }}
                    className="mb-6 inline-flex items-center px-4 py-2 bg-surface dark:bg-dark-surface rounded-full text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-dark-primary shadow-sm transition-colors border border-gray-200 dark:border-gray-700"
                  >
                      <ChevronDoubleRightIcon className="h-4 w-4 mr-2 rotate-180" /> Back to Counties
                  </button>

                  <header className="mb-8 text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                          <div className="h-16 w-16 rounded-2xl bg-primary-light dark:bg-dark-primary-light flex items-center justify-center text-primary dark:text-dark-primary">
                              <ScaleIcon className="h-8 w-8" />
                          </div>
                          <div>
                            <h1 className="text-3xl font-extrabold text-on-surface dark:text-dark-on-surface">{selectedCountyName} County Laws</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Legislation and bills from the {selectedCountyName} County Assembly.</p>
                          </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                            </div>
                            <input
                                type="text"
                                placeholder={`Search within ${selectedCountyName} laws...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl py-3 pl-10 px-4 focus:outline-none focus:ring-2 focus:ring-primary custom-shadow"
                            />
                        </div>
                      </div>
                  </header>
                  
                  {isCountyLoading ? (
                       <LoadingSpinner />
                  ) : selectedCountyLaws ? (
                      <div className="animate-fade-in">
                          {filteredSelectedCountyLaws.acts.length === 0 && filteredSelectedCountyLaws.bills.length === 0 ? (
                              <div className="text-center py-12 bg-surface dark:bg-dark-surface rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                                  <p className="text-gray-500 dark:text-gray-400">No laws found matching "{searchTerm}".</p>
                              </div>
                          ) : (
                              <>
                                {renderLawList(filteredSelectedCountyLaws.acts, "Acts")}
                                {renderLawList(filteredSelectedCountyLaws.bills, "Bills")}
                              </>
                          )}
                      </div>
                  ) : (
                      <div className="text-center py-12 bg-surface dark:bg-dark-surface rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                          <p className="text-gray-500 dark:text-gray-400">No legislation data available for {selectedCountyName} County.</p>
                      </div>
                  )}
              </div>
          </div>
      );
  }

  // Main View
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <BuildingLibraryIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">County Laws</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Access specific legislation enacted by the 47 county assemblies of Kenya.
          </p>
        </header>

        {/* Main Search */}
        <div className="max-w-2xl mx-auto mb-12 relative z-10">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
            <input
              type="text"
              placeholder="Search by county name or law title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-full py-3.5 pl-12 pr-4 text-on-surface dark:text-dark-on-surface placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary custom-shadow-lg"
            />
        </div>

        {/* Global Search Results (Laws) */}
        {globalSearchResults && globalSearchResults.length > 0 && (
             <div className="mb-12 animate-fade-in">
                 <h2 className="text-xl font-bold text-on-surface dark:text-dark-on-surface mb-4 px-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                    Found {globalSearchResults.reduce((acc, curr) => acc + curr.matches.length, 0)} laws matching "{searchTerm}"
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                     {globalSearchResults.map(result => (
                         <div key={result.county} className="bg-surface dark:bg-dark-surface p-4 rounded-xl custom-shadow border border-primary/10 hover:border-primary/30 transition-colors">
                             <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-primary dark:text-dark-primary">{result.county} County</h3>
                                <button 
                                    onClick={() => setSelectedCountyName(result.county)} 
                                    className="text-xs font-medium bg-primary/10 dark:bg-dark-primary/10 px-2 py-1 rounded text-primary dark:text-dark-primary hover:bg-primary/20 transition-colors"
                                >
                                    View All
                                </button>
                             </div>
                             <ul className="space-y-2">
                                 {result.matches.slice(0, 3).map((law, i) => (
                                     <li key={i} className="text-sm truncate text-gray-700 dark:text-gray-300 flex items-center">
                                         <FileTextIcon className="h-3 w-3 mr-2 text-gray-400 flex-shrink-0" />
                                         <a href={law.url} target="_blank" rel="noreferrer" className="hover:underline hover:text-primary truncate">
                                            <Highlight text={law.name} highlight={searchTerm} />
                                         </a>
                                     </li>
                                 ))}
                                 {result.matches.length > 3 && <li className="text-xs text-gray-500 italic pl-5">+{result.matches.length - 3} more results</li>}
                             </ul>
                         </div>
                     ))}
                 </div>
             </div>
        )}

        {/* Devolution Framework Section */}
        <div className="mb-10">
            <button 
                onClick={() => setIsDevolutionOpen(!isDevolutionOpen)}
                className="w-full flex justify-between items-center bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 p-5 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-surface dark:bg-dark-surface rounded-lg shadow-sm">
                        <BookOpenIcon className="h-6 w-6 text-primary dark:text-dark-primary" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-lg font-bold text-on-surface dark:text-dark-on-surface">National Devolution Framework</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Key national laws governing counties</p>
                    </div>
                </div>
                <ChevronDownIcon className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${isDevolutionOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDevolutionOpen && devolutionLawsData && (
                <div className="mt-4 bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow animate-fade-in border border-gray-100 dark:border-gray-700">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {devolutionLawsData.map((law, idx) => (
                            <li key={idx}>
                                <a 
                                    href={law.url}
                                    target={law.url.startsWith('#') ? '_self' : '_blank'}
                                    rel="noreferrer"
                                    onClick={(e) => handleLawClick(e, law.url)}
                                    className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl text-sm text-gray-700 dark:text-gray-300 transition-colors group"
                                >
                                    <FileTextIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-primary transition-colors mt-0.5" />
                                    <span className="font-medium">{law.name}</span>
                                    {!law.url.startsWith('#') && <ExternalLinkIcon className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 text-gray-400" />}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        {/* Counties Grid */}
        <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-bold text-on-surface dark:text-dark-on-surface">Browse by County</h2>
            <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{visibleCounties.length} Counties</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-12">
            {visibleCounties.map(county => (
                <CountyTile 
                    key={county.code} 
                    name={county.name} 
                    // Safely check for count, defaulting to undefined if data not loaded yet
                    count={countyLawsData?.find(c => c.countyName.toLowerCase() === county.name.toLowerCase())?.acts.length}
                    onClick={() => setSelectedCountyName(county.name)} 
                />
            ))}
            {visibleCounties.length === 0 && (
                <div className="col-span-full py-16 text-center">
                    <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-3">
                        <MapPinIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No counties match your search.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CountyLawsPage;
