
import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, LinkIcon } from '../components/icons';
import { getDiscoveredLinks } from '../utils/cache';
import type { DataSourceCategory } from '../data/knowledge-base/resources';
import { useLazyData } from '../hooks/useLazyData';
import LoadingSpinner from '../components/LoadingSpinner';

const ResourcesPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>('discovered-in-chat');
  const [dynamicCategories, setDynamicCategories] = useState<DataSourceCategory[]>([]);

  const { data: dataSourceCategories, isLoading } = useLazyData<DataSourceCategory[]>(
      'resources-data',
      () => import('../data/knowledge-base/resources').then(m => m.dataSourceCategories)
  );

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

  if (isLoading || !dataSourceCategories) {
      return <LoadingSpinner />;
  }

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
