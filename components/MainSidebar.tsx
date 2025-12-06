
import React from 'react';
import { 
    BuildingLibraryIcon, 
    ChevronDoubleLeftIcon, 
    ChevronDoubleRightIcon
} from './icons';
import type { AppView } from '../types';
import { appStructure } from '../data/app-structure';
import { getRoute } from '../data/routes';

interface SidebarItemProps {
  label: string;
  icon?: React.FC<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
    label, 
    icon: Icon, 
    isActive, 
    onClick, 
    isCollapsed 
}) => {
    // Base classes for the container
    // On mobile: default padding. On desktop (md): adjust based on collapsed state
    let containerClass = "w-full flex items-center transition-all duration-200 ease-in-out group relative select-none ";
    
    if (isCollapsed) {
        // Desktop: collapsed style (centered icons, less padding)
        // Mobile: ignores this via media queries structure below, but we set base styles here
        containerClass += "py-3 px-4 md:justify-center md:py-3 md:px-2 ";
    } else {
        // Expanded style
        containerClass += "py-3 px-4 ";
    }

    // Styling for active vs inactive
    if (isActive) {
        containerClass += "cursor-pointer ";
         if (isCollapsed) {
            containerClass += "text-green-800 bg-green-100 font-bold rounded-xl dark:text-green-300 dark:bg-green-900/40 md:text-green-600 md:dark:text-green-400 md:bg-green-100 md:dark:bg-green-900/30 ";
        } else {
            containerClass += "text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-900/40 font-bold rounded-xl ";
        }
    } else {
        containerClass += "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200 font-medium cursor-pointer rounded-xl ";
        if (isCollapsed) {
             containerClass += "md:rounded-none "; // Squared on desktop collapsed for cleaner look
        } 
    }

    return (
        <button onClick={onClick} className={containerClass} title={isCollapsed ? label : ''}>
            {/* Active Indicator for collapsed state (Desktop only) */}
            {isActive && isCollapsed && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-green-500 dark:bg-green-400 rounded-r-full"></div>
            )}
            
            {/* Icon */}
            {Icon && (
                <div className={`flex items-center justify-center w-6 h-6 transition-transform duration-200 ${isCollapsed ? 'mr-3 md:mr-0' : 'mr-3'} ${isActive ? 'scale-110 text-green-600 dark:text-green-400' : 'group-hover:scale-105'}`}>
                    <Icon className="w-5 h-5" />
                </div>
            )}

            {/* Label */}
            {/* Logic: Always show on mobile. On desktop, hide if collapsed. */}
            <div className={`flex-1 flex items-center justify-between overflow-hidden whitespace-nowrap ${isCollapsed ? 'block md:hidden' : 'block'}`}>
                <span className="truncate">{label}</span>
            </div>
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

const MainSidebar: React.FC<MainSidebarProps> = ({ activeView, navigateTo, isOpen, setIsOpen, isCollapsed, setIsCollapsed, language }) => {
  // Filter items that are marked to be shown in sidebar
  const sidebarItems = appStructure.filter(route => route.inSidebar);

  const handleNavigate = (view: AppView) => {
      navigateTo(view);
      if (window.innerWidth < 768) {
          setIsOpen(false);
      }
  };

  // Recursive check for active parent
  const isActiveItem = (itemView: AppView): boolean => {
      if (activeView === itemView) return true;
      
      let current = activeView;
      // Traverse up the route tree to find if this sidebar item is an ancestor
      // Limit depth to avoid infinite loops in case of malformed routes
      for(let i=0; i<10; i++) { 
          const route = getRoute(current);
          if (route.parent === itemView) return true;
          if (!route.parent || route.parent === 'home') break;
          current = route.parent;
      }
      return false;
  };

  return (
    <>
      {/* Mobile overlay with blur */}
      <div 
        onClick={() => setIsOpen(false)} 
        className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-[85%] max-w-xs sm:w-80 z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'md:w-[88px]' : 'md:w-72'} print:hidden`}>
        <div className="h-full flex flex-col bg-surface dark:bg-dark-surface border-r border-border dark:border-dark-border custom-shadow">
            
            {/* Header */}
            <div className={`p-4 h-16 md:h-[80px] flex items-center justify-between border-b border-border/50 dark:border-dark-border/50 ${isCollapsed ? 'md:justify-center' : 'md:justify-between'}`}>
                <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-auto md:w-0 md:opacity-0 md:pointer-events-none opacity-100' : 'w-auto opacity-100'}`}>
                    <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-xl flex-shrink-0">
                        <BuildingLibraryIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-bold text-lg whitespace-nowrap tracking-tight text-on-surface dark:text-dark-on-surface">KenyaYetu</span>
                </div>

                {/* Mobile close button */}
                <button 
                    onClick={() => setIsOpen(false)} 
                    className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-on-surface dark:hover:text-white transition-colors"
                    aria-label="Close sidebar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                {/* Desktop Toggle Button */}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)} 
                    className="hidden md:block p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-green-600 dark:hover:text-green-400 transition-all focus:outline-none"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? <ChevronDoubleRightIcon className="h-5 w-5" /> : <ChevronDoubleLeftIcon className="h-5 w-5" />}
                </button>
            </div>
            
            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1.5 scroll-smooth scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                {sidebarItems.map((item) => (
                    <SidebarItem 
                        key={item.view}
                        label={item.title[language]}
                        icon={item.icon}
                        isActive={isActiveItem(item.view)}
                        onClick={() => handleNavigate(item.view)}
                        isCollapsed={isCollapsed}
                    />
                ))}
            </nav>
            
            {/* Footer */}
            <div className="p-4 border-t border-border dark:border-dark-border/50">
                <div className={`text-xs text-center text-gray-400 dark:text-gray-600 transition-opacity duration-300 ${isCollapsed ? 'md:opacity-0' : 'opacity-100'}`}>
                    &copy; 2025 KenyaYetu
                </div>
            </div>
        </div>
      </aside>
    </>
  );
};

export default MainSidebar;
