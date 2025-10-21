import React from 'react';
import { BookOpenIcon, MapIcon, ProjectIcon, LinkIcon, UsersIcon, MailIcon } from './icons';

type AppView = 'constitution' | 'resources' | 'about' | 'contact' | 'infomap' | 'projects';

interface HomePageProps {
  setActiveView: (view: AppView) => void;
}

// FIX: Replaced JSX.Element with React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const sections: { title: string; description: string; icon: React.ReactNode; view: AppView }[] = [
    {
        title: 'The Constitution',
        description: 'Dive into the supreme law of Kenya, with searchable chapters, articles, and schedules.',
        icon: <BookOpenIcon className="h-6 w-6 text-green-600 dark:text-green-400" />,
        view: 'constitution',
    },
    {
        title: 'Info Maps',
        description: 'Visually explore the structure and key concepts of the Constitution through interactive guides.',
        icon: <MapIcon className="h-6 w-6 text-green-600 dark:text-green-400" />,
        view: 'infomap',
    },
    {
        title: 'Projects',
        description: 'Discover various initiatives and projects related to KenyaYetu.co.ke and civic engagement.',
        icon: <ProjectIcon className="h-6 w-6 text-green-600 dark:text-green-400" />,
        view: 'projects',
    },
    {
        title: 'Resources/Links',
        description: 'Access helpful resources, external links, and other materials on Kenyan governance.',
        icon: <LinkIcon className="h-6 w-6 text-green-600 dark:text-green-400" />,
        view: 'resources',
    },
    {
        title: 'About Us',
        description: 'Learn about our mission to promote civic education and engagement in Kenya.',
        icon: <UsersIcon className="h-6 w-6 text-green-600 dark:text-green-400" />,
        view: 'about',
    },
    {
        title: 'Contact',
        description: 'Get in touch with us for inquiries, feedback, or suggestions about the platform.',
        icon: <MailIcon className="h-6 w-6 text-green-600 dark:text-green-400" />,
        view: 'contact',
    },
];

const HomePage: React.FC<HomePageProps> = ({ setActiveView }) => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10">
        <div className="min-h-full w-full flex flex-col">
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="text-center px-4 py-10">
                    <div className="inline-block p-4 bg-green-600 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 17.2a.5.5 0 01-.7-.7l.2-.2a.5.5 0 01.7.7l-.2.2zM12 21a.5.5 0 01-.5-.5v-1a.5.5 0 011 0v1a.5.5 0 01-.5.5zM16.2 17.2a.5.5 0 01.7-.7l-.2-.2a.5.5 0 01-.7.7l.2.2zM7.5 11a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"/>
                        </svg>
                    </div>
                    <h1 className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl">
                        Welcome to KenyaYetu.co.ke<sub className="text-lg font-semibold opacity-60 ml-2">BETA</sub>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        Your central hub for exploring the foundational documents and cultural heritage of Kenya. Select a section below to get started.
                    </p>
                </div>
            </div>
            
            <div className="flex-shrink-0 pb-10">
                <div className="flex flex-row flex-wrap justify-center gap-6 px-4">
                    {sections.map((section) => (
                        <button
                            key={section.view}
                            onClick={() => setActiveView(section.view)}
                            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col text-left w-[210px] aspect-square"
                        >
                            <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg inline-block">
                                {section.icon}
                            </div>
                            <h2 className="mt-3 text-base font-bold text-gray-800 dark:text-gray-100">{section.title}</h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex-grow">{section.description}</p>
                            <div className="mt-4 text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
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