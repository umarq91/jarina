
import React, { useEffect, useState } from 'react';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const MouseTrail: React.FC = () => {
  const [points, setPoints] = useState<TrailPoint[]>([]);

  useEffect(() => {
    let id = 0;
    
    const addPoint = (x: number, y: number) => {
      const newPoint = {
        id: id++,
        x,
        y,
        size: Math.random() * 15 + 10,
        opacity: 1,
      };
      setPoints((prev) => [...prev.slice(-20), newPoint]);
    };

    const handleMouseMove = (e: MouseEvent) => {
      addPoint(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        addPoint(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    const interval = setInterval(() => {
      setPoints((prev) => 
        prev
          .map(p => ({ ...p, opacity: p.opacity - 0.08 }))
          .filter(p => p.opacity > 0)
      );
    }, 40);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {points.map((p) => (
        <div
          key={p.id}
          className="absolute text-rose-400 select-none pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%) scale(' + (0.5 + p.opacity * 0.5) + ')',
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};
