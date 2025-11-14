import React from 'react';
import { BookOpenIcon, MapIcon, PresentationChartLineIcon, LinkIcon, UsersIcon, MailIcon } from '../components/icons';
import type { AppView } from '../types/index';

interface HomePageProps {
  navigateTo: (view: AppView) => void;
}

const sections: { title: string; description: string; icon: React.ReactNode; view: AppView }[] = [
    {
        title: 'Policy Development & Delivery',
        description: 'Track policy development, projects, performance, and delivery management.',
        icon: <PresentationChartLineIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'projects',
    },
    {
        title: 'Laws & Governance',
        description: 'Explore the Constitution of Kenya and various Acts of Parliament.',
        icon: <BookOpenIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'kenya-laws',
    },
    {
        title: 'Info Maps',
        description: 'Visually explore the structure and key concepts of the Constitution through interactive guides.',
        icon: <MapIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'infomap',
    },
    {
        title: 'Data Sources/Links',
        description: 'Access helpful data sources, external links, and other materials on Kenyan governance.',
        icon: <LinkIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'resources',
    },
    {
        title: 'About Us',
        description: 'Learn about our mission to promote civic education and engagement in Kenya.',
        icon: <UsersIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'about',
    },
    {
        title: 'Contact',
        description: 'Get in touch with us for inquiries, feedback, or suggestions about the platform.',
        icon: <MailIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'contact',
    },
];

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  return (
    <div className="h-full w-full p-4 md:p-6 lg:p-10 flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center">
            <div className="text-center px-4 py-10">
                <div className="inline-block p-4 bg-primary rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                </div>
                <h1 className="mt-6 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">
                    Welcome to KenyaYetu.co.ke<sub className="text-lg font-semibold opacity-60 ml-2">BETA</sub>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    Your central hub for exploring the foundational documents and cultural heritage of Kenya. Select a section below to get started.
                </p>
            </div>
        </div>
        
        <div className="flex-shrink-0 w-full pb-6">
            <div className="md:overflow-x-auto pb-4 md:horizontal-scrollbar md:-mx-6 lg:-mx-10">
                <div className="flex flex-col md:flex-row md:flex-nowrap items-center md:justify-center gap-6 px-4 md:px-6 lg:px-10">
                    {sections.map((section) => (
                        <button
                            key={section.view}
                            onClick={() => navigateTo(section.view)}
                            className="bg-surface dark:bg-dark-surface p-5 rounded-3xl custom-shadow-lg hover:custom-shadow-xl hover:-translate-y-1.5 transform-gpu transition-all duration-300 flex flex-col text-left w-full max-w-sm md:w-[214px] md:h-[214px] md:flex-shrink-0"
                        >
                            <div className="flex-shrink-0 p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl inline-block self-start">
                                {section.icon}
                            </div>
                            <h2 className="mt-4 text-base font-bold text-on-surface dark:text-dark-on-surface">{section.title}</h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex-grow">{section.description}</p>
                            <div className="mt-4 text-sm font-semibold text-primary dark:text-dark-primary">
                                Explore Section &rarr;
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomePage;