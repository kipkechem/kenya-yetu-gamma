
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="relative flex items-center p-1 bg-black/5 dark:bg-white/5 rounded-full cursor-pointer" onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')} role="button" aria-label="Toggle Language">
            <span
                className={`absolute top-1 left-1 h-8 w-[42px] rounded-full bg-surface dark:bg-dark-surface shadow-md transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]`}
                style={{ transform: language === 'en' ? 'translateX(0)' : 'translateX(46px)' }}
            ></span>
            <button onClick={(e) => { e.stopPropagation(); setLanguage('en'); }} className={`relative z-10 px-2 py-1.5 w-[46px] text-sm font-bold rounded-full transition-colors duration-300 focus:outline-none ${language === 'en' ? 'text-primary dark:text-dark-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                En
            </button>
            <button onClick={(e) => { e.stopPropagation(); setLanguage('sw'); }} className={`relative z-10 px-2 py-1.5 w-[46px] text-sm font-bold rounded-full transition-colors duration-300 focus:outline-none ${language === 'sw' ? 'text-primary dark:text-dark-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                Sw
            </button>
        </div>
    );
};

export default LanguageSwitcher;
