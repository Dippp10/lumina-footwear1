
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import StyleAssistant from './components/StyleAssistant';
import Cart from './components/Cart';
import GithubSync from './components/GithubSync';
import Dashboard from './components/Dashboard';
import { SHOE_CATALOG } from './constants';
import { Shoe, CartItem } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'store' | 'dashboard'>('store');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [projectFiles, setProjectFiles] = useState<{path: string, content: string}[]>([]);

  const cartCount = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0), 
    [cartItems]
  );

  const handleAddToCart = (shoe: Shoe) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === shoe.id);
      if (existing) {
        return prev.map(item => 
          item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...shoe, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  // Logic to "collect" files for sync
  useEffect(() => {
    const fetchFiles = async () => {
      const paths = [
        'index.html', 'index.tsx', 'App.tsx', 'types.ts', 'constants.tsx', 
        'metadata.json', 'services/geminiService.ts', 'services/githubService.ts',
        'components/Navbar.tsx', 'components/Hero.tsx', 'components/ProductGrid.tsx',
        'components/StyleAssistant.tsx', 'components/Cart.tsx', 'components/Dashboard.tsx',
        'components/GithubSync.tsx'
      ];
      
      const files = await Promise.all(paths.map(async path => {
        try {
          const response = await fetch(path);
          const content = await response.text();
          return { path, content };
        } catch (e) {
          return null;
        }
      }));
      
      setProjectFiles(files.filter(f => f !== null) as {path: string, content: string}[]);
    };
    
    fetchFiles();
  }, [currentView, isSyncOpen]); // Refresh file list periodically

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        onSyncClick={() => setIsSyncOpen(true)}
        onDashboardClick={() => setCurrentView(currentView === 'store' ? 'dashboard' : 'store')}
        cartCount={cartCount}
        currentView={currentView}
        onBrandClick={() => setCurrentView('store')}
      />

      <main className="animate-fade-in">
        {currentView === 'store' ? (
          <>
            <Hero />
            <ProductGrid products={SHOE_CATALOG} onAddToCart={handleAddToCart} />
            <StyleAssistant />
            <footer className="bg-stone-900 text-stone-400 py-12 px-4">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-white font-serif font-bold text-xl mb-4 md:mb-0">LUMINA</div>
                <div className="flex space-x-8 text-xs uppercase tracking-widest">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
                  <button 
                    onClick={() => setCurrentView('dashboard')}
                    className="hover:text-white transition-colors"
                  >
                    Admin Dashboard
                  </button>
                </div>
              </div>
            </footer>
          </>
        ) : (
          <Dashboard />
        )}
      </main>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <GithubSync 
        isOpen={isSyncOpen} 
        onClose={() => setIsSyncOpen(false)} 
        projectFiles={projectFiles}
      />
    </div>
  );
};

export default App;
