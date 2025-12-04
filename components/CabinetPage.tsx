
import React, { useState, useEffect, useMemo } from 'react';
import type { Ministry, StateCorporationCategory } from '../types/index';
import { ChevronDownIcon, HierarchyIcon, ExternalLinkIcon, ShieldCheckIcon } from '../components/icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLazyData } from '../hooks/useLazyData';

// Define Presidency type locally as it's specific to this view enhancement
interface Presidency {
    title: string;
    holder: string;
    description: string;
    powers: string[];
    url: string;
}

const presidencyData: Presidency = {
    title: "The Presidency",
    holder: "H.E. Dr. William Samoei Ruto, C.G.H.",
    description: "The President is the Head of State and Government, Commander-in-Chief of the Kenya Defence Forces, and a symbol of national unity.",
    url: "https://www.president.go.ke/",
    powers: [
        "Address the opening of each newly elected Parliament",
        "Nominate and appoint Cabinet Secretaries, Attorney-General, and other State officers",
        "Chair Cabinet meetings",
        "Direct and co-ordinate the functions of ministries and government departments",
        "Exercise the Power of Mercy",
        "Confer honours in the name of the people and the Republic",
        "Declare a state of emergency (subject to Article 58)",
        "Declare war (with approval of Parliament)",
        "Assent to Bills"
    ]
};

