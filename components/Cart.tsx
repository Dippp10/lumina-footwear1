
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-fade-in transition-transform">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold uppercase tracking-widest">Your Bag</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-stone-400 uppercase tracking-widest text-sm">Your bag is empty</p>
              <button onClick={onClose} className="mt-4 text-stone-900 font-medium underline">Start Shopping</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex space-x-4">
                <div className="w-24 h-24 bg-stone-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <button onClick={() => onRemove(item.id)} className="text-stone-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-stone-400 mt-1">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-6 h-6 border border-stone-200 flex items-center justify-center text-xs">-</button>
                    <span className="text-xs font-medium">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-6 h-6 border border-stone-200 flex items-center justify-center text-xs">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-stone-100 bg-stone-50">
          <div className="flex justify-between mb-4">
            <span className="uppercase tracking-widest text-xs text-stone-500">Subtotal</span>
            <span className="font-bold">${total}</span>
          </div>
          <button className="w-full bg-stone-900 text-white py-4 uppercase tracking-widest font-medium text-sm hover:bg-stone-800 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
