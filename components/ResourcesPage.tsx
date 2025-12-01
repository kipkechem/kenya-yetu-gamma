
import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, LinkIcon } from './icons';
import { getDiscoveredLinks, DiscoveredLink } from '../utils/cache';

const dataSourceCategories = [
  {
    title: 'International Data',
    key: 'international',
    links: [
      { name: 'Amnesty International', url: 'https://www.amnesty.org/en/' },
      { name: 'Citizenship Rights in Africa Initiative', url: 'http://citizenshiprightsafrica.org/' },
      { name: 'ConstitutionNet (International IDEA)', url: 'https://constitutionnet.org/' },
      { name: 'geoBoundaries', url: 'https://www.geoboundaries.org/' },
      { name: 'Human Rights Watch', url: 'https://www.hrw.org/' },
      { name: 'International Court of Justice (ICJ)', url: 'https://www.icj-cij.org/' },
      { name: 'Seattle University School of Law Digital Commons', url: 'https://digitalcommons.law.seattleu.edu/' },
      { name: 'SourceAfrica', url: 'https://sourceafrica.net/' },
      { name: 'United Nations Human Rights Office (OHCHR)', url: 'https://www.ohchr.org/en' },
    ].sort((a,b) => a.name.localeCompare(b.name))
  },
  {
    title: 'Continental Data',
    key: 'continental',
    links: [
      { name: 'African Court on Human and Peoples\' Rights', url: 'https://www.african-court.org/en' },
      { name: 'African Union (AU)', url: 'https://au.int/' },
      { name: 'East African Community (EAC)', url: 'https://www.eac.int/' },
      { name: 'East African Court of Justice (EACJ)', url: 'http://eacj.org/' },
    ].sort((a,b) => a.name.localeCompare(b.name))
  },
  {
    title: 'National Data',
    key: 'national',
    links: [
      // National Data
      { name: 'Kenya Gazette', url: 'https://new.kenyalaw.org/gazettes/' },
      { name: 'Kenya Law Reports (National Council for Law Reporting)', url: 'http://kenyalaw.org/' },
      { name: 'Kenya National Commission on Human Rights (KNCHR)', url: 'https://www.knchr.org/' },
      { name: 'Parliament of Kenya', url: 'http://www.parliament.go.ke/' },
      { name: 'State Law Office & Department of Justice', url: 'https://www.statelaw.go.ke/' },
      { name: 'The Judiciary of Kenya', url: 'https://www.judiciary.go.ke/' },
      // Government Ministries
      { name: 'Ministry of Agriculture and Livestock Development', url: 'https://www.kilimo.go.ke/' },
      { name: 'Ministry of Co-operatives and MSME Development', url: 'https://www.ushirika.go.ke/' },
      { name: 'Ministry of Defence', url: 'https://mod.go.ke/' },
      { name: 'Ministry of EAC, The ASALS and Regional Development', url: 'https://www.meac.go.ke/' },
      { name: 'Ministry of Education', url: 'https://www.education.go.ke/' },
      { name: 'Ministry of Energy and Petroleum', url: 'https://www.energy.go.ke/' },
      { name: 'Ministry of Environment, Climate Change and Forestry', url: 'https://www.environment.go.ke/' },
      { name: 'Ministry of Gender, Culture, the Arts and Heritage', url: 'https://www.gender.go.ke/' },
      { name: 'Ministry of Health', url: 'https://www.health.go.ke/' },
      { name: 'Ministry of Information, Communications and the Digital Economy', url: 'https://www.ict.go.ke/' },
      { name: 'Ministry of Interior and National Administration', url: 'https://www.interior.go.ke/' },
      { name: 'Ministry of Investments, Trade and Industry', url: 'https://www.trade.go.ke/' },
      { name: 'Ministry of Labour and Social Protection', url: 'https://www.labour.go.ke/' },
      { name: 'Ministry of Lands, Public Works, Housing and Urban Development', url: 'https://lands.go.ke/' },
      { name: 'Ministry of Mining, Blue Economy and Maritime Affairs', url: 'https://www.mining.go.ke/' },
      { name: 'Ministry of Public Service, Performance and Delivery Management', url: 'https://www.psyg.go.ke/' },
      { name: 'Ministry of Roads and Transport', url: 'https://www.transport.go.ke/' },
      { name: 'Ministry of Tourism and Wildlife', url: 'https://www.tourism.go.ke/' },
      { name: 'Ministry of Water, Sanitation and Irrigation', url: 'https://www.water.go.ke/' },
      { name: 'Ministry of Youth Affairs, The Arts and Sports', url: 'https://www.youth.go.ke/' },
      { name: 'Office of the Attorney General & Department of Justice', url: 'https://www.statelaw.go.ke/' },
      { name: 'Office of the Deputy President', url: 'https://www.deputypresident.go.ke/' },
      { name: 'Office of the President', url: 'https://www.president.go.ke/' },
      { name: 'Office of the Prime Cabinet Secretary & Ministry of Foreign and Diaspora Affairs', url: 'https://www.mfa.go.ke/' },
      { name: 'The National Treasury and Economic Planning', url: 'https://www.treasury.go.ke/' },
      // Commissions & Independent Offices
      { name: 'Commission on Revenue Allocation (CRA)', url: 'https://cra.go.ke/' },
      { name: 'Independent Electoral and Boundaries Commission (IEBC)', url: 'https://www.iebc.or.ke/' },
      { name: 'Judicial Service Commission (JSC)', url: 'https://www.jsc.go.ke/' },
      { name: 'Kenya National Human Rights and Equality Commission (KNHREC)', url: 'https://www.knchr.org/' },
      { name: 'National Land Commission (NLC)', url: 'https://landcommission.go.ke/' },
      { name: 'National Police Service Commission (NPSC)', url: 'https://www.npsc.go.ke/' },
      { name: 'Office of the Auditor-General (OAG)', url: 'https://www.oagkenya.go.ke/' },
      { name: 'Office of the Controller of Budget (OCOB)', url: 'https://cob.go.ke/' },
      { name: 'Parliamentary Service Commission (PSC)', url: 'http://www.parliament.go.ke/the-psc' },
      { name: 'Public Service Commission (PSC)', url: 'https://www.publicservice.go.ke/' },
      { name: 'Salaries and Remuneration Commission (SRC)', url: 'https://www.src.go.ke/' },
      { name: 'Teachers Service Commission (TSC)', url: 'https://www.tsc.go.ke/' },
    ].sort((a,b) => a.name.localeCompare(b.name))
  },
  {
    title: 'Regional/County Data',
    key: 'regional-county',
    links: [
      { name: 'County Assemblies Forum (CAF)', url: 'https://www.countyassemblies.or.ke/' },
      { name: 'Council of Governors (CoG)', url: 'https://www.cog.go.ke/' },
      { name: 'Frontier Counties Development Council (FCDC)', url: 'https://fcdc.or.ke/' },
      { name: 'Jumuiya ya Kaunti za Pwani (JKP)', url: 'https://jumuiya.org/' },
      { name: 'Lake Region Economic Bloc (LREB)', url: 'https://lreb.or.ke/' },
      { name: 'North Rift Economic Bloc (NOREB)', url: 'https://noreb.go.ke/' },
      { name: 'The Intergovernmental Relations Technical Committee (IGRTC)', url: 'https://www.igrtc.go.ke/' },
    ].sort((a,b) => a.name.localeCompare(b.name))
  },
];


const ResourcesPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>('discovered-in-chat');
  const [dynamicCategories, setDynamicCategories] = useState<(typeof dataSourceCategories)[0][]>([]);

  useEffect(() => {
    const discoveredLinks = getDiscoveredLinks();
    if (discoveredLinks.length > 0) {
      setDynamicCategories([{
        title: 'Discovered in Chat',
        key: 'discovered-in-chat',
        links: discoveredLinks.sort((a, b) => a.name.localeCompare(b.name)),
      }]);
    }
  }, []);

  const allCategories = [...dynamicCategories, ...dataSourceCategories];

  const toggleSection = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <LinkIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Data Sources & Links</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Explore helpful data sources, external links, and other materials related to the Constitution and Kenyan governance.
          </p>
        </header>

        <div className="space-y-4">
          {allCategories.map((category) => (
            <div key={category.key} className="bg-surface dark:bg-dark-surface rounded-2xl custom-shadow-lg overflow-hidden transition-all duration-300">
              <button
                onClick={() => toggleSection(category.key)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75"
                aria-expanded={openSection === category.key}
                aria-controls={`section-content-${category.key}`}
              >
                <h2 className="text-xl font-bold text-on-surface dark:text-dark-on-surface">{category.title}</h2>
                <ChevronDownIcon
                  className={`h-6 w-6 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${openSection === category.key ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                id={`section-content-${category.key}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openSection === category.key ? 'max-h-[1500px]' : 'max-h-0'}`}
              >
                <div className="px-6 pb-6 border-t border-border dark:border-dark-border">
                  <ul className="mt-4 space-y-3">
                    {category.links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary dark:text-dark-primary hover:underline group"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span className="truncate">{link.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
