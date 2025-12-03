
import React, { useState } from 'react';
import type { LegislatureBody } from '../data/governance/legislature';
import { ChevronDownIcon, BuildingLibraryIcon } from '../components/icons';
import { useLazyData } from '../hooks/useLazyData';
import LoadingSpinner from '../components/LoadingSpinner';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="flex items-center gap-2 mb-3 mt-4 first:mt-0">
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{title}</span>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
    </div>
);

const DetailsCard: React.FC<{ body: LegislatureBody; level: number; onToggle: () => void; isExpanded: boolean; hasChildren: boolean; }> = ({ body, level, onToggle, isExpanded, hasChildren }) => (
    <div className="relative z-10 flex flex-col items-center">
        <button
            onClick={onToggle}
            className={`relative p-5 rounded-2xl custom-shadow-lg w-80 text-center group transition-all duration-300 border-2 ${level === 0 ? 'bg-surface dark:bg-dark-surface border-primary/20 dark:border-primary/20' : 'bg-white dark:bg-gray-800 border-transparent'} hover:border-primary hover:-translate-y-1`}
            aria-expanded={isExpanded}
        >
            <h3 className={`font-bold text-on-surface dark:text-dark-on-surface ${level === 0 ? 'text-xl' : 'text-lg'}`}>{body.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{body.description}</p>
            {hasChildren && (
                <div className={`mt-3 flex justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </div>
            )}
        </button>

        <div className={`w-80 transition-all duration-500 ease-[cubic-bezier(0.04,0.62,0.23,0.98)] overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pt-4 pb-2 space-y-4">
                {body.leadership && body.leadership.length > 0 && (
                    <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/10">
                        <h4 className="font-bold text-sm text-primary dark:text-dark-primary mb-3 text-center">Leadership</h4>
                        <ul className="space-y-2">
                            {body.leadership.map((member, index) => (
                                <li key={index} className="text-sm text-gray-800 dark:text-gray-200 flex items-start justify-center text-center">
                                    <span>{member.title}</span>
                                    {member.name && <span className="font-medium ml-1">- {member.name}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {body.membership && body.membership.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                        <SectionHeader title="Membership" />
                        <ul className="space-y-2">
                            {body.membership.map((group, index) => (
                                <li key={index} className="text-sm flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                    <span className="text-gray-600 dark:text-gray-300">{group.category}</span>
                                    <span className="font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">{group.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                 {body.committees && body.committees.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                        <SectionHeader title="Committees" />
                        {body.committees.map((group, index) => (
                            <div key={index} className="mb-3 last:mb-0">
                                <p className="font-semibold text-xs text-gray-500 dark:text-gray-400 uppercase mb-2">{group.category}</p>
                                <ul className="space-y-1">
                                    {group.list.map((item, itemIndex) => (
                                        <li key={itemIndex} className="text-sm text-gray-700 dark:text-gray-300 pl-3 border-l-2 border-gray-200 dark:border-gray-600">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
);

const HierarchyNode: React.FC<{ body: LegislatureBody; level?: number; onToggle: (name: string) => void; isExpanded: (name: string) => boolean; }> = ({ body, level = 0, onToggle, isExpanded }) => {
    const expanded = isExpanded(body.name);
    const hasChildren = body.children && body.children.length > 0;

    return (
        <div className="flex flex-col items-center">
            <DetailsCard body={body} level={level} onToggle={() => onToggle(body.name)} isExpanded={expanded} hasChildren={hasChildren} />
            
            {expanded && hasChildren && (
                <div className="flex flex-col items-center w-full">
                    {/* Vertical Stem */}
                    <div className="h-8 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                    
                    <div className="relative flex justify-center gap-8 w-full">
                        {/* Horizontal Bar connecting children */}
                        {body.children.length > 1 && (
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-gray-300 dark:bg-gray-600" style={{ width: `calc(100% - 20rem)` }}></div> // Approx width calculation
                        )}

                        {body.children.map((child, index) => (
                            <div key={child.name} className="flex flex-col items-center relative">
                                {/* Vertical connector to child */}
                                <div className="h-8 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                                <HierarchyNode body={child} level={level + 1} onToggle={onToggle} isExpanded={isExpanded} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const LegislaturePage: React.FC = () => {
    const { data: legislatureData, isLoading } = useLazyData<LegislatureBody>(
        'legislature-data',
        () => import('../data/governance/legislature').then(m => m.legislatureData)
    );

    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

    // Initialize expanded nodes once data is loaded
    React.useEffect(() => {
        if (legislatureData) {
            setExpandedNodes(new Set([legislatureData.name]));
        }
    }, [legislatureData]);

    if (isLoading || !legislatureData) {
        return <LoadingSpinner />;
    }

    const findNode = (data: LegislatureBody, name: string): LegislatureBody | null => {
        if (data.name === name) return data;
        if (data.children) {
            for (const child of data.children) {
                const found = findNode(child, name);
                if (found) return found;
            }
        }
        return null;
    }

    const findNodeAndChildren = (data: LegislatureBody, name: string): string[] => {
        const names: string[] = [];
        const find = (body: LegislatureBody) => {
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
        setExpandedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(nodeName)) {
                // Collapse children
                const nodesToCollapse = findNodeAndChildren(legislatureData, nodeName);
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
                <header className="text-center mb-16">
                    <div className="inline-block p-4 bg-primary-light dark:bg-dark-primary-light rounded-3xl mb-4 shadow-sm">
                        <BuildingLibraryIcon className="h-10 w-10 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Legislature Structure</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        Explore the structure of the Parliament of Kenya. Click on the cards to expand the National Assembly and Senate details.
                    </p>
                </header>

                <div className="w-full overflow-x-auto pb-12">
                    <div className="min-w-max flex justify-center px-4">
                        <HierarchyNode
                            body={legislatureData}
                            onToggle={handleToggle}
                            isExpanded={isExpanded}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegislaturePage;
