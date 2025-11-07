import React from 'react';
import type { AppView, Section } from '../types';

interface TileProps {
  section: Section;
  navigateTo: (view: AppView) => void;
}

const Tile: React.FC<TileProps> = ({ section, navigateTo }) => {
    const handleClick = () => {
        if (section.isExternal && section.url) {
            window.open(section.url, '_blank', 'noopener,noreferrer');
        } else {
            navigateTo(section.view);
        }
    };

    return (
        <button
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

export default Tile;
