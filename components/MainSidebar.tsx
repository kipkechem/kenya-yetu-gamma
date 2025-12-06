
import React, { useState, useEffect, useMemo } from 'react';
import { 
    BuildingLibraryIcon, 
    ChevronDoubleLeftIcon, 
    ChevronDoubleRightIcon, 
    HomeIcon, 
    ScaleIcon, 
    PresentationChartLineIcon, 
    FlagIcon, 
    LinkIcon, 
    UsersIcon, 
    ChevronDownIcon,
    MapIcon,
    BookOpenIcon,
    MailIcon,
    InboxStackIcon,
    UserGroupIcon,
    MapPinIcon
} from './icons';
import type { AppView } from '../types';
import { appStructure } from '../data/app-structure';

interface SidebarItemProps {
  label: string;
  icon?: React.FC<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
  hasChildren?: boolean;
  isExpanded?: boolean;
  isChild?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
    label, 
    icon: Icon, 
    isActive, 
    onClick, 
    isCollapsed, 
    hasChildren, 
    isExpanded,
    isChild 
}) => {
    // Base classes
    let containerClass = "w-full flex items-center transition-all duration-200 ease-in-out group relative select-none ";
    
    // Padding & Margin
    if (isCollapsed) {
        containerClass += "justify-center py-3 px-2 ";
    } else {
        containerClass += isChild 
            ? "py-2.5 pl-11 pr-4 text-sm " // Child items indentation
            : "py-3 px-4 "; // Top level items
    }

    // Colors & Backgrounds
    if (isActive) {
        // Resetting class construction for active state to be cleaner and greener
        containerClass = "w-full flex items-center transition-all duration-200 ease-in-out group relative select-none cursor-pointer ";
         if (isCollapsed) {
            containerClass += "justify-center py-3 px-2 text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 ";
        } else {
            containerClass += isChild 
                ? "py-2.5 pl-11 pr-4 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 font-bold rounded-xl " 
                : "py-3 px-4 text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-900/40 font-bold rounded-xl ";
        }
    } else {
        containerClass += "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200 font-medium cursor-pointer ";
        if (!isCollapsed) containerClass += "rounded-xl ";
    }

    return (
        <button onClick={onClick} className={containerClass} title={isCollapsed ? label : ''}>
            {/* Active Indicator for collapsed state */}
            {isActive && isCollapsed && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-green-500 dark:bg-green-400 rounded-r-full"></div>
            )}
            
            {/* Icon */}
            {Icon && (
                <div className={`flex items-center justify-center w-6 h-6 transition-transform duration-200 ${!isCollapsed && 'mr-3'} ${isActive ? 'scale-110 text-green-600 dark:text-green-400' : 'group-hover:scale-105'}`}>
                    <Icon className="w-5 h-5" />
                </div>
            )}

            {/* Label & Chevron (Visible only when not collapsed) */}
            {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                    <span className="truncate">{label}</span>
                    {hasChildren && (
                        <ChevronDownIcon 
                            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                        />
                    )}
                </div>
            )}
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

// Define the structure for the sidebar
type SidebarConfigItem = 
    | { type: 'link'; view: AppView; icon?: any } 
    | { type: 'group'; id: string; title: { en: string; sw: string }; icon: any; children: AppView[] };

const sidebarConfig: SidebarConfigItem[] = [
    { type: 'link', view: 'home', icon: HomeIcon },
    { 
        type: 'group', 
        id: 'development',
        title: { en: 'Development Strategy', sw: 'Mkakati wa Maendeleo' },
        icon: PresentationChartLineIcon,
        children: ['national-policy', 'projects']
    },
    { 
        type: 'group', 
        id: 'laws-governance',
        title: { en: 'Laws & Governance', sw: 'Sheria na Utawala' },
        icon: BookOpenIcon,
        children: [
            'constitution', 
            'acts', 
            'county-laws', 
            'historical-documents',
            'legislature', 
            'judiciary', 
            'cabinet', 
            'state-corporations', 
            'county-governments',
            'anthems', 
            'national-flag', 
            'coat-of-arms'
        ]
    },
    { type: 'link', view: 'projects-proposals', icon: MapIcon },
    { type: 'link', view: 'resources', icon: LinkIcon },
    { type: 'link', view: 'about', icon: UsersIcon },
];

