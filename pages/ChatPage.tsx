import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { addDiscoveredLinks } from '../utils/cache';
import { SparklesIcon, PaperAirplaneIcon } from '../components/icons';

interface Message {
    role: 'user' | 'model';
    text: string;
}

const ChatPage: React.FC<{ language: 'en' | 'sw' }> = ({ language }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const t = language === 'sw' ? {
        placeholder: "Uliza kuhusu utawala, sheria, au katiba ya Kenya...",
        initial_greeting: "Jambo! Mimi ni msaidizi wako wa masuala ya kiraia kwa KenyaYetu.co.ke. Nikusaidie nini leo kuhusu utawala na sheria za Kenya?",
        error_message: "Samahani, nimepata hitilafu. Tafadhali jaribu tena."
    } : {
        placeholder: "Ask about Kenyan governance, laws, or the constitution...",
        initial_greeting: "Hello! I'm your civic assistant for KenyaYetu.co.ke. How can I help you with Kenyan governance and laws today?",
        error_message: "Sorry, I encountered an error. Please try again."
    };
    
    useEffect(() => {
        if(messages.length === 0 && !isLoading) {
             setMessages([{ role: 'model', text: t.initial_greeting }]);
        }
    }, [language, t.initial_greeting]);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: input,
                config: { 
                    systemInstruction: `You are a specialized assistant for KenyaYetu.co.ke, an interactive explorer for the Constitution of Kenya and related governance information. Your knowledge is strictly limited to the content of the Kenyan Constitution, Kenyan laws, governance structures, national symbols, historical documents, and related external data provided within the app context. Your language preference is ${language === 'sw' ? 'Swahili' : 'English'}. Politely decline to answer any questions outside of this scope, stating that your purpose is to assist with Kenyan civic information only. When providing information, be accurate, concise, and cite constitutional articles or laws where applicable. If you provide links, ensure they are valid and fully-qualified URLs.` 
                }
            });
            const modelText = response.text;
            
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const foundUrls = modelText.match(urlRegex);
            if (foundUrls) {
                addDiscoveredLinks(foundUrls);
            }

            const modelMessage: Message = { role: 'model', text: modelText };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Gemini API Error:", error);
            const errorMessage: Message = { role: 'model', text: t.error_message };
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
                    <h1 className="text-xl font-bold">Civic Assistant</h1>
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
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-light dark:bg-dark-primary-light flex items-center justify-center">
                                <SparklesIcon className="w-5 h-5 text-primary dark:text-dark-primary" />
                            </div>
                        )}
                        <div className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary dark:bg-dark-primary text-white rounded-br-none' : 'bg-surface dark:bg-dark-surface rounded-bl-none custom-shadow'}`}>
                            <p className="text-base whitespace-pre-wrap">{msg.text}</p>
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
                        className="flex-1 block w-full bg-background dark:bg-dark-background border-border dark:border-dark-border rounded-full py-3 px-5 text-on-surface dark:text-dark-on-surface placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        aria-label="Chat input"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="p-3 rounded-full bg-primary text-white disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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