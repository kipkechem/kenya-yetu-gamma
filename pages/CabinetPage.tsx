
import React, { useState, useEffect, useMemo } from 'react';
import type { Ministry, StateCorporationCategory } from '../types/index';
import { ChevronDownIcon, HierarchyIcon, ExternalLinkIcon } from '../components/icons';
import { getCachedData, setCachedData } from '../utils/cache';

const MinistryNode: React.FC<{ ministry: Ministry; isExpanded: boolean; onToggle: () => void; entityUrlMap: Map<string, string> }> = ({ ministry, isExpanded, onToggle, entityUrlMap }) => {
  const [loadedEntities, setLoadedEntities] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isExpanded && loadedEntities === null) {
      setIsLoading(true);
      // Simulate a dynamic load to improve user experience
      setTimeout(() => {
        setLoadedEntities(ministry.mandatedEntities?.sort((a, b) => a.localeCompare(b)) || []);
        setIsLoading(false);
      }, 250);
    } else if (!isExpanded) {
      // Reset when collapsed to allow for re-loading on next expansion
      setLoadedEntities(null);
    }
  }, [isExpanded, ministry.mandatedEntities, loadedEntities]);
  
  return (
    <div className="relative flex justify-center">
      <div className="flex flex-col items-center w-full max-w-xs">
        <button
          onClick={onToggle}
          className="bg-surface dark:bg-dark-surface p-5 rounded-xl custom-shadow-lg w-full text-center group transition-all duration-300 hover:custom-shadow-xl hover:-translate-y-1 z-10"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center justify-center space-x-2">
            <h3 className="font-bold text-on-surface dark:text-dark-on-surface text-base">{ministry.name}</h3>
            {ministry.url && ministry.url !== '#' && (
               <a
                  href={ministry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label={`Visit website for ${ministry.name}`}
                  title={`Visit website for ${ministry.name}`}
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
            )}
          </div>
          <ChevronDownIcon className={`h-5 w-5 mx-auto mt-2 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        <div
          className="w-full transition-all duration-500 ease-in-out overflow-hidden flex flex-col items-center"
          style={{ maxHeight: isExpanded ? '1500px' : '0px', opacity: isExpanded ? 1 : 0 }}
        >
            <div className="w-full flex flex-col items-center pt-6 space-y-4 animate-fade-in">
                {/* Cabinet Secretary */}
                <div className="text-center w-11/12">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary dark:text-dark-primary">Cabinet Secretary</p>
                    <p className="font-semibold text-on-surface dark:text-dark-on-surface">{ministry.cabinetSecretary}</p>
                </div>

                {/* Vertical Connector */}
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

                {/* Principal Secretaries */}
                <div className="w-11/12 text-center bg-gray-50 dark:bg-dark-surface/50 p-4 rounded-lg custom-shadow">
                    <h4 className="font-bold text-sm text-gray-600 dark:text-gray-300 mb-3 border-b border-gray-200 dark:border-gray-600 pb-2">State Departments</h4>
                    <div className="space-y-3">
                        {ministry.principalSecretaries.map((ps, index) => (
                            <div key={index}>
                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{ps.department}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{ps.title}</p>
                                {ps.name && <p className="text-sm font-medium text-primary dark:text-dark-primary">{ps.name}</p>}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Mandated Entities */}
                {isExpanded && ministry.mandatedEntities && ministry.mandatedEntities.length > 0 && (
                    <div className="w-11/12 bg-gray-50 dark:bg-black/20 p-4 rounded-lg custom-shadow text-center">
                        <h4 className="font-bold text-sm text-gray-600 dark:text-gray-300 mb-2 border-b border-gray-200 dark:border-gray-600 pb-2">Mandated Public Entities</h4>
                        {isLoading && (
                            <div className="py-4 text-sm text-gray-500 dark:text-gray-400">Loading...</div>
                        )}
                        {loadedEntities && loadedEntities.length > 0 && (
                            <ul className="text-left space-y-1.5 mt-3">
                                {loadedEntities.map((entity, index) => {
                                    const url = entityUrlMap.get(entity);
                                    const hasLink = url && url !== '#';
                                    return (
                                        <li key={index} className="text-sm text-gray-700 dark:text-gray-400 flex items-start">
                                            <svg className="h-3 w-3 mr-2 mt-1 flex-shrink-0 text-primary dark:text-dark-primary" fill="currentColor" viewBox="0 0 8 8">
                                                <circle cx="4" cy="4" r="3" />
                                            </svg>
                                            {hasLink ? (
                                                <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:underline hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
                                                    <span>{entity}</span>
                                                    <ExternalLinkIcon className="h-3.5 w-3.5 ml-1.5 flex-shrink-0 text-gray-400 dark:text-gray-500"/>
                                                </a>
                                            ) : (
                                                <span>{entity}</span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        {loadedEntities && loadedEntities.length === 0 && (
                            <p className="py-4 text-sm text-gray-500 dark:text-gray-400">No mandated entities listed.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

const CabinetPage: React.FC = () => {
    const [expandedMinistry, setExpandedMinistry] = useState<string | null>(null);
    const [ministries, setMinistries] = useState<Ministry[] | null>(null);
    const [categorizedCorporationsData, setCategorizedCorporationsData] = useState<StateCorporationCategory[] | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const ministriesModule = await import('../data/ministries');
            const corporationsModule = await import('../data/state-corporations');
            setMinistries(ministriesModule.ministries);
            setCategorizedCorporationsData(corporationsModule.categorizedCorporationsData);
        };
        loadData();
    }, []);
    
    const entityUrlMap = useMemo(() => {
        if (!categorizedCorporationsData) return new Map<string, string>();
        const allCorporations = categorizedCorporationsData.flatMap(category => category.corporations);
        return new Map(allCorporations.map(corp => [corp.name, corp.url]));
    }, [categorizedCorporationsData]);

    const handleToggle = (ministryName: string) => {
        setExpandedMinistry(prev => (prev === ministryName ? null : ministryName));
    };
    
    if (!ministries) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-dark-primary"></div>
            </div>
        );
    }

    const executiveOffices = ministries.slice(0, 2);
    const otherMinistries = ministries.slice(2);

    return (
        <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
                        <HierarchyIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Cabinet Structure</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        An interactive organizational chart of the National Executive. This page outlines the structure of 25 ministries and their 54 state departments. Click a ministry to explore its leadership and the 215 public entities under its mandate.
                    </p>
                </header>

                <main className="flex flex-col items-center gap-8 pb-12">
                    {executiveOffices.map((ministry) => (
                        <React.Fragment key={ministry.name}>
                            <MinistryNode
                                ministry={ministry}
                                isExpanded={expandedMinistry === ministry.name}
                                onToggle={() => handleToggle(ministry.name)}
                                entityUrlMap={entityUrlMap}
                            />
                        </React.Fragment>
                    ))}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full max-w-5xl mt-8">
                        {otherMinistries.map(ministry => (
                            <MinistryNode
                                key={ministry.name}
                                ministry={ministry}
                                isExpanded={expandedMinistry === ministry.name}
                                onToggle={() => handleToggle(ministry.name)}
                                entityUrlMap={entityUrlMap}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CabinetPage;
