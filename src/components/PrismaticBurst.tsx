import { useEffect, useRef } from 'react';
import './PrismaticBurst.css';

// Простая CSS-анимация для голографического эффекта
const PrismaticBurst = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Создаем анимированные элементы для голографического эффекта
    const rays = [];
    for (let i = 0; i < 12; i++) {
      const ray = document.createElement('div');
      ray.className = 'prismatic-ray';
      ray.style.setProperty('--ray-index', i.toString());
      container.appendChild(ray);
      rays.push(ray);
    }

    return () => {
      rays.forEach(ray => {
        if (container.contains(ray)) {
          container.removeChild(ray);
        }
      });
    };
  }, []);

  return <div className="prismatic-burst-container" ref={containerRef} />;
};

export default PrismaticBurst;