const PresidencyNode: React.FC<{ presidency: Presidency; isExpanded: boolean; onToggle: () => void }> = ({ presidency, isExpanded, onToggle }) => {
    return (
        <div className="relative flex flex-col items-center w-full max-w-md">
             <button
                onClick={onToggle}
                className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-2xl custom-shadow-lg w-full text-center group transition-all duration-300 hover:custom-shadow-xl hover:scale-[1.01] border-2 border-primary/20 dark:border-primary/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                aria-expanded={isExpanded}
            >
                <div className="flex items-center justify-center gap-3 mb-2">
                    <h3 className="font-extrabold text-2xl text-on-surface dark:text-dark-on-surface tracking-tight">{presidency.title}</h3>
                    <a
                        href={presidency.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
                        title="Visit website"
                    >
                        <ExternalLinkIcon className="h-5 w-5" />
                    </a>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                     <p className="text-sm font-bold text-primary dark:text-dark-primary uppercase tracking-wider mb-1">Head of State</p>
                     <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{presidency.holder}</p>
                </div>
                 
                <div className={`mt-4 flex justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                </div>
            </button>

            <div
                className={`w-full transition-all duration-500 ease-[cubic-bezier(0.04,0.62,0.23,0.98)] overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                 <div className="h-8 w-0.5 bg-gray-300 dark:bg-gray-600 mx-auto"></div>
                 
                 <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700 custom-shadow">
                    <div className="mb-4 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">{presidency.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-3 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
                        <ShieldCheckIcon className="h-5 w-5 text-primary dark:text-dark-primary" />
                        <h4 className="font-bold text-sm uppercase tracking-wider">Constitutional Powers</h4>
                    </div>

                    <ul className="space-y-2">
                        {presidency.powers.map((power, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start text-left">
                                <span className="mr-2 text-primary dark:text-dark-primary mt-0.5">•</span>
                                <span>{power}</span>
                            </li>
                        ))}
                    </ul>
                 </div>
            </div>
        </div>
    );
};

const MinistryNode: React.FC<{ ministry: Ministry; isExpanded: boolean; onToggle: () => void; entityUrlMap: Map<string, string> }> = ({ ministry, isExpanded, onToggle, entityUrlMap }) => {
  const [loadedEntities, setLoadedEntities] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isExpanded && loadedEntities === null) {
      setIsLoading(true);
      setTimeout(() => {
        setLoadedEntities(ministry.mandatedEntities?.sort((a, b) => a.localeCompare(b)) || []);
        setIsLoading(false);
      }, 250);
    } else if (!isExpanded) {
      setLoadedEntities(null);
    }
  }, [isExpanded, ministry.mandatedEntities, loadedEntities]);
  
  return (
    <div className="relative flex flex-col items-center w-full">
        {/* Ministry Card */}
        <button
          onClick={onToggle}
          className="relative z-10 bg-surface dark:bg-dark-surface p-5 rounded-2xl custom-shadow-lg w-full max-w-md text-center group transition-all duration-300 hover:custom-shadow-xl hover:scale-[1.01] border border-transparent hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <h3 className="font-bold text-on-surface dark:text-dark-on-surface text-lg leading-tight">{ministry.name}</h3>
            {ministry.url && ministry.url !== '#' && (
               <a
                  href={ministry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
                  title={`Visit website`}
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
            )}
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Cabinet Secretary</p>
              <p className="font-semibold text-primary dark:text-dark-primary">{ministry.cabinetSecretary}</p>
          </div>

          <div className={`mt-3 flex justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </div>
        </button>

        {/* Expanded Content */}
        <div
          className={`w-full max-w-md flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(0.04,0.62,0.23,0.98)] overflow-hidden ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
            {/* Connector Line */}
            <div className="h-8 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

            {/* State Departments */}
            <div className="w-full bg-gray-50 dark:bg-gray-800/40 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">State Departments</h4>
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                </div>
                
                <div className="space-y-3">
                    {ministry.principalSecretaries.map((ps, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50 shadow-sm">
                             <p className="font-semibold text-sm text-gray-900 dark:text-white">{ps.department}</p>
                             <div className="flex items-center justify-between mt-1">
                                 <span className="text-xs text-gray-500 dark:text-gray-400">Principal Secretary</span>
                                 {ps.name && <span className="text-xs font-medium text-primary dark:text-dark-primary bg-primary/5 dark:bg-primary/10 px-2 py-0.5 rounded">{ps.name}</span>}
                             </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Connector Line if entities exist */}
            {ministry.mandatedEntities && ministry.mandatedEntities.length > 0 && (
                 <div className="h-6 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
            )}

            {/* Mandated Entities */}
            {isExpanded && ministry.mandatedEntities && ministry.mandatedEntities.length > 0 && (
                <div className="w-full bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mt-0">
                     <div className="flex items-center gap-2 mb-3">
                        <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Agencies & SAGAs</h4>
                        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                    </div>

                    {isLoading ? (
                        <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 italic">Loading entities...</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-2">
                            {loadedEntities?.map((entity, index) => {
                                const url = entityUrlMap.get(entity);
                                const hasLink = url && url !== '#';
                                return (
                                    <div key={index} className="flex items-start text-sm group">
                                        <span className="text-gray-400 mr-2 mt-1">•</span>
                                        {hasLink ? (
                                            <a 
                                                href={url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="flex-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:underline decoration-primary/30 underline-offset-2 transition-colors"
                                            >
                                                {entity}
                                                <ExternalLinkIcon className="inline-block h-3 w-3 ml-1.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                            </a>
                                        ) : (
                                            <span className="flex-1 text-gray-700 dark:text-gray-300">{entity}</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {loadedEntities && loadedEntities.length === 0 && (
                        <p className="py-2 text-sm text-gray-500 text-center italic">No listed entities.</p>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};

const CabinetPage: React.FC = () => {
    const [expandedMinistry, setExpandedMinistry] = useState<string | null>(null);
    const [isPresidencyExpanded, setIsPresidencyExpanded] = useState<boolean>(false);
    
    const { data: ministries, isLoading: isMinistriesLoading } = useLazyData<Ministry[]>(
        'ministries-data',
        () => import('../data/governance/ministries').then(m => m.ministries)
    );

    const { data: categorizedCorporationsData, isLoading: isCorpLoading } = useLazyData<StateCorporationCategory[]>(
        'corporations-data',
        () => import('../data/governance/state-corporations').then(m => m.categorizedCorporationsData)
    );
    
    const entityUrlMap = useMemo(() => {
        if (!categorizedCorporationsData) return new Map<string, string>();
        const allCorporations = categorizedCorporationsData.flatMap(category => category.corporations);
        return new Map(allCorporations.map(corp => [corp.name, corp.url]));
    }, [categorizedCorporationsData]);

    const handleToggle = (ministryName: string) => {
        setExpandedMinistry(prev => (prev === ministryName ? null : ministryName));
        if (ministryName) setIsPresidencyExpanded(false);
    };

    const handlePresidencyToggle = () => {
        setIsPresidencyExpanded(prev => !prev);
        if (!isPresidencyExpanded) setExpandedMinistry(null);
    }
    
    if (isMinistriesLoading || !ministries) {
        return <LoadingSpinner />;
    }

    // Filter out Office of President/Deputy President from ministries list as they are covered in the Presidency node or separate logic if desired,
    // but standard approach is treating them as high-level ministries.
    // However, since we are adding a distinct "The Presidency" node, let's keep the ministries list as is for structural completeness, 
    // or we can choose to separate the executive offices.
    // For this specific UI, let's separate the executive offices for cleaner layout under "The Presidency".
    const executiveOffices = ministries.slice(0, 3); // President, DP, Prime CS
    const otherMinistries = ministries.slice(3);

    return (
        <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-16">
                    <div className="inline-block p-4 bg-primary-light dark:bg-dark-primary-light rounded-3xl mb-4 shadow-sm">
                        <HierarchyIcon className="h-10 w-10 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">The Cabinet</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        Explore the organizational structure of the National Executive, including the Presidency, Ministries, State Departments, and their mandate.
                    </p>
                </header>

                <main className="flex flex-col items-center gap-12 pb-20">
                    {/* The Presidency - Top Node */}
                    <PresidencyNode 
                        presidency={presidencyData}
                        isExpanded={isPresidencyExpanded}
                        onToggle={handlePresidencyToggle}
                    />
                    
                    {/* Vertical Connector from Presidency to Executive Offices */}
                    <div className="h-12 w-0.5 bg-gray-300 dark:bg-gray-600 -mt-8"></div>

                    {/* Executive Offices Section */}
                    <div className="w-full max-w-3xl space-y-8">
                         <div className="flex items-center justify-center mb-6">
                             <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
                             <span className="mx-4 text-sm font-bold uppercase tracking-widest text-gray-400">Executive Offices</span>
                             <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
                         </div>
                         <div className="grid grid-cols-1 gap-8">
                            {executiveOffices.map((ministry) => (
                                <MinistryNode
                                    key={ministry.name}
                                    ministry={ministry}
                                    isExpanded={expandedMinistry === ministry.name}
                                    onToggle={() => handleToggle(ministry.name)}
                                    entityUrlMap={entityUrlMap}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Ministries Grid */}
                    <div className="w-full mt-8">
                         <div className="flex items-center justify-center mb-10">
                             <div className="h-px w-24 bg-gray-300 dark:bg-gray-600"></div>
                             <span className="mx-4 text-sm font-bold uppercase tracking-widest text-gray-400">Ministries</span>
                             <div className="h-px w-24 bg-gray-300 dark:bg-gray-600"></div>
                         </div>
                         
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
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
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CabinetPage;
