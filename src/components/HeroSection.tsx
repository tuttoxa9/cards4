'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PrismaticBurst from './PrismaticBurst';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-foreground mb-4">
            Коллекционные Карточки
          </h1>
          <p className="text-xl text-muted-foreground">
            Эксклюзивная коллекция с голографическими эффектами
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-background overflow-hidden">
      {/* Prismatic Burst Background */}
      <div className="absolute inset-0">
        <PrismaticBurst />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-background/40 to-background/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Коллекционные
            <br />
            <span className="text-primary">Карточки</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Эксклюзивная коллекция с голографическими эффектами
            <br />
            Супергерои и легендарные автомобили
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <p className="text-sm text-muted-foreground mt-2">Прокрутите вниз</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
