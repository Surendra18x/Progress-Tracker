import React from 'react';
import { motion as Motion } from 'framer-motion';
import { format, parseISO, compareAsc } from 'date-fns';

const GoalTimeline = ({ goals }) => {
  const activeGoals = goals
    .filter(g => g.targetDate)
    .sort((a, b) => compareAsc(parseISO(a.targetDate), parseISO(b.targetDate)));

  if (activeGoals.length === 0) return null;

  return (
    <div className="bg-white dark:bg-surface-800 p-8 rounded-[2.5rem] border border-surface-100 dark:border-surface-700 shadow-sm overflow-hidden">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">Mission Timeline</h3>
      
      <div className="relative overflow-x-auto no-scrollbar pb-4">
        {/* Central Line */}
        <div className="absolute left-0 right-0 top-12 h-0.5 bg-slate-100 dark:bg-surface-700 z-0" style={{ minWidth: activeGoals.length * 200 }} />
        
        <div className="flex gap-12 relative z-10" style={{ minWidth: activeGoals.length * 200 }}>
          {activeGoals.map((goal, index) => {
            const completedCount = goal.tasks.filter(t => t.completed).length;
            const progress = goal.tasks.length > 0 ? (completedCount / goal.tasks.length) * 100 : 0;
            
            return (
              <div key={goal.id} className="flex flex-col items-center w-40 shrink-0">
                <div 
                  className="w-10 h-10 rounded-2xl shadow-xl flex items-center justify-center text-white mb-6 relative"
                  style={{ backgroundColor: goal.color }}
                >
                  <span className="text-[10px] font-black">{index + 1}</span>
                  {/* Vertical connector to line */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-slate-100 dark:bg-surface-700" />
                </div>
                
                <div className="text-center w-full">
                  <span className="text-[9px] font-black text-primary-500 uppercase tracking-wider block mb-1">
                    {format(parseISO(goal.targetDate), 'MMM d, yyyy')}
                  </span>
                  <h4 className="text-sm font-black text-slate-800 dark:text-white truncate mb-3">
                    {goal.title}
                  </h4>
                  
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-surface-700 rounded-full overflow-hidden">
                    <Motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-primary-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                    />
                  </div>
                  <p className="text-[8px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
                    {Math.round(progress)}% Complete
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GoalTimeline;
