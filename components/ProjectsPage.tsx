import React, { useState, useMemo } from 'react';
import { PresentationChartLineIcon, HierarchyIcon } from './icons';
import type { County } from '../types';
import { countiesData } from '../data/counties';
import CountyDetailPage from './CountyDetailPage';
import { dispatchNavigate } from '../utils/navigation';

const CountyTile: React.FC<{ name: string, onClick: () => void, children?: React.ReactNode }> = ({ name, onClick, children }) => (
    <button
        onClick={onClick}
        className="bg-surface dark:bg-dark-surface p-4 rounded-2xl custom-shadow-lg hover:custom-shadow-xl hover:-translate-y-1.5 transform-gpu transition-all duration-300 flex flex-col items-center justify-center text-center aspect-square"
    >
        {children}
        <h3 className="mt-2 text-sm font-bold text-on-surface dark:text-dark-on-surface">{name}</h3>
    </button>
);


const ProjectsPage: React.FC = () => {
    const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
    const counties = useMemo(() => [...countiesData].sort((a, b) => a.name.localeCompare(b.name)), []);

    const handleCountyClick = (county: County) => {
        setSelectedCounty(county);
    };

    const handleBack = () => {
        setSelectedCounty(null);
    };
    
    const handleNationalClick = () => {
        dispatchNavigate({ view: 'national-policy' });
    };

    if (selectedCounty) {
        return <CountyDetailPage county={selectedCounty} onBack={handleBack} />;
    }

    return (
        <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
                        <PresentationChartLineIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Development Strategy</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        Track policy development, projects, performance metrics, and delivery management related to governance and public services at both national and county levels.
                    </p>
                </header>

                <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 pb-10">
                    <CountyTile name="National" onClick={handleNationalClick}>
                        <HierarchyIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                    </CountyTile>

                    {counties.map((county) => (
                        <CountyTile 
                            key={county.code}
                            name={`${county.name}`}
                            onClick={() => handleCountyClick(county)}
                        >
                             <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-sm text-gray-600 dark:text-gray-300">
                                {county.code}
                            </div>
                        </CountyTile>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default ProjectsPage;