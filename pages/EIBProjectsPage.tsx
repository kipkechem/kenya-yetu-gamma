
import React, { useMemo, useState } from 'react';
import { ExternalLinkIcon, CurrencyDollarIcon, GlobeAmericasIcon } from '../components/icons';
import type { EIBProject } from '../types';
import { useLazyData } from '../hooks/useLazyData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const EIBProjectsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: projects, isLoading, error, refetch } = useLazyData<EIBProject[]>(
        'eib-projects-data',
        () => import('../data/foreign-projects/eib').then(m => m.eibProjects)
    );

    const filteredProjects = useMemo(() => {
        if (!projects) return [];
        if (!searchTerm) return projects;
        const term = searchTerm.toLowerCase();
        return projects.filter(p => 
            p.title.toLowerCase().includes(term) || 
            p.sector.toLowerCase().includes(term) || 
            p.year.includes(term)
        );
    }, [projects, searchTerm]);

    const projectsByDecade = useMemo(() => {
        const groups: Record<string, EIBProject[]> = {};
        filteredProjects.forEach(project => {
            const year = parseInt(project.year, 10);
            let decade = 'Unknown';
            if (!isNaN(year)) {
                const start = Math.floor(year / 10) * 10;
                if (start === 2020) {
                    decade = '2020 - Present';
                } else {
                    const end = start + 9;
                    decade = `${start} - ${end}`;
                }
            }
            
            if (!groups[decade]) {
                groups[decade] = [];
            }
            groups[decade].push(project);
        });
        
        // Sort decades in descending order (newest first)
        return Object.keys(groups).sort().reverse().reduce((acc, key) => {
            acc[key] = groups[key].sort((a, b) => b.year.localeCompare(a.year)); // Sort projects within decade by year desc
            return acc;
        }, {} as Record<string, EIBProject[]>);
    }, [filteredProjects]);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay message="Failed to load EIB projects." onRetry={refetch} />;

    return (
        <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
                        <GlobeAmericasIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">
                        Foreign Funded Projects
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                        European Investment Bank (EIB) projects supporting development in Kenya, organized by decade.
                    </p>
                </header>

                <div className="mb-8 sticky top-0 py-4 bg-background/95 dark:bg-dark-background/95 backdrop-blur-sm z-10 -mx-4 px-4 transition-all">
                     <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search projects by name, sector or year..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-full py-3.5 pl-12 pr-4 text-on-surface dark:text-dark-on-surface placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent custom-shadow-lg"
                        />
                     </div>
                </div>

                {Object.keys(projectsByDecade).length > 0 ? (
                    <div className="space-y-12 pb-12">
                        {Object.entries(projectsByDecade).map(([decade, decadeProjects]: [string, EIBProject[]]) => (
                            <section key={decade} className="animate-fade-in">
                                <div className="flex items-center mb-6">
                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mr-3">
                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-on-surface dark:text-dark-on-surface pr-3">{decade}</h2>
                                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {decadeProjects.length} projects
                                    </span>
                                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700 ml-4"></div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {decadeProjects.map((project, index) => (
                                        <a 
                                            key={`${decade}-${index}`} 
                                            href={project.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="block bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow-lg hover:custom-shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-blue-500/30 group h-full flex flex-col"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1 pr-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                                                            {project.sector}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {project.title}
                                                    </h3>
                                                </div>
                                                <ExternalLinkIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                                            </div>
                                            
                                            {project.description && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                                                    {project.description}
                                                </p>
                                            )}
                                            
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                                                    <CurrencyDollarIcon className="h-4 w-4 mr-1.5 text-green-600 dark:text-green-400" />
                                                    {project.amount}
                                                </div>
                                                <div className="text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                                                    {project.status} • {project.year}
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                            <GlobeAmericasIcon className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No projects found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Try adjusting your search terms to find what you're looking for.
                        </p>
                    </div>
                )}
                
                <div className="mt-8 text-center border-t border-gray-200 dark:border-gray-800 pt-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Data sourced from the European Investment Bank</p>
                    <a 
                        href="https://www.eib.org/en/projects/all/index?q=kenya" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        View all projects on EIB website &rarr;
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EIBProjectsPage;
