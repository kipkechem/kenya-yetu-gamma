import React from 'react';

const MyRepresentativesPage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6">
        <div className="flex flex-col items-center justify-center min-h-full p-8 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10">
            <h1 className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl">My Representatives</h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400">
                This section will allow you to find and learn about your elected representatives, from the President down to your Member of County Assembly (MCA). Feature coming soon.
            </p>
        </div>
    </div>
  );
};

export default MyRepresentativesPage;