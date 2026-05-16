import React from 'react';
import { motion as Motion } from 'framer-motion';

const Avatar = ({ isJumping, isCelebrating }) => {
  return (
    <Motion.div
      className="relative w-12 h-12"
      animate={isCelebrating ? {
        y: [0, -40, 0],
        rotate: [0, 360],
        scale: [1, 1.2, 1]
      } : isJumping ? {
        y: [0, -25, 0],
        rotate: [0, 5, -5, 0],
        scaleX: [1, 0.9, 1.1, 1]
      } : {
        y: [0, -5, 0],
        scaleY: [1, 0.95, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: isCelebrating ? 0.6 : 0.8,
        ease: "easeInOut"
      }}
    >
      <div className="w-full h-full rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-primary-500">
        <img 
          src="/avatar.png" 
          alt="Avatar" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://ui-avatars.com/api/?name=Commander&background=22c55e&color=fff";
          }}
        />
      </div>
      {/* Decorative pulse effect */}
      <Motion.div 
        className="absolute -inset-2 bg-primary-500/20 rounded-3xl -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </Motion.div>
  );
};

export default Avatar;
