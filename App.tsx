
import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import type { AppView, Theme, NavigationPayload } from './types';
import MainSidebar from './components/MainSidebar';
import ThemeSwitcher from './components/ThemeSwitcher';
import LanguageSwitcher from './components/LanguageSwitcher';
import SearchBar from './components/SearchBar';
import { MenuIcon, ChatBubbleOvalLeftEllipsisIcon } from './components/icons';
import LoadingSpinner from './components/LoadingSpinner';
import { useLanguage } from './contexts/LanguageContext';
import CommandPalette from './components/CommandPalette';
import { getBackgroundImage } from './data/app-structure';

// Lazy load all page components for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
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
const StateCorporationsPage = lazy(() => import('./pages/StateCorporationsPage'));
const CountyGovernmentsPage = lazy(() => import('./pages/CountyGovernmentsPage'));
const AnthemPage = lazy(() => import('./pages/AnthemPage'));
const AnthemsListPage = lazy(() => import('./pages/AnthemsListPage'));
const SymbolPage = lazy(() => import('./pages/SymbolPage'));
const CountyLawsPage = lazy(() => import('./pages/CountyLawsPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const HistoricalDocumentsPage = lazy(() => import('./pages/HistoricalDocumentsPage'));
const LegislaturePage = lazy(() => import('./pages/LegislaturePage'));
const JudiciaryPage = lazy(() => import('./pages/JudiciaryPage'));
const NationalPolicyPage = lazy(() => import('./pages/NationalPolicyPage'));
const CountyExplorerPage = lazy(() => import('./pages/CountyExplorerPage'));
const SameLatLongPage = lazy(() => import('./pages/SameLatLongPage'));

const App: React.FC = () => {
    const { language } = useLanguage();
    const [viewHistory, setViewHistory] = useState<AppView[]>(['home']);
    const activeView = viewHistory[viewHistory.length - 1];
    const [isMainSidebarOpen, setMainSidebarOpen] = useState(false);
    const [isMainSidebarCollapsed, setMainSidebarCollapsed] = useState(
        () => localStorage.getItem('sidebarCollapsed') !== 'false'
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [actsSearchTerm, setActsSearchTerm] = useState('');
    const [selectedActTitle, setSelectedActTitle] = useState('');
    const [countyLawsSearchTerm, setCountyLawsSearchTerm] = useState('');
    
    // Command Palette State
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

    // Background Image State
    const [bgImages, setBgImages] = useState({
        current: getBackgroundImage('home'),
        next: '',
    });
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', String(isMainSidebarCollapsed));
    }, [isMainSidebarCollapsed]);

    // Handle Command Palette shortcut (Ctrl+K or Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsCommandPaletteOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Background Image Logic with Preloading
    useEffect(() => {
        const newImage = getBackgroundImage(activeView);
        if (newImage === bgImages.current) return;

        const img = new Image();
        img.src = newImage;
        
        let isMounted = true;

        img.onload = () => {
             if (!isMounted) return;
             
             setBgImages(prev => ({ ...prev, next: newImage }));
             setIsTransitioning(true);

             // After transition duration, update current and reset
             setTimeout(() => {
                 if (!isMounted) return;
                 setBgImages(prev => ({ current: newImage, next: '' }));
                 setIsTransitioning(false);
             }, 700); // Match transition duration
        };

        return () => { isMounted = false; };
    }, [activeView, bgImages.current]);


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

        // Handle county laws search term
        if (payload?.countySearchTerm !== undefined) {
            setCountyLawsSearchTerm(payload.countySearchTerm);
        } else if (activeView === 'county-laws' && view !== 'county-laws') {
            setCountyLawsSearchTerm('');
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
            const newHistory = viewHistory.slice(0, -1);
            setViewHistory(newHistory);
        }
    };
    
    // Theme state management
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem('theme') as Theme) || 'system'
    );

    useEffect(() => {
        const root = window.document.documentElement;
        const isDark =
            theme === 'dark' ||
            (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        root.classList.toggle('dark', isDark);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const renderActiveView = () => {
        switch (activeView) {
            case 'home':
                return <HomePage navigateTo={navigateTo} language={language} />;
            case 'kenya-laws':
                return <KenyaLawsPage navigateTo={navigateTo} language={language} />;
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
                return <CountyLawsPage initialSearchTerm={countyLawsSearchTerm} />;
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
                return <SymbolPage symbolId="national-flag" />;
            case 'coat-of-arms':
                return <SymbolPage symbolId="coat-of-arms" />;
            case 'county-explorer':
                return <CountyExplorerPage />;
            case 'same-lat-long':
                return <SameLatLongPage />;
            default:
                return <HomePage navigateTo={navigateTo} language={language} />;
        }
    };

    return (
        <div className="h-screen w-screen relative flex flex-col md:flex-row overflow-hidden">
             {/* Fixed Background Image Layer - Current Image */}
             <div 
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `url('${bgImages.current}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            
            {/* Fixed Background Image Layer - Next Image (for Crossfade) */}
            <div 
                className="fixed inset-0 z-0 transition-opacity duration-700 ease-in-out"
                style={{
                    backgroundImage: `url('${bgImages.next}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: isTransitioning ? 1 : 0,
                }}
            />

            {/* Overlay to ensure text readability on all backgrounds */}
            <div className="fixed inset-0 z-0 bg-surface/85 dark:bg-dark-surface/85 backdrop-blur-[1px]" />

            {/* Main App Content Wrapper - z-10 ensures it sits above the background */}
            <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
                {/* Sidebar */}
                <MainSidebar 
                    activeView={activeView}
                    navigateTo={navigateTo}
                    isOpen={isMainSidebarOpen}
                    setIsOpen={setMainSidebarOpen}
                    isCollapsed={isMainSidebarCollapsed}
                    setIsCollapsed={setMainSidebarCollapsed}
                    language={language}
                />

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-transparent transition-all duration-500 ease-in-out">
                    <header className="flex-shrink-0 z-30 bg-surface/40 dark:bg-dark-surface/40 backdrop-blur-md border-b border-border/50 dark:border-dark-border/50">
                        <div className="max-w-7xl w-full mx-auto px-4">
                            <div className="relative flex items-center justify-between h-[73px] gap-2">
                                <div className="flex items-center gap-2 z-10">
                                    <button 
                                        onClick={() => setMainSidebarOpen(!isMainSidebarOpen)} 
                                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 md:hidden transition-colors"
                                        aria-label="Toggle navigation menu"
                                    >
                                        <MenuIcon className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={handleBack}
                                        disabled={viewHistory.length <= 1}
                                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        aria-label="Go back"
                                        title="Go back"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                    </button>
                                </div>
                                
                                {activeView === 'constitution' ? (
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md lg:max-w-xl px-12 md:px-20 pointer-events-none">
                                        <div className="pointer-events-auto opacity-0 animate-fade-in-up [animation-delay:100ms] forwards">
                                            <SearchBar onSearch={setSearchTerm} language={language} />
                                        </div>
                                    </div>
                                ) : (
                                    // Command Palette Trigger for other pages
                                    <button 
                                        onClick={() => setIsCommandPaletteOpen(true)}
                                        className="hidden md:flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-dark-primary transition-colors bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg text-sm border border-transparent hover:border-primary/30"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                        <span className="hidden lg:inline">Quick Search...</span>
                                        <kbd className="hidden lg:inline-block font-sans text-xs border border-gray-300 dark:border-gray-600 rounded px-1 ml-2">Ctrl K</kbd>
                                    </button>
                                )}

                                <div className="flex items-center gap-4 z-10">
                                    <button 
                                        onClick={() => setIsCommandPaletteOpen(true)}
                                        className="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                    >
                                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    </button>
                                    <LanguageSwitcher />
                                    <ThemeSwitcher theme={theme} setTheme={setTheme} />
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="flex-1 overflow-y-auto scroll-smooth">
                        <div className="min-h-full">
                            {/* Key forces re-render and animation on view change */}
                            <div key={activeView} className="page-enter h-full">
                                <Suspense fallback={<LoadingSpinner />}>
                                    {renderActiveView()}
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </main>
                
                {/* FAB for Chat */}
                {activeView !== 'chat' && (
                    <div className="absolute bottom-6 right-6 z-40 animate-fade-in-up [animation-delay:500ms]">
                        <button
                            onClick={() => navigateTo('chat')}
                            className="p-4 rounded-full bg-primary dark:bg-dark-primary text-white custom-shadow-xl hover:scale-110 transform transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-dark-background focus:ring-primary"
                            aria-label="Open Chat"
                            title="Open Chat"
                        >
                            <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7" />
                        </button>
                    </div>
                )}
                
                <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
            </div>
        </div>
    );
};

export default App;
