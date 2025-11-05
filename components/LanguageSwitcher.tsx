import React from 'react';

const LanguageSwitcher: React.FC<{ language: 'en' | 'sw'; setLanguage: (lang: 'en' | 'sw') => void; }> = ({ language, setLanguage }) => {
    return (
        <div className="relative flex items-center p-1 bg-black/5 dark:bg-white/5 rounded-full">
            <span
                className={`absolute top-1 left-1 h-8 w-[42px] rounded-full bg-surface dark:bg-dark-surface shadow-md transition-transform duration-300 ease-in-out`}
                style={{ transform: language === 'en' ? 'translateX(0)' : 'translateX(46px)' }}
            ></span>
            <button onClick={() => setLanguage('en')} className={`relative z-10 px-2 py-1.5 w-[46px] text-sm font-semibold rounded-full transition-colors duration-300 ${language === 'en' ? 'text-primary dark:text-dark-primary' : 'text-gray-500 dark:text-dark-on-surface/70'}`}>
                En
            </button>
            <button onClick={() => setLanguage('sw')} className={`relative z-10 px-2 py-1.5 w-[46px] text-sm font-semibold rounded-full transition-colors duration-300 ${language === 'sw' ? 'text-primary dark:text-dark-primary' : 'text-gray-500 dark:text-dark-on-surface/70'}`}>
                Sw
            </button>
        </div>
    );
};

export default LanguageSwitcher;