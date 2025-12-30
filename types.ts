
export type ShoeCategory = 'Sneakers' | 'Formal' | 'Boots' | 'Heels' | 'Casual';

export interface Shoe {
  id: string;
  name: string;
  price: number;
  category: ShoeCategory;
  description: string;
  image: string;
  colors: string[];
}

export interface CartItem extends Shoe {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
