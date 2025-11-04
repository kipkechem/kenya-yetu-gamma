import React from 'react';

const ProjectsPage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6">
        <div className="flex flex-col items-center justify-center min-h-full p-8 text-center bg-surface dark:bg-dark-surface rounded-3xl custom-shadow-lg">
            <h1 className="mt-6 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Projects</h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400">
                This section will showcase various projects and initiatives related to <span className="font-semibold text-on-surface dark:text-dark-on-surface">KenyaYetu.co.ke<sub className="text-sm font-medium opacity-60 ml-1">BETA</sub></span> and civic engagement.
            </p>
        </div>
    </div>
  );
};

export default ProjectsPage;
