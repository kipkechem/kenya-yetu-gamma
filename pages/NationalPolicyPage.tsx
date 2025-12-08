
import React, { useState, useMemo } from 'react';
import { PresentationChartLineIcon, ExternalLinkIcon, ChevronDownIcon } from '../components/icons';
import { nationalPoliciesData } from '../data/knowledge-base/national-policies';
import type { NationalPolicy } from '../data/knowledge-base/national-policies';
import { useLazyData } from '../hooks/useLazyData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const PolicyCard: React.FC<{ policy: NationalPolicy }> = ({ policy }) => (
  <a
    href={policy.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-surface dark:bg-dark-surface p-5 rounded-2xl custom-shadow hover:custom-shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-primary/20 h-full flex flex-col"
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-base font-bold text-on-surface dark:text-dark-on-surface flex-1 pr-2 leading-tight">{policy.title}</h3>
      <ExternalLinkIcon className="h-4 w-4 text-primary dark:text-dark-primary flex-shrink-0 mt-0.5" />
    </div>
    {policy.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex-grow line-clamp-3">{policy.description}</p>
    )}
    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-dark-primary">
            {policy.category}
        </span>
    </div>
  </a>
);

const NationalPolicyPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { data: policies, isLoading, error, refetch } = useLazyData<NationalPolicy[]>(
    'national-policies-data',
    () => import('../data/knowledge-base/national-policies').then(m => m.nationalPoliciesData)
  );

  const categories = useMemo(() => {
    if (!policies) return [];
    const cats = Array.from(new Set(policies.map(p => p.category)));
    
    // Custom sort order for better user experience
    const sortOrder = [
        'Key Blueprints & Agendas',
        'Economy, Trade & Finance',
        'Agriculture & Food Security',
        'Governance & Security',
        'Social Services & Human Capital',
        'Land, Housing & Infrastructure',
        'Environment, Water & Climate Change',
        'Presidential Speeches',
        'Historical Documents'
    ];

    return cats.sort((a: string, b: string) => {
        const indexA = sortOrder.indexOf(a);
        const indexB = sortOrder.indexOf(b);
        
        // If both are in the sort order list, sort by index
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        // If only A is in list, it comes first
        if (indexA !== -1) return -1;
        // If only B is in list, it comes first
        if (indexB !== -1) return 1;
        
        // Otherwise alphabetical
        return a.localeCompare(b);
    });
  }, [policies]);

  const filteredPolicies = useMemo(() => {
      if (!policies) return [];
      if (selectedCategory === 'All') return policies;
      return policies.filter(p => p.category === selectedCategory);
  }, [policies, selectedCategory]);

  if (isLoading) {
      return <LoadingSpinner />;
  }

  if (error || !policies) {
      return <ErrorDisplay message="Failed to load national policies." onRetry={refetch} />;
  }

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
            <PresentationChartLineIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight">National Development Policies</h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 dark:text-gray-400">
            Key blueprints, agendas, and sectoral plans guiding Kenya's development.
          </p>
        </header>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
            <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === 'All'
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-surface dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
            >
                All Policies
            </button>
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === cat
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-surface dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        <div className="space-y-10 pb-12">
            {categories.filter(cat => selectedCategory === 'All' || selectedCategory === cat).map(category => {
                const categoryPolicies = policies.filter(p => p.category === category);
                if (categoryPolicies.length === 0) return null;

                return (
                    <section key={category} className="animate-fade-in">
                         <div className="flex items-center mb-4">
                            <h2 className="text-xl font-bold text-on-surface dark:text-dark-on-surface pr-4">{category}</h2>
                            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {categoryPolicies.map((policy, index) => (
                                <PolicyCard key={`${policy.title}-${index}`} policy={policy} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default NationalPolicyPage;
