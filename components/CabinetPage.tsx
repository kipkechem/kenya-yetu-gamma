import React, { useState } from 'react';
import { ministries } from '../data/ministries';
import type { Ministry } from '../types';
import { ChevronDownIcon, HierarchyIcon, ExternalLinkIcon } from './icons';
import { categorizedCorporationsData } from '../data/state-corporations';

// Create a map for efficient URL lookup from all corporation categories
const allCorporations = categorizedCorporationsData.flatMap(category => category.corporations);
const entityUrlMap = new Map(allCorporations.map(corp => [corp.name, corp.url]));

const MinistryNode: React.FC<{ ministry: Ministry; isExpanded: boolean; onToggle: () => void; }> = ({ ministry, isExpanded, onToggle }) => {
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
          <div className="w-full space-y-4 flex flex-col items-center pt-6">
            <div className="bg-primary-light/50 dark:bg-dark-primary-light/50 p-4 rounded-lg custom-shadow w-11/12 text-center z-10">
              <p className="font-semibold text-sm text-primary dark:text-dark-primary">{ministry.cabinetSecretary}</p>
            </div>

            {ministry.principalSecretaries.map((ps, index) => (
              <div key={index} className="bg-gray-100 dark:bg-dark-surface/50 p-4 rounded-lg custom-shadow w-11/12 text-center z-10">
                 <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{ps.department}</p>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{ps.title}</p>
              </div>
            ))}
            
            {isExpanded && ministry.mandatedEntities && ministry.mandatedEntities.length > 0 && (
              <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg custom-shadow w-11/12 text-center z-10">
                <h4 className="font-bold text-sm text-gray-600 dark:text-gray-300 mb-2 border-b border-gray-200 dark:border-gray-600 pb-2">Mandated Public Entities</h4>
                <ul className="text-left space-y-1.5">
                  {ministry.mandatedEntities.sort((a,b) => a.localeCompare(b)).map((entity, index) => {
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

    const handleToggle = (ministryName: string) => {
        setExpandedMinistry(prev => (prev === ministryName ? null : ministryName));
    };

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
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        An interactive organizational chart of the National Executive. Click a ministry to see its structure and mandated public entities.
                    </p>
                </header>

                <main className="flex flex-col items-center gap-8 pb-12">
                    {executiveOffices.map((ministry) => (
                        <React.Fragment key={ministry.name}>
                            <MinistryNode
                                ministry={ministry}
                                isExpanded={expandedMinistry === ministry.name}
                                onToggle={() => handleToggle(ministry.name)}
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
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CabinetPage;