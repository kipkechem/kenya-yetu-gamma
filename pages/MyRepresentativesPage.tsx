import React, { useState, useMemo, useEffect } from 'react';
import { IdentificationIcon, UsersIcon } from '../components/icons';
import type { Representative } from '../types/index';

const RepresentativeCard: React.FC<{ rep: Representative }> = ({ rep }) => (
  <div className="bg-surface dark:bg-dark-surface p-5 rounded-2xl custom-shadow-lg text-center flex flex-col items-center">
    <img src={rep.imageUrl} alt={`Photo of ${rep.name}`} className="w-24 h-24 rounded-full object-cover mb-4 ring-2 ring-offset-2 ring-primary/50 dark:ring-offset-gray-800" />
    <h3 className="text-lg font-bold text-on-surface dark:text-dark-on-surface">{rep.name}</h3>
    <p className="text-primary dark:text-dark-primary font-semibold">{rep.position}</p>
    {rep.county && <p className="text-sm text-gray-500 dark:text-gray-400">{rep.county} County</p>}
    <p className="mt-2 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{rep.party}</p>
  </div>
);

const MyRepresentativesPage: React.FC = () => {
  const [selectedCounty, setSelectedCounty] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [representativesData, setRepresentativesData] = useState<Representative[] | null>(null);

  useEffect(() => {
      const loadData = async () => {
          const module = await import('../data/representatives');
          setRepresentativesData(module.representativesData);
      };
      loadData();
  }, []);

  const countyOptions = useMemo(() => {
    if (!representativesData) return ['All'];
    return ['All', ...Array.from(new Set(representativesData.map(r => r.county).filter(Boolean))) as string[]];
  }, [representativesData]);


  const filteredReps = useMemo(() => {
    if (!representativesData) return [];
    return representativesData.filter(rep => {
      const countyMatch = selectedCounty === 'All' || rep.county === selectedCounty || !rep.county; // also show national reps
      const searchMatch = searchTerm === '' ||
        rep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rep.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (rep.county && rep.county.toLowerCase().includes(searchTerm.toLowerCase()));
      return countyMatch && searchMatch;
    });
  }, [selectedCounty, searchTerm, representativesData]);
  
  if (!representativesData) {
     return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-dark-primary"></div>
        </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <IdentificationIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">My Representatives</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Find and learn about your elected representatives from the national to the county level.
          </p>
        </header>

        <div className="mb-8 p-4 bg-surface/80 dark:bg-dark-surface/50 backdrop-blur-sm rounded-2xl custom-shadow-md sticky top-0 z-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, position, or county..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-full border-border dark:border-dark-border bg-background dark:bg-dark-background py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative w-full md:w-auto">
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="block w-full appearance-none rounded-full border-border dark:border-dark-border bg-background dark:bg-dark-background py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {countyOptions.map(county => <option key={county} value={county}>{county}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        
        {filteredReps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredReps.map(rep => <RepresentativeCard key={rep.name + rep.position} rep={rep} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-on-surface dark:text-dark-on-surface">No Representatives Found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRepresentativesPage;