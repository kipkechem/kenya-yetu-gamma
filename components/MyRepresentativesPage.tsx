import React, { useState, useCallback } from 'react';
import type { AppView } from '../App';
import KenyaMap from './KenyaMap';
import { UsersIcon } from './icons';

interface MyRepresentativesPageProps {
  setActiveView: (view: AppView) => void;
}

interface CountyInfo {
  name: string;
  constituencyCount: number;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; label: string }> = ({ checked, onChange, label }) => (
    <div className="flex items-center">
        <label htmlFor="toggle" className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{label}</label>
        <button
            onClick={() => onChange(!checked)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${checked ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-1'}`}
            />
        </button>
    </div>
);


const MyRepresentativesPage: React.FC<MyRepresentativesPageProps> = ({ setActiveView }) => {
  const [selectedCounty, setSelectedCounty] = useState<CountyInfo | null>(null);
  const [showTowns, setShowTowns] = useState(true);

  const handleCountySelect = useCallback((county: CountyInfo | null) => {
    setSelectedCounty(current => {
        // If the same county is clicked again, deselect it. Otherwise, select the new one.
        if (current && county && current.name === county.name) {
            return null;
        }
        return county;
    });
  }, []);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
        <header className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between flex-shrink-0 z-10">
            <div className="flex items-center space-x-3">
                <button 
                    onClick={() => setActiveView('infomap')}
                    className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Back to Info Maps"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="p-2 bg-green-100 dark:bg-gray-700 rounded-lg">
                    <UsersIcon className="h-5 w-5 text-green-700 dark:text-green-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">My Representatives</h1>
                </div>
            </div>
            <ToggleSwitch
                checked={showTowns}
                onChange={setShowTowns}
                label="Show Cities"
            />
        </header>

        <div className="flex-1 flex overflow-hidden relative">
            <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900/50">
                <KenyaMap
                    onCountySelect={handleCountySelect}
                    selectedCountyName={selectedCounty?.name || null}
                    showTowns={showTowns}
                />
            </main>

            <aside className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out ${selectedCounty ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 h-full overflow-y-auto">
                    {selectedCounty ? (
                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedCounty.name}</h2>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{selectedCounty.constituencyCount} Constituencies</p>
                                </div>
                                <button onClick={() => setSelectedCounty(null)} className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white" aria-label="Close panel">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="mt-6 space-y-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                                {['Governor', 'Senator', 'Women Representative', 'County Commissioner', 'Members of Parliament (MPs)', 'Members of County Assembly (MCAs)'].map(title => (
                                    <div key={title}>
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md">
                                            Representative data coming soon.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </aside>
        </div>
    </div>
  );
};

export default MyRepresentativesPage;