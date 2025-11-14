import React from 'react';
import { BookOpenIcon, InboxStackIcon, UserGroupIcon, ShieldCheckIcon, FileTextIcon, BuildingLibraryIcon, MapPinIcon, FlagIcon, PhotoIcon, ScaleIcon } from '../components/icons';
import type { AppView, Section } from '../types/index';
import Tile from '../components/Tile';

interface KenyaLawsPageProps {
  navigateTo: (view: AppView) => void;
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
        title: 'County Laws',
        description: 'Access legislation enacted by the 47 county assemblies.',
        icon: <BuildingLibraryIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'county-laws',
        isExternal: false,
    },
    {
        title: 'Historical Documents',
        description: 'Access key historical legal documents, including the first constitution, drafts, and influential papers.',
        icon: <BookOpenIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'historical-documents',
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

const nationalSymbolsSections: Section[] = [
    {
        title: 'Anthems',
        description: 'Explore the lyrics for the Kenyan and East African Community anthems.',
        icon: <FlagIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'anthems',
        isExternal: false,
    },
    {
        title: 'National Flag',
        description: 'View the Kenyan flag and learn about the symbolism of its colors and design.',
        icon: <PhotoIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'national-flag',
        isExternal: false,
    },
    {
        title: 'Coat of Arms',
        description: 'Explore the elements of the Kenyan Coat of Arms, from the shield to the national motto.',
        icon: <PhotoIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'coat-of-arms',
        isExternal: false,
    },
];

const governanceSections: Section[] = [
    {
        title: 'Legislature',
        description: 'Understand the structure and role of Kenya\'s Parliament, including the National Assembly and the Senate.',
        icon: <BuildingLibraryIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'legislature',
        isExternal: false,
    },
    {
        title: 'Judiciary',
        description: 'Explore the structure of the Kenyan court system, from the Supreme Court to local tribunals.',
        icon: <ScaleIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'judiciary',
        isExternal: false,
    },
    {
        title: 'Cabinet',
        description: 'Meet the Cabinet Secretaries of the National Executive.',
        icon: <UserGroupIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'cabinet',
        isExternal: false,
    },
    {
        title: 'Public Bodies & Entities',
        description: 'Explore public entities including state corporations, independent commissions, authorities, and boards.',
        icon: <BuildingLibraryIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'state-corporations',
        isExternal: false,
    },
    {
        title: 'County Governments',
        description: 'Learn about the structure, functions, and leadership of the 47 county governments.',
        icon: <MapPinIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'county-governments',
        isExternal: false,
    },
];

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
                            <Tile key={section.title} section={section} navigateTo={navigateTo} />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-center text-on-surface dark:text-dark-on-surface mb-6">Governance</h2>
                    <div className="flex flex-row flex-wrap justify-center gap-6 px-4">
                        {governanceSections.map((section) => (
                             <Tile key={section.title} section={section} navigateTo={navigateTo} />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-center text-on-surface dark:text-dark-on-surface mb-6">National Symbols</h2>
                    <div className="flex flex-row flex-wrap justify-center gap-6 px-4">
                        {nationalSymbolsSections.map((section) => (
                             <Tile key={section.title} section={section} navigateTo={navigateTo} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
};

export default KenyaLawsPage;