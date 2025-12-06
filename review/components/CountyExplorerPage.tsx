
import React, { useState, useMemo } from 'react';
import KenyaMap from './KenyaMap';
import CountyDetailPage from './CountyDetailPage';
import { MapIcon } from './icons';
import type { County } from '../types/index';
import LoadingSpinner from './LoadingSpinner';
import { useLazyData } from '../hooks/useLazyData';

const CountyExplorerPage: React.FC = () => {
    const [selectedCounty, setSelectedCounty] = useState<County | null>(null);

    const { data: countiesData, isLoading: isCountiesLoading } = useLazyData<County[]>(
        'counties-data',
        () => import('../data/counties').then(m => m.countiesData)
    );

    const { data: countyPaths, isLoading: isPathsLoading } = useLazyData<{ name: string; path: string }[]>(
        'county-paths-data',
        () => import('../data/mapdata').then(m => m.countyPaths)
    );
    
    const countiesMap = useMemo(() => {
        if (!countiesData) return new Map();
        return new Map(countiesData.map(county => [county.name.toLowerCase(), county]));
    }, [countiesData]);

    const handleCountyClick = (countyName: string) => {
        const county = countiesMap.get(countyName.toLowerCase());
        if (county) {
            setSelectedCounty(county);
        } else {
             console.warn(`Data for ${countyName} not found.`);
        }
    };

    const handleBack = () => {
        setSelectedCounty(null);
    };
    
    if (isCountiesLoading || isPathsLoading || !countiesData || !countyPaths) {
         return <LoadingSpinner />;
    }

    return (
        <div className="h-full w-full overflow-y-auto">
            {selectedCounty ? (
                <CountyDetailPage county={selectedCounty} onBack={handleBack} />
            ) : (
                <div className="p-4 md:p-6 lg:p-10 flex flex-col items-center">
                    <header className="text-center mb-8">
                        <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
                            <MapIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                        </div>
                        <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Kenya County Explorer</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                            Click on a county in the map to view more details.
                        </p>
                    </header>
                    <KenyaMap onCountyClick={handleCountyClick} counties={countyPaths} />
                </div>
            )}
        </div>
    );
};

export default CountyExplorerPage;
