import React, { useState, useMemo } from 'react';
import { BuildingLibraryIcon, ChevronDownIcon, ExternalLinkIcon, FileTextIcon } from './icons';
import { countyLawsData } from '../data/county-laws';
import type { CountyLegislation, CountyLaw } from '../types';
import Highlight from './Highlight';

const CountyLawsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCounties, setOpenCounties] = useState<Set<string>>(new Set());

  const isSearching = searchTerm.trim().length > 0;

  const filteredData = useMemo(() => {
    if (!isSearching) {
      return countyLawsData;
    }

    const lowercasedTerm = searchTerm.toLowerCase();

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
  }, [searchTerm, isSearching]);

  const toggleCounty = (countyName: string) => {
    setOpenCounties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(countyName)) newSet.delete(countyName);
      else newSet.add(countyName);
      return newSet;
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const renderLawList = (laws: CountyLaw[], originalLaws: CountyLaw[], lawType: string) => {
    if (laws.length === 0) {
      if (isSearching) {
        return <p className="text-sm text-gray-500 dark:text-gray-400 italic">No matching {lawType} found.</p>;
      }
      if (originalLaws.length === 0) {
        return <p className="text-sm text-gray-500 dark:text-gray-400 italic">No {lawType} available.</p>;
      }
    }
    
    return (
        <ul className="space-y-2">
            {laws.map(law => (
                <li key={law.name}>
                    <a href={law.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start text-sm text-primary dark:text-dark-primary hover:underline">
                        <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                        <span><Highlight text={law.name} highlight={searchTerm} /></span>
                        <ExternalLinkIcon className="h-3.5 w-3.5 ml-1.5 mt-1 flex-shrink-0 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </li>
            ))}
        </ul>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <BuildingLibraryIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">County Laws</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            A repository of legislation enacted by the 47 county assemblies, sourced from Kenya Law.
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
              placeholder="Search by county, act, or bill..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-full py-3 pl-12 pr-4 text-on-surface dark:text-dark-on-surface placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent custom-shadow"
              aria-label="Search by county, act, or bill name"
            />
          </div>
        </div>

        <div className="space-y-2">
          {filteredData.length > 0 ? (
            filteredData.map(county => {
                const isCountyOpen = isSearching || openCounties.has(county.countyName);
                const originalCountyData = countyLawsData.find(c => c.countyName === county.countyName);

                return (
                    <div key={county.countyName} className="bg-surface dark:bg-dark-surface rounded-xl custom-shadow-lg overflow-hidden transition-all duration-300">
                        <button
                          onClick={() => toggleCounty(county.countyName)}
                          className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          aria-expanded={isCountyOpen}
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
                                        {renderLawList(county.acts, originalCountyData?.acts || [], 'Acts')}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-on-surface dark:text-dark-on-surface mb-2">Bills</h4>
                                        {renderLawList(county.bills, originalCountyData?.bills || [], 'Bills')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
          ) : (
             <div className="text-center py-16 bg-surface dark:bg-dark-surface rounded-2xl custom-shadow-lg">
                <h3 className="text-xl font-medium text-on-surface dark:text-dark-on-surface">No Results Found</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Your search for "{searchTerm}" did not match any counties or laws.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountyLawsPage;