import React, { useState, useEffect } from 'react';
import type { AppView, Theme } from './types';
import MainSidebar from './components/MainSidebar';
import HomePage from './components/HomePage';
import KenyaLawsPage from './components/KenyaLawsPage';
import ConstitutionExplorer from './ConstitutionExplorer';
import InfoMapPage from './components/InfoMapPage';
import ProjectsPage from './components/ProjectsPage';
import ResourcesPage from './components/ResourcesPage';
import AboutUsPage from './components/AboutUsPage';
import ContactPage from './components/ContactPage';
import ActsPage from './components/ActsPage';
import CabinetPage from './components/CabinetPage';
import CommissionsPage from './components/CommissionsPage';
import CountyExplorerPage from './components/CountyExplorerPage';
import MyRepresentativesPage from './components/MyRepresentativesPage';
import ThemeSwitcher from './components/ThemeSwitcher';
import LanguageSwitcher from './components/LanguageSwitcher';
import SearchBar from './components/SearchBar';
import { MenuIcon } from './components/icons';

const App: React.FC = () => {
    const [viewHistory, setViewHistory] = useState<AppView[]>(['home']);
    const activeView = viewHistory[viewHistory.length - 1];
    const [isMainSidebarOpen, setMainSidebarOpen] = useState(false);
    const [isMainSidebarCollapsed, setMainSidebarCollapsed] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    const navigateTo = (view: AppView) => {
        // Reset search term when navigating to a new top-level view
        if (view !== 'constitution') {
            setSearchTerm('');
        }
        setViewHistory(prev => [...prev, view]);
    };

    const handleBack = () => {
        if (viewHistory.length > 1) {
            const newHistory = viewHistory.slice(0, -1);
            const prevView = newHistory[newHistory.length - 1];
            // Reset search term if leaving constitution explorer
            if (activeView === 'constitution' && prevView !== 'constitution') {
                setSearchTerm('');
            }
            setViewHistory(newHistory);
        }
    };
    
    // Theme state management
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem('theme') as Theme) || 'system'
    );

    // Language state management
    const [language, setLanguage] = useState<'en' | 'sw'>(
        () => (localStorage.getItem('language') as 'en' | 'sw') || 'en'
    );

    useEffect(() => {
        const root = window.document.documentElement;
        const isDark =
            theme === 'dark' ||
            (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        root.classList.toggle('dark', isDark);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const renderActiveView = () => {
        switch (activeView) {
            case 'home':
                return <HomePage navigateTo={navigateTo} />;
            case 'kenya-laws':
                return <KenyaLawsPage navigateTo={navigateTo} />;
            case 'constitution':
                return <ConstitutionExplorer language={language} searchTerm={searchTerm} />;
            case 'acts':
                return <ActsPage />;
            case 'cabinet':
                return <CabinetPage />;
            case 'commissions':
                return <CommissionsPage />;
            case 'infomap':
                return <InfoMapPage navigateTo={navigateTo} />;
            case 'county-explorer':
                return <CountyExplorerPage />;
            case 'my-representatives':
                return <MyRepresentativesPage />;
            case 'projects':
                return <ProjectsPage />;
            case 'resources':
                return <ResourcesPage />;
            case 'about':
                return <AboutUsPage navigateTo={navigateTo} />;
            case 'contact':
                return <ContactPage />;
            default:
                return <HomePage navigateTo={navigateTo} />;
        }
    };

    return (
        <div className="flex h-full w-full bg-background dark:bg-dark-background">
            <MainSidebar 
                activeView={activeView}
                navigateTo={navigateTo}
                isOpen={isMainSidebarOpen}
                setIsOpen={setMainSidebarOpen}
                isCollapsed={isMainSidebarCollapsed}
                setIsCollapsed={setMainSidebarCollapsed}
            />
            <main className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
                <header className="flex-shrink-0 z-30">
                    <div className="max-w-7xl w-full mx-auto px-4">
                        <div className="relative flex items-center justify-between h-[73px] gap-2">
                             <div className="flex items-center gap-2 z-10">
                                <button 
                                    onClick={() => setMainSidebarOpen(!isMainSidebarOpen)} 
                                    className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 md:hidden"
                                    aria-label="Toggle navigation menu"
                                >
                                    <MenuIcon className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={handleBack}
                                    disabled={viewHistory.length <= 1}
                                    className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Go back"
                                    title="Go back"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </button>
                            </div>
                            
                            {activeView === 'constitution' && (
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md lg:max-w-xl px-12 md:px-20 pointer-events-none">
                                    <div className="pointer-events-auto">
                                        <SearchBar onSearch={setSearchTerm} language={language} />
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4 z-10">
                                <LanguageSwitcher language={language} setLanguage={setLanguage} />
                                <ThemeSwitcher theme={theme} setTheme={setTheme} />
                            </div>
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto">
                    {renderActiveView()}
                </div>
            </main>
        </div>
    );
};

export default App;