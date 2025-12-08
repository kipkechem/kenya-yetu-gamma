
import React, { useState, useEffect, useMemo, useDeferredValue } from 'react';
import { appStructure } from '../data/app-structure';
import type { AppView, County } from '../types';
import type { ActsByCategory, Act } from '../data/legislation/acts';
import { dispatchNavigate } from '../utils/navigation';
import { BookOpenIcon, MapPinIcon, FileTextIcon, ScaleIcon, HomeIcon, ChevronDoubleRightIcon, PresentationChartLineIcon } from './icons';
import { useLazyData } from '../hooks/useLazyData';
import Highlight from './Highlight';

const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Only load heavy data if the user is actually searching
    const shouldLoadData = isOpen && deferredQuery.length > 1;

    // Lazy load Acts data only when needed
    const { data: actsData } = useLazyData<ActsByCategory>(
        'acts-data',
        () => import('../data/legislation/acts').then(m => m.actsOfParliament),
        [],
        { enabled: shouldLoadData, skipCache: true }
    );

    // Lazy load Counties data
    const { data: countiesData } = useLazyData<County[]>(
        'counties-data',
        () => import('../data/counties').then(m => m.countiesData),
        [],
        { enabled: shouldLoadData }
    );

    // Reset selection when query changes or when opening
    useEffect(() => {
        setSelectedIndex(0);
    }, [deferredQuery, isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setQuery('');
        }
    }, [isOpen]);

    // Keyboard controls for navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % results.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (results[selectedIndex]) {
                    handleSelect(results[selectedIndex]);
                }
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    const results = useMemo(() => {
        if (!deferredQuery.trim()) return [];
        const lowerQuery = deferredQuery.toLowerCase();

        const navigationResults = appStructure
            .filter(route => 
                route.title.en.toLowerCase().includes(lowerQuery) || 
                (route.description && route.description.en.toLowerCase().includes(lowerQuery))
            )
            .map(route => ({
                type: 'Page',
                label: route.title.en,
                description: route.description?.en || 'Navigate to page',
                icon: route.icon || HomeIcon,
                colorClass: 'text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30',
                action: () => dispatchNavigate({ view: route.view })
            }));
            
        // Limit initial results to nav only if query is short
        if (lowerQuery.length < 2) return navigationResults;

        const countyResults = countiesData
            ? countiesData
                .filter(county => county.name.toLowerCase().includes(lowerQuery))
                .flatMap(county => [
                    {
                        type: 'Development',
                        label: `${county.name} Development`,
                        description: `Strategy, Projects & Plans`,
                        icon: PresentationChartLineIcon,
                        colorClass: 'text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-900/30',
                        action: () => dispatchNavigate({ view: 'projects', countySearchTerm: county.name }) 
                    },
                    {
                        type: 'Legislation',
                        label: `${county.name} Laws`,
                        description: `Acts & Assembly Bills`,
                        icon: ScaleIcon,
                        colorClass: 'text-purple-600 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30',
                        action: () => dispatchNavigate({ view: 'county-laws', countySearchTerm: county.name }) 
                    }
                ]).slice(0, 6)
            : [];

        const actsResults = actsData
            ? Object.values(actsData).flat()
                .filter((act: Act) => act.title.toLowerCase().includes(lowerQuery))
                .map((act: Act) => ({
                    type: 'Legislation',
                    label: act.title,
                    description: 'Act of Parliament',
                    icon: ScaleIcon,
                    colorClass: 'text-purple-600 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30',
                    action: () => {
                        // Open in new tab if it has a URL, otherwise simulate navigation logic for acts page
                        const targetUrl = act.url || `https://new.kenyalaw.org/kl/index.php?id=search&search[search_word]=${encodeURIComponent(act.title)}`;
                        window.open(targetUrl, '_blank', 'noopener,noreferrer');
                    }
                })).slice(0, 5)
            : [];

        const constitutionResults = [
            { label: 'Constitution Preamble', id: 'preamble', desc: 'The beginning of the Constitution' },
            { label: 'Chapter 1: Sovereignty', id: '1', desc: 'Sovereignty of the People & Supremacy of Constitution' },
            { label: 'Chapter 2: The Republic', id: '2', desc: 'Territory, symbols, and national values' },
            { label: 'Chapter 3: Citizenship', id: '3', desc: 'Rights and duties of citizens' },
            { label: 'Chapter 4: Bill of Rights', id: '4', desc: 'Fundamental rights and freedoms' },
            { label: 'Chapter 5: Land & Environment', id: '5', desc: 'Land policy and environmental obligations' },
            { label: 'Chapter 6: Leadership & Integrity', id: '6', desc: 'Conduct of State officers' },
            { label: 'Chapter 11: Devolved Government', id: '11', desc: 'Objects and principles of devolution' },
        ].filter(c => c.label.toLowerCase().includes(lowerQuery) || c.desc.toLowerCase().includes(lowerQuery))
         .map(c => ({
             type: 'Constitution',
             label: c.label,
             description: c.desc,
             icon: BookOpenIcon,
             colorClass: 'text-orange-600 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/30',
             action: () => {
                 window.location.hash = c.id === 'preamble' ? '#preamble' : `#chapter-${c.id}`;
                 dispatchNavigate({ view: 'constitution' });
             }
         }));

        return [...navigationResults, ...countyResults, ...actsResults, ...constitutionResults];
    }, [deferredQuery, actsData, countiesData]);

    const handleSelect = (item: any) => {
        item.action();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in-up flex flex-col max-h-[75vh]">
                <div className="flex items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg font-medium h-10"
                        placeholder="Search for laws, counties, or pages..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button onClick={onClose} className="ml-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors">
                        <span className="sr-only">Close</span>
                        <kbd className="font-sans text-xs font-semibold border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5">ESC</kbd>
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 p-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                    {query && results.length === 0 ? (
                        <div className="py-12 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-3">
                                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">No results found</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">We couldn't find anything matching "{query}"</p>
                        </div>
                    ) : (
                        <ul className="space-y-1">
                            {!query && (
                                <li className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Suggested
                                </li>
                            )}
                            {results.map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleSelect(item)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={`w-full px-4 py-3 flex items-center justify-between text-left transition-all duration-75 border-l-4 ${
                                            index === selectedIndex 
                                            ? 'bg-gray-50 dark:bg-white/5 border-primary dark:border-primary' 
                                            : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            <div className={`p-2 rounded-lg ${item.colorClass} flex-shrink-0`}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`font-semibold text-sm truncate ${index === selectedIndex ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                                    <Highlight text={item.label} highlight={deferredQuery} />
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500 font-medium truncate">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                        {index === selectedIndex && (
                                             <ChevronDoubleRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-800 px-4 py-2.5 flex justify-end items-center text-[10px] text-gray-500 dark:text-gray-400 gap-4 font-medium">
                    <div className="flex items-center gap-1.5">
                        <span className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 shadow-sm">↑</span>
                        <span className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 shadow-sm">↓</span>
                        <span>to navigate</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 shadow-sm">Enter</span>
                        <span>to select</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
