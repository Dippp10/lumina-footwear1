
import React from 'react';

interface NavbarProps {
  onCartClick: () => void;
  onSyncClick: () => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, onSyncClick, cartCount }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <a href="#" className="text-2xl font-serif font-bold tracking-tighter">LUMINA</a>
          <div className="hidden md:flex space-x-6 text-sm font-medium uppercase tracking-widest text-stone-500">
            <a href="#shop" className="hover:text-stone-900 transition-colors">Shop</a>
            <a href="#collections" className="hover:text-stone-900 transition-colors">Collections</a>
            <a href="#concierge" className="hover:text-stone-900 transition-colors">Concierge</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={onSyncClick}
            className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400 hover:text-stone-900"
            title="Sync to GitHub"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </button>
          <button 
            onClick={onCartClick}
            className="relative p-2 hover:bg-stone-50 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-stone-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
