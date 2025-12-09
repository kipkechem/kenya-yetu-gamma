
import React, { useState } from 'react';
import { judiciaryData } from '../data/governance/judiciary';
import type { JudicialBody } from '../data/governance/judiciary';
import { ChevronDownIcon, ScaleIcon, ExternalLinkIcon, ShieldCheckIcon } from './icons';
import { useLazyData } from '../hooks/useLazyData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const DetailsCard: React.FC<{ body: JudicialBody; level: number; onToggle: () => void; isExpanded: boolean; hasChildren: boolean; }> = ({ body, level, onToggle, isExpanded, hasChildren }) => {
    return (
        <div className="relative z-10 w-full">
            <button
                onClick={onToggle}
                className={`relative p-5 rounded-2xl custom-shadow-lg w-full text-left group transition-all duration-300 border-2 ${level === 0 ? 'bg-surface dark:bg-dark-surface border-primary/20' : 'bg-white dark:bg-gray-800 border-transparent'} hover:border-primary hover:-translate-y-1`}
                aria-expanded={isExpanded}
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <h3 className={`font-bold text-on-surface dark:text-dark-on-surface ${level === 0 ? 'text-xl' : 'text-lg'}`}>{body.name}</h3>
                        {body.url && (
                            <a
                                href={body.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-primary dark:hover:text-primary transition-colors flex-shrink-0"
                                aria-label={`Visit website for ${body.name}`}
                            >
                                <ExternalLinkIcon className="h-3.5 w-3.5" />
                            </a>
                        )}
                    </div>
                    {hasChildren && (
                        <div className={`p-1.5 rounded-full bg-gray-100 dark:bg-gray-700/50 transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-gray-200 dark:bg-gray-600' : ''}`}>
                             <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </div>
                    )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed pr-8">{body.description}</p>
            </button>
            
            <div className={`w-full transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                 <div className="pt-2 pb-4 px-1 space-y-3">
                    {body.leadership && (
                         <div className="bg-primary/5 dark:bg-primary/10 p-3 rounded-xl border border-primary/10">
                            <h4 className="font-bold text-xs uppercase tracking-wider text-primary dark:text-dark-primary mb-1">Leadership</h4>
                            {body.leadership.map((l, i) => <p key={i} className="font-semibold text-sm text-gray-800 dark:text-gray-200">{l.title}</p>)}
                         </div>
                    )}

                    {body.powers && body.powers.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                             <div className="flex items-center gap-2 mb-2 text-gray-600 dark:text-gray-300">
                                <ShieldCheckIcon className="h-4 w-4" />
                                <h4 className="font-bold text-xs uppercase tracking-wider">Powers & Jurisdiction</h4>
                            </div>
                            <ul className="space-y-1.5 ml-1">
                                {body.powers.map((power, index) => (
                                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start text-left">
                                        <span className="mr-2 text-primary dark:text-dark-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                        <span className="flex-1">{power}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {body.composition && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Composition</h4>
                            <div className="flex flex-wrap gap-2">
                                {body.composition.map((c, i) => <span key={i} className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 py-1 px-2.5 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">{c}</span>)}
                            </div>
                        </div>
                    )}
                     {body.jurisdiction && !body.powers && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Jurisdiction</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{body.jurisdiction}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const HierarchyNode: React.FC<{ body: JudicialBody; level?: number; onToggle: (name: string) => void; isExpanded: (name: string) => boolean; }> = ({ body, level = 0, onToggle, isExpanded }) => {
    const expanded = isExpanded(body.name);
    const hasChildren = !!(body.children && body.children.length > 0);

    return (
        <div className="flex flex-col w-full relative">
            <DetailsCard body={body} level={level} onToggle={() => onToggle(body.name)} isExpanded={expanded} hasChildren={hasChildren} />
            
            {expanded && hasChildren && (
                <div className="relative ml-4 pl-4 md:ml-8 md:pl-8 border-l-2 border-gray-200 dark:border-gray-700 mt-2 space-y-4">
                     {body.children!.map((child) => (
                        <div key={child.name} className="relative pt-4">
                            {/* Horizontal connector to child */}
                             <div className="absolute top-10 -left-4 md:-left-8 w-4 md:w-8 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                             {/* Connector Ball */}
                             <div className="absolute top-[2.4rem] -left-[1.2rem] md:-left-[2.2rem] w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-900 z-10"></div>
                            
                            <HierarchyNode body={child} level={level + 1} onToggle={onToggle} isExpanded={isExpanded} />
                        </div>
                     ))}
                </div>
            )}
        </div>
    );
};

const JudiciaryPage: React.FC = () => {
    const { data: judiciaryData, isLoading, error, refetch } = useLazyData<JudicialBody>(
        'judiciary-data',
        () => import('../data/governance/judiciary').then(m => m.judiciaryData)
    );

    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    
    // Initialize expanded node for root once data is loaded
    React.useEffect(() => {
        if (judiciaryData) {
             setExpandedNodes(new Set([judiciaryData.name]));
        }
    }, [judiciaryData]);

    const findNode = (data: JudicialBody, name: string): JudicialBody | null => {
        if (data.name === name) return data;
        if (data.children) {
            for (const child of data.children) {
                const found = findNode(child, name);
                if (found) return found;
            }
        }
        return null;
    }

    const findNodeAndChildren = (data: JudicialBody, name: string): string[] => {
        const names: string[] = [];
        const find = (body: JudicialBody) => {
            names.push(body.name);
            if(body.children) {
                body.children.forEach(find);
            }
        };
        const startNode = findNode(data, name);
        if (startNode) find(startNode);
        return names;
    };

    const handleToggle = (nodeName: string) => {
        if (!judiciaryData) return;
        setExpandedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(nodeName)) {
                // Determine if we are closing a node that is currently open, 
                // we might want to keep children state or close them.
                // For better UX in deep trees, usually closing parent hides children but keeps their state,
                // but closing deeply can be cleaner. Let's toggle just the node for now.
                newSet.delete(nodeName);
            } else {
                newSet.add(nodeName);
            }
            return newSet;
        });
    };

    const isExpanded = (nodeName: string) => expandedNodes.has(nodeName);
    
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error || !judiciaryData) {
        return <ErrorDisplay message="Failed to load Judiciary data." onRetry={refetch} />;
    }

    return (
        <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
            <div className="max-w-3xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-block p-4 bg-primary-light dark:bg-dark-primary-light rounded-3xl mb-4 shadow-sm">
                        <ScaleIcon className="h-10 w-10 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight">Judiciary Structure</h1>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                        Explore the structure, hierarchy, and powers of the Courts of Kenya.
                    </p>
                </header>

                <div className="pb-20">
                     <HierarchyNode
                        body={judiciaryData}
                        onToggle={handleToggle}
                        isExpanded={isExpanded}
                    />
                </div>
            </div>
        </div>
    );
};

export default JudiciaryPage;
