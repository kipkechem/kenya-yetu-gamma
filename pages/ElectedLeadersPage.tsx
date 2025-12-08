import React, { useMemo, useState } from 'react';
import { UserGroupIcon, IdentificationIcon } from '../components/icons';
import { countiesData } from '../data/counties';
import { wardRepresentatives } from '../data/governance/ward-representatives';
import { representativesData } from '../data/governance/representatives';
import { useLazyData } from '../hooks/useLazyData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import type { County, Representative } from '../types';
import type { WardRepresentative } from '../data/governance/ward-representatives';

interface CountyLeaders {
    governor?: Representative;
    senator?: Representative;
    womanRep?: Representative;
    mps: Representative[];
    mcas: WardRepresentative[];
}

const LeaderCell: React.FC<{ leader?: Representative; role: string }> = ({ leader, role }) => {
    if (!leader) return <span className="text-xs text-gray-400 italic">Vacant/Unknown</span>;
    return (
        <div className="flex items-center gap-3 min-w-[200px]">
            <img 
                src={leader.imageUrl} 
                alt={leader.name} 
                className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
                loading="lazy"
            />
            <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1" title={leader.name}>
                    {leader.name}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                    {leader.party}
                </span>
            </div>
        </div>
    );
};

interface ModalProps {
    title: string;
    subtitle: string;
    items: { name: string; area: string; party: string }[];
    onClose: () => void;
}

