import React from 'react';
import { motion as Motion } from 'framer-motion';
import { format, parseISO, compareAsc } from 'date-fns';

const GoalTimeline = ({ goals }) => {
  const activeGoals = goals
    .filter(g => g.targetDate)
    .sort((a, b) => compareAsc(parseISO(a.targetDate), parseISO(b.targetDate)));

  if (activeGoals.length === 0) return null;

  return (
    <div className="bg-white dark:bg-surface-800 p-6 rounded-[2rem] border border-surface-100 dark:border-surface-700 shadow-sm overflow-hidden">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Mission Timeline</h3>
      
      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-surface-700" />
        
        <div className="space-y-8 relative">
          {activeGoals.map((goal, index) => {
            const completedCount = goal.tasks.filter(t => t.completed).length;
            const progress = goal.tasks.length > 0 ? (completedCount / goal.tasks.length) * 100 : 0;
            
            return (
              <div key={goal.id} className="flex gap-6 items-start">
                <div className="relative z-10">
                  <div 
                    className="w-8 h-8 rounded-xl shadow-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: goal.color }}
                  >
                    <span className="text-[10px] font-black">{index + 1}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-black text-slate-800 dark:text-white truncate max-w-[150px]">
                      {goal.title}
                    </h4>
                    <span className="text-[9px] font-black text-primary-500 uppercase tracking-wider">
                      {format(parseISO(goal.targetDate), 'MMM d')}
                    </span>
                  </div>
                  
                  <div className="w-full h-1 bg-slate-100 dark:bg-surface-700 rounded-full mt-2 overflow-hidden">
                    <Motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-primary-500"
                    />
                  </div>
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
