
import React from 'react';
import { FlagIcon } from '../components/icons';
import type { AppView, Section } from '../types';
import Tile from '../components/Tile';

interface AnthemsListPageProps {
  navigateTo: (view: AppView) => void;
}

const anthemSections: Section[] = [
    {
        title: 'Kenyan National Anthem',
        description: 'Read the lyrics of "Ee Mungu Nguvu Yetu" in both Swahili and English.',
        icon: <FlagIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'kenyan-anthem',
        isExternal: false,
    },
    {
        title: 'East African Anthem',
        description: 'Read the lyrics of the East African Community anthem, "Jumuiya Yetu".',
        icon: <FlagIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'east-african-anthem',
        isExternal: false,
    },
];


const AnthemsListPage: React.FC<AnthemsListPageProps> = ({ navigateTo }) => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
            <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
                <FlagIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
            </div>
            <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Anthems</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                Explore the lyrics for the national and regional anthems of Kenya.
            </p>
        </header>

        <main className="flex flex-row flex-wrap justify-center gap-6 px-4">
            {anthemSections.map((section) => (
                <Tile key={section.view} section={section} navigateTo={navigateTo} />
            ))}
        </main>
      </div>
    </div>
  );
};

export default AnthemsListPage;
