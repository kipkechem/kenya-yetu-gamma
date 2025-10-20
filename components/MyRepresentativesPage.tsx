import React, { useState } from 'react';
import type { AppView } from '../App';
import KenyaMap from './KenyaMap';
import { UsersIcon } from './icons';

interface MyRepresentativesPageProps {
  setActiveView: (view: AppView) => void;
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
  const [showTowns, setShowTowns] = useState(true);

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
                    showTowns={showTowns}
                />
            </main>
        </div>
    </div>
  );
};

export default MyRepresentativesPage;