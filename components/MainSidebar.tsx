import React from 'react';
import { BookOpenIcon, HomeIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, LinkIcon, UsersIcon, MailIcon, MapIcon, ProjectIcon } from './icons';

interface NavItemProps {
  onClick: () => void;
  isSelected: boolean;
  isCollapsed: boolean;
  label: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ onClick, isSelected, children, isCollapsed, label }) => {
  const baseClasses = "w-full text-left py-2.5 text-sm font-medium rounded-r-lg transition-colors duration-150 flex items-center";
  const selectedClasses = "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-l-4 border-green-600 dark:border-green-500";
  const unselectedClasses = "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100";
  
  const paddingClasses = isCollapsed ? 'justify-center px-2' : 'px-4';
  const selectedPaddingClasses = isCollapsed ? 'justify-center px-1.5' : 'pl-3';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? `${selectedClasses} ${selectedPaddingClasses}` : `${unselectedClasses} ${paddingClasses}`}`}
      title={isCollapsed ? label : ""}
    >
      {children}
    </button>
  );
};

interface MainSidebarProps {
  activeView: 'home' | 'constitution' | 'resources' | 'about' | 'contact' | 'infomap' | 'projects' | 'my-representatives';
  setActiveView: (view: 'home' | 'constitution' | 'resources' | 'about' | 'contact' | 'infomap' | 'projects' | 'my-representatives') => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  
  const handleItemClick = (view: 'home' | 'constitution' | 'resources' | 'about' | 'contact' | 'infomap' | 'projects' | 'my-representatives') => {
    setActiveView(view);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 flex items-center ${isCollapsed ? 'md:justify-center' : 'justify-between'}`}>
            <h1 className={`text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'md:opacity-0 md:w-0' : 'opacity-100'}`}>Navigation</h1>
            
            {/* Desktop collapse button */}
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)} 
                className="hidden md:block p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsed ? 
                  <ChevronDoubleRightIcon className="h-5 w-5" /> : 
                  <ChevronDoubleLeftIcon className="h-5 w-5" />
                }
            </button>
            
            {/* Mobile close button */}
             <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
            <NavItem
                onClick={() => handleItemClick('home')}
                isSelected={activeView === 'home'}
                isCollapsed={isCollapsed}
                label="Home"
            >
                <HomeIcon className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`whitespace-nowrap ${isCollapsed ? 'md:hidden' : 'inline'}`}>Home</span>
            </NavItem>
            <NavItem
                onClick={() => handleItemClick('constitution')}
                isSelected={activeView === 'constitution'}
                isCollapsed={isCollapsed}
                label="The Constitution"
            >
                <BookOpenIcon className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`whitespace-nowrap ${isCollapsed ? 'md:hidden' : 'inline'}`}>The Constitution</span>
            </NavItem>
            <NavItem
                onClick={() => handleItemClick('infomap')}
                isSelected={activeView === 'infomap'}
                isCollapsed={isCollapsed}
                label="Info Maps"
            >
                <MapIcon className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`whitespace-nowrap ${isCollapsed ? 'md:hidden' : 'inline'}`}>Info Maps</span>
            </NavItem>
             <NavItem
                onClick={() => handleItemClick('projects')}
                isSelected={activeView === 'projects'}
                isCollapsed={isCollapsed}
                label="Projects"
            >
                <ProjectIcon className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`whitespace-nowrap ${isCollapsed ? 'md:hidden' : 'inline'}`}>Projects</span>
            </NavItem>
             <NavItem
                onClick={() => handleItemClick('resources')}
                isSelected={activeView === 'resources'}
                isCollapsed={isCollapsed}
                label="Resources/Links"
            >
                <LinkIcon className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`whitespace-nowrap ${isCollapsed ? 'md:hidden' : 'inline'}`}>Resources/Links</span>
            </NavItem>
             <NavItem
                onClick={() => handleItemClick('about')}
                isSelected={activeView === 'about'}
                isCollapsed={isCollapsed}
                label="About Us"
            >
                <UsersIcon className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`whitespace-nowrap ${isCollapsed ? 'md:hidden' : 'inline'}`}>About Us</span>
            </NavItem>
             <NavItem
                onClick={() => handleItemClick('contact')}
                isSelected={activeView === 'contact'}
                isCollapsed={isCollapsed}
                label="Contact"
            >
                <MailIcon className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`whitespace-nowrap ${isCollapsed ? 'md:hidden' : 'inline'}`}>Contact</span>
            </NavItem>
        </nav>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
      
      {/* Sidebar */}
      <aside
          className={`fixed top-0 left-0 h-full z-40 transform md:relative md:translate-x-0 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'md:w-20' : 'md:w-64'} print:hidden`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default MainSidebar;