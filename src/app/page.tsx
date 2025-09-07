'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import ProductCatalog from '@/components/ProductCatalog';
import ProductDetail from '@/components/ProductDetail';
import { Product } from '@/types/product';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Transform hero section based on scroll
  const heroScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const heroMargin = useTransform(scrollY, [0, 100], [0, 40]);
  const heroBorderRadius = useTransform(scrollY, [0, 100], [0, 12]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 10 && !hasScrolled) {
        setHasScrolled(true);
      } else if (latest <= 10 && hasScrolled) {
        setHasScrolled(false);
      }
    });

    return () => unsubscribe();
  }, [scrollY, hasScrolled]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <motion.div
        style={{
          scale: heroScale,
          marginLeft: heroMargin,
          marginRight: heroMargin,
          marginTop: hasScrolled ? heroMargin : 0,
          borderRadius: heroBorderRadius,
        }}
        className="sticky top-0 z-10 overflow-hidden"
      >
        <HeroSection />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 bg-background">
        <CategoriesSection />
        <ProductCatalog onProductSelect={setSelectedProduct} />
      </div>

      {/* Product Detail Overlay */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
