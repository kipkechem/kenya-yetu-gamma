import React from 'react';
import type { AppView } from '../App';
import { ScaleIcon, BuildingLibraryIcon, InboxStackIcon, MapIcon, UsersIcon } from './icons';

interface InfoMapPageProps {
  setActiveView: (view: AppView) => void;
}

// FIX: Explicitly type the sections to include the optional 'view' property.
const infoMapSections: {
    title: string;
    description: string;
    icon: React.ReactNode;
    isActionable: boolean;
    view?: AppView;
}[] = [
  {
    title: 'Devolution Explained',
    description: 'A visual map of how national and county governments share power.',
    icon: <BuildingLibraryIcon className="h-6 w-6 text-green-600 dark:text-green-400" />,
    isActionable: false,
  },
  {
    title: 'Election Process Visualizer',
    description: 'A step-by-step walkthrough of how elections are conducted in Kenya.',
    icon: <InboxStackIcon className="h-6 w-6 text-green-600 dark:text-green-400" />,
    isActionable: false,
  },
];

const InfoMapPage: React.FC<InfoMapPageProps> = ({ setActiveView }) => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10">
      <div className="text-center px-4 py-10">
         <div className="inline-block p-3 bg-green-100 dark:bg-gray-700 rounded-lg">
            <MapIcon className="h-8 w-8 text-green-700 dark:text-green-400" />
        </div>
        <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl">Info Maps</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
          Visually explore the structure and key concepts of the Constitution through these interactive guides.
        </p>
      </div>
      
      <div className="flex flex-row flex-wrap justify-center gap-6 px-4 pb-10">
        {infoMapSections.map((section) => {
            const CardWrapper = section.isActionable ? 'button' : 'div';
            return (
                <CardWrapper
                    key={section.title}
                    onClick={section.isActionable && section.view ? () => setActiveView(section.view) : undefined}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10 flex flex-col text-left w-[240px] aspect-square relative hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    {!section.isActionable && (
                        <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                            Coming Soon
                        </div>
                    )}
                    <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg inline-block">
                        {section.icon}
                    </div>
                    <h2 className="mt-4 text-base font-bold text-gray-800 dark:text-gray-100">{section.title}</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex-grow">{section.description}</p>
                    {section.isActionable && (
                         <div className="mt-4 text-sm font-semibold text-green-700 dark:text-green-400">
                            Explore Map &rarr;
                        </div>
                    )}
                </CardWrapper>
            );
        })}
      </div>
    </div>
  );
};

export default InfoMapPage;