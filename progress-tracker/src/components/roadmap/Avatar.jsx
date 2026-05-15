import React from 'react';
import { motion as Motion } from 'framer-motion';

const Avatar = ({ isJumping, isCelebrating }) => {
  return (
    <Motion.svg
      width="60"
      height="80"
      viewBox="0 0 60 80"
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
      {/* Body */}
      <rect x="15" y="30" width="30" height="35" rx="10" fill="#22c55e" className="dark:fill-primary-500" />
      {/* Head */}
      <circle cx="30" cy="20" r="12" fill="#16a34a" className="dark:fill-primary-600" />
      {/* Eyes */}
      <circle cx="26" cy="18" r="2" fill="white" />
      <circle cx="34" cy="18" r="2" fill="white" />
      {/* Backpack (Student vibe) */}
      <rect x="10" y="35" width="10" height="20" rx="4" fill="#14532d" className="dark:fill-primary-900" />
      {/* Cap */}
      <path d="M 18 15 Q 30 5 42 15" fill="none" stroke="#14532d" strokeWidth="4" strokeLinecap="round" className="dark:stroke-primary-900" />
      {/* Legs */}
      <Motion.line 
        x1="22" y1="65" x2="22" y2="75" 
        stroke="#22c55e" strokeWidth="4" strokeLinecap="round"
        className="dark:stroke-primary-500"
        animate={{ y2: isJumping ? [75, 70, 75] : 75 }}
      />
      <Motion.line 
        x1="38" y1="65" x2="38" y2="75" 
        stroke="#22c55e" strokeWidth="4" strokeLinecap="round"
        className="dark:stroke-primary-500"
        animate={{ y2: isJumping ? [75, 70, 75] : 75 }}
      />
    </Motion.svg>
  );
};

export default Avatar;
