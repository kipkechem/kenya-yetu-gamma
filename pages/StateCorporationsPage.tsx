
import React, { useState, useMemo } from 'react';
import { BuildingLibraryIcon, ChevronDownIcon } from '../components/icons';
import type { Ministry, StateCorporation, StateCorporationCategory } from '../types/index';
import Highlight from '../components/Highlight';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { useLazyData } from '../hooks/useLazyData';

const CorporationCard: React.FC<{ corporation: StateCorporation; ministryName?: string; searchTerm?: string }> = ({ corporation, ministryName, searchTerm = '' }) => (
  <a 
    href={corporation.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-background dark:bg-dark-surface/50 p-6 rounded-2xl custom-shadow-lg transition-transform transform hover:-translate-y-1 hover:custom-shadow-xl h-full flex flex-col"
  >
    <div className="flex justify-between items-start mb-2">
      <div className="flex-1">
          <h3 className="text-base font-bold text-on-surface dark:text-dark-on-surface">
            <Highlight text={corporation.name} highlight={searchTerm} />
          </h3>
          {ministryName && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                 <Highlight text={ministryName} highlight={searchTerm} />
              </p>
          )}
          {corporation.head && (
            <p className="text-xs text-primary dark:text-dark-primary mt-1 font-medium">
                <Highlight text={corporation.head} highlight={searchTerm} />
            </p>
          )}
      </div>
      {corporation.url && corporation.url !== '#' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </div>
    <div className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
        <Highlight text={corporation.description} highlight={searchTerm} />
    </div>
  </a>
);

const StateCorporationsPage: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: categorizedCorporationsData, isLoading: isCorpLoading, error: corpError, refetch: refetchCorps } = useLazyData<StateCorporationCategory[]>(
      'corporations-data',
      () => import('../data/governance/state-corporations').then(m => m.categorizedCorporationsData)
  );

  const { data: ministries, isLoading: isMinistriesLoading, error: ministriesError, refetch: refetchMinistries } = useLazyData<Ministry[]>(
      'ministries-data',
      () => import('../data/governance/ministries').then(m => m.ministries)
  );

  const entityToMinistryMap = useMemo(() => {
    if (!ministries) return new Map();
    const map = new Map<string, string>();
    ministries.forEach(ministry => {
      if (ministry.mandatedEntities) {
        ministry.mandatedEntities.forEach(entity => {
          map.set(entity, ministry.name);
        });
      }
    });
    return map;
  }, [ministries]);

  const { descriptionText } = useMemo(() => {
    if (!categorizedCorporationsData) return { descriptionText: '' };
    const allEntities = categorizedCorporationsData.flatMap(cat => cat.corporations || []);
    const totalEntities = allEntities.length;
    const totalCategories = categorizedCorporationsData.length;
    return { descriptionText: `This page provides an overview of ${totalEntities} public bodies across ${totalCategories} sectors. Discover the mandates of various national, regional, and county-level entities and learn about their role in public service delivery.` };
  }, [categorizedCorporationsData]);
  
  const allCorporationsWithMinistry = useMemo(() => {
    if (!categorizedCorporationsData) return [];
    return categorizedCorporationsData.flatMap(category => 
        (category.corporations || []).map(corp => ({
            ...corp,
            ministryName: entityToMinistryMap.get(corp.name)
        }))
    );
  }, [categorizedCorporationsData, entityToMinistryMap]);

  const filteredCorporations = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowercasedTerm = searchTerm.toLowerCase();
    return allCorporationsWithMinistry.filter(corp => 
      corp.name.toLowerCase().includes(lowercasedTerm) ||
      corp.description.toLowerCase().includes(lowercasedTerm) ||
      (corp.ministryName && corp.ministryName.toLowerCase().includes(lowercasedTerm)) ||
      (corp.head && corp.head.toLowerCase().includes(lowercasedTerm))
    );
  }, [searchTerm, allCorporationsWithMinistry]);

  if (isCorpLoading || isMinistriesLoading) return <LoadingSpinner />;
  if (corpError || ministriesError || !categorizedCorporationsData) return <ErrorDisplay message="Failed to load state corporations data." onRetry={() => { refetchCorps(); refetchMinistries(); }} />;

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <BuildingLibraryIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Public Bodies & Entities</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">{descriptionText}</p>
        </header>
        <div className="mb-8 py-4 -mx-4 px-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg></div>
            <input type="text" placeholder="Search entities..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="block w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-full py-3 pl-12 pr-10 text-on-surface dark:text-dark-on-surface placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary custom-shadow" />
          </div>
        </div>
        {searchTerm.trim() ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{filteredCorporations.map(c => <CorporationCard key={c.name} corporation={c} ministryName={c.ministryName} searchTerm={searchTerm} />)}</div>
        ) : (
            <div className="space-y-4">{categorizedCorporationsData && categorizedCorporationsData.map(category => (
                <div key={category.categoryName} className="bg-surface dark:bg-dark-surface rounded-2xl custom-shadow-lg overflow-hidden transition-all duration-300">
                    <button onClick={() => setOpenCategory(openCategory === category.categoryName ? null : category.categoryName)} className="w-full flex justify-between items-center p-6 text-left focus:outline-none"><h2 className="text-xl font-bold text-on-surface dark:text-dark-on-surface">{category.categoryName}</h2><ChevronDownIcon className={`h-6 w-6 text-gray-500 transition-transform ${openCategory === category.categoryName ? 'rotate-180' : ''}`} /></button>
                    {openCategory === category.categoryName && <div className="px-6 pb-6 border-t border-border dark:border-dark-border"><div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">{category.corporations?.map(corp => <CorporationCard key={corp.name} corporation={corp} ministryName={entityToMinistryMap.get(corp.name)} />)}</div></div>}
                </div>
            ))}</div>
        )}
      </div>
    </div>
  );
};

export default StateCorporationsPage;
