
import React, { useState, useMemo, useEffect } from 'react';
import type { County } from '../types/index';
import { ChevronDownIcon, MapPinIcon, ExternalLinkIcon } from '../components/icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLazyData } from '../hooks/useLazyData';

const CountyNode: React.FC<{ county: County; isExpanded: boolean; onToggle: () => void; }> = ({ county, isExpanded, onToggle }) => {
    return (
        <div className="flex flex-col items-center">
            <button
                onClick={onToggle}
                className="bg-surface dark:bg-dark-surface p-5 rounded-xl custom-shadow-lg w-full text-center group transition-all duration-300 hover:custom-shadow-xl hover:-translate-y-1 z-10"
                aria-expanded={isExpanded}
            >
                <div className="flex items-center justify-center space-x-2">
                    <h3 className="font-bold text-on-surface dark:text-dark-on-surface text-base">{county.name} County</h3>
                    {county.website && county.website !== '#' && (
                        <a
                            href={county.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded-full text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                            aria-label={`Visit website for ${county.name} County`}
                            title={`Visit website for ${county.name} County`}
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
                <div className="w-11/12 space-y-3 pt-6">
                    {/* Leadership */}
                    <div className="bg-primary-light/50 dark:bg-dark-primary-light/50 p-4 rounded-lg custom-shadow text-center z-10">
                        <p className="font-semibold text-sm text-primary dark:text-dark-primary">Governor</p>
                    </div>
                    <div className="bg-primary-light/50 dark:bg-dark-primary-light/50 p-4 rounded-lg custom-shadow text-center z-10">
                        <p className="font-semibold text-sm text-primary dark:text-dark-primary">Deputy Governor</p>
                    </div>

                    {/* Departments */}
                    <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg custom-shadow z-10">
                        <h4 className="font-bold text-sm text-gray-600 dark:text-gray-300 mb-2 text-center border-b border-gray-200 dark:border-gray-600 pb-2">County Executive Departments</h4>
                        <ul className="text-left space-y-1.5 mt-3">
                            {county.departments.sort((a,b) => a.localeCompare(b)).map((dept, index) => (
                                <li key={index} className="text-sm text-gray-700 dark:text-gray-400 flex items-start">
                                    <svg className="h-3 w-3 mr-2 mt-1 flex-shrink-0 text-primary dark:text-dark-primary" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" /></svg>
                                    <span>{dept}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};


const CountyGovernmentsPage: React.FC = () => {
    const [expandedCounty, setExpandedCounty] = useState<string | null>(null);
    
    const { data: counties, isLoading } = useLazyData<County[]>(
        'counties-data',
        () => import('../data/counties').then(m => m.countiesData.sort((a, b) => a.name.localeCompare(b.name)))
    );

    const handleToggle = (countyName: string) => {
        setExpandedCounty(prev => (prev === countyName ? null : countyName));
    };
    
    if (isLoading || !counties) {
        return <LoadingSpinner />;
    }

    return (
        <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
                        <MapPinIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">County Governments</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        An interactive chart of the 47 county governments. Click a county to explore its leadership structure, departmental organization, and visit its official website.
                    </p>
                </header>

                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full max-w-5xl mx-auto pb-12">
                    {counties.map(county => (
                        <CountyNode
                            key={county.code}
                            county={county}
                            isExpanded={expandedCounty === county.name}
                            onToggle={() => handleToggle(county.name)}
                        />
                    ))}
                </main>
            </div>
        </div>
    );
}

export default CountyGovernmentsPage;
