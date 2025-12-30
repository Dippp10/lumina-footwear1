
import React from 'react';

interface NavbarProps {
  onCartClick: () => void;
  onSyncClick: () => void;
  onDashboardClick: () => void;
  onBrandClick: () => void;
  cartCount: number;
  currentView: 'store' | 'dashboard';
}

const Navbar: React.FC<NavbarProps> = ({ 
  onCartClick, 
  onSyncClick, 
  onDashboardClick, 
  onBrandClick,
  cartCount, 
  currentView 
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <button 
            onClick={onBrandClick}
            className="text-2xl font-serif font-bold tracking-tighter hover:opacity-70 transition-all duration-300 active:scale-95"
          >
            LUMINA
          </button>
          <div className="hidden lg:flex items-center space-x-8 text-[11px] font-bold uppercase tracking-[0.25em] text-stone-400">
            <button 
              onClick={onBrandClick} 
              className={`hover:text-stone-900 transition-colors relative py-1 ${
                currentView === 'store' ? 'text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900' : ''
              }`}
            >
              The Collection
            </button>
            <button 
              onClick={onDashboardClick}
              className={`hover:text-stone-900 transition-colors relative py-1 ${
                currentView === 'dashboard' ? 'text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900' : ''
              }`}
            >
              Management
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <button 
            onClick={onSyncClick}
            className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-50 rounded-full transition-all duration-300"
            title="Deploy to GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </button>
          
          <button 
            onClick={onCartClick}
            className="group relative p-2 text-stone-900 hover:bg-stone-50 rounded-full transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-stone-900 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
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
