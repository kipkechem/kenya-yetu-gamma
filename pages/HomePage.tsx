
import React from 'react';
import { BookOpenIcon, MapIcon, PresentationChartLineIcon, LinkIcon, UsersIcon, MailIcon } from '../components/icons';
import type { AppView } from '../types/index';
import Tile from '../components/Tile';

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
      maps: { title: 'Projects & Proposals', desc: 'KenyaYetu synthesized projects and proposals.' },
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
      maps: { title: 'Miradi na Mapendekezo', desc: 'Miradi na mapendekezo yaliyoundwa na KenyaYetu.' },
      resources: { title: 'Vyanzo vya Data', desc: 'Pata vyanzo muhimu vya data, viungo vya nje, na nyenzo nyingine kuhusu utawala wa Kenya.' },
      about: { title: 'Kutuhusu', desc: 'Jifunze kuhusu dhamira yetu ya kukuza elimu ya uraia na ushiriki nchini Kenya.' },
      contact: { title: 'Wasiliana Nasi', desc: 'Wasiliana nasi kwa maswali, maoni, au mapendekezo kuhusu jukwaa hili.' }
    }
  }
};

const HomePage: React.FC<HomePageProps> = ({ navigateTo, language }) => {
  const t = translations[language];

  const sections: { id: string; icon: React.ReactNode; view: AppView; title: string; description: string; isExternal: boolean }[] = [
    {
        id: 'projects',
        icon: <PresentationChartLineIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'projects',
        title: t.sections.projects.title,
        description: t.sections.projects.desc,
        isExternal: false
    },
    {
        id: 'laws',
        icon: <BookOpenIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'kenya-laws',
        title: t.sections.laws.title,
        description: t.sections.laws.desc,
        isExternal: false
    },
    {
        id: 'maps',
        icon: <MapIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'infomap',
        title: t.sections.maps.title,
        description: t.sections.maps.desc,
        isExternal: false
    },
    {
        id: 'resources',
        icon: <LinkIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'resources',
        title: t.sections.resources.title,
        description: t.sections.resources.desc,
        isExternal: false
    },
    {
        id: 'about',
        icon: <UsersIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'about',
        title: t.sections.about.title,
        description: t.sections.about.desc,
        isExternal: false
    },
    {
        id: 'contact',
        icon: <MailIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'contact',
        title: t.sections.contact.title,
        description: t.sections.contact.desc,
        isExternal: false
    },
  ];

  return (
    <div className="h-full w-full p-4 md:p-6 lg:p-10 flex flex-col max-w-7xl mx-auto">
        <div className="flex-grow flex flex-col items-center justify-center animate-fade-in-up">
            <div className="text-center px-4 py-10">
                <div className="inline-block p-5 bg-primary/10 dark:bg-primary/5 rounded-full mb-6 animate-bounce-slow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-primary dark:text-dark-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl md:text-6xl mb-6">
                    {t.welcome}<sub className="text-xl font-semibold opacity-60 ml-2 text-primary dark:text-dark-primary">BETA</sub>
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
                    {t.sub}
                </p>
            </div>
        </div>
        
        <div className="flex-shrink-0 w-full pb-6">
             {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {sections.map((section, index) => (
                    <div key={section.view} className={`animate-fade-in-up stagger-${index + 1} h-full`}>
                        <Tile section={section} navigateTo={navigateTo} />
                    </div>
                ))}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="md:hidden overflow-x-auto pb-4 horizontal-scrollbar -mx-4 px-4">
                <div className="flex gap-4">
                    {sections.map((section) => (
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
