
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[90vh] overflow-hidden bg-stone-900">
      <img 
        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop" 
        alt="Hero Footwear" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <span className="text-stone-300 uppercase tracking-[0.3em] text-sm mb-4 animate-fade-in">Lumina Footwear</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Elegance in <br /> Every Step
        </h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <a 
            href="#shop" 
            className="px-10 py-4 bg-white text-stone-900 font-medium tracking-wider uppercase text-sm hover:bg-stone-100 transition-all"
          >
            Shop Collection
          </a>
          <a 
            href="#concierge" 
            className="px-10 py-4 border border-white text-white font-medium tracking-wider uppercase text-sm hover:bg-white hover:text-stone-900 transition-all"
          >
            Style Concierge
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
