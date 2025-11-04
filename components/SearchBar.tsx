import React from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  language: 'en' | 'sw';
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, language }) => {
  const placeholder = language === 'sw' ? 'Tafuta katiba...' : 'Search the constitution...';
  
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="block w-full bg-surface border border-border rounded-full py-3 pl-12 pr-4 text-on-surface placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent custom-shadow"
      />
    </div>
  );
};

export default SearchBar;