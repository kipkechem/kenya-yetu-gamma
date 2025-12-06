
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
        <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
            {/* Header */}
            <header className="text-center mb-8">
              <div className="inline-block p-3 bg-primary-light dark:bg-dark-primary-light rounded-2xl mb-4">
                <UsersIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight mb-6">
                  KenyaYetu: Empowering Citizens Through Accessible Knowledge
              </h1>
              <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  KenyaYetu.co.ke makes Kenya’s public information easy to understand and accessible to everyone. We are a nonprofit digital public infrastructure platform that organizes laws, policies, governance frameworks, and civic education into simple, clear, and usable resources. Our goal is to help citizens and institutions access reliable civic information, understand their <span className="text-primary dark:text-dark-primary font-semibold">rights and responsibilities</span>, and participate confidently in public life.
              </p>
            </header>
            
            {/* What We Aim to Do */}
            <div className="bg-surface dark:bg-dark-surface p-8 rounded-3xl custom-shadow-lg">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-on-surface dark:text-dark-on-surface mb-3">What We Aim to Do</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        KenyaYetu is being developed as a space where complex ideas about public policy, planning, and governance are translated into clear, practical information that anyone can understand.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-2xl bg-background dark:bg-dark-background border border-border dark:border-dark-border/50 hover:border-primary/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold mb-4">1</div>
                        <h3 className="font-bold text-lg mb-2 text-on-surface dark:text-dark-on-surface">Simplifying Public Policy</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            We aim to break down policy concepts—such as how issues are identified, how solutions are explored, and how public programmes are implemented—into language that is accessible to everyday citizens.
                        </p>
                    </div>
                    
                    <div className="p-5 rounded-2xl bg-background dark:bg-dark-background border border-border dark:border-dark-border/50 hover:border-primary/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold mb-4">2</div>
                        <h3 className="font-bold text-lg mb-2 text-on-surface dark:text-dark-on-surface">Making Evidence Easy to Understand</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">As the platform grows, we plan to offer:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-1">
                            <li>Short policy explainers</li>
                            <li>Visual summaries and diagrams</li>
                            <li>Clear, people-focused insights on issues like urban mobility, infrastructure, and climate resilience</li>
                        </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-background dark:bg-dark-background border border-border dark:border-dark-border/50 hover:border-primary/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold mb-4">3</div>
                        <h3 className="font-bold text-lg mb-2 text-on-surface dark:text-dark-on-surface">Aligning With Kenya’s Development Vision</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Our work is inspired by national and global frameworks such as:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-1">
                            <li>Kenya Vision 2030</li>
                            <li>Sustainable Development Goals (SDG 9 & 11)</li>
                            <li>African Union Agenda 2063</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Founder */}
            <div className="bg-surface dark:bg-dark-surface p-8 rounded-3xl custom-shadow border border-border dark:border-dark-border">
                <h2 className="text-xl font-bold text-on-surface dark:text-dark-on-surface mb-4">About the Founder</h2>
                <div className="prose dark:prose-invert text-sm text-gray-600 dark:text-gray-400">
                        <p className="mb-3">
                        KenyaYetu was founded by <a href="https://www.linkedin.com/in/mkbartonjo/" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-dark-primary font-semibold hover:underline">Michael Bartonjo</a>, an RTPI-accredited urban planner with experience in urban planning, port-city operations, spatial analysis, and infrastructure research.
                    </p>
                    <p>
                        His work reflects a commitment to <strong>user-centered design</strong>, sustainability, and contributing to Kenya’s long-term development.
                    </p>
                </div>
            </div>

            {/* Beta Notice */}
            <div className="text-center max-w-2xl mx-auto py-4">
                 <p className="text-gray-500 dark:text-gray-400 italic">
                    KenyaYetu.co.ke is currently in <strong className="text-primary dark:text-dark-primary not-italic">BETA</strong>. If this mission resonates with you, we invite you to follow, share, and <a href="#contact-section" onClick={scrollToContact} className="text-primary dark:text-dark-primary hover:underline font-semibold not-italic">support the journey</a> as the platform grows.
                </p>
            </div>

            {/* Contact & Support Section */}
            <div id="contact-section" className="pt-8 border-t border-border dark:border-dark-border">
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
                                    className="mt-1 block w-full rounded-xl border-border dark:border-dark-border bg-background dark:bg-dark-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary dark:text-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="Email"
                                    required 
                                    className="mt-1 block w-full rounded-xl border-border dark:border-dark-border bg-background dark:bg-dark-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary dark:text-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                <textarea 
                                    id="message" 
                                    name="Message"
                                    rows={4} 
                                    required 
                                    className="mt-1 block w-full rounded-xl border-border dark:border-dark-border bg-background dark:bg-dark-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary dark:text-white focus:outline-none"
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
                                Your generous contribution helps us maintain this platform and continue our mission of promoting civic education in Kenya.
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
