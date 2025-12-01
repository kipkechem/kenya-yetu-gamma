
import React from 'react';
import { BookOpenIcon, HomeIcon, LinkIcon, UsersIcon, MailIcon, MapIcon, PresentationChartLineIcon, BuildingLibraryIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from './icons';
import type { AppView } from '../types/index';

interface NavItemProps {
  onClick: () => void;
  isSelected: boolean;
  isCollapsed: boolean;
  label: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ onClick, isSelected, children, isCollapsed, label }) => {
  const baseClasses = "w-full py-3 text-sm font-medium rounded-xl transition-all duration-300 ease-out flex items-center group relative overflow-hidden";
  const selectedClasses = "bg-primary-light text-primary dark:bg-dark-primary-light dark:text-dark-primary shadow-sm";
  const unselectedClasses = "text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200";
  
  const paddingClasses = isCollapsed ? 'justify-center px-2' : 'px-4';
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses} ${paddingClasses}`}
      title={isCollapsed ? label : ""}
    >
      {/* Active Indicator Line */}
      {isSelected && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary dark:bg-dark-primary rounded-r-full"></div>
      )}
      {children}
    </button>
  );
};

interface MainSidebarProps {
  activeView: AppView;
  navigateTo: (view: AppView) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  language: 'en' | 'sw';
}

interface NavItemData {
  view: AppView;
  labelKey: string;
  icon: React.FC<{ className?: string }>;
  activeStates: AppView[];
}

const translations = {
    en: {
        home: 'Home',
        projects: 'Development Strategy',
        laws: 'Laws & Governance',
        maps: 'Projects & Proposals',
        resources: 'Data Sources/Links',
        about: 'About Us',
        contact: 'Contact'
    },
    sw: {
        home: 'Nyumbani',
        projects: 'Mkakati wa Maendeleo',
        laws: 'Sheria na Utawala',
        maps: 'Miradi na Mapendekezo',
        resources: 'Vyanzo vya Data',
        about: 'Kutuhusu',
        contact: 'Wasiliana Nasi'
    }
};

const MainSidebar: React.FC<MainSidebarProps> = ({ activeView, navigateTo, isOpen, setIsOpen, isCollapsed, setIsCollapsed, language }) => {
  
  const t = translations[language];

  const handleItemClick = (view: AppView) => {
    navigateTo(view);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const navItems: NavItemData[] = [
    { view: 'home', labelKey: 'home', icon: HomeIcon, activeStates: ['home'] },
    { view: 'projects', labelKey: 'projects', icon: PresentationChartLineIcon, activeStates: ['projects', 'national-policy'] },
    { view: 'kenya-laws', labelKey: 'laws', icon: BookOpenIcon, activeStates: ['kenya-laws', 'constitution', 'acts', 'cabinet', 'state-corporations', 'kenyan-anthem', 'east-african-anthem', 'national-flag', 'coat-of-arms', 'anthems', 'county-laws', 'county-governments', 'act-detail', 'historical-documents', 'legislature', 'judiciary'] },
    { view: 'infomap', labelKey: 'maps', icon: MapIcon, activeStates: ['infomap'] },
    { view: 'resources', labelKey: 'resources', icon: LinkIcon, activeStates: ['resources'] },
    { view: 'about', labelKey: 'about', icon: UsersIcon, activeStates: ['about'] },
    { view: 'contact', labelKey: 'contact', icon: MailIcon, activeStates: ['contact'] },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-surface/95 dark:bg-dark-surface/95 backdrop-blur-xl border-r border-border dark:border-dark-border custom-shadow z-50">
        <div className={`p-4 h-[73px] flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-b border-border/50 dark:border-dark-border/50 ${isCollapsed ? 'md:justify-center' : 'md:justify-between'}`}>
            {/* Logo and title, visible when not collapsed */}
            <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCollapsed ? 'w-0 opacity-0 md:w-0 md:opacity-0 pointer-events-none' : 'w-auto opacity-100'}`}>
                <div className="p-1.5 bg-primary-light dark:bg-dark-primary-light rounded-xl flex-shrink-0">
                    <BuildingLibraryIcon className="h-6 w-6 text-primary dark:text-dark-primary" />
                </div>
                <span className="font-bold text-lg whitespace-nowrap tracking-tight">KenyaYetu</span>
            </div>

            {/* Mobile close button */}
             <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-on-surface dark:hover:text-dark-on-surface transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
            {/* Desktop Toggle Button */}
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)} 
                className="hidden md:block p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-primary dark:hover:text-dark-primary transition-all focus:outline-none"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsed ? <ChevronDoubleRightIcon className="h-5 w-5" /> : <ChevronDoubleLeftIcon className="h-5 w-5" />}
            </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1.5">
            {navItems.map(item => (
                <NavItem
                    key={item.view}
                    onClick={() => handleItemClick(item.view)}
                    isSelected={item.activeStates.includes(activeView)}
                    isCollapsed={isCollapsed}
                    label={t[item.labelKey as keyof typeof t]}
                >
                    <div className={`flex items-center justify-center h-6 w-6 transition-transform duration-200 ${isCollapsed ? '' : 'mr-3'} ${item.activeStates.includes(activeView) ? 'scale-110' : 'group-hover:scale-110'}`}>
                        <item.icon className="h-5 w-5" />
                    </div>
                    <span className={`whitespace-nowrap font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCollapsed ? 'w-0 opacity-0 -translate-x-4' : 'w-auto opacity-100 translate-x-0'}`}>
                        {t[item.labelKey as keyof typeof t]}
                    </span>
                </NavItem>
            ))}
        </nav>
        
        <div className="p-4 border-t border-border dark:border-dark-border/50">
             <div className={`text-xs text-center text-gray-400 dark:text-gray-600 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                 &copy; 2025 KenyaYetu
             </div>
        </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-[85%] max-w-xs sm:w-80 z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'md:w-[88px]' : 'md:w-72'} print:hidden`}>
        {sidebarContent}
      </aside>
    </>
  );
};

export default MainSidebar;
