import React from 'react';
import { BookOpenIcon, InboxStackIcon, UserGroupIcon, ShieldCheckIcon, FileTextIcon, BuildingLibraryIcon, MapPinIcon } from './icons';
import type { AppView } from '../types';

interface KenyaLawsPageProps {
  navigateTo: (view: AppView) => void;
}

interface Section {
    title: string;
    description: string;
    icon: React.ReactNode;
    view: AppView;
    isExternal: boolean;
    url?: string;
}

const lawSections: Section[] = [
    {
        title: 'The Constitution',
        description: 'Dive into the supreme law of Kenya, with searchable chapters, articles, and schedules.',
        icon: <BookOpenIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'constitution',
        isExternal: false,
    },
    {
        title: 'Acts of Parliament',
        description: 'A searchable repository of the laws enacted by the Parliament of Kenya.',
        icon: <InboxStackIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'acts',
        isExternal: false,
    },
    {
        title: 'Kenya Gazette',
        description: 'Official publication of the Government of Kenya containing notices, appointments, and new legislation.',
        icon: <FileTextIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'kenya-laws', // Placeholder as isExternal is true
        isExternal: true,
        url: 'https://new.kenyalaw.org/gazettes/',
    }
];

const governanceSections: Section[] = [
    {
        title: 'Cabinet',
        description: 'Meet the Cabinet Secretaries of the National Executive.',
        icon: <UserGroupIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'cabinet',
        isExternal: false,
    },
    {
        title: 'Commissions',
        description: 'Explore the independent commissions and their roles in governance.',
        icon: <ShieldCheckIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'commissions',
        isExternal: false,
    },
    {
        title: 'State Corporations, Authorities & Boards',
        description: 'Explore public entities like state corporations, regional authorities, and county boards.',
        icon: <BuildingLibraryIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'state-corporations',
        isExternal: false,
    },
    {
        title: 'County Governments',
        description: 'Learn about the structure, functions, and leadership of the 47 county governments.',
        icon: <MapPinIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'county-explorer',
        isExternal: false,
    },
];

const Tile: React.FC<{ section: Section, navigateTo: (view: AppView) => void }> = ({ section, navigateTo }) => {
    const handleClick = () => {
        if (section.isExternal && section.url) {
            window.open(section.url, '_blank', 'noopener,noreferrer');
        } else {
            navigateTo(section.view);
        }
    };

    return (
        <button
            key={section.view}
            onClick={handleClick}
            className="bg-surface dark:bg-dark-surface p-6 rounded-3xl custom-shadow-lg hover:custom-shadow-xl hover:-translate-y-2 transform-gpu transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col text-left w-[240px] aspect-square"
        >
            <div className="flex-shrink-0 p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl inline-block self-start">
                {section.icon}
            </div>
            <h2 className="mt-4 text-lg font-bold text-on-surface dark:text-dark-on-surface">{section.title}</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex-grow">{section.description}</p>
            <div className="mt-4 text-sm font-semibold text-primary dark:text-dark-primary">
                Explore Section &rarr;
            </div>
        </button>
    );
};

const KenyaLawsPage: React.FC<KenyaLawsPageProps> = ({ navigateTo }) => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10">
        <div className="min-h-full w-full flex flex-col">
            <header className="text-center px-4 pt-10 pb-8">
                <div className="inline-block p-4 bg-primary-light dark:bg-dark-primary-light rounded-3xl">
                    <BookOpenIcon className="h-10 w-10 md:h-12 md:w-12 text-primary dark:text-dark-primary" />
                </div>
                <h1 className="mt-6 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">
                    Laws & Governance
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    Explore Kenya's legal frameworks and governance structures.
                </p>
            </header>
            
            <main className="flex-grow flex-shrink-0 pb-10 space-y-12">
                <div>
                    <h2 className="text-2xl font-bold text-center text-on-surface dark:text-dark-on-surface mb-6">Laws</h2>
                    <div className="flex flex-row flex-wrap justify-center gap-6 px-4">
                        {lawSections.map((section) => (
                            <Tile key={section.view} section={section} navigateTo={navigateTo} />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-center text-on-surface dark:text-dark-on-surface mb-6">Governance</h2>
                    <div className="flex flex-row flex-wrap justify-center gap-6 px-4">
                        {governanceSections.map((section) => (
                             <Tile key={section.view} section={section} navigateTo={navigateTo} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
};

export default KenyaLawsPage;