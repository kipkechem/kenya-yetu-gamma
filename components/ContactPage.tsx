import React from 'react';
import { MailIcon, GlobeAmericasIcon, HeartIcon, InstagramIcon, PayPalIcon } from './icons';

const ContactPage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl">Contact & Support</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    Get in touch with us, follow our journey, or support our mission.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information & Socials */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10 flex flex-col">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center">
                            <MailIcon className="h-6 w-6 mr-3 text-green-600 dark:text-green-400"/>
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="Email"
                                    required 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                <textarea 
                                    id="message" 
                                    name="Message"
                                    rows={4} 
                                    required 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                ></textarea>
                            </div>
                            <div>
                                <button 
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:ring-offset-gray-800"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                        <h3 className="text-xl font-bold">Follow Us</h3>
                         <div className="mt-4 space-y-3">
                            <a href="https://www.kenyayetu.co.ke" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 transition-colors group">
                                <GlobeAmericasIcon className="h-6 w-6 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-green-600 dark:group-hover:text-green-400"/>
                                <span className="font-medium">KenyaYetu.co.ke</span>
                            </a>
                            <a href="https://www.instagram.com/kenyayetu.co.ke?igsh=Y2ZjcGxlYml6NW5s" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 transition-colors group">
                                <InstagramIcon className="h-6 w-6 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-green-600 dark:group-hover:text-green-400"/>
                                <span className="font-medium">Instagram</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Donation Section */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10">
                    <h2 className="text-2xl font-bold flex items-center">
                        <HeartIcon className="h-6 w-6 mr-3 text-green-600 dark:text-green-400"/>
                        Support Our Mission
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Your generous contribution helps us maintain this platform and continue our mission of promoting civic education in Kenya.
                    </p>
                    
                    {/* M-Pesa Instructions */}
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Donate via M-Pesa</h3>
                        <div className="mt-2 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                            <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                                <li>Go to M-Pesa on your phone</li>
                                <li>Select "Lipa na M-Pesa"</li>
                                <li>Select "Pay Bill"</li>
                                <li>Enter Business No: <span className="font-bold text-gray-900 dark:text-gray-100">XXXXXX</span></li>
                                <li>Enter Account No: <span className="font-bold text-gray-900 dark:text-gray-100">DONATE</span></li>
                                <li>Enter the amount and your PIN</li>
                            </ol>
                        </div>
                    </div>

                    {/* PayPal Button */}
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                         <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Donate via PayPal</h3>
                        <a href="https://www.paypal.com/donate/?hosted_button_id=T36PG8UQP8C56" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:ring-offset-gray-800 transition-colors">
                            <PayPalIcon className="h-5 w-5 mr-2 -ml-1"/>
                            Donate with PayPal
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactPage;