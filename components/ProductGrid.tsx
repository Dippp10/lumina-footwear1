
import React from 'react';
import { Shoe, ShoeCategory } from '../types';

interface ProductGridProps {
  products: Shoe[];
  onAddToCart: (shoe: Shoe) => void;
  activeCategory: ShoeCategory | 'All';
  onCategoryChange: (category: ShoeCategory | 'All') => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, activeCategory, onCategoryChange }) => {
  const categories: (ShoeCategory | 'All')[] = ['All', 'Sneakers', 'Formal', 'Boots', 'Casual', 'Heels'];

  return (
    <div id="shop" className="max-w-7xl mx-auto px-4 py-24 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif font-bold mb-4">The Collection</h2>
          <p className="text-stone-500 max-w-md">Curated footwear designed for longevity, comfort, and timeless aesthetic. Each pair is handcrafted with precision.</p>
        </div>
        <div className="mt-8 md:mt-0 flex space-x-2 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => onCategoryChange(cat)}
              className={`whitespace-nowrap text-[10px] uppercase tracking-[0.2em] px-6 py-3 border transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-stone-900 border-stone-900 text-white' 
                  : 'border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-stone-200 rounded-3xl">
          <p className="text-stone-400 uppercase tracking-widest text-xs">No pieces currently in this category</p>
          <button 
            onClick={() => onCategoryChange('All')}
            className="mt-4 text-stone-900 font-medium underline text-sm"
          >
            View Entire Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((shoe) => (
            <div key={shoe.id} className="group relative animate-fade-in">
              <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-6 relative">
                <img 
                  src={shoe.image} 
                  alt={shoe.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500" />
                <button 
                  onClick={() => onAddToCart(shoe)}
                  className="absolute bottom-6 left-6 right-6 bg-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl"
                >
                  Add to Bag
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-stone-900 text-lg">{shoe.name}</h3>
                  <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">{shoe.category}</p>
                </div>
                <p className="font-bold text-stone-900">${shoe.price}</p>
              </div>
              <div className="flex mt-4 space-x-2">
                {shoe.colors.map(color => (
                  <div 
                    key={color} 
                    className="w-4 h-4 rounded-full border border-stone-100 shadow-sm" 
                    title={color} 
                    style={{ backgroundColor: color.toLowerCase().replace(' ', '') }} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
