import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Timer, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const FocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' | 'break'

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setTimeout(() => {
        setIsActive(false);
        // Toggle mode
        if (mode === 'work') {
          setMode('break');
          setTimeLeft(5 * 60);
        } else {
          setMode('work');
          setTimeLeft(25 * 60);
        }
      }, 0);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (mode === 'work' ? 25 * 60 : 5 * 60)) * 100;

  return (
    <div className="bg-white dark:bg-surface-800 p-8 rounded-[2.5rem] border border-surface-100 dark:border-surface-700 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <Timer size={14} /> Focus Session
        </h3>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${mode === 'work' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-500' : 'bg-accent/10 text-accent'}`}>
          {mode}
        </div>
      </div>

      <div className="relative w-48 h-48 mx-auto mb-10">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-slate-100 dark:stroke-surface-700 fill-none"
            strokeWidth="8"
          />
          <Motion.circle
            cx="96"
            cy="96"
            r="88"
            className={`fill-none ${mode === 'work' ? 'stroke-primary-500' : 'stroke-accent'}`}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDasharray: "553", strokeDashoffset: "0" }}
            animate={{ strokeDashoffset: (553 - (553 * progress) / 100).toString() }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">
            {formatTime(timeLeft)}
          </span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
            Remaining
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={resetTimer}
          className="p-4 bg-slate-50 dark:bg-surface-900 text-slate-400 rounded-2xl hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
        <button
          onClick={toggleTimer}
          className={`
            p-6 rounded-[2rem] shadow-xl transition-all active:scale-95
            ${isActive 
              ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-800 shadow-slate-200/50' 
              : 'bg-primary-500 text-white shadow-primary-500/20'}
          `}
        >
          {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
        </button>
        <div className="p-4 w-14" /> {/* Spacer */}
      </div>
    </div>
  );
};

export default FocusTimer;
