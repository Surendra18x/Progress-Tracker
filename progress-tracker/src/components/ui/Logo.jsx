import React from 'react';

const Logo = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <rect width="100" height="100" rx="24" fill="currentColor" />
      <path 
        d="M30 50L45 65L70 35" 
        stroke="white" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle cx="70" cy="35" r="4" fill="#f59e0b" />
      <path 
        d="M25 75C25 75 40 80 50 80C60 80 75 75 75 75" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        opacity="0.5"
      />
    </svg>
  );
};

export default Logo;
