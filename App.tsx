
import React, { useState, useEffect, useCallback, Suspense, useRef, useLayoutEffect } from 'react';
import type { AppView, Theme, NavigationPayload } from './types';
import MainSidebar from './components/MainSidebar';
import UniversalHeader from './components/UniversalHeader';
import LoadingSpinner from './components/LoadingSpinner';
import { useLanguage } from './contexts/LanguageContext';
import CommandPalette from './components/CommandPalette';
import { getBackgroundImage } from './data/app-structure';
import { logVisit } from './utils/analytics';
import { routes, getRoute } from './data/routes';

// Helper to determine view from hash
const getViewFromHash = (hash: string): AppView => {
    const cleanHash = hash.replace('#', '');
    if (!cleanHash) return 'home';

    // Constitution deep links
    if (cleanHash.startsWith('article-') || 
        cleanHash.startsWith('chapter-') || 
        cleanHash.startsWith('schedule-') || 
        cleanHash === 'preamble') {
        return 'constitution';
    }

    // Check if hash matches a known route
    if (cleanHash in routes) {
        return cleanHash as AppView;
    }

    return 'home';
};

const App: React.FC = () => {
    const { language } = useLanguage();
    const [activeView, setActiveView] = useState<AppView>(() => getViewFromHash(window.location.hash));
    
    const [isMainSidebarOpen, setMainSidebarOpen] = useState(false);
    const [isMainSidebarCollapsed, setMainSidebarCollapsed] = useState(
        () => localStorage.getItem('sidebarCollapsed') !== 'false'
    );
    
    // View-specific states
    const [searchTerm, setSearchTerm] = useState('');
    const [actsSearchTerm, setActsSearchTerm] = useState('');
    const [countyLawsSearchTerm, setCountyLawsSearchTerm] = useState('');
    const [selectedActTitle, setSelectedActTitle] = useState<string>('');

    // Command Palette State
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

    // Background Image State
    const [bgImages, setBgImages] = useState({
        current: getBackgroundImage('home'),
        next: '',
    });
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Scroll container ref for resetting scroll position
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', String(isMainSidebarCollapsed));
    }, [isMainSidebarCollapsed]);

    // Initialize Analytics
    useEffect(() => {
        logVisit();
    }, []);

    // Handle Hash Changes
    useEffect(() => {
        const handleHashChange = () => {
            const newView = getViewFromHash(window.location.hash);
            
            // Clean up search terms when leaving specific views
            if (activeView === 'acts' && newView !== 'acts' && newView !== 'act-detail') {
                setActsSearchTerm('');
            }
            if (activeView === 'county-laws' && newView !== 'county-laws') {
                setCountyLawsSearchTerm('');
            }
            if (activeView === 'constitution' && newView !== 'constitution') {
                setSearchTerm('');
            }

            setActiveView(newView);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [activeView]);

    // Scroll Reset on View Change
    useLayoutEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [activeView]);

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

    // Background Image Logic
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

             setTimeout(() => {
                 if (!isMounted) return;
                 setBgImages(prev => ({ current: newImage, next: '' }));
                 setIsTransitioning(false);
             }, 700);
        };

        return () => { isMounted = false; };
    }, [activeView, bgImages.current]);


    const navigateTo = useCallback((view: AppView, payload?: Omit<Partial<NavigationPayload>, 'view'>) => {
        if (payload?.actsSearchTerm !== undefined) setActsSearchTerm(payload.actsSearchTerm);
        if (payload?.countySearchTerm !== undefined) setCountyLawsSearchTerm(payload.countySearchTerm);
        if (payload?.actTitle !== undefined) setSelectedActTitle(payload.actTitle);

        window.location.hash = `#${view}`;
    }, []);

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
        const route = getRoute(activeView);
        const parentView = route.parent || 'home';
        if (activeView === 'home') return;
        navigateTo(parentView);
    };
    
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
        const route = getRoute(activeView);
        const Component = route.component;
        
        // Define common props that might be used by components
        const commonProps = {
            navigateTo,
            language
        };

        // Define specific props for certain views
        const specificProps: Record<string, any> = {
            'constitution': { searchTerm },
            'acts': { searchTerm: actsSearchTerm, onSearchChange: setActsSearchTerm },
            'act-detail': { actTitle: selectedActTitle, articleToChapterMap: new Map() }, // Passing empty map initially, logic handled inside page if needed or lazy loaded
            'county-laws': { initialSearchTerm: countyLawsSearchTerm },
        };

        // Merge props: Route specific static props overrides specific dynamic props overrides common props
        const props = { 
            ...commonProps, 
            ...(specificProps[activeView] || {}),
            ...(route.props || {}) 
        };

        return <Component {...props} />;
    };

    return (
        <div className="h-screen w-screen relative flex flex-col md:flex-row overflow-hidden">
             <div 
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `url('${bgImages.current}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            
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

            <div className="fixed inset-0 z-0 bg-surface/85 dark:bg-dark-surface/85 backdrop-blur-[1px]" />

            <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
                {activeView !== 'viewcount' && (
                    <MainSidebar 
                        activeView={activeView}
                        navigateTo={navigateTo}
                        isOpen={isMainSidebarOpen}
                        setIsOpen={setMainSidebarOpen}
                        isCollapsed={isMainSidebarCollapsed}
                        setIsCollapsed={setMainSidebarCollapsed}
                        language={language}
                    />
                )}

                <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-transparent transition-all duration-500 ease-in-out">
                    {activeView !== 'viewcount' && (
                        <UniversalHeader 
                            activeView={activeView}
                            isSidebarOpen={isMainSidebarOpen}
                            setSidebarOpen={setMainSidebarOpen}
                            onBack={handleBack}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            language={language}
                            theme={theme}
                            setTheme={setTheme}
                            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
                            navigateTo={navigateTo}
                        />
                    )}
                    
                    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scroll-smooth">
                        <div className="min-h-full">
                            <div key={activeView} className="page-enter h-full">
                                <Suspense fallback={<LoadingSpinner />}>
                                    {renderActiveView()}
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </main>
                
                <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
            </div>
        </div>
    );
};

export default App;
