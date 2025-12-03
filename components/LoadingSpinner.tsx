import React, { useState, useEffect } from 'react';

const LoadingSpinner: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    const messages = [
        "Don't worry, the page is loading...",
        "Consulting the Council of Elders for the data...",
        "Running a quick referendum on this request...",
        "Traversing the 47 counties to fetch your content...",
        "Loading... faster than a matatu during rush hour (hopefully)...",
        "Ensuring compliance with Chapter 6 before displaying...",
        "Gathering consensus from the Senate...",
        "Polishing the Coat of Arms...",
        "Reading through the Standing Orders...",
        "Fetching updates from the Kenya Gazette...",
        "Waiting for the IEBC to declare the results..."
    ];

    useEffect(() => {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
        
        const interval = setInterval(() => {
            setProgress((prev) => {
                // Simulate progress that slows down as it reaches 100
                const remaining = 100 - prev;
                const increment = Math.max(0.5, remaining * 0.1); 
                const next = prev + increment;
                return next >= 99 ? 99 : next;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4 min-h-[50vh] animate-fade-in-up">
            <div className="relative flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-700/30"></div>
                <div className="w-24 h-24 rounded-full border-4 border-primary dark:border-dark-primary border-t-transparent animate-spin absolute inset-0"></div>
                <span className="absolute text-xl font-bold text-primary dark:text-dark-primary">{Math.floor(progress)}%</span>
            </div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300 text-center animate-pulse max-w-md px-4">
                {message}
            </p>
        </div>
    );
};

export default LoadingSpinner;