
import React from 'react';
import type { AppView } from '../types';
import { 
    ScaleIcon, 
    BuildingLibraryIcon, 
    IdentificationIcon,
    MapIcon, 
    UsersIcon,
    GlobeAmericasIcon,
    PresentationChartLineIcon,
    CloudIcon,
    UserGroupIcon,
    TruckIcon,
    CameraIcon,
    CurrencyDollarIcon,
    MapPinIcon,
    SunIcon
} from '../components/icons';

interface ProjectsToolsPageProps {
  navigateTo: (view: AppView) => void;
}

const toolSections: {
    title: string;
    description: string;
    icon: React.ReactNode;
    isActionable: boolean;
    view?: AppView;
}[] = [
    {
        title: 'Foreign Funded Projects',
        description: "European Investment Bank projects in Kenya.",
        icon: <GlobeAmericasIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: true,
        view: 'eib-projects'
    },
    {
        title: 'Elected Leaders',
        description: "Comprehensive dashboard of elected officials across all 47 counties.",
        icon: <IdentificationIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: true,
        view: 'elected-leaders'
    },
    {
        title: 'Leadership Finder',
        description: "Find leaders by location (Governor, Senator, MP, MCA, etc.).",
        icon: <UserGroupIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: true,
        view: 'leadership'
    },
    {
        title: 'County Rankings',
        description: "Compare performance metrics, population, area, and administrative units across counties.",
        icon: <PresentationChartLineIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: true,
        view: 'county-rankings'
    },
    {
        title: 'County Explorer',
        description: "Interactive map to explore county details, boundaries, and specific data.",
        icon: <MapIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: true,
        view: 'county-explorer'
    },
    {
        title: 'Water Bodies',
        description: "Map of Kenya's major rivers, lakes, and ocean coastline.",
        icon: <GlobeAmericasIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: false,
    },
    {
        title: 'Rainfall Patterns',
        description: 'View annual and seasonal rainfall distribution across Kenya.',
        icon: <CloudIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: false,
    },
    {
        title: 'Crop Availability',
        description: 'See which crops are predominantly grown in different regions.',
        icon: <SunIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: false,
    },
    {
        title: 'Population Density',
        description: 'Visualize population distribution and density across the counties.',
        icon: <UserGroupIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: false,
    },
    {
        title: 'Infrastructure',
        description: 'Major roads, railways, ports, and airports in Kenya.',
        icon: <TruckIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: false,
    },
    {
        title: 'National Parks & Reserves',
        description: 'A map of all national parks, game reserves, and protected areas.',
        icon: <CameraIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: false,
    },
    {
        title: 'County Budgets',
        description: 'Compare revenue allocation and budgets for each county.',
        icon: <CurrencyDollarIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: false,
    },
    {
        title: 'Land Use',
        description: 'An overview of land cover, including forests, agriculture, and urban areas.',
        icon: <MapPinIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: false,
    },
    {
        title: 'Ethnic Distribution',
        description: 'A map showing the general distribution of major ethnic groups.',
        icon: <UsersIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: false,
    },
    {
        title: 'Devolution Explained',
        description: 'A visual map of how national and county governments share power.',
        icon: <BuildingLibraryIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        isActionable: false,
    },
];

const ProjectsToolsPage: React.FC<ProjectsToolsPageProps> = ({ navigateTo }) => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10">
      <div className="text-center px-4 py-10">
         <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <MapIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
        </div>
        <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Projects & Tools</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
          KenyaYetu synthesized projects and interactive tools.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-10">
        {toolSections.map((section) => {
            const CardWrapper = section.isActionable ? 'button' : 'div';
            return (
                <CardWrapper
                    key={section.title}
                    onClick={section.isActionable && section.view ? () => navigateTo(section.view!) : undefined}
                    className="bg-surface dark:bg-dark-surface p-6 rounded-3xl custom-shadow-lg flex flex-col text-left w-full h-full min-h-[200px] relative hover:custom-shadow-xl hover:-translate-y-2 transform-gpu transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    {!section.isActionable && (
                        <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                            Coming Soon
                        </div>
                    )}
                    <div className="flex-shrink-0 p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl inline-block self-start">
                        {section.icon}
                    </div>
                    <h2 className="mt-4 text-base font-bold text-on-surface dark:text-dark-on-surface">{section.title}</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex-grow">{section.description}</p>
                    {section.isActionable && (
                         <div className="mt-4 text-sm font-semibold text-primary dark:text-dark-primary">
                            Explore &rarr;
                        </div>
                    )}
                </CardWrapper>
            );
        })}
      </div>
    </div>
  );
};

export default ProjectsToolsPage;
