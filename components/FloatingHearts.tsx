
import React, { useMemo } from 'react';

interface FloatingHeartsProps {
  count?: number;
}

const SHAPES = ['❤️', '💖', '✨', '🌸', '🍭', '🎀', '💘'];

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 20 }) => {
  const elements = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 6}s`,
      size: `${20 + Math.random() * 30}px`,
      opacity: 0.2 + Math.random() * 0.6,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rotate: `${Math.random() * 360}deg`,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="heart-particle flex items-center justify-center"
          style={{
            left: el.left,
            animationDelay: el.delay,
            animationDuration: el.duration,
            fontSize: el.size,
            opacity: el.opacity,
            transform: `rotate(${el.rotate})`,
          }}
        >
          {el.shape}
        </div>
      ))}
    </div>
  );
};
