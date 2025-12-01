
import React, { useState, useMemo, useEffect } from 'react';
import { PresentationChartLineIcon, HierarchyIcon, MapPinIcon, ChevronDoubleRightIcon } from '../components/icons';
import type { County } from '../types/index';
import CountyDetailPage from '../components/CountyDetailPage';
import { dispatchNavigate } from '../utils/navigation';

const CountyListItem: React.FC<{ name: string, code?: number, onClick: () => void }> = ({ name, code, onClick }) => (
    <button
        onClick={onClick}
        className="w-full bg-surface dark:bg-dark-surface p-4 rounded-xl custom-shadow hover:custom-shadow-md hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 flex items-center justify-between group border border-transparent hover:border-primary/20"
    >
        <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300 group-hover:bg-primary-light dark:group-hover:bg-dark-primary-light group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
                {code}
            </div>
            <h3 className="text-base font-bold text-on-surface dark:text-dark-on-surface group-hover:text-primary dark:group-hover:text-dark-primary transition-colors text-left">
                {name}
            </h3>
        </div>
        <div className="text-gray-400 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
             <ChevronDoubleRightIcon className="h-5 w-5" />
        </div>
    </button>
);


const ProjectsPage: React.FC = () => {
    const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
    const [counties, setCounties] = useState<County[] | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const module = await import('../data/counties');
            setCounties(module.countiesData.sort((a, b) => a.name.localeCompare(b.name)));
        };
        loadData();
    }, []);

    const handleCountyClick = (county: County) => {
        setSelectedCounty(county);
    };

    const handleBack = () => {
        setSelectedCounty(null);
    };
    
    const handleNationalClick = () => {
        dispatchNavigate({ view: 'national-policy' });
    };

    const filteredCounties = useMemo(() => {
        if (!counties) return [];
        if (!searchTerm) return counties;
        return counties.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.toString().includes(searchTerm));
    }, [counties, searchTerm]);

    if (selectedCounty) {
        return <CountyDetailPage county={selectedCounty} onBack={handleBack} />;
    }

    if (!counties) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-dark-primary"></div>
            </div>
        );
    }

    return (
        <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
            <div className="max-w-3xl mx-auto">
                <header className="text-center mb-8">
                    <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
                        <PresentationChartLineIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Development Strategy</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        Track policy development, projects, and strategic plans (CIDPs, ADPs, CFSPs) at both national and county levels.
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
                            placeholder="Search for a county..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-full py-3 pl-12 pr-4 text-on-surface dark:text-dark-on-surface placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent custom-shadow"
                            aria-label="Search counties"
                        />
                    </div>
                </div>

                <main className="space-y-3 pb-12">
                    {!searchTerm && (
                        <button 
                            onClick={handleNationalClick}
                            className="w-full bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border-2 border-primary/20 hover:border-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 flex items-center justify-between group mb-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                                        <HierarchyIcon className="h-6 w-6" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-base font-bold text-on-surface dark:text-dark-on-surface">National Policies</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Vision 2030, MTP IV & BETA</p>
                                </div>
                            </div>
                            <div className="text-primary dark:text-dark-primary">
                                <ChevronDoubleRightIcon className="h-5 w-5" />
                            </div>
                        </button>
                    )}

                    <h2 className="text-lg font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 pl-2">
                        Counties {filteredCounties.length > 0 && <span className="text-sm normal-case ml-2">({filteredCounties.length})</span>}
                    </h2>

                    <div className="space-y-2">
                        {filteredCounties.map((county) => (
                            <CountyListItem 
                                key={county.code}
                                name={`${county.name} County`}
                                code={county.code}
                                onClick={() => handleCountyClick(county)}
                            />
                        ))}
                        {filteredCounties.length === 0 && (
                            <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-surface dark:bg-dark-surface rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                                No counties found matching "{searchTerm}"
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProjectsPage;
