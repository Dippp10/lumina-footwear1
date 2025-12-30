
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import StyleAssistant from './components/StyleAssistant';
import Cart from './components/Cart';
import GithubSync from './components/GithubSync';
import { SHOE_CATALOG } from './constants';
import { Shoe, CartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSyncOpen, setIsSyncOpen] = useState(false);

  const handleAddToCart = (shoe: Shoe) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === shoe.id);
      if (existing) {
        return prev.map(item => item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item);
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
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Prepare file snapshot for GitHub Sync
  const projectFiles = [
    { path: 'index.html', content: document.documentElement.outerHTML },
    { path: 'metadata.json', content: JSON.stringify({ name: "LUMINA Footwear", description: "AI-powered shoe brand", requestFramePermissions: ["camera"] }, null, 2) },
    // In a real environment, we'd fetch these from the source. 
    // Here we provide paths as placeholders for the sync tool.
  ];

  return (
    <div className="min-h-screen">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        onSyncClick={() => setIsSyncOpen(true)}
        cartCount={cartCount} 
      />
      
      <main>
        <Hero />
        <ProductGrid products={SHOE_CATALOG} onAddToCart={handleAddToCart} />
        <StyleAssistant />
        
        {/* Collections Spotlight */}
        <section id="collections" className="py-24 border-t border-stone-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative aspect-[16/9] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1512374382149-4332c6c0210e?q=80&w=1964&auto=format&fit=crop" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt="Sneaker Collection" 
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-3xl font-serif italic mb-2">The Urban Series</h3>
                    <p className="uppercase tracking-[0.2em] text-xs">Explore Now</p>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[16/9] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=2071&auto=format&fit=crop" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt="Formal Collection" 
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-3xl font-serif italic mb-2">Heritage Classics</h3>
                    <p className="uppercase tracking-[0.2em] text-xs">Explore Now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-stone-900 text-stone-400 py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl font-serif font-bold text-white mb-6">LUMINA</h2>
              <p className="max-w-xs mb-8">Crafting the world's most elegant footwear since 2024. Sustainably sourced, meticulously hand-crafted.</p>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Pinterest</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
            <div>
              <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Customer Care</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li>concierge@lumina-footwear.com</li>
                <li>+1 (800) LUMINA-1</li>
                <li>123 Atelier Way, Paris</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 pt-16 mt-16 border-t border-stone-800 text-[10px] uppercase tracking-widest text-center">
            &copy; 2024 LUMINA FOOTWEAR. ALL RIGHTS RESERVED.
          </div>
        </footer>
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
