
import React from 'react';
import { MapPinIcon } from '../components/icons';

const SameLatLongPage: React.FC = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-background dark:bg-dark-background">
            <div className="max-w-md w-full text-center">
                <div className="inline-block p-4 bg-primary-light dark:bg-dark-primary-light rounded-full mb-6">
                    <MapPinIcon className="h-12 w-12 text-primary dark:text-dark-primary" />
                </div>
                <h1 className="text-3xl font-extrabold text-on-surface dark:text-dark-on-surface mb-4">Same Latitude & Longitude</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Discover places and counties sharing the same coordinates. This feature is currently in active development.
                </p>
                <div className="p-6 bg-surface dark:bg-dark-surface rounded-2xl custom-shadow border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-400 italic">Coming Soon</p>
                </div>
            </div>
        </div>
    );
};

export default SameLatLongPage;
