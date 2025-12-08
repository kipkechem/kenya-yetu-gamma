
import React, { useMemo, useState } from 'react';
import type { County } from '../types';
import { MapPinIcon, UsersIcon, GlobeAmericasIcon, ExternalLinkIcon, FileTextIcon, ScaleIcon, ChevronDoubleLeftIcon, InboxStackIcon } from './icons';
import { dispatchNavigate } from '../utils/navigation';
import { useLazyData } from '../hooks/useLazyData';
import { getCountyPolicies } from '../data/knowledge-base/county-policies';

export interface PolicyDocument {
  title: string;
  url: string;
}

interface CountyDetailPageProps {
  county: County;
  onBack: () => void;
}

const INITIAL_DOCS_COUNT = 6;

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="bg-background dark:bg-dark-surface/50 p-4 rounded-2xl flex items-center">
        <div className="p-3 bg-primary-light dark:bg-dark-primary-light rounded-xl mr-4">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-lg font-bold text-on-surface dark:text-dark-on-surface">{value}</p>
        </div>
    </div>
);

const DocumentCard: React.FC<{ title: string; url: string }> = ({ title, url }) => (
    <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group flex flex-col bg-background dark:bg-dark-surface/30 border border-border dark:border-dark-border hover:border-primary dark:hover:border-dark-primary rounded-xl p-4 transition-all duration-200 hover:shadow-md h-full"
    >
        <div className="flex items-start justify-between mb-3">
             <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                <FileTextIcon className="h-6 w-6" />
            </div>
            <ExternalLinkIcon className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="font-semibold text-sm text-on-surface dark:text-dark-on-surface line-clamp-3 mb-2">{title}</h3>
        <span className="text-xs font-medium text-primary dark:text-dark-primary mt-auto">View Document &rarr;</span>
    </a>
);

