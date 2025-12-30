
import React, { useState, useRef } from 'react';
import { getStyleAdvice, analyzeOutfitImage } from '../services/geminiService';
import { ChatMessage } from '../types';

const StyleAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Lumina. I am your personal Style Concierge. Describe your outfit or occasion, and I'll find the perfect footwear for you." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const response = await getStyleAdvice(userText);
    setMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    setIsLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setMessages(prev => [...prev, { role: 'user', text: "[Uploaded an image of an outfit]" }]);
      setIsLoading(true);
      const advice = await analyzeOutfitImage(base64);
      setMessages(prev => [...prev, { role: 'model', text: advice || '' }]);
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="concierge" className="bg-stone-100 py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">Style Concierge</h2>
          <p className="text-stone-500">Personalized recommendations powered by Gemini AI.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[600px] border border-stone-200">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-stone-900 text-stone-50' 
                    : 'bg-stone-50 text-stone-800 border border-stone-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4 text-sm flex space-x-2">
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-stone-100 bg-stone-50">
            <form onSubmit={handleSubmit} className="relative flex space-x-2">
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
                title="Upload outfit photo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*"
              />
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your outfit or the event..."
                className="flex-1 px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
              />
              <button 
                type="submit"
                className="bg-stone-900 text-white px-6 rounded-xl hover:bg-stone-800 transition-colors font-medium text-sm disabled:opacity-50"
                disabled={isLoading}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StyleAssistant;
