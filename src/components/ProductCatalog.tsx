'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Product } from '@/types/product';

// Mock product data
const products: Product[] = [
  {
    id: 1,
    name: 'Spider-Man Holographic',
    category: 'Супергерои',
    price: '2,500 ₽',
    rarity: 'Легендарная',
    image: '/api/placeholder/300/400',
    description: 'Голографическая карточка Человека-паука с уникальными переливами',
  },
  {
    id: 2,
    name: 'Batman Dark Knight',
    category: 'Супергерои',
    price: '3,200 ₽',
    rarity: 'Мифическая',
    image: '/api/placeholder/300/400',
    description: 'Эксклюзивная карточка Бэтмена в темном исполнении',
  },
  {
    id: 3,
    name: 'Ferrari LaFerrari',
    category: 'Автомобили',
    price: '2,800 ₽',
    rarity: 'Легендарная',
    image: '/api/placeholder/300/400',
    description: 'Голографическая карточка легендарного суперкара Ferrari',
  },
  {
    id: 4,
    name: 'Wonder Woman',
    category: 'Супергерои',
    price: '2,400 ₽',
    rarity: 'Редкая',
    image: '/api/placeholder/300/400',
    description: 'Карточка Чудо-женщины с золотистыми голографическими элементами',
  },
  {
    id: 5,
    name: 'Lamborghini Aventador',
    category: 'Автомобили',
    price: '2,600 ₽',
    rarity: 'Легендарная',
    image: '/api/placeholder/300/400',
    description: 'Эксклюзивная карточка Lamborghini с неоновыми переливами',
  },
  {
    id: 6,
    name: 'Iron Man Mark 85',
    category: 'Супергерои',
    price: '3,500 ₽',
    rarity: 'Мифическая',
    image: '/api/placeholder/300/400',
    description: 'Ультра-редкая карточка Железного человека в броне Mark 85',
  },
];

const rarityColors = {
  'Редкая': 'text-green-600',
  'Легендарная': 'text-orange-600',
  'Мифическая': 'text-purple-600',
};

interface ProductCatalogProps {
  onProductSelect: (product: Product) => void;
}

export default function ProductCatalog({ onProductSelect }: ProductCatalogProps) {
  const [filter, setFilter] = useState<string>('Все');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filteredProducts = filter === 'Все'
    ? products
    : products.filter(product => product.category === filter);

  const categories = ['Все', 'Супергерои', 'Автомобили'];

  return (
    <section className="py-20 px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Каталог карточек
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Откройте для себя уникальные коллекционные карточки
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-6 py-2 rounded-lg border transition-colors ${
                  filter === category
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:border-primary'
                }`}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              layout
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setHoveredCard(product.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => onProductSelect(product)}
            >
              <div className="bg-card border border-border rounded-xl overflow-hidden h-full">
                {/* Card Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />

                  {/* Holographic effect hint */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%', rotate: 45 }}
                    animate={{
                      x: hoveredCard === product.id ? '100%' : '-100%',
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-background/80 ${
                      rarityColors[product.rarity as keyof typeof rarityColors]
                    }`}>
                      {product.rarity}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {product.price}
                    </span>
                    <motion.button
                      className="text-primary hover:text-primary/80 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9,18 15,12 9,6" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Hover border effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary rounded-xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredCard === product.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
