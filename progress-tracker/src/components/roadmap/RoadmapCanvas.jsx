import React, { useEffect, useMemo } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, Trophy, Cloud, Book, Code, PenTool, GraduationCap } from 'lucide-react';
import Avatar from './Avatar';

const RoadmapCanvas = ({ tasks }) => {
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const completedCount = completedTasks.length;
  const totalTasks = tasks.length;
  
  useEffect(() => {
    if (totalTasks > 0 && completedCount === totalTasks) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#16a34a', '#4ade80']
      });
    }
  }, [completedCount, totalTasks]);

  const width = 800;
  const height = 220;
  const padding = 70;
  const roadWidth = width - padding * 2;
  
  const numPositions = totalTasks + 1;
  
  const points = useMemo(() => {
    const getPointPosition = (index) => {
      const x = padding + (index / (numPositions - 1)) * roadWidth;
      const y = height / 2 + Math.sin((index / (numPositions - 1)) * Math.PI * 2) * 45;
      return { x, y };
    };

    const p = [];
    for (let i = 0; i < numPositions; i++) {
      p.push(getPointPosition(i));
    }
    return p;
  }, [numPositions, roadWidth, padding, height]);

  if (totalTasks === 0) return null;

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i-1];
    const curr = points[i];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    pathD += ` Q ${cp1x} ${prev.y} ${curr.x} ${curr.y}`;
  }

  const avatarPos = points[completedCount];

  const getTaskIcon = (task) => {
    const text = (task.title || '').toLowerCase();
    if (text.includes('read') || text.includes('book') || text.includes('study')) return <Book size={14} />;
    if (text.includes('code') || text.includes('dev') || text.includes('build')) return <Code size={14} />;
    if (text.includes('write') || text.includes('exam') || text.includes('test')) return <PenTool size={14} />;
    return <Star size={14} />;
  };

  return (
    <div className="w-full transition-colors duration-500">
      {/* Desktop Horizontal RoadMap */}
      <div className="hidden md:flex w-full py-12 justify-center bg-white/50 dark:bg-surface-900/50 backdrop-blur-md rounded-[3rem] shadow-2xl my-8 border border-surface-100 dark:border-surface-800 relative overflow-hidden group">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Motion.div animate={{ x: [-20, 20, -20] }} transition={{ repeat: Infinity, duration: 15 }} className="absolute top-8 left-[10%] opacity-30"><Cloud size={64} className="text-slate-200 dark:text-surface-800" /></Motion.div>
          <Motion.div animate={{ x: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 12 }} className="absolute top-16 right-[15%] opacity-20"><Cloud size={48} className="text-slate-200 dark:text-surface-800" /></Motion.div>
        </div>

        <div className="relative z-10 w-full max-w-4xl px-4">
          <div style={{ width: '100%', height: 'auto', aspectRatio: '800/220' }}>
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="drop-shadow-2xl overflow-visible">
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f8fafc" className="dark:stop-color-surface-800" />
                  <stop offset="50%" stopColor="#f1f5f9" className="dark:stop-color-surface-700" />
                  <stop offset="100%" stopColor="#f8fafc" className="dark:stop-color-surface-800" />
                </linearGradient>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>

              <path d={pathD} fill="none" stroke="url(#roadGradient)" strokeWidth="32" strokeLinecap="round" />
              <Motion.path
                d={pathD}
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="24"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: completedCount / (numPositions - 1) }}
                transition={{ duration: 1.5, ease: "circOut" }}
              />

              {points.map((p, i) => {
                if (i === 0) return null;
                const taskIndex = i - 1;
                const task = tasks[taskIndex];
                const isCompleted = task.status === 'completed';
                const isCurrent = taskIndex === completedCount;

                return (
                  <g key={i}>
                    {isCurrent && (
                      <Motion.circle
                        cx={p.x} cy={p.y} r="28"
                        fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4,4"
                        animate={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                      />
                    )}
                    <Motion.circle
                      cx={p.x} cy={p.y} r={isCurrent ? "22" : "18"}
                      fill={isCompleted ? "#22c55e" : "white"}
                      className="dark:fill-surface-800"
                      stroke={isCompleted ? "#dcfce7" : "#f1f5f9"}
                      strokeWidth="4"
                      animate={{ scale: isCurrent ? [1, 1.1, 1] : 1 }}
                      transition={{ repeat: isCurrent ? Infinity : 0, duration: 2 }}
                    />
                    <foreignObject x={p.x - 11} y={p.y - 11} width="22" height="22">
                      <div className={`flex items-center justify-center w-full h-full ${isCompleted ? 'text-white' : 'text-slate-400'}`}>
                        {getTaskIcon(task)}
                      </div>
                    </foreignObject>
                    <text x={p.x} y={p.y + 45} textAnchor="middle" className={`text-[11px] font-black uppercase tracking-widest ${isCompleted ? 'fill-primary-600 dark:fill-primary-400' : 'fill-slate-400 dark:fill-slate-600'}`}>
                      {task.title.substring(0, 10)}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="absolute inset-0 pointer-events-none">
              <Motion.div
                className="absolute"
                initial={false}
                animate={{ 
                  left: `${(avatarPos.x / width) * 100}%`, 
                  top: `${(avatarPos.y / height) * 100}%` 
                }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                style={{ transform: 'translate(-50%, -105%)' }}
              >
                <Avatar isJumping={completedCount < totalTasks} isCelebrating={completedCount === totalTasks} />
              </Motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Vertical RoadMap */}
      <div className="md:hidden w-full py-8 px-6 bg-white dark:bg-surface-900 rounded-[2.5rem] shadow-xl my-4 border border-surface-100 dark:border-surface-800 relative transition-colors">
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-slate-50 dark:bg-surface-800/50 rounded-full" />
        
        {/* Progress Bar */}
        <Motion.div 
          className="absolute left-1/2 top-0 -translate-x-1/2 w-8 bg-linear-to-b from-primary-500 to-primary-600 rounded-full origin-top"
          initial={{ height: 0 }}
          animate={{ height: `${(completedCount / totalTasks) * 100}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-12">
          {/* Start Marker */}
          <div className="flex flex-col items-center mb-4">
            <div className="p-3 bg-surface-100 dark:bg-surface-800 rounded-2xl mb-2">
              <GraduationCap size={24} className="text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">The Beginning</span>
          </div>

          {tasks.map((task, index) => {
            const isCompleted = task.status === 'completed';
            const isCurrent = index === completedCount;

            return (
              <div key={task.id} className="w-full flex items-center gap-4">
                {/* Left Side (Icons) */}
                <div className="flex-1 flex justify-end">
                   {index % 2 === 0 && (
                     <div className={`p-3 rounded-2xl bg-white dark:bg-surface-800 shadow-lg border border-surface-100 dark:border-surface-700 ${isCompleted ? 'text-primary-600 dark:text-primary-400' : 'text-slate-300'}`}>
                        {getTaskIcon(task)}
                     </div>
                   )}
                </div>

                {/* Center (Circle) */}
                <div className="relative shrink-0 flex items-center justify-center w-12">
                   {isCurrent && (
                     <Motion.div 
                        className="absolute inset-0 bg-primary-400/20 rounded-full scale-150"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                     />
                   )}
                   <Motion.div 
                      className={`w-8 h-8 rounded-full border-4 z-20 flex items-center justify-center ${isCompleted ? 'bg-primary-600 border-primary-200' : 'bg-white dark:bg-surface-800 border-surface-100 dark:border-surface-700'}`}
                      animate={{ scale: isCurrent ? 1.2 : 1 }}
                   >
                     {isCompleted && <div className="w-2 h-2 bg-white rounded-full" />}
                   </Motion.div>

                   {/* Current Avatar on Mobile */}
                   {isCurrent && (
                     <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full mb-6">
                        <div className="scale-75 origin-bottom">
                          <Avatar isJumping />
                        </div>
                     </div>
                   )}
                </div>

                {/* Right Side (Text) */}
                <div className="flex-1">
                   <div className={`transition-all ${isCompleted ? 'text-primary-600 dark:text-primary-400 font-black' : 'text-slate-400 dark:text-slate-600 font-bold'} text-sm leading-tight max-w-[120px]`}>
                      {task.title}
                   </div>
                   {index % 2 !== 0 && (
                     <div className={`mt-2 p-3 rounded-2xl bg-white dark:bg-surface-800 shadow-lg border border-surface-100 dark:border-surface-700 inline-block ${isCompleted ? 'text-primary-600 dark:text-primary-400' : 'text-slate-300'}`}>
                        {getTaskIcon(task)}
                     </div>
                   )}
                </div>
              </div>
            );
          })}

          {/* Goal Marker */}
          <div className="mt-8 flex flex-col items-center">
            <div className={`p-4 rounded-3xl transition-all ${completedCount === totalTasks ? 'bg-accent shadow-xl shadow-accent/30 rotate-12 scale-110' : 'bg-slate-100 dark:bg-surface-800 opacity-50'}`}>
              <Trophy size={32} className={completedCount === totalTasks ? 'text-white' : 'text-slate-400'} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest mt-2 ${completedCount === totalTasks ? 'text-accent' : 'text-slate-400'}`}>Victory</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCanvas;
