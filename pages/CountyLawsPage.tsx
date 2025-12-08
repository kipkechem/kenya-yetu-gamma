
import React, { useState, useMemo, useEffect, useDeferredValue } from 'react';
import { BuildingLibraryIcon, ChevronDownIcon, ExternalLinkIcon, FileTextIcon, BookOpenIcon, ChevronDoubleRightIcon, ScaleIcon } from '../components/icons';
import type { CountyLegislation, CountyLaw, County } from '../types/index';
import Highlight from '../components/Highlight';
import { dispatchNavigate } from '../utils/navigation';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { useLazyData } from '../hooks/useLazyData';

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
  const deferredSearchTerm = useDeferredValue(searchTerm);
  
  const [selectedCountyName, setSelectedCountyName] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['devolution-laws']));

  // Lazy load the consolidated county laws
  const { data: countyLawsData, isLoading: isCountyLoading, error: countyError, refetch: refetchCountyLaws } = useLazyData<CountyLegislation[]>(
      'county-laws-data',
      () => import('../data/legislation/county-laws').then(m => m.countyLawsData),
      [],
      { skipCache: false } 
  );

  const { data: devolutionLawsData, isLoading: isDevolutionLoading, error: devolutionError, refetch: refetchDevolutionLaws } = useLazyData<CountyLaw[]>(
      'devolution-laws-data',
      () => import('../data/legislation/devolution-laws').then(m => m.devolutionLawsData)
  );

  const { data: countiesData, isLoading: isCountiesLoading, error: countiesError, refetch: refetchCounties } = useLazyData<County[]>(
    'counties-data',
    () => import('../data/counties').then(m => m.countiesData)
  );

  useEffect(() => {
      if (initialSearchTerm) {
          setSearchTerm(initialSearchTerm);
      }
  }, [initialSearchTerm]);

  const isSearching = deferredSearchTerm.trim().length > 0;
  const lowercasedTerm = deferredSearchTerm.toLowerCase();

  const handleRetry = () => {
      if (countyError) refetchCountyLaws();
      if (devolutionError) refetchDevolutionLaws();
      if (countiesError) refetchCounties();
  };

  const filteredDevolutionLaws = useMemo(() => {
    if (!devolutionLawsData) return [];
    if (!isSearching) return devolutionLawsData;
    return devolutionLawsData.filter(law => law.name.toLowerCase().includes(lowercasedTerm));
  }, [lowercasedTerm, isSearching, devolutionLawsData]);

  const filteredCountyData = useMemo(() => {
    if (!countyLawsData) return [];
    if (!isSearching) return []; 

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

  const visibleCounties = useMemo(() => {
      if (!countiesData) return [];
      return countiesData
        .filter(c => c.name.toLowerCase().includes(lowercasedTerm))
        .sort((a,b) => a.name.localeCompare(b.name));
  }, [lowercasedTerm, countiesData]);

  const selectedCountyLaws = useMemo(() => {
      if (!selectedCountyName || !countyLawsData) return null;
      return countyLawsData.find(c => c.countyName.toLowerCase() === selectedCountyName.toLowerCase());
  }, [selectedCountyName, countyLawsData]);

  const filteredSelectedCountyLaws = useMemo(() => {
      if (!selectedCountyLaws) return { acts: [], bills: [] };
      if (!isSearching) return selectedCountyLaws;

      return {
          acts: selectedCountyLaws.acts.filter(l => l.name.toLowerCase().includes(lowercasedTerm)),
          bills: selectedCountyLaws.bills.filter(l => l.name.toLowerCase().includes(lowercasedTerm))
      };
  }, [selectedCountyLaws, lowercasedTerm, isSearching]);

  const toggleItem = (itemName: string) => {
    if (isSearching) return; 
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
        const parts = url.split(':'); 
        const viewAndHash = parts[1].split('#'); 
        const view = viewAndHash[0] as 'constitution'; 
        const hash = `#${viewAndHash[1]}`;

        window.location.hash = hash;
        dispatchNavigate({ view });
    }
  };

  const renderLawList = (laws: CountyLaw[], originalLaws: CountyLaw[] | undefined, type: string) => {
    const list = isSearching ? laws : originalLaws || [];
    if (list.length === 0) {
        if (!isSearching && !originalLaws?.length) return <p className="text-sm text-gray-500 italic">No {type} available.</p>;
        return null; 
    }
    return (
        <ul className="space-y-2">
            {list.map((law, idx) => (
                <li key={`${law.name}-${idx}`}>
                    <a href={law.url} target={law.url.startsWith('#') ? '_self' : '_blank'} rel="noopener noreferrer" onClick={(e) => handleLawClick(e, law.url)} className="group inline-flex items-start text-sm text-primary dark:text-dark-primary hover:underline">
                        <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <span><Highlight text={law.name} highlight={deferredSearchTerm} /></span>
                        {!law.url.startsWith('#') && <ExternalLinkIcon className="h-3 w-3 ml-1 text-gray-400 opacity-0 group-hover:opacity-100" />}
                    </a>
                </li>
            ))}
        </ul>
    );
  };

  const renderDetailedLawList = (laws: CountyLaw[], title: string) => {
    if (!laws || laws.length === 0) return null;
    return (
        <div className="mb-8">
            <h4 className="font-bold text-lg text-on-surface dark:text-dark-on-surface mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
                <FileTextIcon className="h-5 w-5 mr-2 text-primary dark:text-dark-primary" />
                {title} <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">{laws.length}</span>
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {laws.map((law, idx) => (
                    <li key={`${law.name}-${idx}`}>
                        <a href={law.url} target={law.url.startsWith('#') ? '_self' : '_blank'} rel="noopener noreferrer" onClick={(e) => handleLawClick(e, law.url)} className="flex items-start p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 hover:border-primary/50 dark:hover:border-dark-primary/50 hover:shadow-md transition-all group h-full">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors line-clamp-2">
                                    <Highlight text={law.name} highlight={deferredSearchTerm} />
                                </p>
                            </div>
                            {!law.url.startsWith('#') && <ExternalLinkIcon className="h-4 w-4 ml-2 text-gray-400 group-hover:text-primary" />}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
  };

  if (isCountyLoading || isDevolutionLoading || isCountiesLoading) return <LoadingSpinner />;
  if (countyError || devolutionError || countiesError) return <ErrorDisplay message="Failed to load laws data." onRetry={handleRetry} />;

  if (selectedCountyName) {
      return (
          <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
              <div className="max-w-5xl mx-auto">
                  <button onClick={() => { setSelectedCountyName(null); setSearchTerm(''); }} className="mb-6 inline-flex items-center px-4 py-2 bg-surface dark:bg-dark-surface rounded-full text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-dark-primary shadow-sm border border-gray-200 dark:border-gray-700">
                      <ChevronDoubleRightIcon className="h-4 w-4 mr-2 rotate-180" /> Back to Counties
                  </button>
                  <header className="mb-8 text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                          <div className="h-16 w-16 rounded-2xl bg-primary-light dark:bg-dark-primary-light flex items-center justify-center text-primary dark:text-dark-primary"><ScaleIcon className="h-8 w-8" /></div>
                          <div><h1 className="text-3xl font-extrabold text-on-surface dark:text-dark-on-surface">{selectedCountyName} County Laws</h1></div>
                      </div>
                      <div className="mt-6 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                            </div>
                            <input type="text" placeholder={`Search within ${selectedCountyName} laws...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl py-3 pl-10 px-4 focus:outline-none focus:ring-2 focus:ring-primary custom-shadow" />
                      </div>
                  </header>
                  <div className="animate-fade-in">
                      {selectedCountyLaws ? (
                          <>
                            {renderDetailedLawList(filteredSelectedCountyLaws.acts, "Acts")}
                            {renderDetailedLawList(filteredSelectedCountyLaws.bills, "Legal Notices")}
                            {filteredSelectedCountyLaws.acts.length === 0 && filteredSelectedCountyLaws.bills.length === 0 && <p className="text-center text-gray-500">No laws found matching "{searchTerm}".</p>}
                          </>
                      ) : <p className="text-center text-gray-500">No data available.</p>}
                  </div>
              </div>
          </div>
      );
  }

  const devolutionLawsKey = 'devolution-laws';
  const isDevolutionOpenInAccordion = isSearching ? filteredDevolutionLaws.length > 0 : openItems.has(devolutionLawsKey);

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl"><BuildingLibraryIcon className="h-8 w-8 text-primary dark:text-dark-primary" /></div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">County Laws</h1>
        </header>

        <div className="max-w-2xl mx-auto mb-12 relative z-10">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
            <input type="text" placeholder="Search by county name or law title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-full py-3.5 pl-12 pr-4 text-on-surface dark:text-dark-on-surface placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary custom-shadow-lg" />
        </div>

        {!isSearching && (
            <div className="mb-10">
                <div className="bg-surface dark:bg-dark-surface rounded-xl custom-shadow-lg overflow-hidden transition-all duration-300">
                    <button onClick={() => toggleItem(devolutionLawsKey)} className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <h3 className="font-semibold text-lg">National Devolution Framework</h3>
                        <ChevronDownIcon className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${isDevolutionOpenInAccordion ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden`} style={{ maxHeight: isDevolutionOpenInAccordion ? '2000px' : '0px' }}>
                        <div className="px-4 pb-4 border-t border-border dark:border-dark-border/50 mt-4">
                            {renderLawList(filteredDevolutionLaws, devolutionLawsData, "Laws")}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {isSearching && filteredCountyData.length > 0 && (
             <div className="space-y-4">
                <h2 className="text-xl font-bold text-on-surface dark:text-dark-on-surface mb-4">Search Results</h2>
                {filteredCountyData.map(county => (
                    <div key={county.countyName} className="bg-surface dark:bg-dark-surface rounded-xl custom-shadow-lg p-4">
                         <div className="flex justify-between items-center mb-2">
                             <h3 className="font-semibold text-lg"><Highlight text={`${county.countyName} County`} highlight={deferredSearchTerm} /></h3>
                             <button onClick={() => setSelectedCountyName(county.countyName)} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">View All</button>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div><h4 className="font-bold text-sm mb-1">Acts</h4>{renderLawList(county.acts, [], 'Acts')}</div>
                             <div><h4 className="font-bold text-sm mb-1">Legal Notices</h4>{renderLawList(county.bills, [], 'Legal Notices')}</div>
                         </div>
                    </div>
                ))}
             </div>
        )}

        {!isSearching && (
            <>
                <div className="flex items-center justify-between mb-6 px-2 mt-12">
                    <h2 className="text-xl font-bold text-on-surface dark:text-dark-on-surface">Browse by County</h2>
                    <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{visibleCounties.length} Counties</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-12">
                    {visibleCounties.map(county => (
                        <CountyTile key={county.code} name={county.name} count={countyLawsData?.find(c => c.countyName.toLowerCase() === county.name.toLowerCase())?.acts.length} onClick={() => setSelectedCountyName(county.name)} />
                    ))}
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default CountyLawsPage;
