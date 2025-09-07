export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  rarity: 'Редкая' | 'Легендарная' | 'Мифическая';
  image: string;
  description: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  count: string;
  image: string;
  gradient: string;
}
