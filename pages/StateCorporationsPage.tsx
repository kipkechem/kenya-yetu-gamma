import React, { useState, useMemo, useEffect } from 'react';
import { BuildingLibraryIcon, ChevronDownIcon } from '../components/icons';
import type { Ministry, StateCorporation, StateCorporationCategory } from '../types/index';
import { getCachedData, setCachedData } from '../utils/cache';

const CorporationCard: React.FC<{ corporation: StateCorporation; ministryName?: string }> = ({ corporation, ministryName }) => (
  <a 
    href={corporation.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-background dark:bg-dark-surface/50 p-6 rounded-2xl custom-shadow-lg transition-transform transform hover:-translate-y-1 hover:custom-shadow-xl h-full"
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
          <h3 className="text-base font-bold text-on-surface dark:text-dark-on-surface">{corporation.name}</h3>
          {ministryName && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{ministryName}</p>
          )}
      </div>
      {corporation.url && corporation.url !== '#' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{corporation.description}</p>
  </a>
);

const StateCorporationsPage: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categorizedCorporationsData, setCategorizedCorporationsData] = useState<StateCorporationCategory[] | null>(null);
  const [ministries, setMinistries] = useState<Ministry[] | null>(null);

  useEffect(() => {
    const loadData = async () => {
        const corporationsModule = await import('../data/state-corporations');
        const ministriesModule = await import('../data/ministries');
        setCategorizedCorporationsData(corporationsModule.categorizedCorporationsData);
        setMinistries(ministriesModule.ministries);
    };
    loadData();
  }, []);
  
  // Create a map of entity names to their parent ministry
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
    const allEntities = categorizedCorporationsData.flatMap(cat => cat.corporations);
    const totalEntities = allEntities.length;
    const totalCategories = categorizedCorporationsData.length;

    const counts: { [key: string]: number } = {};
    const entityTypeKeywords: { [key: string]: string[] } = {
      'state corporations': ['corporation'],
      'authorities': ['authority'],
      'boards': ['board'],
      'services': ['service'],
      'institutes': ['institute'],
      'commissions': ['commission'],
      'agencies': ['agency'],
      'councils': ['council'],
      'funds': ['fund'],
      'companies': ['company'],
      'organizations': ['organization', 'kalro', 'kemri'], // classify research orgs
      'educational bodies': ['university', 'college', 'school', 'foundation'],
      'bureaus': ['bureau'],
      'hospitals': ['hospital'],
    };
    
    const unclassifiedEntities: StateCorporation[] = [];

    allEntities.forEach(entity => {
      let classified = false;
      const entityNameLower = entity.name.toLowerCase();
      for (const type in entityTypeKeywords) {
        if (entityTypeKeywords[type].some(keyword => entityNameLower.includes(keyword))) {
          counts[type] = (counts[type] || 0) + 1;
          classified = true;
          break;
        }
      }
      if (!classified) {
        unclassifiedEntities.push(entity);
      }
    });

    if (unclassifiedEntities.length > 0) {
        counts['other public bodies'] = unclassifiedEntities.length;
    }

    const descriptionParts = Object.entries(counts)
      .filter(([, count]) => count > 0)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([type, count]) => `${count} ${type}`);
      
    let entitiesBreakdown = '';
    if (descriptionParts.length > 1) {
        entitiesBreakdown = descriptionParts.slice(0, -1).join(', ') + `, and ${descriptionParts.slice(-1)}`;
    } else if (descriptionParts.length === 1) {
        entitiesBreakdown = `${descriptionParts[0]}`;
    }

    return { descriptionText: `This page provides an overview of ${totalEntities} public entities across ${totalCategories} sectors. Discover the mandates of various national, regional, and county-level bodies—including ${entitiesBreakdown}—and learn about their role in public service delivery and national development.` };
  }, [categorizedCorporationsData]);
  
  const allCorporationsWithMinistry = useMemo(() => {
    if (!categorizedCorporationsData) return [];
    return categorizedCorporationsData.flatMap(category => 
        category.corporations.map(corp => ({
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
      (corp.ministryName && corp.ministryName.toLowerCase().includes(lowercasedTerm))
    );
  }, [searchTerm, allCorporationsWithMinistry]);


  const toggleCategory = (categoryName: string) => {
    setOpenCategory(prev => (prev === categoryName ? null : categoryName));
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim()) {
        setOpenCategory(null); // Close accordions when searching
    }
  };
  
  if (!categorizedCorporationsData) {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-dark-primary"></div>
        </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <BuildingLibraryIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Public Bodies & Entities</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            {descriptionText}
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
              placeholder="Search entities by name, description, or ministry..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-full py-3 pl-12 pr-4 text-on-surface dark:text-dark-on-surface placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent custom-shadow"
              aria-label="Search for an entity"
            />
          </div>
        </div>

        {searchTerm.trim() ? (
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCorporations.length > 0 ? (
                    filteredCorporations.map(corporation => (
                        <CorporationCard 
                            key={corporation.name} 
                            corporation={corporation}
                            ministryName={corporation.ministryName}
                        />
                    ))
                ) : (
                    <div className="md:col-span-2 text-center py-16">
                        <p className="text-gray-500 dark:text-gray-400">No entities found matching your search.</p>
                    </div>
                )}
                </div>
            </section>
        ) : (
            <section className="space-y-4">
            {categorizedCorporationsData.map(category => (
                <div key={category.categoryName} className="bg-surface dark:bg-dark-surface rounded-2xl custom-shadow-lg overflow-hidden transition-all duration-300">
                <button
                    onClick={() => toggleCategory(category.categoryName)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75"
                    aria-expanded={openCategory === category.categoryName}
                >
                    <h2 className="text-xl font-bold text-on-surface dark:text-dark-on-surface">{category.categoryName}</h2>
                    <ChevronDownIcon
                    className={`h-6 w-6 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${openCategory === category.categoryName ? 'rotate-180' : ''}`}
                    />
                </button>
                <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden`}
                    style={{ maxHeight: openCategory === category.categoryName ? '3000px' : '0px' }}
                >
                    <div className="px-6 pb-6 border-t border-border dark:border-dark-border">
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {category.corporations.map(corporation => {
                            const ministryName = entityToMinistryMap.get(corporation.name);
                            return (
                                <CorporationCard 
                                    key={corporation.name} 
                                    corporation={corporation}
                                    ministryName={ministryName}
                                />
                            )
                        })}
                    </div>
                    </div>
                </div>
