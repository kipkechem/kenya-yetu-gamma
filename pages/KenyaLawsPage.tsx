
import React from 'react';
import { BookOpenIcon, InboxStackIcon, UserGroupIcon, ShieldCheckIcon, FileTextIcon, BuildingLibraryIcon, MapPinIcon, FlagIcon, PhotoIcon, ScaleIcon } from '../components/icons';
import type { AppView, Section } from '../types/index';
import Tile from '../components/Tile';

interface KenyaLawsPageProps {
  navigateTo: (view: AppView) => void;
  language: 'en' | 'sw';
}

const translations = {
    en: {
        title: 'Laws & Governance',
        desc: 'Explore Kenya\'s legal frameworks and governance structures.',
        sections: {
            laws: 'Laws',
            governance: 'Governance',
            symbols: 'National Symbols'
        },
        items: {
            constitution: { title: 'The Constitution', desc: 'Dive into the supreme law of Kenya, with searchable chapters, articles, and schedules.' },
            acts: { title: 'Acts of Parliament', desc: 'A searchable repository of the laws enacted by the Parliament of Kenya.' },
            countyLaws: { title: 'County Laws', desc: 'Access legislation enacted by the 47 county assemblies.' },
            historical: { title: 'Historical Documents', desc: 'Access key historical legal documents, including the first constitution, drafts, and influential papers.' },
            gazette: { title: 'Kenya Gazette', desc: 'Official publication of the Government of Kenya containing notices, appointments, and new legislation.' },
            myGov: { title: 'MyGov', desc: 'Official government newspaper for tenders, jobs, public notices, and government programmes.' },
            legislature: { title: 'Legislature', desc: 'Understand the structure and role of Kenya\'s Parliament, including the National Assembly and the Senate.' },
            judiciary: { title: 'Judiciary', desc: 'Explore the structure of the Kenyan court system, from the Supreme Court to local tribunals.' },
            cabinet: { title: 'Cabinet', desc: 'Meet the Cabinet Secretaries of the National Executive.' },
            bodies: { title: 'Public Bodies & Entities', desc: 'Explore public entities including state corporations, independent commissions, authorities, and boards.' },
            counties: { title: 'County Governments', desc: 'Learn about the structure, functions, and leadership of the 47 county governments.' },
            anthems: { title: 'Anthems', desc: 'Explore the lyrics for the Kenyan and East African Community anthems.' },
            flag: { title: 'National Flag', desc: 'View the Kenyan flag and learn about the symbolism of its colors and design.' },
            coat: { title: 'Coat of Arms', desc: 'Explore the elements of the Kenyan Coat of Arms, from the shield to the national motto.' }
        }
    },
    sw: {
        title: 'Sheria na Utawala',
        desc: 'Chunguza mifumo ya kisheria ya Kenya na miundo ya utawala.',
        sections: {
            laws: 'Sheria',
            governance: 'Utawala',
            symbols: 'Alama za Taifa'
        },
        items: {
            constitution: { title: 'Katiba', desc: 'Chunguza sheria kuu ya Kenya, ikiwa na sura, vifungu, na majedwali yanayoweza kutafutwa.' },
            acts: { title: 'Sheria za Bunge', desc: 'Hifadhi inayoweza kutafutwa ya sheria zilizotungwa na Bunge la Kenya.' },
            countyLaws: { title: 'Sheria za Kaunti', desc: 'Fikia sheria zilizotungwa na mabunge 47 ya kaunti.' },
            historical: { title: 'Nyaraka za Kihistoria', desc: 'Fikia nyaraka muhimu za kisheria za kihistoria, ikiwa ni pamoja na katiba ya kwanza na rasimu.' },
            gazette: { title: 'Gazeti la Kenya', desc: 'Chapisho rasmi la Serikali ya Kenya lenye matangazo, uteuzi, na sheria mpya.' },
            myGov: { title: 'MyGov', desc: 'Gazeti rasmi la serikali la zabuni, kazi, matangazo ya umma, na mipango ya serikali.' },
            legislature: { title: 'Bunge', desc: 'Elewa muundo na jukumu la Bunge la Kenya, ikiwa ni pamoja na Bunge la Kitaifa na Seneti.' },
            judiciary: { title: 'Mahakama', desc: 'Chunguza muundo wa mfumo wa mahakama wa Kenya, kuanzia Mahakama ya Juu hadi mahakama za chini.' },
            cabinet: { title: 'Baraza la Mawaziri', desc: 'Kutana na Mawaziri wa Serikali ya Kitaifa.' },
            bodies: { title: 'Mashirika ya Umma', desc: 'Chunguza mashirika ya umma ikiwa ni pamoja na mashirika ya serikali, tume huru, na mamlaka.' },
            counties: { title: 'Serikali za Kaunti', desc: 'Jifunze kuhusu muundo, kazi, na uongozi wa serikali 47 za kaunti.' },
            anthems: { title: 'Nyimbo za Taifa', desc: 'Chunguza maneno ya nyimbo za taifa za Kenya na Jumuiya ya Afrika Mashariki.' },
            flag: { title: 'Bendera ya Taifa', desc: 'Tazama bendera ya Kenya na ujifunze kuhusu maana ya rangi na muundo wake.' },
            coat: { title: 'Nembo ya Taifa', desc: 'Chunguza vipengele vya Nembo ya Taifa ya Kenya, kutoka ngao hadi kauli mbiu ya taifa.' }
        }
    }
};

