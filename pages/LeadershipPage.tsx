
import React, { useState, useMemo, useEffect } from 'react';
import { UserGroupIcon, MapPinIcon, ChevronDownIcon } from '../components/icons';
import { useLazyData } from '../hooks/useLazyData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import type { County } from '../types/index';
import { 
    getLeadershipHierarchy, 
    getLeadersForLocation, 
    availableYears,
    GeoNode,
    LeaderProfile 
} from '../data/leadership-structure';

const Selector: React.FC<{
    label: string;
    value: string;
    options: string[];
    onChange: (val: string) => void;
    disabled?: boolean;
    className?: string;
}> = ({ label, value, options, onChange, disabled, className }) => (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">{label}</label>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="w-full appearance-none bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl py-3 px-4 pr-8 text-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed custom-shadow"
            >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                <ChevronDownIcon className="h-4 w-4" />
            </div>
        </div>
    </div>
);

const LeaderCard: React.FC<{ leader: LeaderProfile }> = ({ leader }) => (
    <div className="bg-surface dark:bg-dark-surface p-5 rounded-2xl custom-shadow hover:custom-shadow-lg transition-all border-l-4 border-primary dark:border-dark-primary flex flex-col h-full">
        <div className="flex items-start gap-4">
            {leader.imageUrl && (
                <img src={leader.imageUrl} alt={leader.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700" />
            )}
            <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-dark-primary bg-primary/10 dark:bg-dark-primary/10 px-2 py-0.5 rounded-full">
                    {leader.role}
                </span>
                <h3 className="font-bold text-lg text-on-surface dark:text-dark-on-surface mt-2">{leader.name}</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{leader.party}</p>
            </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 border-t border-gray-100 dark:border-gray-800 pt-3">
            {leader.description}
        </p>
    </div>
);

const LeadershipPage: React.FC = () => {
    const [year, setYear] = useState<string>(availableYears[0]);
    const [county, setCounty] = useState<string>('');
    const [subCounty, setSubCounty] = useState<string>('');
    const [constituency, setConstituency] = useState<string>('');
    const [ward, setWard] = useState<string>('');
    const [results, setResults] = useState<LeaderProfile[]>([]);

    const { data: counties, isLoading, error, refetch } = useLazyData<County[]>(
        'counties-data',
        () => import('../data/counties').then(m => m.countiesData)
    );

    // Build the hierarchy tree from counties data
    const hierarchy = useMemo<GeoNode[]>(() => {
        if (!counties) return [];
        return getLeadershipHierarchy(counties);
    }, [counties]);

    // Derived options based on selections
    const countyOptions = useMemo(() => hierarchy.map(n => n.name).sort(), [hierarchy]);
    
    const subCountyOptions = useMemo(() => {
        if (!county) return [];
        const node = hierarchy.find(n => n.name === county);
        return node?.children?.map(n => n.name).sort() || [];
    }, [county, hierarchy]);

    // In this model, SubCounty acts as Constituency
    const constituencyOptions = useMemo(() => {
        // Assuming SubCounty == Constituency
        return subCountyOptions;
    }, [subCountyOptions]);

    const wardOptions = useMemo(() => {
        if (!county || !subCounty) return [];
        const cNode = hierarchy.find(n => n.name === county);
        const sNode = cNode?.children?.find(n => n.name === subCounty);
        return sNode?.children?.map(n => n.name).sort() || [];
    }, [county, subCounty, hierarchy]);

    // Load National leaders initially
    useEffect(() => {
        if (!county) {
            setResults(getLeadersForLocation(year, '', '', '', ''));
        }
    }, [year, county]);

    // Handlers
    const handleCountyChange = (val: string) => {
        setCounty(val);
        setSubCounty('');
        setConstituency('');
        setWard('');
        setResults(getLeadersForLocation(year, val, '', '', ''));
    };

    const handleSubCountyChange = (val: string) => {
        setSubCounty(val);
        // Since SubCounty maps to Constituency in our logic
        setConstituency(val); 
        setWard('');
        setResults(getLeadersForLocation(year, county, val, val, ''));
    };
    
    const handleWardChange = (val: string) => {
        setWard(val);
        setResults(getLeadersForLocation(year, county, subCounty, constituency, val));
    }

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay message="Failed to load location data." onRetry={refetch} />;

    const currentLocationName = ward ? `${ward} Ward` : (constituency ? `${constituency} Constituency` : (county || 'Kenya (National)'));

    return (
        <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
                        <UserGroupIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight">
                        Find Your Leaders
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                        Select your location to discover the elected and appointed officials serving your area.
                    </p>
                </header>

                <div className="bg-surface/50 dark:bg-dark-surface/50 rounded-3xl p-6 md:p-8 border border-border dark:border-dark-border mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Selector label="Year" value={year} options={availableYears} onChange={setYear} />
                        <Selector label="County" value={county} options={countyOptions} onChange={handleCountyChange} />
                        <Selector label="Constituency" value={subCounty} options={subCountyOptions} onChange={handleSubCountyChange} disabled={!county} />
                        <Selector label="Ward" value={ward} options={wardOptions} onChange={handleWardChange} disabled={!subCounty} />
                    </div>
                </div>

                <div className="animate-fade-in-up">
                    <div className="flex items-center justify-between mb-6 border-b border-border dark:border-dark-border pb-4">
                        <h2 className="text-2xl font-bold text-on-surface dark:text-dark-on-surface flex items-center gap-2">
                            <MapPinIcon className="h-6 w-6 text-primary dark:text-dark-primary" />
                            Leaders for {currentLocationName}
                        </h2>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {year}
                        </span>
                    </div>

                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((leader, index) => (
                                <LeaderCard key={index} leader={leader} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-surface/30 dark:bg-dark-surface/30 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                            <div className="inline-block p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-3 text-gray-400">
                                <UserGroupIcon className="h-8 w-8" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-medium">Verified leadership data for this specific location is currently being updated.</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please check back later or try a broader selection (e.g., County level).</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeadershipPage;
