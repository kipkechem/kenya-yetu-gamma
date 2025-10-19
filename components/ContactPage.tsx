import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6">
        <div className="flex flex-col items-center justify-center min-h-full p-8 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10">
            <h1 className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl">Contact Us</h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400">
                For inquiries, feedback, or suggestions, please reach out to us. Contact information and a contact form will be available here soon.
            </p>
        </div>
    </div>
  );
};

export default ContactPage;