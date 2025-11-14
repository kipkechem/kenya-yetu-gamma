import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import type { AppView, Theme, NavigationPayload } from './types';
import MainSidebar from './components/MainSidebar';
import ThemeSwitcher from './components/ThemeSwitcher';
import LanguageSwitcher from './components/LanguageSwitcher';
import SearchBar from './components/SearchBar';
import { MenuIcon, ChatBubbleOvalLeftEllipsisIcon } from './components/icons';

// Lazy load all page components for better performance
const HomePage = lazy(() => import('./components/HomePage'));
const KenyaLawsPage = lazy(() => import('./pages/KenyaLawsPage'));
const ConstitutionExplorer = lazy(() => import('./pages/ConstitutionExplorer'));
const InfoMapPage = lazy(() => import('./pages/InfoMapPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ActsPage = lazy(() => import('./pages/ActsPage'));
const ActDetailPage = lazy(() => import('./pages/ActDetailPage'));
const CabinetPage = lazy(() => import('./pages/CabinetPage'));
const StateCorporationsPage = lazy(() => import('./data/StateCorporationsPage'));
const CountyGovernmentsPage = lazy(() => import('./pages/CountyGovernmentsPage'));
const MyRepresentativesPage = lazy(() => import('./pages/MyRepresentativesPage'));
const AnthemPage = lazy(() => import('./pages/AnthemPage'));
const AnthemsListPage = lazy(() => import('./pages/AnthemsListPage'));
const SymbolPage = lazy(() => import('./pages/SymbolPage'));
const CountyLawsPage = lazy(() => import('./pages/CountyLawsPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const HistoricalDocumentsPage = lazy(() => import('./pages/HistoricalDocumentsPage'));
const LegislaturePage = lazy(() => import('./pages/LegislaturePage'));
const JudiciaryPage = lazy(() => import('./pages/JudiciaryPage'));
const CountyExplorerPage = lazy(() => import('./pages/CountyExplorerPage'));
const NationalPolicyPage = lazy(() => import('./components/NationalPolicyPage'));

// Symbols are small, so they can be loaded directly
import { kenyaFlagSvg, kenyaFlagDescription, kenyaCoatOfArmsSvg, kenyaCoatOfArmsDescription } from './data/symbols';


const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary dark:border-dark-primary"></div>
    </div>
);

const App: React.FC = () => {
    const [viewHistory, setViewHistory] = useState<AppView[]>(['home']);
    const activeView = viewHistory[viewHistory.length - 1];
    const [isMainSidebarOpen, setMainSidebarOpen] = useState(false);
    const [isMainSidebarCollapsed, setMainSidebarCollapsed] = useState(
        () => localStorage.getItem('sidebarCollapsed') !== 'false'
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [actsSearchTerm, setActsSearchTerm] = useState('');
    const [selectedActTitle, setSelectedActTitle] = useState('');

    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', String(isMainSidebarCollapsed));
    }, [isMainSidebarCollapsed]);

    const navigateTo = useCallback((view: AppView, payload?: Omit<Partial<NavigationPayload>, 'view'>) => {
        // Reset constitution search term when navigating to a new top-level view
        if (view !== 'constitution') {
            setSearchTerm('');
        }
        
        // Set acts search term if provided, or clear it if navigating away from acts page
        if (payload?.actsSearchTerm !== undefined) {
            setActsSearchTerm(payload.actsSearchTerm);
        } else if (activeView === 'acts' && view !== 'acts') {
            setActsSearchTerm('');
        }

        // Handle selected Act Title
        if (payload?.actTitle) {
            setSelectedActTitle(payload.actTitle);
        } else if (activeView === 'act-detail' && view !== 'act-detail') {
            setSelectedActTitle('');
        }

        setViewHistory(prev => [...prev, view]);
    }, [activeView]);

    useEffect(() => {
        const handleNavigate = (event: Event) => {
            const customEvent = event as CustomEvent<NavigationPayload>;
            const { view, ...payload } = customEvent.detail;
            navigateTo(view, payload);
        };
        window.addEventListener('navigate', handleNavigate);
        return () => {
            window.removeEventListener('navigate', handleNavigate);
        };
    }, [navigateTo]);

    const handleBack = () => {
        if (viewHistory.length > 1) {
            const currentView = viewHistory[viewHistory.length - 1];
            const newHistory = viewHistory.slice(0, -1);
            const prevView = newHistory[newHistory.length - 1];
            // Reset search term if leaving constitution explorer
            if (currentView === 'constitution' && prevView !== 'constitution') {
                setSearchTerm('');
            }
             // Reset acts search term if leaving acts page
            if (currentView === 'acts' && prevView !== 'acts') {
                setActsSearchTerm('');
            }
            // Clear selected act title when navigating back from it
            if (currentView === 'act-detail') {
                setSelectedActTitle('');
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
                return <ActsPage searchTerm={actsSearchTerm} onSearchChange={setActsSearchTerm} />;
            case 'act-detail':
                return <ActDetailPage 
                            actTitle={selectedActTitle} 
                            language={language}
                        />;
            case 'county-laws':
                return <CountyLawsPage />;
            case 'historical-documents':
                return <HistoricalDocumentsPage />;
            case 'legislature':
                return <LegislaturePage />;
            case 'judiciary':
                return <JudiciaryPage />;
            case 'cabinet':
                return <CabinetPage />;
            case 'state-corporations':
                return <StateCorporationsPage />;
            case 'infomap':
                return <InfoMapPage navigateTo={navigateTo} />;
            case 'county-governments':
                return <CountyGovernmentsPage />;
            case 'my-representatives':
                return <MyRepresentativesPage />;
            case 'county-explorer':
                return <CountyExplorerPage />;
            case 'national-policy':
                return <NationalPolicyPage />;
            case 'projects':
                return <ProjectsPage />;
            case 'resources':
                return <ResourcesPage />;
            case 'about':
                return <AboutUsPage navigateTo={navigateTo} />;
            case 'contact':
                return <ContactPage />;
            case 'chat':
                return <ChatPage language={language} />;
            case 'kenyan-anthem':
                return <AnthemPage anthemId="kenyan" language={language} />;
            case 'east-african-anthem':
                return <AnthemPage anthemId="east-african" language={language} />;
            case 'anthems':
                return <AnthemsListPage navigateTo={navigateTo} />;
            case 'national-flag':
                return <SymbolPage 
                    title="The National Flag"
                    svgContent={kenyaFlagSvg}
                    description={kenyaFlagDescription}
                    fileName="kenya-national-flag.svg"
                />;
            case 'coat-of-arms':
                return <SymbolPage 
                    title="The Coat of Arms"
                    svgContent={kenyaCoatOfArmsSvg}
                    description={kenyaCoatOfArmsDescription}
                    fileName="kenya-coat-of-arms.svg"
                />;
            default:
                return <HomePage navigateTo={navigateTo} />;
        }
    };

    return (
        <div className="h-screen w-screen relative">
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
                        <Suspense fallback={<LoadingSpinner />}>
                            {renderActiveView()}
                        </Suspense>
                    </div>
                </main>
            </div>
            {/* FAB for Chat */}
            {activeView !== 'chat' && (
                <div className="absolute bottom-6 right-6 z-40">
                    <button
                        onClick={() => navigateTo('chat')}
                        className="p-4 rounded-full bg-primary dark:bg-dark-primary text-white custom-shadow-xl hover:scale-110 transform transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-dark-background focus:ring-primary"
                        aria-label="Open Chat"
                        title="Open Chat"
                    >
                        <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;