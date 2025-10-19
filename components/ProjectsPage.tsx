import React from 'react';

const ProjectsPage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6">
        <div className="flex flex-col items-center justify-center min-h-full p-8 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10">
            <h1 className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl">Projects</h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400">
                This section will showcase various projects and initiatives related to Kenya Yetu and civic engagement.
            </p>
        </div>
    </div>
  );
};

export default ProjectsPage;