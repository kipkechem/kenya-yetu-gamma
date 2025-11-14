import React, { useState } from 'react';
import { judiciaryData } from '../data/judiciary';
import type { JudicialBody } from '../data/judiciary';
import { ChevronDownIcon, ScaleIcon, ExternalLinkIcon } from './icons';

const DetailsCard: React.FC<{ body: JudicialBody; level: number; onToggle: () => void; isExpanded: boolean; hasChildren: boolean; }> = ({ body, level, onToggle, isExpanded, hasChildren }) => {
    return (
        <div className="relative z-10">
            <button
                onClick={onToggle}
                className="bg-surface dark:bg-dark-surface p-5 rounded-xl custom-shadow-lg w-72 text-center group transition-all duration-300 hover:custom-shadow-xl hover:-translate-y-1"
                aria-expanded={isExpanded}
            >
                <div className="flex items-center justify-center space-x-2">
                    <h3 className={`font-bold text-on-surface dark:text-dark-on-surface ${level === 0 ? 'text-lg' : 'text-base'}`}>{body.name}</h3>
                    {body.url && (
                        <a
                            href={body.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded-full text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                            aria-label={`Visit website for ${body.name}`}
                            title={`Visit website for ${body.name}`}
                        >
                            <ExternalLinkIcon className="h-4 w-4" />
                        </a>
                    )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{body.description}</p>
                {hasChildren && <ChevronDownIcon className={`h-5 w-5 mx-auto mt-2 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />}
            </button>
            <div className="w-72 transition-all duration-500 ease-in-out overflow-hidden" style={{ maxHeight: isExpanded ? '1500px' : '0px', opacity: isExpanded ? 1 : 0 }}>
                 <div className="w-full space-y-3 pt-4">
                    {body.leadership && (
                         <div className="bg-primary-light/50 dark:bg-dark-primary-light/50 p-4 rounded-lg custom-shadow text-center z-10">
                            <h4 className="font-bold text-sm text-primary dark:text-dark-primary mb-2 border-b border-primary/20 pb-2">Leadership</h4>
                            {body.leadership.map((l, i) => <p key={i} className="font-semibold text-sm text-gray-800 dark:text-gray-200">{l.title}</p>)}
                         </div>
                    )}
                    {body.composition && (
                        <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg custom-shadow z-10">
                            <h4 className="font-bold text-sm text-gray-600 dark:text-gray-300 mb-2 text-center border-b border-gray-200 dark:border-gray-600 pb-2">Composition</h4>
                            <ul className="text-center space-y-1.5 mt-2">
                                {body.composition.map((c, i) => <li key={i} className="text-sm text-gray-700 dark:text-gray-400">{c}</li>)}
                            </ul>
                        </div>
                    )}
                     {body.jurisdiction && (
                        <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg custom-shadow z-10">
                            <h4 className="font-bold text-sm text-gray-600 dark:text-gray-300 mb-2 text-center border-b border-gray-200 dark:border-gray-600 pb-2">Jurisdiction</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">{body.jurisdiction}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const HierarchyNode: React.FC<{ body: JudicialBody; level?: number; onToggle: (name: string) => void; isExpanded: (name: string) => boolean; }> = ({ body, level = 0, onToggle, isExpanded }) => {
    const expanded = isExpanded(body.name);
    const hasChildren = body.children && body.children.length > 0;

    return (
        <div className="flex flex-col items-center relative px-2">
            <DetailsCard body={body} level={level} onToggle={() => onToggle(body.name)} isExpanded={expanded} hasChildren={hasChildren} />
            
            {expanded && hasChildren && (
                <div className="w-full mt-12 relative flex justify-center">
                    {/* Vertical line connecting parent to its children block */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-300 dark:bg-gray-600 z-0"></div>
                    
                    {/* Grid layout for children */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full max-w-7xl">
                        {body.children.map((child) => (
                            <HierarchyNode 
                                key={child.name} 
                                body={child} 
                                level={level + 1} 
                                onToggle={onToggle} 
                                isExpanded={isExpanded} 
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const JudiciaryPage: React.FC = () => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([judiciaryData.name]));
    
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
        if (startNode) {
            find(startNode);
        }
        return names;
    };

    const handleToggle = (nodeName: string) => {
        setExpandedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(nodeName)) {
                // If collapsing a node, collapse all its children too
                const nodesToCollapse = findNodeAndChildren(judiciaryData, nodeName);
                nodesToCollapse.forEach(name => newSet.delete(name));
            } else {
                newSet.add(nodeName);
            }
            return newSet;
        });
    };

    const isExpanded = (nodeName: string) => expandedNodes.has(nodeName);

    return (
        <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
                        <ScaleIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Judiciary Structure</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        An interactive chart of the Judiciary of Kenya. Explore the hierarchy from the Supreme Court down to the subordinate courts and learn about their roles and composition.
                    </p>
                </header>

                <main className="flex flex-col items-center gap-8 pb-12">
                     <HierarchyNode
                        body={judiciaryData}
                        onToggle={handleToggle}
                        isExpanded={isExpanded}
                     />
                </main>
            </div>
        </div>
    );
};

export default JudiciaryPage;