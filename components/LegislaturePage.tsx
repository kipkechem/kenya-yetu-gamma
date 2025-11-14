import React, { useState } from 'react';
import { legislatureData } from '../data/legislature';
import type { LegislatureBody } from '../data/legislature';
import { ChevronDownIcon, BuildingLibraryIcon, UsersIcon } from './icons';
import { dispatchNavigate } from '../utils/navigation';

const DetailsCard: React.FC<{ body: LegislatureBody; level: number; onToggle: () => void; isExpanded: boolean; hasChildren: boolean; }> = ({ body, level, onToggle, isExpanded, hasChildren }) => (
    <div className="relative z-10">
        <button
            onClick={onToggle}
            className="bg-surface dark:bg-dark-surface p-5 rounded-xl custom-shadow-lg w-72 text-center group transition-all duration-300 hover:custom-shadow-xl hover:-translate-y-1"
            aria-expanded={isExpanded}
        >
            <h3 className={`font-bold text-on-surface dark:text-dark-on-surface ${level === 0 ? 'text-lg' : 'text-base'}`}>{body.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{body.description}</p>
            {hasChildren && <ChevronDownIcon className={`h-5 w-5 mx-auto mt-2 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />}
        </button>
        <div className="w-72 transition-all duration-500 ease-in-out overflow-hidden" style={{ maxHeight: isExpanded ? '1500px' : '0px', opacity: isExpanded ? 1 : 0 }}>
            <div className="w-full space-y-3 pt-4">
                {body.leadership && body.leadership.length > 0 && (
                    <div className="bg-primary-light/50 dark:bg-dark-primary-light/50 p-4 rounded-lg custom-shadow text-center">
                        <h4 className="font-bold text-sm text-primary dark:text-dark-primary mb-2 border-b border-primary/20 pb-2">Leadership</h4>
                        <ul className="text-left space-y-1.5 mt-2">
                            {body.leadership.map((member, index) => (
                                <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">{member.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {body.membership && body.membership.length > 0 && (
                    <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg custom-shadow">
                        <h4 className="font-bold text-sm text-gray-600 dark:text-gray-300 mb-2 text-center border-b border-gray-200 dark:border-gray-600 pb-2">Membership Composition</h4>
                        <ul className="text-left space-y-1.5 mt-3">
                            {body.membership.map((group, index) => (
                                <li key={index} className="text-sm text-gray-700 dark:text-gray-400 flex justify-between">
                                    <span>{group.category}</span>
                                    <span className="font-semibold">{group.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                 {body.committees && body.committees.length > 0 && (
                    <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg custom-shadow">
                        <h4 className="font-bold text-sm text-gray-600 dark:text-gray-300 mb-2 text-center border-b border-gray-200 dark:border-gray-600 pb-2">Committees</h4>
                        {body.committees.map((group, index) => (
                            <div key={index} className="pt-2">
                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">{group.category}</p>
                                <ul className="list-disc list-inside text-left space-y-1">
                                    {group.list.map((item, itemIndex) => (
                                        <li key={itemIndex} className="text-sm text-gray-700 dark:text-gray-400">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
                {body.linkToMembers && (
                    <div className="pt-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent toggling the card
                                dispatchNavigate({ view: body.linkToMembers! });
                            }}
                            className="w-full flex items-center justify-center text-center px-4 py-3 text-sm font-semibold rounded-lg bg-primary/10 text-primary dark:bg-dark-primary/20 dark:text-dark-primary hover:bg-primary/20 dark:hover:bg-dark-primary/30 transition-colors"
                        >
                            <UsersIcon className="h-5 w-5 mr-2" />
                            View Members
                        </button>
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
        <div className="flex flex-col items-center relative px-2">
            <DetailsCard body={body} level={level} onToggle={() => onToggle(body.name)} isExpanded={expanded} hasChildren={hasChildren} />
            
            {expanded && hasChildren && (
                <div className="w-full mt-12 relative">
                    {/* Vertical line from parent to horizontal connector */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-300 dark:bg-gray-600"></div>
                    
                    <div className="flex justify-center flex-wrap">
                        {/* Horizontal connector line */}
                        {body.children.length > 1 && (
                            <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                        )}
                        {body.children.map((child, index) => (
                            <div key={child.name} className="px-4 relative flex-shrink-0">
                                {/* Vertical line from child up to horizontal connector */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-300 dark:bg-gray-600"></div>
                                
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
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([legislatureData.name]));

    const findNodeAndChildren = (data: LegislatureBody, name: string): string[] => {
        const names: string[] = [];
        const find = (body: LegislatureBody) => {
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

    const handleToggle = (nodeName: string) => {
        setExpandedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(nodeName)) {
                // Collapse the node and all its children
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
                <header className="text-center mb-12">
                    <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
                        <BuildingLibraryIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Legislature Structure</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        An interactive organizational chart of the Parliament of Kenya, showcasing the bicameral structure of the National Assembly and the Senate. Click on a house to explore its composition and leadership.
                    </p>
                </header>

                <main className="flex flex-col items-center gap-8 pb-12">
                     <HierarchyNode
                        body={legislatureData}
                        onToggle={handleToggle}
                        isExpanded={isExpanded}
                     />
                </main>
            </div>
        </div>
    );
};

export default LegislaturePage;