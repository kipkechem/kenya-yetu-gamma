
import React from 'react';
import { BookOpenIcon, MapIcon, PresentationChartLineIcon, LinkIcon, UsersIcon, MailIcon } from './icons';
import type { AppView } from '../types';

interface HomePageProps {
  navigateTo: (view: AppView) => void;
  language: 'en' | 'sw';
}

const translations = {
  en: {
    welcome: 'Welcome to KenyaYetu.co.ke',
    sub: 'Your central hub for exploring the foundational documents and cultural heritage of Kenya. Select a section below to get started.',
    explore: 'Explore Section',
    sections: {
      projects: { title: 'Development Strategy', desc: 'Track policy development, projects, performance, and delivery management.' },
      laws: { title: 'Laws & Governance', desc: 'Explore the Constitution of Kenya and various Acts of Parliament.' },
      maps: { title: 'Ideas & Proposals', desc: 'KenyaYetu synthesized projects and proposals.' },
      resources: { title: 'Data Sources/Links', desc: 'Access helpful data sources, external links, and other materials on Kenyan governance.' },
      about: { title: 'About Us', desc: 'Learn about our mission to promote civic education and engagement in Kenya.' },
      contact: { title: 'Contact', desc: 'Get in touch with us for inquiries, feedback, or suggestions about the platform.' }
    }
  },
  sw: {
    welcome: 'Karibu KenyaYetu.co.ke',
    sub: 'Kitovu chako kikuu cha kuchunguza nyaraka za msingi na urithi wa kitamaduni wa Kenya. Chagua sehemu hapa chini ili kuanza.',
    explore: 'Chunguza Sehemu',
    sections: {
      projects: { title: 'Mkakati wa Maendeleo', desc: 'Fuatilia maendeleo ya sera, miradi, utendaji, na usimamizi wa utoaji huduma.' },
      laws: { title: 'Sheria na Utawala', desc: 'Chunguza Katiba ya Kenya na Sheria mbalimbali za Bunge.' },
      maps: { title: 'Mawazo na Mapendekezo', desc: 'Miradi na mapendekezo yaliyoundwa na KenyaYetu.' },
      resources: { title: 'Vyanzo vya Data', desc: 'Pata vyanzo muhimu vya data, viungo vya nje, na nyenzo nyingine kuhusu utawala wa Kenya.' },
      about: { title: 'Kutuhusu', desc: 'Jifunze kuhusu dhamira yetu ya kukuza elimu ya uraia na ushiriki nchini Kenya.' },
      contact: { title: 'Wasiliana Nasi', desc: 'Wasiliana nasi kwa maswali, maoni, au mapendekezo kuhusu jukwaa hili.' }
    }
  }
};

const HomePage: React.FC<HomePageProps> = ({ navigateTo, language }) => {
  const t = translations[language];

  const sections: { id: string; icon: React.ReactNode; view: AppView }[] = [
    {
        id: 'projects',
        icon: <PresentationChartLineIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'projects',
    },
    {
        id: 'laws',
        icon: <BookOpenIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'kenya-laws',
    },
    {
        id: 'maps',
        icon: <MapIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'infomap',
    },
    {
        id: 'resources',
        icon: <LinkIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'resources',
    },
    {
        id: 'about',
        icon: <UsersIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'about',
    },
    {
        id: 'contact',
        icon: <MailIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'contact',
    },
  ];

  return (
    <div className="h-full w-full p-4 md:p-6 lg:p-10 flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center">
            <div className="text-center px-4 py-10">
                <div className="inline-block p-4 bg-primary rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                </div>
                <h1 className="mt-6 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">
                    {t.welcome}<sub className="text-lg font-semibold opacity-60 ml-2">BETA</sub>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    {t.sub}
                </p>
            </div>
        </div>
        
        <div className="flex-shrink-0 w-full pb-6">
            <div className="md:overflow-x-auto pb-4 md:horizontal-scrollbar md:-mx-6 lg:-mx-10">
                <div className="grid grid-cols-2 gap-4 md:flex md:flex-row md:flex-nowrap md:items-center md:justify-center md:gap-6 px-4 md:px-6 lg:px-10">
                    {sections.map((section) => {
                        const text = t.sections[section.id as keyof typeof t.sections];
                        return (
                            <button
                                key={section.view}
                                onClick={() => navigateTo(section.view)}
                                className="bg-surface dark:bg-dark-surface p-4 sm:p-5 rounded-3xl custom-shadow-lg hover:custom-shadow-xl hover:-translate-y-1.5 transform-gpu transition-all duration-300 flex flex-col text-left w-full h-full md:w-[214px] md:h-[214px] md:flex-shrink-0"
                            >
                                <div className="flex-shrink-0 p-2.5 sm:p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl inline-block self-start">
                                    {section.icon}
                                </div>
                                <h2 className="mt-3 sm:mt-4 text-sm sm:text-base font-bold text-on-surface dark:text-dark-on-surface line-clamp-2">{text.title}</h2>
                                <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-grow line-clamp-3 hidden md:block">{text.desc}</p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomePage;