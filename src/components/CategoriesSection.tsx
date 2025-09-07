'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const categories = [
  {
    id: 'superheroes',
    title: 'Супергерои',
    description: 'Коллекционные карточки с любимыми супергероями',
    count: '24 карточки',
    image: '/api/placeholder/400/300',
    gradient: 'from-blue-500/20 to-purple-500/20'
  },
  {
    id: 'cars',
    title: 'Автомобили',
    description: 'Легендарные и спортивные автомобили',
    count: '18 карточек',
    image: '/api/placeholder/400/300',
    gradient: 'from-red-500/20 to-orange-500/20'
  }
];

export default function CategoriesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="py-20 px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Выберите категорию
          </h2>
          <p className="text-lg text-muted-foreground">
            Откройте для себя уникальные коллекции
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setSelectedCategory(category.id)}
              onHoverEnd={() => setSelectedCategory(null)}
            >
              <div className="relative h-80 border border-border rounded-xl overflow-hidden bg-card">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
                  <motion.div
                    className="absolute inset-0 bg-primary/5"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: selectedCategory === category.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0.8 }}
                    animate={{
                      y: selectedCategory === category.id ? 0 : 20,
                      opacity: selectedCategory === category.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        {category.count}
                      </span>
                      <motion.div
                        className="flex items-center text-primary"
                        animate={{
                          x: selectedCategory === category.id ? 8 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-sm font-medium mr-2">
                          Смотреть
                        </span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9,18 15,12 9,6" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Hover border effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: selectedCategory === category.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
