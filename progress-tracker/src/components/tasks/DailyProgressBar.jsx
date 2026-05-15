import React from 'react';
import { motion as Motion } from 'framer-motion';

const DailyProgressBar = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="w-full bg-white dark:bg-surface-800 p-6 rounded-3xl border border-surface-100 dark:border-surface-700 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Today's Progress</span>
        <span className="text-lg font-black text-primary-500">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-3 bg-slate-100 dark:bg-surface-700 rounded-full overflow-hidden">
        <Motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-primary-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
        />
      </div>
      <p className="mt-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        {completed} / {total} tasks completed
      </p>
    </div>
  );
};

export default DailyProgressBar;
