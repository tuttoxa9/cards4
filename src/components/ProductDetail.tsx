'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import InteractiveCard from './InteractiveCard';
import { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Match animation duration
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-background z-50"
        initial={{ x: '100%' }}
        animate={{ x: isClosing ? '100%' : 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header with back button */}
        <div className="absolute top-8 left-8 z-10">
          <motion.button
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            onClick={handleClose}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
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
              <polyline points="15,18 9,12 15,6" />
            </svg>
            <span className="font-medium">Назад</span>
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="h-full flex">
          {/* Left Column - Interactive Card */}
          <div className="w-3/5 flex items-center justify-center p-8">
            <motion.div
              className="max-w-md w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <InteractiveCard product={product} />
            </motion.div>
          </div>

          {/* Right Column - Product Info */}
          <div className="w-2/5 p-8 pt-20 border-l border-border">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Product Title */}
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Category & Rarity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {product.rarity}
                </span>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Characteristics */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-foreground">
                  Характеристики
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Редкость</span>
                    <span className="font-medium text-foreground">{product.rarity}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Категория</span>
                    <span className="font-medium text-foreground">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Голограмма</span>
                    <span className="font-medium text-foreground">Да</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Состояние</span>
                    <span className="font-medium text-foreground">Mint</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-3xl font-bold text-primary">
                  {product.price}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <motion.button
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Добавить в корзину
                </motion.button>

                <motion.button
                  className="w-full border border-border text-foreground py-4 rounded-xl font-semibold text-lg hover:border-primary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Добавить в избранное
                </motion.button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-muted/50 rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">
                  Информация о доставке
                </h4>
                <p className="text-sm text-muted-foreground">
                  Бесплатная доставка от 5,000 ₽. Доставка в течение 3-5 рабочих дней.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
