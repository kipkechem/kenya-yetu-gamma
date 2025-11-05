import React, { useState } from 'react';
import { ministries } from '../data/ministries';
import type { Ministry } from '../types';
import { ChevronDownIcon, HierarchyIcon } from './icons';

const MinistryNode: React.FC<{ ministry: Ministry; isExpanded: boolean; onToggle: () => void; }> = ({ ministry, isExpanded, onToggle }) => {
  return (
    <div className="relative flex justify-center">
      <div className="flex flex-col items-center w-full max-w-xs">
        <button
          onClick={onToggle}
          className="bg-surface dark:bg-dark-surface p-5 rounded-xl custom-shadow-lg w-full text-center group transition-all duration-300 hover:custom-shadow-xl hover:-translate-y-1 z-10"
          aria-expanded={isExpanded}
        >
          <h3 className="font-bold text-on-surface dark:text-dark-on-surface text-base">{ministry.name}</h3>
          <ChevronDownIcon className={`h-5 w-5 mx-auto mt-2 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        <div
          className="w-full transition-all duration-500 ease-in-out overflow-hidden flex flex-col items-center"
          style={{ maxHeight: isExpanded ? '500px' : '0px', opacity: isExpanded ? 1 : 0 }}
        >
          <div className="w-full space-y-4 flex flex-col items-center pt-6">
            <div className="bg-primary-light/50 dark:bg-dark-primary-light/50 p-4 rounded-lg custom-shadow w-11/12 text-center z-10">
              <p className="font-semibold text-sm text-primary dark:text-dark-primary">{ministry.cabinetSecretary}</p>
            </div>

            {ministry.principalSecretaries.map((ps, index) => (
              <div key={index} className="bg-gray-100 dark:bg-dark-surface/50 p-4 rounded-lg custom-shadow w-11/12 text-center z-10">
                 <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{ps.department}</p>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{ps.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CabinetPage: React.FC = () => {
    const [expandedMinistry, setExpandedMinistry] = useState<string | null>(null);

    const handleToggle = (ministryName: string) => {
        setExpandedMinistry(prev => (prev === ministryName ? null : ministryName));
    };

    const executiveOffices = ministries.slice(0, 2);
    const otherMinistries = ministries.slice(2);

    return (
        <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
                        <HierarchyIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Cabinet Structure</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                        An interactive organizational chart of the National Executive. Click a ministry to see its structure.
                    </p>
                </header>

                <main className="flex flex-col items-center gap-8 pb-12">
                    {executiveOffices.map((ministry) => (
                        <React.Fragment key={ministry.name}>
                            <MinistryNode
                                ministry={ministry}
                                isExpanded={expandedMinistry === ministry.name}
                                onToggle={() => handleToggle(ministry.name)}
                            />
                        </React.Fragment>
                    ))}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full max-w-5xl mt-8">
                        {otherMinistries.map(ministry => (
                            <MinistryNode
                                key={ministry.name}
                                ministry={ministry}
                                isExpanded={expandedMinistry === ministry.name}
                                onToggle={() => handleToggle(ministry.name)}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CabinetPage;