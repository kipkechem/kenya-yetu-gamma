import React from 'react';
import { PresentationChartLineIcon, ExternalLinkIcon } from './icons';
import { nationalPoliciesData } from '../data/national-policies';
import type { NationalPolicy } from '../data/national-policies';

const PolicyCard: React.FC<{ policy: NationalPolicy }> = ({ policy }) => (
  <a
    href={policy.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow-lg transition-transform transform hover:-translate-y-1 hover:custom-shadow-xl h-full flex flex-col"
  >
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-bold text-on-surface dark:text-dark-on-surface flex-1 pr-4">{policy.title}</h3>
      <ExternalLinkIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-1" />
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex-grow">{policy.description}</p>
    <div className="mt-4">
        <span className="text-xs font-semibold px-2.5 py-1 bg-primary-light dark:bg-dark-primary-light text-primary dark:text-dark-primary rounded-full">
            {policy.category}
        </span>
    </div>
  </a>
);

const NationalPolicyPage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <PresentationChartLineIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">National Development Policies</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            A collection of key policy documents, blueprints, and agendas that guide Kenya's national development and economic strategy.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          {nationalPoliciesData.map(policy => (
            <PolicyCard key={policy.title} policy={policy} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default NationalPolicyPage;
