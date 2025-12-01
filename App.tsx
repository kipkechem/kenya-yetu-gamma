
import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import type { AppView, Theme, NavigationPayload } from './types';
import MainSidebar from './components/MainSidebar';
import ThemeSwitcher from './components/ThemeSwitcher';
import LanguageSwitcher from './components/LanguageSwitcher';
import SearchBar from './components/SearchBar';
import { MenuIcon, ChatBubbleOvalLeftEllipsisIcon } from './components/icons';

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
const LegislaturePage = lazy(() => import('./components/LegislaturePage'));
const JudiciaryPage = lazy(() => import('./components/JudiciaryPage'));
const NationalPolicyPage = lazy(() => import('./components/NationalPolicyPage'));

// Symbols are small, so they can be loaded directly
import { kenyaFlagSvg, kenyaFlagDescription, kenyaCoatOfArmsSvg, kenyaCoatOfArmsDescription } from './data/symbols';


const LoadingSpinner: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    const messages = [
        "Don't worry, the page is loading...",
        "Consulting the Council of Elders for the data...",
        "Running a quick referendum on this request...",
        "Traversing the 47 counties to fetch your content...",
        "Loading... faster than a matatu during rush hour (hopefully)...",
        "Ensuring compliance with Chapter 6 before displaying..."
    ];

    useEffect(() => {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
        
        const interval = setInterval(() => {
            setProgress((prev) => {
                // Simulate progress that slows down as it reaches 100
                const remaining = 100 - prev;
                const increment = Math.max(0.2, remaining * 0.1); 
                const next = prev + increment;
                return next >= 99 ? 99 : next;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4 min-h-[50vh] animate-fade-in-up">
            <div className="relative flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-700/30"></div>
                <div className="w-24 h-24 rounded-full border-4 border-primary dark:border-dark-primary border-t-transparent animate-spin absolute inset0"></div>
                <span className="absolute text-xl font-bold text-primary dark:text-dark-primary">{Math.floor(progress)}%</span>
            </div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300 text-center animate-pulse max-w-md px-4">
                {message}
            </p>
        </div>
    );
};

// Mapping of views to Unsplash Image URLs
const getBackgroundImage = (view: AppView): string => {
    const images: Record<string, string> = {
        // Landscapes / Nature
        home: 'https://images.unsplash.com/photo-1489396160836-2c99c977e9a0?q=80&w=1920&auto=format&fit=crop', // Mt Kenya/Landscape
        about: 'https://images.unsplash.com/photo-1521669602905-e85a6177c2a1?q=80&w=1920&auto=format&fit=crop', // People
        contact: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1920&auto=format&fit=crop', // Communication/Connect
        
        // Law & Justice
        'kenya-laws': 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1920&auto=format&fit=crop', // Law Books/Pillars
        constitution: 'https://images.unsplash.com/photo-1623943443369-750b9064c4b6?q=80&w=1920&auto=format&fit=crop', // Open Book
        acts: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1920&auto=format&fit=crop', // Gavel
        'act-detail': 'https://images.unsplash.com/photo-1450101499121-e5b07505b1b0?q=80&w=1920&auto=format&fit=crop', // Writing
        'county-laws': 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=1920&auto=format&fit=crop', // Scales of Justice
        judiciary: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1920&auto=format&fit=crop', // Gavel/Court

        // Governance & Urban
        cabinet: 'https://images.unsplash.com/photo-1596422846543-75c6a1966c22?q=80&w=1920&auto=format&fit=crop', // KICC/Nairobi Skyline
        'state-corporations': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop', // Modern Building
        legislature: 'https://images.unsplash.com/photo-1575540325855-4b5d285a3845?q=80&w=1920&auto=format&fit=crop', // Parliament/Architecture
        'national-policy': 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=1920&auto=format&fit=crop', // Highway/Infrastructure
        
        // Development & Counties
        projects: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=1920&auto=format&fit=crop', // Agriculture/Tea Farm
        'county-governments': 'https://images.unsplash.com/photo-1543796755-74b13794920d?q=80&w=1920&auto=format&fit=crop', // Aerial Landscape
        infomap: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1920&auto=format&fit=crop', // Map/Globe
        
        // Resources & History
        resources: 'https://images.unsplash.com/photo-1507842217159-a28f2680d7d3?q=80&w=1920&auto=format&fit=crop', // Library
        'historical-documents': 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1920&auto=format&fit=crop', // Old Paper
        
        // Culture
        anthems: 'https://images.unsplash.com/photo-1519429778229-0430c372678d?q=80&w=1920&auto=format&fit=crop', // Singing/Crowd
        'kenyan-anthem': 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1920&auto=format&fit=crop', // Kenya Flag
        'east-african-anthem': 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1920&auto=format&fit=crop',
        'national-flag': 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1920&auto=format&fit=crop',
        'coat-of-arms': 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1920&auto=format&fit=crop',

        // Other
        chat: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop', // Abstract
    };

    return images[view] || images.home;
};

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
    const [countyLawsSearchTerm, setCountyLawsSearchTerm] = useState('');

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
            // Reset county laws search term if leaving county laws page
            if (currentView === 'county-laws' && prevView !== 'county-laws') {
                setCountyLawsSearchTerm('');
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
                return <HomePage navigateTo={navigateTo} language={language} />;
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
                return <HomePage navigateTo={navigateTo} language={language} />;
        }
    };

    return (
        <div className="h-screen w-screen relative flex flex-col md:flex-row overflow-hidden">
             {/* Fixed Background Image Layer */}
             <div 
                className="fixed inset-0 z-0 transition-all duration-700 ease-in-out transform-gpu"
                style={{
                    backgroundImage: `url('${getBackgroundImage(activeView)}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Overlay to ensure text readability on all backgrounds */}
                <div className="absolute inset-0 bg-surface/70 dark:bg-dark-surface/80 backdrop-blur-[2px] transition-colors duration-500" />
            </div>

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
                                
                                {activeView === 'constitution' && (
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md lg:max-w-xl px-12 md:px-20 pointer-events-none">
                                        <div className="pointer-events-auto opacity-0 animate-fade-in-up [animation-delay:100ms] forwards">
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
            </div>
        </div>
    );
};

export default App;
