
import React, { useState, useRef, useEffect } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { Celebration } from './components/Celebration';
import { MouseTrail } from './components/MouseTrail';

const NO_PHRASES = [
  "No",
  "Wait, what? 😮",
  "Think of the kittens! 🐱",
  "Is that a typo? ❤️",
  "You're joking, right?",
  "No chance, try again! ✨",
  "You will not escape me! 🏹",
  "I'm catching you! 🏃‍♀️",
  "Oops, missed! 😜",
  "Try the pink button! 👉",
  "Click YES pwease! 🍓",
  "My heart is melting... 🫠",
  "Wrong way, love!",
  "Are you sure? 🥺",
  "I'll wait forever! ⏳",
];

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noTextIndex, setNoTextIndex] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYes = () => {
    setAccepted(true);
  };

  const moveNoButton = () => {
    if (!containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const padding = 80;
    
    // Calculate new random position within the container bounds
    const newX = (Math.random() - 0.5) * (container.width - padding);
    const newY = (Math.random() - 0.5) * (container.height - padding);

    setNoButtonPos({ x: newX, y: newY });
    setNoTextIndex((prev) => (prev + 1) % NO_PHRASES.length);
    setMoveCount((prev) => prev + 1);
  };

  if (accepted) {
    return (
      <div className="min-h-screen bg-[#fff0f3] flex items-center justify-center overflow-hidden relative">
        <FloatingHearts count={40} />
        <MouseTrail />
        <Celebration />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffafbd] via-[#ffc3a0] to-[#ffafbd] flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts count={25} />
      <MouseTrail />
      
      {/* Sparkles Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[20%] animate-pulse">✨</div>
        <div className="absolute top-[80%] left-[10%] animate-bounce">🌸</div>
        <div className="absolute top-[20%] right-[15%] animate-pulse">⭐</div>
        <div className="absolute bottom-[20%] right-[10%] animate-bounce">🎀</div>
      </div>

      <div 
        ref={containerRef}
        className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,77,109,0.3)] p-10 md:p-14 text-center border-4 border-white relative z-10"
      >
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-pink-200 blur-2xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
          <img 
            src="/jarina.jpeg" 
            alt="Cute Valentine Cat" 
            className="w-36 h-36 mx-auto relative drop-shadow-lg transform transition-transform group-hover:scale-110"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-romantic text-[#ff4d6d] mb-4 tracking-wide">
          Hey Jarinia,
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-600 mb-12">
          Will you be my Valentine? 🍭
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative min-h-[140px]">
          {/* YES BUTTON */}
          <button
            onClick={handleYes}
            className="bg-[#ff4d6d] hover:bg-[#ff758f] text-white font-bold py-5 px-14 rounded-full shadow-[0_10px_20px_rgba(255,77,109,0.4)] transform transition-all duration-300 text-2xl z-20 animate-heartbeat flex items-center gap-2"
          >
            <span>Yes!</span>
            <span className="text-3xl">💝</span>
          </button>

          {/* NO BUTTON */}
          <button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            style={{
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
              transition: moveCount > 0 ? 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
            }}
            className="bg-white/80 border-2 border-pink-100 text-pink-400 font-bold py-3 px-8 rounded-full shadow-md text-lg whitespace-nowrap absolute sm:relative hover:border-pink-300 transition-colors"
          >
            {NO_PHRASES[noTextIndex]}
          </button>
        </div>
        
        <div className="mt-8 text-pink-300 text-sm font-medium animate-pulse">
          Click the heart if you love me! ✨
        </div>
      </div>
    </div>
  );
};

export default App;
