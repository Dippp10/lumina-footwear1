
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import StyleAssistant from './components/StyleAssistant';
import Cart from './components/Cart';
import GithubSync from './components/GithubSync';
import Dashboard from './components/Dashboard';
import { SHOE_CATALOG } from './constants';
import { Shoe, CartItem, ShoeCategory } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'store' | 'dashboard'>('store');
  const [selectedCategory, setSelectedCategory] = useState<ShoeCategory | 'All'>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [projectFiles, setProjectFiles] = useState<{path: string, content: string}[]>([]);

  const cartCount = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0), 
    [cartItems]
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return SHOE_CATALOG;
    return SHOE_CATALOG.filter(shoe => shoe.category === selectedCategory);
  }, [selectedCategory]);

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

  // Logic to collect project files for the GitHub Sync utility
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
          if (!response.ok) return null;
          const content = await response.text();
          return { path, content };
        } catch (e) {
          return null;
        }
      }));
      
      setProjectFiles(files.filter(f => f !== null) as {path: string, content: string}[]);
    };
    
    fetchFiles();
  }, [currentView, isSyncOpen]);

  // Smooth scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-stone-900 selection:text-white">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        onSyncClick={() => setIsSyncOpen(true)}
        onDashboardClick={() => setCurrentView(prev => prev === 'store' ? 'dashboard' : 'store')}
        cartCount={cartCount}
        currentView={currentView}
        onBrandClick={() => {
          setCurrentView('store');
          setSelectedCategory('All');
        }}
      />

      <main className="animate-fade-in">
        {currentView === 'store' ? (
          <>
            <Hero />
            <ProductGrid 
              products={filteredProducts} 
              onAddToCart={handleAddToCart}
              activeCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <StyleAssistant />
            <footer className="bg-stone-900 text-stone-400 py-20 px-4">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start border-b border-stone-800 pb-16">
                <div className="mb-12 md:mb-0">
                  <div className="text-white font-serif font-bold text-3xl tracking-tighter mb-4">LUMINA</div>
                  <p className="max-w-xs text-sm leading-relaxed text-stone-500">
                    Redefining luxury footwear with a commitment to timeless design and exceptional craftsmanship.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 md:gap-24 text-xs uppercase tracking-[0.2em]">
                  <div className="flex flex-col space-y-5">
                    <span className="text-stone-600 font-bold">Shop</span>
                    <button onClick={() => {setSelectedCategory('Sneakers'); document.getElementById('shop')?.scrollIntoView({behavior: 'smooth'})}} className="hover:text-white text-left transition-colors">Sneakers</button>
                    <button onClick={() => {setSelectedCategory('Formal'); document.getElementById('shop')?.scrollIntoView({behavior: 'smooth'})}} className="hover:text-white text-left transition-colors">Formal</button>
                    <button onClick={() => {setSelectedCategory('Boots'); document.getElementById('shop')?.scrollIntoView({behavior: 'smooth'})}} className="hover:text-white text-left transition-colors">Boots</button>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <span className="text-stone-600 font-bold">Company</span>
                    <a href="#" className="hover:text-white transition-colors">Our Story</a>
                    <a href="#" className="hover:text-white transition-colors">Artisans</a>
                    <a href="#" className="hover:text-white transition-colors">Legal</a>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <span className="text-stone-600 font-bold">Connect</span>
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Concierge</a>
                    <button 
                      onClick={() => setCurrentView('dashboard')}
                      className="hover:text-white text-left transition-colors font-bold text-stone-300"
                    >
                      Admin
                    </button>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-stone-600">
                <p>&copy; 2024 LUMINA FOOTWEAR. CRAFTED FOR EXCELLENCE.</p>
                <div className="flex space-x-10 mt-6 md:mt-0">
                  <a href="#" className="hover:text-stone-400 transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-stone-400 transition-colors">Accessibility</a>
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
