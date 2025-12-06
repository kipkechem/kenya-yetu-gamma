
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
    const isSearchActive = activeView === 'constitution';

    return (
        <header className="flex-shrink-0 z-30 bg-surface/75 dark:bg-dark-surface/75 backdrop-blur-lg border-b border-border/50 dark:border-dark-border/50 transition-colors duration-300 sticky top-0">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16 md:h-[72px] gap-4">
                    
                    {/* Left Section: Navigation Controls */}
                    <div className="flex items-center gap-2 z-20 min-w-0 flex-shrink-0">
                         {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setSidebarOpen(!isSidebarOpen)} 
                            className="p-2 -ml-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 md:hidden transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                            aria-label="Toggle navigation menu"
                        >
                            <MenuIcon className="h-6 w-6" />
                        </button>
                        
                        <div className="flex items-center gap-1 md:gap-2">
                            {/* Home Button (Visible when not on home) */}
                            {activeView !== 'home' && (
                                <button
                                    onClick={() => navigateTo('home')}
                                    className="flex p-2 rounded-xl text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-dark-primary hover:bg-primary/5 dark:hover:bg-white/5 transition-colors"
                                    title="Go to Home"
                                >
                                    <HomeIcon className="h-5 w-5" />
                                </button>
                            )}

                            {/* Back Button */}
                            {activeView !== 'home' && (
                                <button
                                    onClick={onBack}
                                    className="group flex items-center gap-1 pl-1 pr-3 py-1.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-primary dark:hover:text-dark-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    aria-label="Go back"
                                >
                                    <ChevronDoubleLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                                    <span className="text-sm font-semibold hidden md:inline-block">Back</span>
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* Center Section: Search */}
                    <div className="flex-1 flex justify-center max-w-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none px-4 md:px-0 z-40">
                         <div className={`w-full pointer-events-auto transition-all duration-500 ease-out ${isSearchActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 hidden md:block md:opacity-100 md:translate-y-0 md:scale-100'}`}>
                            {isSearchActive ? (
                                <div className="w-full shadow-lg rounded-full">
                                     <SearchBar onSearch={setSearchTerm} language={language} />
                                </div>
                            ) : (
                                /* Fake Search Bar triggering Command Palette */
                                <button 
                                    onClick={onOpenCommandPalette}
                                    className="hidden md:flex items-center w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-dark-primary/50 rounded-full py-2.5 px-4 text-gray-500 dark:text-gray-400 transition-all duration-200 group shadow-sm hover:shadow-md"
                                >
                                    <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    <span className="text-sm font-medium">Quick Search...</span>
                                    <div className="ml-auto flex items-center gap-1">
                                        <kbd className="hidden lg:inline-flex items-center justify-center h-5 min-w-[24px] text-[10px] font-sans font-bold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 px-1">Ctrl</kbd>
                                        <kbd className="hidden lg:inline-flex items-center justify-center h-5 min-w-[20px] text-[10px] font-sans font-bold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 px-1">K</kbd>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Section: Actions */}
                    <div className="flex items-center gap-2 md:gap-4 z-20 flex-shrink-0">
                        {/* Mobile Search Trigger */}
                        <button 
                            onClick={onOpenCommandPalette}
                            className="md:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>

                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>
                        
                        <LanguageSwitcher />
                        <ThemeSwitcher theme={theme} setTheme={setTheme} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default UniversalHeader;
