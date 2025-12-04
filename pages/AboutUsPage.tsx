
import React, { useState } from 'react';
import type { AppView } from '../types/index';
import { UsersIcon, MailIcon, GlobeAmericasIcon, InstagramIcon, HeartIcon, PayPalIcon, CopyIcon, CheckIcon } from '../components/icons';

interface AboutUsPageProps {
  navigateTo: (view: AppView) => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ navigateTo }) => {
    const [isCopied, setIsCopied] = useState(false);

    const scrollToContact = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('contact-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCopyTill = () => {
        navigator.clipboard.writeText('6170663');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-10 bg-background dark:bg-dark-background">
        <div className="max-w-5xl mx-auto space-y-8">
            {/* About Header */}
            <header className="text-center mb-8">
              <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl">
                <UsersIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
              </div>
              <h1 className="mt-4 text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">About Us</h1>
            </header>
            
            {/* About Content */}
            <div className="p-8 text-center bg-surface dark:bg-dark-surface rounded-3xl custom-shadow-lg prose prose-lg max-w-none dark:prose-invert mx-auto">
                <p>
                    <span className="font-semibold text-on-surface dark:text-dark-on-surface">KenyaYetu.co.ke<sub className="text-sm font-medium opacity-60 ml-1">BETA</sub></span> is a project dedicated to making the foundational legal and governance elements of Kenya accessible to everyone. Our mission is to promote civic education and engagement. 
                </p>
                <p>
                    The project is founded by <a href="https://www.linkedin.com/in/mkbartonjo/" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-dark-primary hover:underline font-semibold">Michael Bartonjo</a>, an Urban Planner based in Mombasa, Kenya.
                </p>   
                <p>
                    <span className="font-semibold text-on-surface dark:text-dark-on-surface">KenyaYetu.co.ke<sub className="text-sm font-medium opacity-60 ml-1">BETA</sub></span> is still under development. If you find this project useful, please consider <a href="#contact-section" onClick={scrollToContact} className="text-primary dark:text-dark-primary hover:underline font-semibold">supporting our mission</a>.             
                </p> 
            </div>

            {/* Contact & Support Section */}
            <div id="contact-section" className="pt-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Contact Form */}
                    <div className="lg:w-3/5 bg-surface dark:bg-dark-surface p-8 rounded-3xl custom-shadow-lg">
                        <h2 className="text-2xl font-bold flex items-center mb-4 text-on-surface dark:text-dark-on-surface">
                            <MailIcon className="h-6 w-6 mr-3 text-primary dark:text-dark-primary"/>
                            Get in Touch
                        </h2>
                        <p className="mb-6 text-gray-600 dark:text-gray-400">
                            For inquiries, feedback, or suggestions, please use the form below. We value your input and are always happy to connect with our community.
                        </p>
                        <form 
                            action="mailto:info@kenyayetu.co.ke" 
                            method="POST" 
                            encType="text/plain" 
                            className="space-y-4"
                        >
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="Name" 
                                    required 
                                    className="mt-1 block w-full rounded-xl border-border dark:border-dark-border bg-background dark:bg-dark-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary dark:text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="Email"
                                    required 
                                    className="mt-1 block w-full rounded-xl border-border dark:border-dark-border bg-background dark:bg-dark-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary dark:text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                <textarea 
                                    id="message" 
                                    name="Message"
                                    rows={4} 
                                    required 
                                    className="mt-1 block w-full rounded-xl border-border dark:border-dark-border bg-background dark:bg-dark-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary dark:text-white"
                                ></textarea>
                            </div>
                            <div>
                                <button 
                                    type="submit"
                                    className="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:ring-offset-gray-800 transition-all w-full sm:w-auto"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Support & Follow */}
                    <div className="lg:w-2/5 space-y-6">
                        {/* Follow Us */}
                        <div className="bg-surface dark:bg-dark-surface p-8 rounded-3xl custom-shadow-lg">
                             <h3 className="text-xl font-bold mb-4 text-on-surface dark:text-dark-on-surface">Follow Us</h3>
                             <div className="space-y-4">
                                <a href="https://www.kenyayetu.co.ke" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-dark-primary transition-colors group p-2 rounded-lg hover:bg-background dark:hover:bg-dark-background/50">
                                    <GlobeAmericasIcon className="h-6 w-6 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-dark-primary"/>
                                    <span className="font-medium">KenyaYetu.co.ke</span>
                                </a>
                                <a href="https://www.instagram.com/kenyayetu.co.ke/?igsh=Y2ZjcGxlYml6NW5s#" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-dark-primary transition-colors group p-2 rounded-lg hover:bg-background dark:hover:bg-dark-background/50">
                                    <InstagramIcon className="h-6 w-6 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-dark-primary"/>
                                    <span className="font-medium">Instagram</span>
                                </a>
                            </div>
                        </div>

                        {/* Support Mission */}
                        <div className="bg-surface dark:bg-dark-surface p-8 rounded-3xl custom-shadow-lg">
                             <h2 className="text-xl font-bold flex items-center mb-4 text-on-surface dark:text-dark-on-surface">
                                <HeartIcon className="h-6 w-6 mr-3 text-primary dark:text-dark-primary"/>
                                Support Our Mission
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                Your generous contribution helps us maintain this platform and continue promoting civic education.
                            </p>
                            
                            <div className="space-y-6">
                                {/* M-Pesa Card */}
                                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-3xl border border-green-200 dark:border-green-800 shadow-sm">
                                    <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-green-400/20 rounded-full blur-3xl"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-5">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                Donate via M-Pesa
                                            </h3>
                                            <span className="px-2.5 py-0.5 rounded-full bg-[#4CD964] text-white text-[10px] font-bold tracking-wide uppercase shadow-sm">
                                                Buy Goods
                                            </span>
                                        </div>

                                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-green-100 dark:border-green-900/50 mb-5 text-center relative overflow-hidden group">
                                            <p className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold mb-1">
                                                Till Number
                                            </p>
                                            <button 
                                                onClick={handleCopyTill}
                                                className="flex items-center justify-center gap-2 mx-auto w-full hover:scale-[1.02] transition-transform duration-200 active:scale-95"
                                                title="Click to copy"
                                            >
                                                <span className="text-3xl sm:text-4xl font-black text-gray-800 dark:text-white tracking-wider font-mono selection:bg-[#4CD964] selection:text-white">
                                                    6170663
                                                </span>
                                                <div className={`p-1.5 rounded-full ${isCopied ? 'bg-green-100 text-green-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:text-[#4CD964]'} transition-colors`}>
                                                    {isCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                                                </div>
                                            </button>
                                            <p className="text-[10px] text-gray-400 mt-1 font-medium truncate">MICHAEL K BARTONJO</p>
                                            {isCopied && <span className="absolute top-2 right-2 text-[10px] font-bold text-green-500 animate-fade-in bg-white dark:bg-gray-800 px-2 py-0.5 rounded-full shadow-sm">Copied!</span>}
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Instructions:</h4>
                                            <ol className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5">
                                                <li className="flex items-start gap-2">
                                                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 flex items-center justify-center text-[10px] font-bold mt-0.5">1</span>
                                                    <span>Go to <strong>M-PESA</strong> &gt; <strong>Lipa na M-PESA</strong></span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 flex items-center justify-center text-[10px] font-bold mt-0.5">2</span>
                                                    <span>Select <strong>Buy Goods and Services</strong></span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 flex items-center justify-center text-[10px] font-bold mt-0.5">3</span>
                                                    <span>Enter Till No. <strong>6170663</strong></span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 flex items-center justify-center text-[10px] font-bold mt-0.5">4</span>
                                                    <span>Enter Amount and PIN</span>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
            
                                <div>
                                     <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Donate via PayPal</h3>
                                    <a href="https://www.paypal.com/donate/?hosted_button_id=T36PG8UQP8C56" target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-[#0070BA] hover:bg-[#003087] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070BA] transition-colors shadow-sm hover:shadow">
                                        <PayPalIcon className="h-5 w-5 mr-2"/>
                                        Donate Securely
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AboutUsPage;
