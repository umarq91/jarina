
import React, { useState, useRef } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { Celebration } from './components/Celebration';
import { MouseTrail } from './components/MouseTrail';

const NO_PHRASES = [
  "No",
  "No chance, try again!",
  "You will not escape me! ❤️",
  "Think of the kittens! 🐱",
  "Wait, what? 😮",
  "Is that a typo? 🏹",
  "Nice try, Jarinia! ✨",
  "Hehe, nope! 😜",
  "Wrong button, love! 🎀",
  "Pwease? 🥺",
  "My heart... 💔",
  "Error: Impossible! 🚫",
  "You're too cute to say no! 🥰",
  "Try the pink one! 👉",
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

  const moveNoButton = (e?: React.MouseEvent | React.TouchEvent) => {
    // Prevent default to avoid any unintended click behavior on mobile
    if (e && 'cancelable' in e && e.cancelable) {
      e.preventDefault();
    }
    
    // Calculate movement range based on screen size
    const isMobile = window.innerWidth < 640;
    const moveRangeX = isMobile ? 80 : 120;
    const moveRangeY = isMobile ? 60 : 100;

    // Generate random offsets
    let newX = (Math.random() - 0.5) * moveRangeX * 2.5;
    let newY = (Math.random() - 0.5) * moveRangeY * 2.5;

    // Ensure it doesn't move too little or stay in the same spot
    if (Math.abs(newX - noButtonPos.x) < 50) newX += 60 * (newX > 0 ? 1 : -1);
    if (Math.abs(newY - noButtonPos.y) < 50) newY += 60 * (newY > 0 ? 1 : -1);

    setNoButtonPos({ x: newX, y: newY });
    setNoTextIndex((prev) => (prev + 1) % NO_PHRASES.length);
    setMoveCount((prev) => prev + 1);
  };

  if (accepted) {
    return (
      <div className="min-h-screen bg-[#fff0f3] flex items-center justify-center overflow-hidden relative">
        <FloatingHearts count={45} />
        <MouseTrail />
        <Celebration />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffafbd] via-[#ffc3a0] to-[#ffafbd] flex items-center justify-center p-4 relative overflow-hidden touch-none">
      <FloatingHearts count={30} />
      <MouseTrail />
      
      {/* Decorative floating icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[10%] left-[5%] text-4xl animate-bounce">🍭</div>
        <div className="absolute top-[80%] right-[5%] text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🧁</div>
        <div className="absolute top-[15%] right-[15%] text-3xl animate-pulse">✨</div>
        <div className="absolute bottom-[15%] left-[10%] text-3xl animate-pulse" style={{ animationDelay: '1s' }}>💖</div>
      </div>

      <div 
        ref={containerRef}
        className="max-w-md w-full bg-white/85 backdrop-blur-2xl rounded-[3rem] shadow-[0_30px_70px_rgba(255,77,109,0.4)] p-10 md:p-14 text-center border-4 border-white relative z-10 mx-auto transition-transform"
      >
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-pink-200 blur-3xl rounded-full opacity-40 group-hover:opacity-70 transition-opacity"></div>
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHIybTVqYWVnYmYyb3ZkZjZ6bW96cW9vbmF5bXVqamF3bzh3NmZpNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif" 
            alt="Cute Valentine Cat" 
            className="w-32 h-32 md:w-40 md:h-40 mx-auto relative drop-shadow-xl transform transition-transform group-hover:scale-110 active:scale-95 duration-300"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-romantic text-[#ff4d6d] mb-4 tracking-wide drop-shadow-sm">
          Hey Jarinia,
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-700 mb-10 px-2 leading-tight">
          Will you be my Valentine? 🌹
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[160px]">
          {/* YES BUTTON */}
          <button
            onClick={handleYes}
            className="bg-[#ff4d6d] hover:bg-[#ff758f] active:bg-[#ff4d6d] text-white font-bold py-4 px-12 md:py-5 md:px-14 rounded-full shadow-[0_10px_30px_rgba(255,77,109,0.5)] transform transition-all duration-200 text-2xl z-20 animate-heartbeat flex items-center gap-2 group w-full sm:w-auto"
          >
            <span>Yes!</span>
            <span className="text-3xl transition-transform group-hover:scale-125">💝</span>
          </button>

          {/* NO BUTTON - Now consistently relative but translated to prevent mobile hiding */}
          <button
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            style={{
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
              transition: moveCount > 0 ? 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
            }}
            className="relative bg-white/95 border-2 border-pink-100 text-pink-400 font-bold py-3 px-8 rounded-full shadow-lg text-lg whitespace-nowrap hover:border-pink-300 hover:text-pink-500 transition-colors z-10 touch-manipulation cursor-pointer active:scale-90"
          >
            {NO_PHRASES[noTextIndex]}
          </button>
        </div>
        
        <div className="mt-8 flex justify-center items-center gap-2 text-pink-300 text-sm font-bold uppercase tracking-widest animate-pulse">
          <span className="text-lg">✨</span>
          <span>Only for you</span>
          <span className="text-lg">✨</span>
        </div>
      </div>
    </div>
  );
};

export default App;