const LeadersModal: React.FC<ModalProps> = ({ title, subtitle, items, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>
                <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="overflow-y-auto p-0">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
                            <tr>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Area</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Party</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {items.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-3 px-6 text-sm font-semibold text-gray-900 dark:text-gray-200">{item.name}</td>
                                    <td className="py-3 px-6 text-sm text-gray-600 dark:text-gray-400">{item.area}</td>
                                    <td className="py-3 px-6 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:text-primary-light">
                                            {item.party}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-right">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const ElectedLeadersPage: React.FC = () => {
    const [modalData, setModalData] = useState<ModalProps | null>(null);

    const { data: counties, isLoading, error, refetch } = useLazyData<County[]>(
        'counties-data',
        () => Promise.resolve(countiesData)
    );

    // Create a map of leaders per county
    const leadersMap = useMemo(() => {
        const map: Record<string, CountyLeaders> = {};
        
        // Initialize map for known counties
        countiesData.forEach(c => {
             map[c.name] = { mps: [], mcas: [] };
        });

        // Map Executives and MPs
        representativesData.forEach(rep => {
            if (!rep.county) return;
            const countyKey = rep.county; 
            
            // Handle edge case where data might use "Nairobi" instead of "Nairobi City"
            let targetKey = countyKey;
            if(!map[targetKey] && countyKey === 'Nairobi') targetKey = 'Nairobi City';

            if (!map[targetKey]) map[targetKey] = { mps: [], mcas: [] };
            
            if (rep.position === 'Governor') map[targetKey].governor = rep;
            else if (rep.position === 'Senator') map[targetKey].senator = rep;
            else if (rep.position === 'Woman Representative') map[targetKey].womanRep = rep;
            else if (rep.position === 'Member of Parliament') map[targetKey].mps.push(rep);
        });

        // Map MCAs
        wardRepresentatives.forEach(rep => {
             const countyKey = rep.county;
             let targetKey = countyKey;
             if(!map[targetKey] && countyKey === 'Nairobi') targetKey = 'Nairobi City';
             
             if (!map[targetKey]) map[targetKey] = { mps: [], mcas: [] };
             map[targetKey].mcas.push(rep);
        });

        return map;
    }, []);

    // Calculate Summary Stats
    const summaryStats = useMemo(() => {
        let totalGovernors = 0;
        let totalSenators = 0;
        let totalWomanReps = 0;
        let totalMPs = 0;
        let totalMCAs = 0;

        Object.values(leadersMap).forEach((leaders: CountyLeaders) => {
            if (leaders.governor) totalGovernors++;
            if (leaders.senator) totalSenators++;
            if (leaders.womanRep) totalWomanReps++;
            totalMPs += leaders.mps.length;
            totalMCAs += leaders.mcas.length;
        });
        
        return { totalGovernors, totalSenators, totalWomanReps, totalMPs, totalMCAs };
    }, [leadersMap]);

    if (isLoading) return <LoadingSpinner />;
    if (error || !counties) return <ErrorDisplay message="Failed to load leadership data." onRetry={refetch} />;

    const handleViewMPs = (countyName: string, mps: Representative[]) => {
        setModalData({
            title: `${countyName} Members of Parliament`,
            subtitle: `${mps.length} Constituencies`,
            items: mps.map(mp => ({ name: mp.name, area: mp.constituency || 'Constituency', party: mp.party })),
            onClose: () => setModalData(null)
        });
    };

    const handleViewMCAs = (countyName: string, mcas: WardRepresentative[]) => {
        setModalData({
            title: `${countyName} Members of County Assembly`,
            subtitle: `${mcas.length} Wards`,
            items: mcas.map(mca => ({ name: mca.name, area: mca.ward, party: mca.party })),
            onClose: () => setModalData(null)
        });
    };

    const SummaryCard: React.FC<{ label: string; count: number; colorClass: string }> = ({ label, count, colorClass }) => (
        <div className={`p-5 rounded-2xl border ${colorClass} flex flex-col items-center justify-center text-center shadow-sm`}>
             <span className="text-3xl font-extrabold mb-1">{count}</span>
             <span className="text-xs font-bold uppercase tracking-wider opacity-80">{label}</span>
        </div>
    );

    return (
        <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-10">
                    <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl mb-4">
                        <IdentificationIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight">
                        Elected Leaders Dashboard
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        A comprehensive overview of elected officials across Kenya, from the County level to the National Assembly.
                    </p>
                </header>

                {/* Summary Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                    <SummaryCard 
                        label="Governors" 
                        count={summaryStats.totalGovernors} 
                        colorClass="bg-blue-50 border-blue-100 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300"
                    />
                    <SummaryCard 
                        label="Senators" 
                        count={summaryStats.totalSenators} 
                        colorClass="bg-purple-50 border-purple-100 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300"
                    />
                     <SummaryCard 
                        label="Women Reps" 
                        count={summaryStats.totalWomanReps} 
                        colorClass="bg-pink-50 border-pink-100 text-pink-700 dark:bg-pink-900/20 dark:border-pink-800 dark:text-pink-300"
                    />
                    <SummaryCard 
                        label="MPs" 
                        count={summaryStats.totalMPs} 
                        colorClass="bg-green-50 border-green-100 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
                    />
                    <SummaryCard 
                        label="MCAs" 
                        count={summaryStats.totalMCAs} 
                        colorClass="bg-orange-50 border-orange-100 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-300"
                    />
                </div>

                <div className="bg-surface dark:bg-dark-surface p-6 rounded-3xl custom-shadow-lg mb-8 border border-border dark:border-dark-border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-16 text-center">Code</th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-48">County</th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Governor</th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Senator</th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Woman Rep</th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">MPs</th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">MCAs</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {counties.sort((a,b) => a.code - b.code).map((county) => {
                                    const leaders: CountyLeaders | undefined = leadersMap[county.name];
                                    if (!leaders) return null;

                                    return (
                                        <tr key={county.code} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                            <td className="py-3 px-4 text-center text-sm text-gray-400 font-mono">
                                                {String(county.code).padStart(3, '0')}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">{county.name}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <LeaderCell leader={leaders.governor} role="Governor" />
                                            </td>
                                            <td className="py-3 px-4">
                                                <LeaderCell leader={leaders.senator} role="Senator" />
                                            </td>
                                            <td className="py-3 px-4">
                                                <LeaderCell leader={leaders.womanRep} role="Woman Rep" />
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <button 
                                                    onClick={() => handleViewMPs(county.name, leaders.mps)}
                                                    className="text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary dark:text-primary-light px-3 py-1.5 rounded-md transition-colors"
                                                >
                                                    View {leaders.mps.length}
                                                </button>
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <button 
                                                    onClick={() => handleViewMCAs(county.name, leaders.mcas)}
                                                    className="text-xs font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-md transition-colors"
                                                >
                                                    View {leaders.mcas.length}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {/* Modal for MPs/MCAs */}
            {modalData && (
                <LeadersModal 
                    title={modalData.title}
                    subtitle={modalData.subtitle}
                    items={modalData.items}
                    onClose={modalData.onClose}
                />
            )}
        </div>
    );
};

export default ElectedLeadersPage;