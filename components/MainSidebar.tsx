import React from 'react';
import { BookOpenIcon, HomeIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, LinkIcon, UsersIcon, MailIcon, MapIcon, ProjectIcon } from './icons';
import type { AppView } from '../types';

interface NavItemProps {
  onClick: () => void;
  isSelected: boolean;
  isCollapsed: boolean;
  label: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ onClick, isSelected, children, isCollapsed, label }) => {
  const baseClasses = "w-full text-left py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out flex items-center group";
  const selectedClasses = "bg-primary-light text-primary dark:bg-dark-primary-light dark:text-dark-primary";
  const unselectedClasses = "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface";
  
  const paddingClasses = isCollapsed ? 'justify-center px-3' : 'px-5';
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses} ${paddingClasses}`}
      title={isCollapsed ? label : ""}
    >
      {children}
    </button>
  );
};

interface MainSidebarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

interface NavItemData {
  view: AppView;
  label: string;
  icon: React.FC<{ className?: string }>;
  activeStates: AppView[];
}

const MainSidebar: React.FC<MainSidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  
  const handleItemClick = (view: AppView) => {
    setActiveView(view);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const navItems: NavItemData[] = [
    { view: 'home', label: 'Home', icon: HomeIcon, activeStates: ['home'] },
    { view: 'kenya-laws', label: 'Laws & Governance', icon: BookOpenIcon, activeStates: ['kenya-laws', 'constitution', 'acts', 'cabinet', 'commissions'] },
    { view: 'infomap', label: 'Info Maps', icon: MapIcon, activeStates: ['infomap', 'my-representatives', 'county-explorer'] },
    { view: 'projects', label: 'Projects', icon: ProjectIcon, activeStates: ['projects'] },
    { view: 'resources', label: 'Data Sources/Links', icon: LinkIcon, activeStates: ['resources'] },
    { view: 'about', label: 'About Us', icon: UsersIcon, activeStates: ['about'] },
    { view: 'contact', label: 'Contact', icon: MailIcon, activeStates: ['contact'] },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-surface dark:bg-dark-surface border-r border-border dark:border-dark-border custom-shadow">
        <div className={`p-4 h-[73px] border-b border-border dark:border-dark-border flex items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCollapsed ? 'md:justify-center' : 'justify-between'}`}>
            <h1 className={`text-xl font-bold text-on-surface dark:text-dark-on-surface tracking-tight whitespace-nowrap overflow-hidden transition-opacity duration-300 ${isCollapsed ? 'md:opacity-0 md:w-0' : 'opacity-100'}`}>Navigation</h1>
            
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)} 
                className="hidden md:block p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsed ? 
                  <ChevronDoubleRightIcon className="h-5 w-5" /> : 
                  <ChevronDoubleLeftIcon className="h-5 w-5" />
                }
            </button>
            
             <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-gray-500 dark:text-gray-400 hover:text-on-surface dark:hover:text-dark-on-surface">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
            {navItems.map(item => (
                <NavItem
                    key={item.view}
                    onClick={() => handleItemClick(item.view)}
                    isSelected={item.activeStates.includes(activeView)}
                    isCollapsed={isCollapsed}
                    label={item.label}
                >
                    <item.icon className={`h-5 w-5 flex-shrink-0 transition-all duration-200 ${isCollapsed ? '' : 'mr-3.5'} group-hover:text-primary dark:group-hover:text-dark-primary`} />
                    <span className={`whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'md:opacity-0' : 'opacity-100'}`}>{item.label}</span>
                </NavItem>
            ))}
        </nav>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
      
      {/* Sidebar */}
      <aside
          className={`fixed top-0 left-0 h-full z-40 transform md:relative md:translate-x-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'md:w-20' : 'md:w-64'} print:hidden`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default MainSidebar;
