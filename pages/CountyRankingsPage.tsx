
import React, { useMemo, useState } from 'react';
import { PresentationChartLineIcon, UsersIcon, MapPinIcon, BuildingLibraryIcon, ChevronDownIcon, UserGroupIcon } from '../components/icons';
import { countiesData } from '../data/counties/index';
import { wardRepresentatives } from '../data/governance/ward-representatives';
import { useLazyData } from '../hooks/useLazyData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import type { County } from '../types';
import type { WardRepresentative } from '../data/governance/ward-representatives';

type MetricType = 'population' | 'area' | 'constituencies' | 'wards' | 'density' | 'total_leaders';

interface RankingData {
    name: string;
    code: number;
    value: number;
    formattedValue: string;
}

const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-KE').format(num);
};

const parsePopulation = (popStr: string): number => {
    // Expected format: "1,208,333 (2019 Census)"
    const cleanStr = popStr.split(' ')[0].replace(/,/g, '');
    return parseInt(cleanStr, 10) || 0;
};

const parseArea = (areaStr: string): number => {
    // Expected format: "219 km²" or "2,085.9 km²"
    const cleanStr = areaStr.replace(/ km²/g, '').replace(/,/g, '');
    return parseFloat(cleanStr) || 0;
};

const CountyRankingsPage: React.FC = () => {
    const [selectedMetric, setSelectedMetric] = useState<MetricType>('population');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const { data: counties, isLoading, error, refetch } = useLazyData<County[]>(
        'counties-data',
        () => Promise.resolve(countiesData)
    );

    // Calculate ward counts per county from the ward representatives data
    const wardCounts = useMemo(() => {
        const counts: Record<string, Set<string>> = {};
        wardRepresentatives.forEach((rep: WardRepresentative) => {
            const countyName = rep.county;
            if (!counts[countyName]) {
                counts[countyName] = new Set();
            }
            if (rep.ward) {
                counts[countyName].add(rep.ward);
            }
        });
        
        const result: Record<string, number> = {};
        Object.keys(counts).forEach(key => {
            result[key] = counts[key].size;
        });
        return result;
    }, []);

    const rankings: RankingData[] = useMemo(() => {
        if (!counties) return [];

        const data = counties.map(county => {
            let value = 0;
            let formattedValue = '';

            switch (selectedMetric) {
                case 'population':
                    value = parsePopulation(county.population);
                    formattedValue = formatNumber(value);
                    break;
                case 'area':
                    value = parseArea(county.area);
                    formattedValue = `${formatNumber(value)} km²`;
                    break;
                case 'constituencies':
                    value = county.constituencies.length;
                    formattedValue = `${value}`;
                    break;
                case 'wards':
                    value = wardCounts[county.name] || 0;
                    formattedValue = `${value}`;
                    break;
                case 'density':
                     const pop = parsePopulation(county.population);
                     const area = parseArea(county.area);
                     value = area > 0 ? Math.round(pop / area) : 0;
                     formattedValue = `${formatNumber(value)} /km²`;
                     break;
                case 'total_leaders':
                    // 1 Governor + 1 Senator + 1 Woman Rep + N MPs + N MCAs
                    const executiveAndSenate = 3; 
                    const mps = county.constituencies.length;
                    const mcas = wardCounts[county.name] || 0;
                    value = executiveAndSenate + mps + mcas;
                    formattedValue = `${value}`;
                    break;
            }

            return {
                name: county.name,
                code: county.code,
                value,
                formattedValue
            };
        });

        return data.sort((a, b) => sortOrder === 'desc' ? b.value - a.value : a.value - b.value);
    }, [counties, selectedMetric, sortOrder, wardCounts]);

    if (isLoading) return <LoadingSpinner />;
    if (error || !counties) return <ErrorDisplay message="Failed to load county data." onRetry={refetch} />;

    const maxVal = Math.max(...rankings.map(r => r.value));

    const metricsConfig: Record<MetricType, { label: string, icon: React.ReactNode, description: string }> = {
        population: { label: 'Population', icon: <UsersIcon className="h-5 w-5" />, description: 'Total population based on 2019 Census data.' },
        area: { label: 'Land Area', icon: <MapPinIcon className="h-5 w-5" />, description: 'Total surface area in square kilometers.' },
        density: { label: 'Population Density', icon: <UsersIcon className="h-5 w-5" />, description: 'Number of people per square kilometer.' },
        constituencies: { label: 'Constituencies', icon: <BuildingLibraryIcon className="h-5 w-5" />, description: 'Number of parliamentary constituencies.' },
        wards: { label: 'Electoral Wards', icon: <BuildingLibraryIcon className="h-5 w-5" />, description: 'Number of county assembly wards (approximate based on available data).' },
        total_leaders: { label: 'Total Elected Leaders', icon: <UserGroupIcon className="h-5 w-5" />, description: 'Total count of elected officials (Governor, Senator, Woman Rep, MPs, and MCAs).' },
    };

    return (
        <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-10">
                    <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl mb-4">
                        <PresentationChartLineIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight">
                        County Rankings & Data
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        Compare Kenya's 47 counties across various metrics.
                    </p>
                </header>

                <div className="bg-surface dark:bg-dark-surface p-6 rounded-3xl custom-shadow-lg mb-8 border border-border dark:border-dark-border">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">View By:</span>
                            <div className="relative flex-1 md:flex-none">
                                <select 
                                    value={selectedMetric}
                                    onChange={(e) => setSelectedMetric(e.target.value as MetricType)}
                                    className="w-full md:w-64 appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white py-2.5 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                                >
                                    {Object.entries(metricsConfig).map(([key, config]) => (
                                        <option key={key} value={key}>{config.label}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <ChevronDownIcon className="h-4 w-4" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setSortOrder('desc')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${sortOrder === 'desc' ? 'bg-white dark:bg-gray-700 text-primary dark:text-dark-primary shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}
                            >
                                Highest First
                            </button>
                            <button
                                onClick={() => setSortOrder('asc')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${sortOrder === 'asc' ? 'bg-white dark:bg-gray-700 text-primary dark:text-dark-primary shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}
                            >
                                Lowest First
                            </button>
                        </div>
                    </div>

                    <div className="mb-6 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/10 flex items-start gap-3">
                         <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-primary dark:text-dark-primary">
                            {metricsConfig[selectedMetric].icon}
                         </div>
                         <div>
                             <h3 className="font-bold text-gray-900 dark:text-white text-sm">{metricsConfig[selectedMetric].label}</h3>
                             <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{metricsConfig[selectedMetric].description}</p>
                         </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-16 text-center">Rank</th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-16 text-center">Code</th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-48">County</th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                                        {metricsConfig[selectedMetric].label}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {rankings.map((item, index) => {
                                    const percentage = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
                                    const rank = index + 1;
                                    const isTop3 = rank <= 3;
                                    
                                    return (
                                        <tr key={item.code} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                            <td className="py-3 px-4 text-center">
                                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${isTop3 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'text-gray-500'}`}>
                                                    {rank}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-center text-sm text-gray-400 font-mono">
                                                {String(item.code).padStart(3, '0')}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">{item.name}</span>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className="font-bold text-gray-900 dark:text-white tabular-nums tracking-tight">
                                                        {item.formattedValue}
                                                    </span>
                                                    <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden max-w-[150px]">
                                                        <div 
                                                            className="h-full bg-primary dark:bg-dark-primary rounded-full transition-all duration-500 ease-out"
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountyRankingsPage;
