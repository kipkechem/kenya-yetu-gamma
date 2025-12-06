
import React from 'react';
import type { AppView, Section } from '../types';

interface TileProps {
  section: Section;
  navigateTo: (view: AppView) => void;
  className?: string;
}

const Tile: React.FC<TileProps> = ({ section, navigateTo, className = "" }) => {
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
            className={`group relative overflow-hidden bg-surface dark:bg-dark-surface p-5 md:p-7 rounded-3xl custom-shadow-lg hover:custom-shadow-xl hover:scale-[1.02] hover:-translate-y-1 transform-gpu transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col text-left w-full h-full aspect-square md:aspect-auto md:min-h-[240px] border-2 border-transparent hover:border-primary/10 dark:hover:border-dark-primary/10 ${className}`}
        >
            <div className="flex-shrink-0 p-3.5 bg-primary-light dark:bg-dark-primary-light rounded-2xl inline-block self-start transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {section.icon}
            </div>
            <h2 className="mt-4 md:mt-6 text-base md:text-xl font-bold text-on-surface dark:text-dark-on-surface line-clamp-2 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
                {section.title}
            </h2>
            <p className="mt-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 flex-grow line-clamp-3 block leading-relaxed">
                {section.description}
            </p>
            <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-gray-400 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors duration-300">
                Explore <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </div>
        </button>
    );
};

export default Tile;
