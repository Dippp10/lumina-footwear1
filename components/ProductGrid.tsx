
import React from 'react';
import { Shoe } from '../types';

interface ProductGridProps {
  products: Shoe[];
  onAddToCart: (shoe: Shoe) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div id="shop" className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl font-serif font-bold mb-2">The Collection</h2>
          <p className="text-stone-500 max-w-md">Curated footwear designed for longevity, comfort, and timeless aesthetic.</p>
        </div>
        <div className="mt-6 md:mt-0 flex space-x-4 overflow-x-auto pb-4 md:pb-0">
          {['All', 'Sneakers', 'Formal', 'Boots', 'Casual'].map(cat => (
            <button key={cat} className="whitespace-nowrap text-sm uppercase tracking-widest px-4 py-2 border border-stone-200 hover:border-stone-900 transition-all">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((shoe) => (
          <div key={shoe.id} className="group relative">
            <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-4">
              <img 
                src={shoe.image} 
                alt={shoe.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <button 
                onClick={() => onAddToCart(shoe)}
                className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm py-3 text-sm font-medium uppercase tracking-widest text-stone-900 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
              >
                Add to Bag
              </button>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-stone-900 group-hover:text-stone-600 transition-colors">{shoe.name}</h3>
                <p className="text-sm text-stone-400 mt-1">{shoe.category}</p>
              </div>
              <p className="font-medium">${shoe.price}</p>
            </div>
            <div className="flex mt-3 space-x-2">
              {shoe.colors.map(color => (
                <div key={color} className="w-3 h-3 rounded-full border border-stone-200" title={color} style={{ backgroundColor: color.toLowerCase() }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
