
import React, { useEffect, useState } from 'react';

export const Celebration: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-all duration-1000 transform ${showContent ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} text-center p-8 z-10`}>
      <div className="relative mb-10 group">
        <div className="absolute inset-[-20px] bg-white rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHN5ZnR3bmUxeWVodWlydzFqYmZhc3Z3cXVyMHByMmd6bm42Z3lxZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ZubN39V00G6R0X9o6R/giphy.gif" 
          alt="Happy Celebration" 
          className="w-72 h-72 md:w-96 md:h-96 mx-auto rounded-[3rem] border-[12px] border-white shadow-[0_25px_60px_rgba(255,77,109,0.5)] transform hover:rotate-3 transition-transform"
        />
        <div className="absolute -top-4 -right-4 text-6xl animate-bounce">🍭</div>
        <div className="absolute -bottom-4 -left-4 text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎀</div>
      </div>
      
      <h2 className="text-6xl md:text-8xl font-romantic text-[#ff4d6d] mb-6 drop-shadow-xl animate-pulse">
        Yay! I love you Jarinia! ❤️
      </h2>
      
      <div className="max-w-2xl mx-auto bg-white/40 backdrop-blur-sm p-8 rounded-[2rem] border-2 border-white shadow-inner">
        <p className="text-2xl md:text-3xl font-medium text-gray-700 leading-relaxed italic">
          "You've made me the happiest person in the whole universe! 💫 I'm so lucky to have you as my Valentine."
        </p>
      </div>
      
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        <div className="bg-white px-8 py-4 rounded-full shadow-lg border-2 border-pink-100 animate-bounce flex items-center gap-2">
            <span className="text-2xl">💍</span>
            <span className="text-[#ff4d6d] font-bold text-xl">Forever & Always</span>
        </div>
        <div className="bg-white px-8 py-4 rounded-full shadow-lg border-2 border-pink-100 animate-bounce flex items-center gap-2" style={{ animationDelay: '0.1s' }}>
            <span className="text-2xl">🧁</span>
            <span className="text-[#ff4d6d] font-bold text-xl">Best Day Ever!</span>
        </div>
      </div>
      
      <div className="mt-16 text-pink-400 font-romantic text-3xl opacity-60">
        Muah! 😘❤️✨
      </div>
    </div>
  );
};
