
import React from 'react';
import { BuildingLibraryIcon, UserGroupIcon, ScaleIcon, MapPinIcon } from '../components/icons';
import type { AppView, Section } from '../types';
import Tile from '../components/Tile';

interface GovernancePageProps {
  navigateTo: (view: AppView) => void;
  language: 'en' | 'sw';
}

const translations = {
    en: {
        title: 'Governance Structure',
        desc: 'Explore the arms of government and independent offices.',
        items: {
            legislature: { title: 'Legislature', desc: 'Understand the structure and role of Kenya\'s Parliament, including the National Assembly and the Senate.' },
            judiciary: { title: 'Judiciary', desc: 'Explore the structure of the Kenyan court system, from the Supreme Court to local tribunals.' },
            executive: { title: 'The Executive', desc: 'Explore the structure of the National Executive, including the Presidency and Cabinet.' },
            bodies: { title: 'Public Bodies & Entities', desc: 'Explore public entities including state corporations, independent commissions, authorities, and boards.' },
            counties: { title: 'County Governments', desc: 'Learn about the structure, functions, and leadership of the 47 county governments.' },
        }
    },
    sw: {
        title: 'Muundo wa Utawala',
        desc: 'Chunguza mihimili ya serikali na ofisi huru.',
        items: {
            legislature: { title: 'Bunge', desc: 'Elewa muundo na jukumu la Bunge la Kenya, ikiwa ni pamoja na Bunge la Kitaifa na Seneti.' },
            judiciary: { title: 'Mahakama', desc: 'Chunguza muundo wa mfumo wa mahakama wa Kenya, kuanzia Mahakama ya Juu hadi mahakama za chini.' },
            executive: { title: 'Serikali Kuu', desc: 'Chunguza muundo wa Serikali Kuu ya Kitaifa, ikiwa ni pamoja na Urais na Baraza la Mawaziri.' },
            bodies: { title: 'Mashirika ya Umma', desc: 'Chunguza mashirika ya umma ikiwa ni pamoja na mashirika ya serikali, tume huru, na mamlaka.' },
            counties: { title: 'Serikali za Kaunti', desc: 'Jifunze kuhusu muundo, kazi, na uongozi wa serikali 47 za kaunti.' },
        }
    }
};

const GovernancePage: React.FC<GovernancePageProps> = ({ navigateTo, language }) => {
  const t = translations[language];

  const governanceSections: (Section & { id: string })[] = [
    {
        id: 'legislature',
        title: t.items.legislature.title,
        description: t.items.legislature.desc,
        icon: <BuildingLibraryIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'legislature',
        isExternal: false,
    },
    {
        id: 'executive',
        title: t.items.executive.title,
        description: t.items.executive.desc,
        icon: <UserGroupIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'cabinet',
        isExternal: false,
    },
    {
        id: 'judiciary',
        title: t.items.judiciary.title,
        description: t.items.judiciary.desc,
        icon: <ScaleIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'judiciary',
        isExternal: false,
    },
    {
        id: 'bodies',
        title: t.items.bodies.title,
        description: t.items.bodies.desc,
        icon: <BuildingLibraryIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'state-corporations',
        isExternal: false,
    },
    {
        id: 'counties',
        title: t.items.counties.title,
        description: t.items.counties.desc,
        icon: <MapPinIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'county-governments',
        isExternal: false,
    },
  ];

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10">
        <div className="min-h-full w-full flex flex-col">
            <header className="text-center px-4 pt-10 pb-8">
                <div className="inline-block p-4 bg-primary-light dark:bg-dark-primary-light rounded-3xl">
                    <BuildingLibraryIcon className="h-10 w-10 md:h-12 md:w-12 text-primary dark:text-dark-primary" />
                </div>
                <h1 className="mt-6 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">
                    {t.title}
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    {t.desc}
                </p>
            </header>
            
            <main className="flex-grow flex-shrink-0 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {governanceSections.map((section) => (
                            <Tile key={section.title} section={section} navigateTo={navigateTo} />
                    ))}
                </div>
            </main>
        </div>
    </div>
  );
};

export default GovernancePage;