const KenyaLawsPage: React.FC<KenyaLawsPageProps> = ({ navigateTo, language }) => {
  const t = translations[language];

  const lawSections: Section[] = [
    {
        title: t.items.constitution.title,
        description: t.items.constitution.desc,
        icon: <BookOpenIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'constitution',
        isExternal: false,
    },
    {
        title: t.items.acts.title,
        description: t.items.acts.desc,
        icon: <InboxStackIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'acts',
        isExternal: false,
    },
    {
        title: t.items.countyLaws.title,
        description: t.items.countyLaws.desc,
        icon: <BuildingLibraryIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'county-laws',
        isExternal: false,
    },
    {
        title: t.items.historical.title,
        description: t.items.historical.desc,
        icon: <BookOpenIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'historical-documents',
        isExternal: false,
    },
    {
        title: t.items.gazette.title,
        description: t.items.gazette.desc,
        icon: <FileTextIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'kenya-laws', // Placeholder as isExternal is true
        isExternal: true,
        url: 'https://new.kenyalaw.org/gazettes/',
    }
  ];

  const governanceSections: Section[] = [
    {
        title: t.items.legislature.title,
        description: t.items.legislature.desc,
        icon: <BuildingLibraryIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'legislature',
        isExternal: false,
    },
    {
        title: t.items.judiciary.title,
        description: t.items.judiciary.desc,
        icon: <ScaleIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'judiciary',
        isExternal: false,
    },
    {
        title: t.items.cabinet.title,
        description: t.items.cabinet.desc,
        icon: <UserGroupIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'cabinet',
        isExternal: false,
    },
    {
        title: t.items.bodies.title,
        description: t.items.bodies.desc,
        icon: <BuildingLibraryIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'state-corporations',
        isExternal: false,
    },
    {
        title: t.items.counties.title,
        description: t.items.counties.desc,
        icon: <MapPinIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'county-governments',
        isExternal: false,
    },
    {
        title: t.items.myGov.title,
        description: t.items.myGov.desc,
        icon: <FileTextIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'kenya-laws', // Placeholder as isExternal is true
        isExternal: true,
        url: 'https://www.mygov.go.ke/index.php/mygov-newspaper-2025',
    }
  ];

  const nationalSymbolsSections: Section[] = [
    {
        title: t.items.anthems.title,
        description: t.items.anthems.desc,
        icon: <FlagIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'anthems',
        isExternal: false,
    },
    {
        title: t.items.flag.title,
        description: t.items.flag.desc,
        icon: <PhotoIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'national-flag',
        isExternal: false,
    },
    {
        title: t.items.coat.title,
        description: t.items.coat.desc,
        icon: <PhotoIcon className="h-6 w-6 text-primary dark:text-dark-primary" />,
        view: 'coat-of-arms',
        isExternal: false,
    },
  ];

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10">
        <div className="min-h-full w-full flex flex-col">
            <header className="text-center px-4 pt-10 pb-8">
                <div className="inline-block p-4 bg-primary-light dark:bg-dark-primary-light rounded-3xl">
                    <BookOpenIcon className="h-10 w-10 md:h-12 md:w-12 text-primary dark:text-dark-primary" />
                </div>
                <h1 className="mt-6 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">
                    {t.title}
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    {t.desc}
                </p>
            </header>
            
            <main className="flex-grow flex-shrink-0 pb-10 space-y-12">
                <div>
                    <h2 className="text-2xl font-bold text-center text-on-surface dark:text-dark-on-surface mb-6">{t.sections.laws}</h2>
                    <div className="flex flex-row flex-wrap justify-center gap-6 px-4">
                        {lawSections.map((section) => (
                            <Tile key={section.title} section={section} navigateTo={navigateTo} />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-center text-on-surface dark:text-dark-on-surface mb-6">{t.sections.governance}</h2>
                    <div className="flex flex-row flex-wrap justify-center gap-6 px-4">
                        {governanceSections.map((section) => (
                             <Tile key={section.title} section={section} navigateTo={navigateTo} />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-center text-on-surface dark:text-dark-on-surface mb-6">{t.sections.symbols}</h2>
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
