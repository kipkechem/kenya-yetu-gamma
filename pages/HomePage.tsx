
import React from 'react';
import type { AppView } from '../types/index';
import Tile from '../components/Tile';
import { appStructure } from '../data/app-structure';

interface HomePageProps {
  navigateTo: (view: AppView) => void;
  language: 'en' | 'sw';
}

const translations = {
  en: {
    welcomePrefix: 'Welcome to',
    sub: 'Your central hub for exploring the foundational documents and cultural heritage of Kenya. Select a section below to get started.'
  },
  sw: {
    welcomePrefix: 'Karibu',
    sub: 'Kitovu chako kikuu cha kuchunguza nyaraka za msingi na urithi wa kitamaduni wa Kenya. Chagua sehemu hapa chini ili kuanza.'
  }
};

const HomePage: React.FC<HomePageProps> = ({ navigateTo, language }) => {
  const t = translations[language];

  // Filter items marked for home grid and map them to the Section structure required by Tile
  const homeSections = appStructure
    .filter(item => item.inHomeGrid)
    .map(item => ({
        id: item.view,
        icon: <item.icon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: item.view,
        title: item.title[language],
        description: item.description?.[language] || '',
        isExternal: false
    }));

  return (
    <div className="h-full w-full p-4 md:p-6 lg:p-10 flex flex-col max-w-7xl mx-auto">
        <div className="flex-grow flex flex-col items-center justify-center animate-fade-in-up">
            <div className="text-center px-4 py-10">
                <div className="inline-block p-5 bg-primary/10 dark:bg-primary/5 rounded-full mb-6 animate-bounce-slow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-primary dark:text-dark-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-medium text-gray-500 dark:text-gray-400 mb-1">
                        {t.welcomePrefix}
                    </h2>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight leading-tight">
                        KenyaYetu.co.ke
                        <sup className="text-xl md:text-2xl font-bold text-primary dark:text-dark-primary ml-2">BETA</sup>
                    </h1>
                </div>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
                    {t.sub}
                </p>
            </div>
        </div>
        
        <div className="flex-shrink-0 w-full pb-6">
             {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {homeSections.map((section, index) => (
                    <div key={section.view} className={`animate-fade-in-up stagger-${index + 1} h-full`}>
                        <Tile section={section} navigateTo={navigateTo} />
                    </div>
                ))}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="md:hidden overflow-x-auto pb-4 horizontal-scrollbar -mx-4 px-4">
                <div className="flex gap-4">
                    {homeSections.map((section) => (
                         <div key={section.view} className="w-[260px] flex-shrink-0 h-full">
                             <Tile section={section} navigateTo={navigateTo} />
                         </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomePage;
