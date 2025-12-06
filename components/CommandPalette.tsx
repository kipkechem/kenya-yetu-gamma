
import React, { useState, useEffect, useMemo } from 'react';
import { appStructure } from '../data/app-structure';
import type { AppView, County } from '../types';
import type { ActsByCategory, Act } from '../data/legislation/acts';
import { dispatchNavigate } from '../utils/navigation';
import { BookOpenIcon, MapPinIcon, FileTextIcon, ScaleIcon, HomeIcon } from './icons';
import { useLazyData } from '../hooks/useLazyData';

const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Lazy load Acts data only when palette is open
    const { data: actsData } = useLazyData<ActsByCategory>(
        'acts-data',
        () => import('../data/legislation/acts').then(m => m.actsOfParliament),
        [],
        { enabled: isOpen, skipCache: true }
    );

    // Lazy load Counties data only when palette is open
    const { data: countiesData } = useLazyData<County[]>(
        'counties-data',
        () => import('../data/counties').then(m => m.countiesData),
        [],
        { enabled: isOpen }
    );

    // Reset selection when query changes or when opening
    useEffect(() => {
        setSelectedIndex(0);
    }, [query, isOpen]);

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
        if (!query.trim()) return [];
        const lowerQuery = query.toLowerCase();

        const navigationResults = appStructure
            .filter(route => route.title.en.toLowerCase().includes(lowerQuery))
            .map(route => ({
                type: 'Navigation',
                label: route.title.en,
                icon: route.icon || HomeIcon,
                colorClass: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
                action: () => dispatchNavigate({ view: route.view })
            }));

        const countyResults = countiesData
            ? countiesData
                .filter(county => county.name.toLowerCase().includes(lowerQuery))
                .map(county => ({
                    type: 'County',
                    label: `${county.name} County`,
                    icon: MapPinIcon,
                    colorClass: 'text-green-500 bg-green-50 dark:bg-green-900/20',
                    action: () => dispatchNavigate({ view: 'projects', countySearchTerm: county.name }) 
                })).slice(0, 3)
            : [];

        const actsResults = actsData
            ? Object.values(actsData).flat()
                .filter((act: Act) => act.title.toLowerCase().includes(lowerQuery))
                .map((act: Act) => ({
                    type: 'Law',
                    label: act.title,
                    icon: ScaleIcon,
                    colorClass: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
                    action: () => {
                        const targetUrl = act.url || `https://new.kenyalaw.org/kl/index.php?id=search&search[search_word]=${encodeURIComponent(act.title)}`;
                        window.open(targetUrl, '_blank', 'noopener,noreferrer');
                    }
                })).slice(0, 5)
            : [];

        const constitutionResults = [
            { label: 'Constitution Preamble', id: 'preamble' },
            { label: 'Chapter 1: Sovereignty', id: '1' },
            { label: 'Chapter 4: Bill of Rights', id: '4' },
            // Add more simplified for quick jump
        ].filter(c => c.label.toLowerCase().includes(lowerQuery))
         .map(c => ({
             type: 'Constitution',
             label: c.label,
             icon: BookOpenIcon,
             colorClass: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20',
             action: () => {
                 window.location.hash = c.id === 'preamble' ? '#preamble' : `#chapter-${c.id}`;
                 dispatchNavigate({ view: 'constitution' });
             }
         }));

        return [...navigationResults, ...countyResults, ...actsResults, ...constitutionResults];
    }, [query, actsData, countiesData]);

    const handleSelect = (item: any) => {
        item.action();
        onClose();
        setQuery('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in-up flex flex-col max-h-[70vh]">
                <div className="flex items-center px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                    <svg className="w-6 h-6 text-primary dark:text-dark-primary mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-xl font-medium"
                        placeholder="Search pages, laws, counties..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors">
                        <kbd className="font-sans text-xs font-semibold border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5">ESC</kbd>
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 p-2">
                    {results.length === 0 ? (
                        <div className="py-12 text-center">
                            {query ? (
                                <>
                                    <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">No results found</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">We couldn't find anything matching "{query}"</p>
                                </>
                            ) : (
                                <div className="text-gray-400 dark:text-gray-500 text-sm">
                                    <p className="mb-2">Try searching for:</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Nairobi</span>
                                        <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Bill of Rights</span>
                                        <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Finance Act</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <ul className="space-y-1">
                            {results.map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleSelect(item)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={`w-full px-4 py-3 flex items-center justify-between text-left rounded-xl transition-all duration-100 ${
                                            index === selectedIndex 
                                            ? 'bg-gray-100 dark:bg-gray-800 shadow-sm scale-[1.01]' 
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            <div className={`p-2 rounded-lg ${item.colorClass} flex-shrink-0`}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className={`font-semibold text-sm ${index === selectedIndex ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                                    {item.label}
                                                </p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mt-0.5">
                                                    {item.type}
                                                </p>
                                            </div>
                                        </div>
                                        {index === selectedIndex && (
                                             <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-800 px-4 py-2.5 flex justify-end items-center text-[10px] text-gray-400 dark:text-gray-500 gap-4 font-medium">
                    <div className="flex items-center gap-1">
                        <kbd className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 shadow-sm">↑</kbd>
                        <kbd className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 shadow-sm">↓</kbd>
                        <span>to navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <kbd className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 shadow-sm">Enter</kbd>
                        <span>to select</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
