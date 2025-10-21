import React, { useState, useEffect } from 'react';
import MainSidebar from './components/MainSidebar';
import HomePage from './components/HomePage';
import ConstitutionExplorer from './ConstitutionExplorer';
import ResourcesPage from './components/ResourcesPage';
import AboutUsPage from './components/AboutUsPage';
import ContactPage from './components/ContactPage';
import InfoMapPage from './components/InfoMapPage';
import ProjectsPage from './components/ProjectsPage';
import MyRepresentativesPage from './components/MyRepresentativesPage';
import ThemeSwitcher from './components/ThemeSwitcher';

type Theme = 'light' | 'dark' | 'system';

export type AppView = 'home' | 'constitution' | 'resources' | 'about' | 'contact' | 'infomap' | 'projects' | 'my-representatives';


const App: React.FC = () => {
    const [activeView, setActiveView] = useState<AppView>('home');
    const [isMainSidebarOpen, setMainSidebarOpen] = useState(false); // For mobile overlay
    const [isMainSidebarCollapsed, setMainSidebarCollapsed] = useState(true); // For desktop collapse
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedTheme = window.localStorage.getItem('theme');
            if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
                return storedTheme as Theme;
            }
        }
        return 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        const isDark =
            theme === 'dark' ||
            (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        root.classList.toggle('dark', isDark);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <div className="flex flex-col h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm z-20 print:hidden flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 17.2a.5.5 0 01-.7-.7l.2-.2a.5.5 0 01.7.7l-.2.2zM12 21a.5.5 0 01-.5-.5v-1a.5.5 0 011 0v1a.5.5 0 01-.5.5zM16.2 17.2a.5.5 0 01.7-.7l.2-.2a.5.5 0 01-.7.7l.2.2zM7.5 11a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">Kenya Yetu</h1>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeSwitcher theme={theme} setTheme={setTheme} />
                    <button onClick={() => setMainSidebarOpen(!isMainSidebarOpen)} className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <MainSidebar 
                    activeView={activeView}
                    setActiveView={setActiveView}
                    isOpen={isMainSidebarOpen}
                    setIsOpen={setMainSidebarOpen}
                    isCollapsed={isMainSidebarCollapsed}
                    setIsCollapsed={setMainSidebarCollapsed}
                />
                <main className="flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900 transition-all duration-300 ease-in-out">
                    {activeView === 'home' && <HomePage setActiveView={setActiveView} />}
                    {activeView === 'constitution' && <ConstitutionExplorer />}
                    {activeView === 'infomap' && <InfoMapPage setActiveView={setActiveView} />}
                    {activeView === 'projects' && <ProjectsPage />}
                    {activeView === 'resources' && <ResourcesPage />}
                    {activeView === 'about' && <AboutUsPage />}
                    {activeView === 'contact' && <ContactPage />}
                    {activeView === 'my-representatives' && <MyRepresentativesPage />}
                </main>
            </div>
        </div>
    );
};

export default App;