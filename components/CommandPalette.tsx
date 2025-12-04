
import React, { useState, useEffect, useMemo } from 'react';
import { appStructure } from '../data/app-structure';
import type { AppView, County } from '../types';
import type { ActsByCategory, Act } from '../data/legislation/acts';
import { dispatchNavigate } from '../utils/navigation';
import { BookOpenIcon, MapPinIcon, FileTextIcon, ScaleIcon } from './icons';
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
    }, [isOpen, selectedIndex]); 

    const results = useMemo(() => {
        if (!query.trim()) return [];
        const lowerQuery = query.toLowerCase();

        const navigationResults = appStructure
            .filter(route => route.title.en.toLowerCase().includes(lowerQuery))
            .map(route => ({
                type: 'Navigation',
                label: route.title.en,
                icon: route.icon,
                action: () => dispatchNavigate({ view: route.view })
            }));

        const countyResults = countiesData
            ? countiesData
                .filter(county => county.name.toLowerCase().includes(lowerQuery))
                .map(county => ({
                    type: 'County',
                    label: `${county.name} County`,
                    icon: MapPinIcon,
                    action: () => dispatchNavigate({ view: 'projects', countySearchTerm: county.name }) 
                })).slice(0, 3)
            : [];

        const actsResults = actsData
            ? Object.values(actsData).flat()
                .filter((act: Act) => act.title.toLowerCase().includes(lowerQuery))
                .map((act: Act) => ({
                    type: 'Act',
                    label: act.title,
                    icon: ScaleIcon,
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
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in-up">
                <div className="flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        className="w-full px-4 py-4 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg"
                        placeholder="Search pages, laws, counties..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className="max-h-[60vh] overflow-y-auto py-2">
                    {results.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                            {query ? 'No results found.' : 'Type to search...'}
                        </div>
                    ) : (
                        results.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelect(item)}
                                className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${
                                    index === selectedIndex 
                                    ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-dark-primary' 
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <item.icon className={`w-5 h-5 flex-shrink-0 ${index === selectedIndex ? 'text-primary dark:text-dark-primary' : 'text-gray-400'}`} />
                                    <span className="truncate font-medium">{item.label}</span>
                                </div>
                                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider ml-2 flex-shrink-0">
                                    {item.type}
                                </span>
                            </button>
                        ))
                    )}
                </div>
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                    <span><kbd className="font-sans bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">↑↓</kbd> to navigate</span>
                    <span><kbd className="font-sans bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">Enter</kbd> to select</span>
                    <span><kbd className="font-sans bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">Esc</kbd> to close</span>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