const CountyDetailPage: React.FC<CountyDetailPageProps> = ({ county, onBack }) => {
  const [showAllDocs, setShowAllDocs] = useState(false);
  const [docSearchTerm, setDocSearchTerm] = useState('');

  // Optimized lazy load: Fetch only this county's policies using the new dynamic loader
  const { data: policyDocuments, isLoading } = useLazyData<PolicyDocument[]>(
    `county-policies-${county.name}`,
    () => getCountyPolicies(county.name),
    [county.name]
  );

  const filteredAllDocs = useMemo(() => {
      if (!docSearchTerm || !policyDocuments) return policyDocuments || [];
      return policyDocuments.filter(doc => doc.title.toLowerCase().includes(docSearchTerm.toLowerCase()));
  }, [policyDocuments, docSearchTerm]);


  const handleViewLaws = () => {
    dispatchNavigate({
        view: 'county-laws',
        countySearchTerm: county.name
    });
  };

  // View: All Documents List
  if (showAllDocs) {
      return (
          <div className="p-4 md:p-6 animate-fade-in max-w-7xl mx-auto min-h-full flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                  <button 
                      onClick={() => { setShowAllDocs(false); setDocSearchTerm(''); }}
                      className="p-2 rounded-full bg-surface dark:bg-dark-surface hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors shadow-sm border border-border dark:border-dark-border"
                  >
                      <ChevronDoubleLeftIcon className="h-5 w-5" />
                  </button>
                  <div>
                      <h1 className="text-2xl font-bold text-on-surface dark:text-dark-on-surface">Documents & Policies</h1>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{county.name} County</p>
                  </div>
              </div>

              <div className="mb-6 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                  </div>
                  <input
                      type="text"
                      placeholder="Search documents..."
                      value={docSearchTerm}
                      onChange={(e) => setDocSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm"
                  />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
                  {filteredAllDocs.map((doc, index) => (
                      <DocumentCard key={`${doc.title}-${index}-all`} title={doc.title} url={doc.url} />
                  ))}
                  {filteredAllDocs.length === 0 && (
                      <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
                          No documents found matching "{docSearchTerm}".
                      </div>
                  )}
              </div>
          </div>
      );
  }

  // View: Main County Detail
  return (
    <div className="p-4 md:p-6 animate-fade-in max-w-7xl mx-auto">
        <button 
            onClick={onBack}
            className="mb-6 inline-flex items-center px-4 py-2 border border-border dark:border-dark-border text-sm font-medium rounded-full text-on-surface dark:text-dark-on-surface bg-surface dark:bg-dark-surface hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
             &larr; Back to Counties
        </button>

        <header className="mb-8">
            <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-2xl bg-surface dark:bg-dark-surface flex items-center justify-center shadow-sm border border-border dark:border-dark-border">
                     <span className="text-2xl font-bold text-gray-400">#{county.code}</span>
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight">{county.name} County</h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                        {county.website && county.website !== '#' && (
                            <a 
                                href={county.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-sm font-medium text-primary dark:text-dark-primary hover:underline flex items-center" 
                            >
                                Visit Official Website <ExternalLinkIcon className="h-3 w-3 ml-1" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard icon={<UsersIcon className="h-6 w-6 text-primary dark:text-dark-primary"/>} label="Population" value={county.population} />
            <StatCard icon={<GlobeAmericasIcon className="h-6 w-6 text-primary dark:text-dark-primary"/>} label="Area" value={county.area} />
            <StatCard icon={<MapPinIcon className="h-6 w-6 text-primary dark:text-dark-primary"/>} label="Capital" value={county.capital} />
        </div>

        {/* County Laws Section */}
        <div className="mb-8 bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow-lg border-l-4 border-purple-500 dark:border-purple-400">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold mb-2 text-on-surface dark:text-dark-on-surface flex items-center">
                        <ScaleIcon className="h-6 w-6 mr-2 text-purple-500 dark:text-purple-400" />
                        County Laws & Legislation
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Access specific acts, bills, and legal frameworks enacted by the {county.name} County Assembly.
                    </p>
                </div>
                <button 
                    onClick={handleViewLaws}
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-xl text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors shadow-md whitespace-nowrap"
                >
                    View Laws <span className="ml-2">&rarr;</span>
                </button>
            </div>
        </div>

        {/* Development & Strategy Documents */}
        <div className="mb-8 bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow-lg border-l-4 border-primary dark:border-dark-primary">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold mb-1 text-on-surface dark:text-dark-on-surface flex items-center">
                        <FileTextIcon className="h-5 w-5 mr-2 text-gray-500" />
                        Development & Strategy Documents
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Key strategic planning documents (CIDP, ADP, CFSP).
                    </p>
                </div>
                 {policyDocuments && policyDocuments.length > INITIAL_DOCS_COUNT && (
                    <button 
                        onClick={() => setShowAllDocs(true)}
                        className="text-sm font-semibold text-primary dark:text-dark-primary hover:underline whitespace-nowrap"
                    >
                        See all ({policyDocuments.length}) &rarr;
                    </button>
                )}
            </div>
            
            {isLoading ? (
                 <div className="p-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">Loading documents...</p>
                 </div>
            ) : policyDocuments && policyDocuments.length > 0 ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {policyDocuments.slice(0, INITIAL_DOCS_COUNT).map((doc, index) => (
                            <DocumentCard key={`${doc.title}-${index}`} title={doc.title} url={doc.url} />
                        ))}
                    </div>
                     {policyDocuments.length > INITIAL_DOCS_COUNT && (
                        <div className="text-center pt-2">
                             <button 
                                onClick={() => setShowAllDocs(true)}
                                className="inline-flex items-center px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary dark:text-dark-primary rounded-full text-sm font-medium transition-colors"
                            >
                                <InboxStackIcon className="h-4 w-4 mr-2" />
                                See more ({policyDocuments.length - INITIAL_DOCS_COUNT} others)
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-8 text-center bg-background dark:bg-dark-background/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">No documents currently available in the repository.</p>
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow">
                <h2 className="text-xl font-bold mb-4 text-on-surface dark:text-dark-on-surface">County Executive Departments</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {county.departments.sort((a,b) => a.localeCompare(b)).map(d => (
                        <li key={d} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                            <span className="mr-2 text-primary dark:text-dark-primary">•</span>
                            {d}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow">
                <h2 className="text-xl font-bold mb-4 text-on-surface dark:text-dark-on-surface">Constituencies</h2>
                <ul className="space-y-2">
                    {county.constituencies.sort((a,b) => a.localeCompare(b)).map(c => (
                         <li key={c} className="flex items-center text-sm text-gray-600 dark:text-gray-300 bg-background dark:bg-dark-background/50 px-3 py-2 rounded-lg">
                            {c}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
        <div className="bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow">
            <h2 className="text-xl font-bold mb-4 text-on-surface dark:text-dark-on-surface">Did You Know?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {county.funFacts.map((fact, index) => (
                    <div key={index} className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
                        <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{fact}"</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default CountyDetailPage;
