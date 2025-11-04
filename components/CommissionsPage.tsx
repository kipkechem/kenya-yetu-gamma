import React from 'react';
import { ShieldCheckIcon } from './icons';
import { commissionsData, independentOfficesData } from '../data/commissions';
import type { Commission } from '../types';

const CommissionCard: React.FC<{ commission: Commission }> = ({ commission }) => (
  <a 
    href={commission.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-surface dark:bg-dark-surface p-6 rounded-2xl custom-shadow-lg transition-transform transform hover:-translate-y-1 hover:custom-shadow-xl"
  >
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-bold text-on-surface dark:text-dark-on-surface">{commission.name}</h3>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{commission.description}</p>
  </a>
);

const CommissionsPage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <ShieldCheckIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Commissions & Independent Offices</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Explore the independent commissions and offices established by Chapter 15 of the Constitution to protect sovereignty and promote constitutionalism.
          </p>
        </header>

        <section className="mb-12">
            <h2 className="text-2xl font-bold text-on-surface dark:text-dark-on-surface mb-6 text-center">Commissions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {commissionsData.map(commission => (
                    <CommissionCard key={commission.name} commission={commission} />
                ))}
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold text-on-surface dark:text-dark-on-surface mb-6 text-center">Independent Offices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {independentOfficesData.map(office => (
                    <CommissionCard key={office.name} commission={office} />
                ))}
            </div>
        </section>
      </div>
    </div>
  );
};

export default CommissionsPage;
