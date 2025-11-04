import React from 'react';

const LanguageSwitcher: React.FC<{ language: 'en' | 'sw'; setLanguage: (lang: 'en' | 'sw') => void; }> = ({ language, setLanguage }) => {
    return (
        <div className="relative flex items-center p-1 bg-gray-200 dark:bg-dark-background rounded-full">
            <span
                className={`absolute top-1 left-1 h-8 w-[88px] rounded-full bg-surface dark:bg-dark-surface shadow-md transition-transform duration-300 ease-in-out`}
                style={{ transform: language === 'en' ? 'translateX(0)' : 'translateX(92px)' }}
            ></span>
            <button onClick={() => setLanguage('en')} className={`relative z-10 px-4 py-1.5 w-[92px] text-sm font-semibold rounded-full transition-colors duration-300 ${language === 'en' ? 'text-primary dark:text-dark-primary' : 'text-gray-500 dark:text-dark-on-surface/70'}`}>
                English
            </button>
            <button onClick={() => setLanguage('sw')} className={`relative z-10 px-4 py-1.5 w-[92px] text-sm font-semibold rounded-full transition-colors duration-300 ${language === 'sw' ? 'text-primary dark:text-dark-primary' : 'text-gray-500 dark:text-dark-on-surface/70'}`}>
                Kiswahili
            </button>
        </div>
    );
};

export default LanguageSwitcher;