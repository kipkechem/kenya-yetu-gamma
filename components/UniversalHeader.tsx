
import React from 'react';
import { AppView, Theme } from '../types';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import SearchBar from './SearchBar';
import { MenuIcon, ChevronDoubleLeftIcon, HomeIcon } from './icons';

interface UniversalHeaderProps {
    activeView: AppView;
    isSidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    onBack: () => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    language: 'en' | 'sw';
    theme: Theme;
    setTheme: (theme: Theme) => void;
    onOpenCommandPalette: () => void;
    navigateTo: (view: AppView) => void;
}

const UniversalHeader: React.FC<UniversalHeaderProps> = ({
    activeView,
    isSidebarOpen,
    setSidebarOpen,
    onBack,
    searchTerm,
    setSearchTerm,
    language,
    theme,
    setTheme,
    onOpenCommandPalette,
    navigateTo
}) => {
    const isSearchActive = activeView === 'constitution' || activeView === 'acts' || activeView === 'county-laws';

    // Determine if we are in a view that has a specific search bar implemented in the header
    const showGlobalInput = activeView === 'constitution';

    return (
        <header className="flex-shrink-0 z-30 bg-surface/90 dark:bg-dark-surface/90 backdrop-blur-md border-b border-border/50 dark:border-dark-border/50 transition-colors duration-300 sticky top-0 supports-[backdrop-filter]:bg-surface/60">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16 md:h-20 gap-2 md:gap-4">
                    
                    {/* Left Section: Navigation Controls */}
                    <div className="flex items-center gap-2 z-20 flex-shrink-0">
                         {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setSidebarOpen(!isSidebarOpen)} 
                            className="flex items-center p-2.5 -ml-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 md:hidden transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                            aria-label="Toggle navigation menu"
                        >
                            <MenuIcon className="h-6 w-6" />
                        </button>
                        
                        <div className="flex items-center gap-1">
                            {/* Back Button */}
                            {activeView !== 'home' && (
                                <button
                                    onClick={onBack}
                                    className="group flex items-center justify-center p-2 md:px-3 md:py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-primary dark:hover:text-dark-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    aria-label="Go back"
                                >
                                    <ChevronDoubleLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                                    <span className="text-sm font-semibold hidden md:inline-block ml-1">Back</span>
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* Center Section: Search */}
                    <div className={`
                        flex-1 flex justify-center z-10
                        md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl 
                        ${showGlobalInput ? 'mx-2' : 'mx-0'}
                    `}>
                         <div className="w-full transition-all duration-300 ease-out">
                            {showGlobalInput ? (
                                <div className="w-full shadow-sm rounded-full">
                                     <SearchBar onSearch={setSearchTerm} language={language} />
                                </div>
                            ) : (
                                /* Fake Search Bar triggering Command Palette */
                                <button 
                                    onClick={onOpenCommandPalette}
                                    className="flex items-center w-full md:w-full bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 hover:border-primary/50 dark:hover:border-dark-primary/50 hover:bg-white dark:hover:bg-gray-800 rounded-xl py-2.5 px-4 text-gray-500 dark:text-gray-400 transition-all duration-200 group shadow-sm hover:shadow-md"
                                >
                                    <svg className="w-5 h-5 md:mr-3 text-gray-400 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    <span className="text-sm font-medium hidden md:block text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">Quick Search...</span>
                                    <span className="text-sm font-medium md:hidden block ml-2">Search</span>
                                    <div className="ml-auto hidden md:flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <kbd className="inline-flex items-center justify-center h-5 min-w-[24px] text-[10px] font-sans font-bold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 px-1">Ctrl</kbd>
                                        <kbd className="inline-flex items-center justify-center h-5 min-w-[20px] text-[10px] font-sans font-bold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 px-1">K</kbd>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Section: Actions */}
                    <div className="flex items-center gap-1 md:gap-2 z-20 flex-shrink-0">
                        <LanguageSwitcher />
                        <ThemeSwitcher theme={theme} setTheme={setTheme} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default UniversalHeader;
