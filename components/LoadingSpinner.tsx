import React, { useState, useEffect } from 'react';

const LoadingSpinner: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    const messages = [
        "Don't worry, the page is loading...",
        "Consulting the Council of Elders...",
        "Running a quick referendum...",
        "Traversing the 47 counties...",
        "Polishing the Coat of Arms...",
        "Reading the Standing Orders...",
        "Fetching updates from the Kenya Gazette...",
        "Waiting for the IEBC results..."
    ];

    useEffect(() => {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
        
        const interval = setInterval(() => {
            setProgress((prev) => {
                const remaining = 100 - prev;
                const increment = Math.max(0.2, remaining * 0.08); 
                const next = prev + increment;
                return next >= 99.5 ? 99.5 : next;
            });
        }, 120);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-8 min-h-[60vh] animate-fade-in text-center">
            {/* Brand Pulse Animation */}
            <div className="relative mb-12">
                <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 rounded-full animate-ping scale-150 opacity-20"></div>
                <div className="relative z-10 w-24 h-24 flex items-center justify-center bg-surface dark:bg-dark-surface rounded-full custom-shadow-xl border-4 border-primary dark:border-dark-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary dark:text-dark-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                </div>
            </div>

            {/* Typography & Messages */}
            <h2 className="text-xl font-bold text-on-surface dark:text-dark-on-surface tracking-tight mb-2">
                Updating KenyaYetu
            </h2>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto italic">
                {message}
            </p>

            {/* Flag-Themed Progress Bar */}
            <div className="w-full max-w-sm">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] uppercase font-black tracking-widest text-gray-400 dark:text-gray-500">System Sync</span>
                    <span className="text-xs font-mono font-bold text-primary dark:text-dark-primary">{Math.floor(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                    <div 
                        className="h-full bg-gradient-to-r from-black via-red-600 to-green-600 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex gap-1.5 mt-2 justify-center">
                    <div className="w-3 h-0.5 bg-black dark:bg-white/20 rounded-full"></div>
                    <div className="w-3 h-0.5 bg-red-600 rounded-full"></div>
                    <div className="w-3 h-0.5 bg-green-600 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
