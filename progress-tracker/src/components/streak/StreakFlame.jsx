import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const StreakFlame = ({ count }) => {
  const isActive = count > 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {isActive && (
          <Motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="absolute inset-0 bg-accent/40 blur-xl rounded-full"
          />
        )}
        <Motion.div
          animate={isActive ? {
            rotate: [-2, 2, -2],
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
          className={`
            relative p-4 rounded-3xl z-10
            ${isActive 
              ? 'bg-accent text-white shadow-xl shadow-accent/40' 
              : 'bg-slate-100 dark:bg-surface-800 text-slate-400'}
          `}
        >
          <Flame size={32} fill={isActive ? 'currentColor' : 'none'} />
        </Motion.div>
      </div>
      <div className="mt-3 text-center">
        <p className={`text-2xl font-black ${isActive ? 'text-accent' : 'text-slate-400'}`}>
          {count} <span className="text-[10px] uppercase tracking-widest font-black">Days</span>
        </p>
      </div>
    </div>
  );
};

export default StreakFlame;
