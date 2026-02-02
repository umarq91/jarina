
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
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 15 + 10,
        opacity: 1,
      };
      setPoints((prev) => [...prev.slice(-15), newPoint]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const interval = setInterval(() => {
      setPoints((prev) => 
        prev
          .map(p => ({ ...p, opacity: p.opacity - 0.05 }))
          .filter(p => p.opacity > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {points.map((p) => (
        <div
          key={p.id}
          className="absolute text-rose-400 select-none transition-transform"
          style={{
            left: p.x,
            top: p.y,
            fontSize: p.size,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};
