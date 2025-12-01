
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { addDiscoveredLinks } from '../utils/cache';
import { SparklesIcon, PaperAirplaneIcon } from './icons';

interface Message {
    role: 'user' | 'model';
    text: string;
    isError?: boolean;
}

const ChatPage: React.FC<{ language: 'en' | 'sw' }> = ({ language }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const t = language === 'sw' ? {
        placeholder: "Uliza swali kuhusu Katiba...",
        initial_greeting: "Jambo! Mimi ni msaidizi wako wa Katiba. Unaweza kuniuliza nini?",
        errors: {
            generic: "Samahani, nimepata hitilafu isiyotarajiwa. Tafadhali jaribu tena.",
            network: "Kuna tatizo la mtandao. Tafadhali angalia intaneti yako na ujaribu tena.",
            quota: "Huduma ina shughuli nyingi kwa sasa. Tafadhali subiri kidogo kabla ya kujaribu tena.",
            safety: "Siwezi kujibu swali hilo kwa sababu ya miongozo ya usalama.",
            config: "Kuna tatizo la kiufundi (Ufunguo wa API). Tafadhali wasiliana na msimamizi."
        }
    } : {
        placeholder: "Ask a question about the Constitution...",
        initial_greeting: "Hello! I'm your constitutional assistant. What can I help you with?",
        errors: {
            generic: "Sorry, I encountered an unexpected error. Please try again.",
            network: "It seems there is a network issue. Please check your connection.",
            quota: "The service is currently busy. Please try again in a moment.",
            safety: "I cannot answer that prompt due to safety guidelines.",
            config: "There is a configuration issue (API Key). Please contact the administrator."
        }
    };
    
    useEffect(() => {
        if(messages.length === 0 && !isLoading) {
             setMessages([{ role: 'model', text: t.initial_greeting }]);
        }
    }, [language]); // Removed t.initial_greeting dependency to prevent reset on lang change if chat exists


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const getFriendlyErrorMessage = (error: any): string => {
        const msg = (error?.message || '').toLowerCase();
        
        if (msg.includes('fetch') || msg.includes('network') || msg.includes('failed to fetch')) {
            return t.errors.network;
        }
        if (msg.includes('429') || msg.includes('quota') || msg.includes('resource exhausted')) {
            return t.errors.quota;
        }
        if (msg.includes('api key') || msg.includes('403') || msg.includes('401')) {
            return t.errors.config;
        }
        if (msg.includes('safety') || msg.includes('blocked')) {
            return t.errors.safety;
        }
        
        return t.errors.generic;
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const promptText = input;
        setInput('');
        setIsLoading(true);

        try {
            if (!process.env.API_KEY) {
                throw new Error("Missing API Key");
            }

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: promptText,
                config: { 
                    systemInstruction: `You are a helpful assistant for a web app called KenyaYetu.co.ke, which is an interactive explorer for the Constitution of Kenya. Your language preference is ${language === 'sw' ? 'Swahili' : 'English'}. Answer questions accurately and concisely. If you provide links, ensure they are valid and fully-qualified URLs.` 
                }
            });
            const modelText = response.text || "";
            
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const foundUrls = modelText.match(urlRegex);
            if (foundUrls) {
                addDiscoveredLinks(foundUrls);
            }

            const modelMessage: Message = { role: 'model', text: modelText };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Gemini API Error:", error);
            const friendlyText = getFriendlyErrorMessage(error);
            const errorMessage: Message = { role: 'model', text: friendlyText, isError: true };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full w-full flex flex-col bg-background dark:bg-dark-background">
            <header className="flex-shrink-0 z-10 p-4 border-b border-border dark:border-dark-border bg-surface dark:bg-dark-surface custom-shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <SparklesIcon className="h-7 w-7 text-primary dark:text-dark-primary" />
                    <h1 className="text-xl font-bold text-on-surface dark:text-dark-on-surface">Constitutional Assistant</h1>
                </div>
                <button
                    onClick={() => window.history.back()}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5"
                    aria-label="Close chat"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </header>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.isError ? 'bg-red-100 dark:bg-red-900/30' : 'bg-primary-light dark:bg-dark-primary-light'}`}>
                                {msg.isError ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <SparklesIcon className="w-5 h-5 text-primary dark:text-dark-primary" />
                                )}
                            </div>
                        )}
                        <div className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary dark:bg-dark-primary text-white rounded-br-none' : 'bg-surface dark:bg-dark-surface rounded-bl-none custom-shadow'} ${msg.isError ? 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`}>
                            <p className={`text-base whitespace-pre-wrap ${msg.isError ? 'text-red-600 dark:text-red-400' : 'text-on-surface dark:text-dark-on-surface'}`}>{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3 justify-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-light dark:bg-dark-primary-light flex items-center justify-center">
                            <SparklesIcon className="w-5 h-5 text-primary dark:text-dark-primary" />
                        </div>
                        <div className="max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl bg-surface dark:bg-dark-surface rounded-bl-none custom-shadow flex items-center space-x-2">
                             <span className="h-2 w-2 bg-primary dark:bg-dark-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                             <span className="h-2 w-2 bg-primary dark:bg-dark-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                             <span className="h-2 w-2 bg-primary dark:bg-dark-primary rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex-shrink-0 p-4 bg-surface dark:bg-dark-surface border-t border-border dark:border-dark-border">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t.placeholder}
                        className="flex-1 block w-full bg-background dark:bg-dark-background border-border dark:border-dark-border rounded-full py-3 px-5 text-on-surface dark:text-dark-on-surface placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        aria-label="Chat input"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="p-3 rounded-full bg-primary hover:bg-primary-dark text-white disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform active:scale-95"
                        aria-label="Send message"
                    >
                        <PaperAirplaneIcon className="h-6 w-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