const MainSidebar: React.FC<MainSidebarProps> = ({ activeView, navigateTo, isOpen, setIsOpen, isCollapsed, setIsCollapsed, language }) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Helper to find the title of a view from appStructure
  const getViewTitle = (view: AppView) => {
      const route = appStructure.find(r => r.view === view);
      return route ? route.title[language] : view;
  };

  // Automatically expand the group containing the active view
  useEffect(() => {
      const activeGroup = sidebarConfig.find(item => 
          item.type === 'group' && item.children.includes(activeView)
      );
      
      if (activeGroup && activeGroup.type === 'group') {
          setExpandedGroups(prev => new Set(prev).add(activeGroup.id));
      }
  }, [activeView]);

  const toggleGroup = (groupId: string) => {
      if (isCollapsed) {
          setIsCollapsed(false);
          setExpandedGroups(new Set([groupId])); // Expand only this group when opening from collapsed
      } else {
          setExpandedGroups(prev => {
              const newSet = new Set(prev);
              if (newSet.has(groupId)) {
                  newSet.delete(groupId);
              } else {
                  newSet.add(groupId);
              }
              return newSet;
          });
      }
  };

  const handleNavigate = (view: AppView) => {
      navigateTo(view);
      if (window.innerWidth < 768) {
          setIsOpen(false);
      }
  };

  return (
    <>
      {/* Mobile overlay */}
      <div onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-[85%] max-w-xs sm:w-80 z-50 transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'md:w-[88px]' : 'md:w-72'} print:hidden`}>
        <div className="h-full flex flex-col bg-surface/95 dark:bg-dark-surface/95 backdrop-blur-xl border-r border-border dark:border-dark-border custom-shadow">
            
            {/* Header */}
            <div className={`p-4 h-[73px] flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-b border-border/50 dark:border-dark-border/50 ${isCollapsed ? 'md:justify-center' : 'md:justify-between'}`}>
                <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 md:w-0 md:opacity-0 pointer-events-none' : 'w-auto opacity-100'}`}>
                    <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-xl flex-shrink-0">
                        <BuildingLibraryIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                    className="hidden md:block p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-green-600 dark:hover:text-green-400 transition-all focus:outline-none"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? <ChevronDoubleRightIcon className="h-5 w-5" /> : <ChevronDoubleLeftIcon className="h-5 w-5" />}
                </button>
            </div>
            
            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1.5 scroll-smooth scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                {sidebarConfig.map((item, index) => {
                    if (item.type === 'link') {
                        return (
                            <SidebarItem 
                                key={item.view}
                                label={getViewTitle(item.view)}
                                icon={item.icon}
                                isActive={activeView === item.view}
                                onClick={() => handleNavigate(item.view)}
                                isCollapsed={isCollapsed}
                            />
                        );
                    } else {
                        const isExpanded = expandedGroups.has(item.id);
                        const isActiveGroup = item.children.includes(activeView);
                        
                        return (
                            <div key={item.id} className="space-y-1">
                                <SidebarItem 
                                    label={item.title[language]}
                                    icon={item.icon}
                                    isActive={isActiveGroup && !isExpanded} // Highlight parent if child active but collapsed
                                    onClick={() => toggleGroup(item.id)}
                                    isCollapsed={isCollapsed}
                                    hasChildren={true}
                                    isExpanded={isExpanded}
                                />
                                
                                {/* Sub-items */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded && !isCollapsed ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="space-y-1 mt-1 mb-2">
                                        {item.children.map(childView => (
                                            <SidebarItem 
                                                key={childView}
                                                label={getViewTitle(childView)}
                                                isActive={activeView === childView}
                                                onClick={() => handleNavigate(childView)}
                                                isCollapsed={false} // Always false for children as parent handles collapse
                                                isChild={true}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
            </nav>
            
            {/* Footer */}
            <div className="p-4 border-t border-border dark:border-dark-border/50">
                <div className={`text-xs text-center text-gray-400 dark:text-gray-600 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    &copy; 2025 KenyaYetu
                </div>
            </div>
        </div>
      </aside>
    </>
  );
};

export default MainSidebar;
