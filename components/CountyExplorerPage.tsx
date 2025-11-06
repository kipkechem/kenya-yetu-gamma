
import React, { useState, useMemo } from 'react';
import KenyaMap from './KenyaMap';
import CountyDetailPage from './CountyDetailPage';
import { countiesData as allCountiesData } from '../data/counties';
import { countyPaths as allCountyPaths } from '../data/mapdata';
import { MapIcon } from './icons';
import type { County } from '../types';
import { getCachedData, setCachedData } from '../utils/cache';

const loadCountiesData = (): County[] => {
    const cacheKey = 'counties-data';
    let data = getCachedData<County[]>(cacheKey);
    if (data) { return data; }
    data = allCountiesData;
    setCachedData(cacheKey, data);
    return data;
};

const loadCountyPaths = (): { name: string; path: string }[] => {
    const cacheKey = 'county-paths-data';
    let data = getCachedData<{ name: string; path: string }[]>(cacheKey);
    if (data) { return data; }
    data = allCountyPaths;
    setCachedData(cacheKey, data);
    return data;
};

const CountyExplorerPage: React.FC = () => {
    const [selectedCounty, setSelectedCounty] = useState<County | null>(null);

    const countiesData = useMemo(() => loadCountiesData(), []);
    const countyPaths = useMemo(() => loadCountyPaths(), []);
    
    const countiesMap = useMemo(() => {
        return new Map(countiesData.map(county => [county.name.toLowerCase(), county]));
    }, [countiesData]);

    const handleCountyClick = (countyName: string) => {
        const county = countiesMap.get(countyName.toLowerCase());
        if (county) {
            setSelectedCounty(county);
        } else {
             // If county data is missing, show a message or a default state
             // For this demo, we'll just log it and do nothing.
             console.warn(`Data for ${countyName} not found.`);
        }
    };

    const handleBack = () => {
        setSelectedCounty(null);
    };

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
