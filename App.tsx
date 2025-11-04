import React, { useState, useEffect } from 'react';
import MainSidebar from './components/MainSidebar';
import HomePage from './components/HomePage';
import ConstitutionExplorer from './ConstitutionExplorer';
import ResourcesPage from './components/ResourcesPage';
import AboutUsPage from './components/AboutUsPage';
import ContactPage from './components/ContactPage';
import KenyaLawsPage from './components/KenyaLawsPage';
import ActsPage from './components/ActsPage';
import CabinetPage from './components/CabinetPage';
import CommissionsPage from './components/CommissionsPage';
import InfoMapPage from './components/InfoMapPage';
import MyRepresentativesPage from './components/MyRepresentativesPage';
import CountyExplorerPage from './components/CountyExplorerPage';
import ProjectsPage from './components/ProjectsPage';
import ThemeSwitcher from './components/ThemeSwitcher';
import LanguageSwitcher from './components/LanguageSwitcher';
import type { AppView } from './types';

type Theme = 'light' | 'dark' | 'system';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<AppView>('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem('theme') as Theme) || 'system';
    });
    const [history, setHistory] = useState<AppView[]>(['home']);
    const [language, setLanguage] = useState<'en' | 'sw'>('en');

    useEffect(() => {
        const root = window.document.documentElement;
        const savedTheme = localStorage.getItem('theme') || 'system';

        const applyTheme = () => {
            if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        applyTheme();
        localStorage.setItem('theme', savedTheme);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', applyTheme);
        return () => mediaQuery.removeEventListener('change', applyTheme);
    }, [theme]);
    
    const handleSetTheme = (newTheme: Theme) => {
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    const handleSetActiveView = (view: AppView) => {
        if (view !== activeView) {
            setHistory(prev => [...prev, view]);
            setActiveView(view);
        }
    };
    
    const handleBack = () => {
        if (history.length > 1) {
            const newHistory = history.slice(0, -1);
            setHistory(newHistory);
            setActiveView(newHistory[newHistory.length - 1]);
        }
    };
    
    const viewToTitleMap: Record<AppView, string> = {
        'home': 'Home',
        'kenya-laws': 'Laws & Governance',
        'constitution': 'The Constitution',
        'acts': 'Acts of Parliament',
        'cabinet': 'Cabinet',
        'commissions': 'Commissions',
        'infomap': 'Info Maps',
        'my-representatives': 'My Representatives',
        'county-explorer': 'County Explorer',
        'projects': 'Projects',
        'resources': 'Resources',
        'about': 'About Us',
        'contact': 'Contact'
    };


    const renderView = () => {
        switch (activeView) {
            case 'home':
                return <HomePage setActiveView={handleSetActiveView} />;
            case 'constitution':
                return <ConstitutionExplorer language={language} />;
            case 'resources':
                return <ResourcesPage />;
            case 'about':
                return <AboutUsPage setActiveView={handleSetActiveView} />;
            case 'contact':
                return <ContactPage />;
            case 'kenya-laws':
                return <KenyaLawsPage setActiveView={handleSetActiveView} />;
            case 'acts':
                return <ActsPage />;
            case 'cabinet':
                return <CabinetPage />;
            case 'commissions':
                return <CommissionsPage />;
            case 'infomap':
                return <InfoMapPage setActiveView={handleSetActiveView} />;
            case 'my-representatives':
                return <MyRepresentativesPage />;
            case 'county-explorer':
                return <CountyExplorerPage />;
            case 'projects':
                return <ProjectsPage />;
            default:
                return <HomePage setActiveView={handleSetActiveView} />;
        }
    };

    return (
        <div className="h-screen w-screen bg-background text-on-surface dark:bg-dark-background dark:text-dark-on-surface font-sans flex overflow-hidden">
            <MainSidebar 
                activeView={activeView} 
                setActiveView={handleSetActiveView}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex-shrink-0 bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-sm border-b border-border dark:border-dark-border p-2 pr-4 flex items-center justify-between z-20 print:hidden h-[73px]">
                    <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-500 dark:text-dark-on-surface/70">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                        <button
                            onClick={handleBack}
                            disabled={history.length <= 1}
                            className="p-2 rounded-full text-gray-500 dark:text-dark-on-surface/70 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Go back"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-lg font-bold text-on-surface dark:text-dark-on-surface tracking-tight ml-2">
                            {viewToTitleMap[activeView] || 'KenyaYetu'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher language={language} setLanguage={setLanguage} />
                        <ThemeSwitcher theme={theme} setTheme={handleSetTheme} />
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;