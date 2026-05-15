import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ChevronRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const GoalCard = ({ goal }) => {
  const totalTasks = goal.tasks.length;
  const completedTasks = goal.tasks.filter(t => t.completed).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Link to={`/goals/${goal.id}`}>
      <Motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-surface-800 p-6 rounded-[2rem] border border-surface-100 dark:border-surface-700 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
      >
        <div 
          className="absolute top-0 left-0 w-2 h-full" 
          style={{ backgroundColor: goal.color || '#6366f1' }}
        />
        
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-surface-900 text-slate-400 group-hover:text-primary-500 transition-colors">
            <Target size={20} />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Progress</span>
            <span className="text-lg font-black text-slate-800 dark:text-white leading-none">{Math.round(progress)}%</span>
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight group-hover:text-primary-500 transition-colors">
          {goal.title}
        </h3>
        <p className="text-slate-400 text-xs font-medium line-clamp-2 mb-6">
          {goal.description || 'No description provided.'}
        </p>

        <div className="space-y-3">
          <div className="w-full h-2 bg-slate-100 dark:bg-surface-700 rounded-full overflow-hidden">
            <Motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>{completedTasks} / {totalTasks} Tasks</span>
            <div className="flex items-center gap-1 group-hover:text-primary-500 transition-colors">
              Details <ChevronRight size={12} />
            </div>
          </div>
        </div>
      </Motion.div>
    </Link>
  );
};

export default GoalCard;
