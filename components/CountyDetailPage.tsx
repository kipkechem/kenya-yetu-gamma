import React from 'react';
import type { County } from '../types';
import { MapPinIcon, UsersIcon, GlobeAmericasIcon, ExternalLinkIcon, FileTextIcon } from './icons';
import { countyPolicyDocuments } from '../data/policy-documents';

interface CountyDetailPageProps {
  county: County;
  onBack: () => void;
}

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="bg-background dark:bg-dark-surface/50 p-4 rounded-2xl flex items-center">
        <div className="p-3 bg-primary-light dark:bg-dark-primary-light rounded-xl mr-4">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-lg font-bold text-on-surface dark:text-dark-on-surface">{value}</p>
        </div>
    </div>
);

const CountyDetailPage: React.FC<CountyDetailPageProps> = ({ county, onBack }) => {
  const policyDocuments = countyPolicyDocuments[county.name] || [];

  return (
    <div className="p-4 md:p-6 animate-fade-in">
        <button 
            onClick={onBack}
            className="mb-6 inline-flex items-center px-4 py-2 border border-border dark:border-dark-border text-sm font-medium rounded-full text-on-surface dark:text-dark-on-surface bg-surface dark:bg-dark-surface hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
             &larr; Back to Map
        </button>

        <header className="mb-8">
            <div className="flex items-center space-x-4">
                <h1 className="text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight">{county.name} County</h1>
                {county.website && county.website !== '#' && (
                    <a 
                        href={county.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700" 
                        title={`Visit ${county.name} County website`}
                    >
                        <ExternalLinkIcon className="h-6 w-6" />
                    </a>
                )}
            </div>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">County Code: {county.code}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard icon={<UsersIcon className="h-6 w-6 text-primary dark:text-dark-primary"/>} label="Population" value={county.population} />
            <StatCard icon={<GlobeAmericasIcon className="h-6 w-6 text-primary dark:text-dark-primary"/>} label="Area" value={county.area} />
            <StatCard icon={<MapPinIcon className="h-6 w-6 text-primary dark:text-dark-primary"/>} label="Capital" value={county.capital} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow">
                <h2 className="text-xl font-bold mb-4 text-on-surface dark:text-dark-on-surface">Constituencies</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                    {county.constituencies.sort((a,b) => a.localeCompare(b)).map(c => <li key={c}>{c}</li>)}
                </ul>
            </div>
             <div className="bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow">
                <h2 className="text-xl font-bold mb-4 text-on-surface dark:text-dark-on-surface">Fun Facts</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-300">
                     {county.funFacts.map(fact => <li key={fact}>{fact}</li>)}
                </ul>
            </div>
        </div>

        <div className="mt-8 bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow">
            <h2 className="text-xl font-bold mb-4 text-on-surface dark:text-dark-on-surface">County Executive Departments</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 columns-1 md:columns-2 lg:columns-3">
                {county.departments.sort((a,b) => a.localeCompare(b)).map(d => <li key={d} className="mb-2">{d}</li>)}
            </ul>
        </div>

        <div className="mt-8 bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow">
            <h2 className="text-xl font-bold mb-4 text-on-surface dark:text-dark-on-surface">Policy Documents</h2>
            {policyDocuments.length > 0 ? (
                <ul className="space-y-3 columns-1 md:columns-2 lg:columns-3">
                    {policyDocuments.map(doc => (
                        <li key={doc.title}>
                            <a 
                                href={doc.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group inline-flex items-start text-sm text-primary dark:text-dark-primary hover:underline"
                            >
                                <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                                <span>{doc.title}</span>
                                <ExternalLinkIcon className="h-3.5 w-3.5 ml-1.5 mt-1 flex-shrink-0 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">No specific policy documents are linked for this county yet.</p>
            )}
        </div>
    </div>
  );
};

export default CountyDetailPage;
