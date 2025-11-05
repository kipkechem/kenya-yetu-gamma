import React from 'react';
import type { AppView } from '../types';
import { UsersIcon } from './icons';

interface AboutUsPageProps {
  navigateTo: (view: AppView) => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ navigateTo }) => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="text-center mb-12">
              <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
                <UsersIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
              </div>
              <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">About Us</h1>
            </header>
            <div className="p-8 text-center bg-surface dark:bg-dark-surface rounded-3xl custom-shadow-lg prose prose-lg max-w-none dark:prose-invert">
                <p>
                    <span className="font-semibold text-on-surface dark:text-dark-on-surface">KenyaYetu.co.ke<sub className="text-sm font-medium opacity-60 ml-1">BETA</sub></span> is a project dedicated to making the foundational legal and governance elements of Kenya accessible to everyone. Our mission is to promote civic education and engagement. 
                </p>
                <p>
                    The project is founded by <a href="https://www.linkedin.com/in/mkbartonjo/" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-dark-primary hover:underline font-semibold">Michael Bartonjo</a>, an Urban Planner based in Mombasa, Kenya.
                </p>   
                <p>
                    <span className="font-semibold text-on-surface dark:text-dark-on-surface">KenyaYetu.co.ke<sub className="text-sm font-medium opacity-60 ml-1">BETA</sub></span> is still under development. If you find this project useful, please consider <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }} className="text-primary dark:text-dark-primary hover:underline font-semibold">supporting our mission</a>.             
                </p> 
            </div>
        </div>
    </div>
  );
};

export default AboutUsPage;