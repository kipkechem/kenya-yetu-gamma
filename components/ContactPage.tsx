
import React from 'react';
import { MailIcon, GlobeAmericasIcon, InstagramIcon, HeartIcon, PayPalIcon } from './icons';

const ContactPage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto bg-background dark:bg-dark-background text-on-surface dark:text-dark-on-surface">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight sm:text-5xl">Contact Us</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    Get in touch with us, follow our journey on social media, or support our mission.
                </p>
            </header>

            <div className="bg-surface dark:bg-dark-surface p-8 rounded-3xl custom-shadow-lg">
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                
                    <div className="lg:w-1/2">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center">
                                <MailIcon className="h-6 w-6 mr-3 text-primary dark:text-dark-primary"/>
                                Get in Touch
                            </h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                               For inquiries, feedback, or suggestions, please use the form below. We value your input and are always happy to connect with our community.
                            </p>
                            
                            <form 
                                action="mailto:info@kenyayetu.co.ke" 
                                method="POST" 
                                encType="text/plain" 
                                className="mt-6 space-y-4"
                            >
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="Name" 
                                        required 
                                        className="mt-1 block w-full rounded-2xl border-border dark:border-dark-border shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="Email"
                                        required 
                                        className="mt-1 block w-full rounded-2xl border-border dark:border-dark-border shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                    <textarea 
                                        id="message" 
                                        name="Message"
                                        rows={4} 
                                        required 
                                        className="mt-1 block w-full rounded-2xl border-border dark:border-dark-border shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                                    ></textarea>
                                </div>
                                <div>
                                    <button 
                                        type="submit"
                                        className="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:ring-offset-gray-800 transition-all"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
        
                        <div className="mt-8 border-t border-border dark:border-dark-border pt-8">
                            <h3 className="text-xl font-bold">Follow Us</h3>
                             <div className="mt-4 space-y-3">
                                <a href="https://www.kenyayetu.co.ke" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-dark-primary transition-colors group">
                                    <GlobeAmericasIcon className="h-6 w-6 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-dark-primary"/>
                                    <span className="font-medium">KenyaYetu.co.ke</span>
                                </a>
                                <a href="https://www.instagram.com/kenyayetu.co.ke/?igsh=Y2ZjcGxlYml6NW5s#" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-dark-primary transition-colors group">
                                    <InstagramIcon className="h-6 w-6 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-dark-primary"/>
                                    <span className="font-medium">Instagram</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="my-8 border-t border-border dark:border-dark-border lg:hidden"></div>

                    <div className="lg:w-1/2 lg:border-l lg:border-border dark:lg:border-dark-border lg:pl-8">
                        <div id="support-mission" className="scroll-mt-20">
                            <h2 className="text-2xl font-bold flex items-center text-on-surface dark:text-dark-on-surface">
                                <HeartIcon className="h-6 w-6 mr-3 text-primary dark:text-dark-primary"/>
                                Support Our Mission
                            </h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                Your generous contribution helps us maintain this platform and continue our mission of promoting civic education in Kenya.
                            </p>
                            
                            <div className="mt-6 border-t border-border dark:border-dark-border pt-6">
                                <h3 className="font-semibold text-lg text-on-surface dark:text-dark-on-surface">Donate via M-Pesa</h3>
                                <div className="mt-2 bg-background dark:bg-dark-background p-4 rounded-2xl">
                                    <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                                        <li>Go to M-Pesa on your phone</li>
                                        <li>Select "Lipa na M-Pesa"</li>
                                        <li>Select "Buy Goods and Services"</li>
                                        <li>Enter Till Number: <span className="font-bold text-on-surface dark:text-dark-on-surface">6170663</span></li>
                                        <li>Enter the amount and your PIN</li>
                                        <li>Confirm Name: <span className="font-bold text-on-surface dark:text-dark-on-surface">MICHAEL K BARTONJO</span></li>
                                    </ol>
                                </div>
                            </div>
        
                            <div className="mt-6 border-t border-border dark:border-dark-border pt-6">
                                 <h3 className="font-semibold text-lg mb-3 text-on-surface dark:text-dark-on-surface">Donate via PayPal</h3>
                                <a href="https://www.paypal.com/donate/?hosted_button_id=T36PG8UQP8C56" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:ring-offset-gray-800 transition-colors">
                                    <PayPalIcon className="h-5 w-5 mr-2 -ml-1"/>
                                    Donate with PayPal
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactPage;
