import React from 'react';
import { UserGroupIcon } from './icons';
import { cabinetData } from '../data/cabinet';
import type { CabinetMember } from '../types';

const CabinetMemberCard: React.FC<{ member: CabinetMember }> = ({ member }) => (
  <div className="bg-surface dark:bg-dark-surface p-5 rounded-2xl custom-shadow-lg text-center flex flex-col items-center transition-transform transform hover:-translate-y-1">
    <img src={member.imageUrl} alt={`Photo of ${member.name}`} className="w-28 h-28 rounded-full object-cover mb-4 ring-4 ring-offset-2 ring-primary/30 dark:ring-offset-dark-surface" />
    <h3 className="text-md font-bold text-on-surface dark:text-dark-on-surface">{member.name}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex-grow">{member.title}</p>
  </div>
);

const CabinetPage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <UserGroupIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">The Cabinet</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Meet the Cabinet Secretaries of the National Executive, as appointed under Article 152 of the Constitution.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cabinetData.map(member => (
            <CabinetMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CabinetPage;
