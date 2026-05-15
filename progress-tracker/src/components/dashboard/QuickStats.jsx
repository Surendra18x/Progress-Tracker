import React from 'react';
import useTaskStore from '../../store/useTaskStore';
import useGoalStore from '../../store/useGoalStore';
import useStreakStore from '../../store/useStreakStore';
import { motion as Motion } from 'framer-motion';
import { Target, Flame, CheckCircle } from 'lucide-react';

const QuickStats = () => {
  const { tasks } = useTaskStore();
  const { goals } = useGoalStore();
  const { streak } = useStreakStore();

  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.date === today);
  const todayCompleted = todayTasks.filter(t => t.status === 'completed').length;
  
  const activeGoals = goals.filter(g => g.status !== 'archived');
  
  const stats = [
    { 
      label: 'Today', 
      value: `${todayCompleted}/${todayTasks.length}`, 
      icon: <CheckCircle size={14} />,
      color: 'text-primary-500',
      bg: 'bg-primary-100/50 dark:bg-primary-900/20'
    },
    { 
      label: 'Streak', 
      value: `${streak.currentStreak}d`, 
      icon: <Flame size={14} />,
      color: 'text-accent',
      bg: 'bg-accent/10'
    },
    { 
      label: 'Goals', 
      value: activeGoals.length, 
      icon: <Target size={14} />,
      color: 'text-indigo-500',
      bg: 'bg-indigo-100/50 dark:bg-indigo-900/20'
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      {stats.map((stat, i) => (
        <Motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white dark:bg-surface-800 p-4 rounded-2xl border border-surface-100 dark:border-surface-700 shadow-sm"
        >
          <div className={`w-7 h-7 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
            {stat.icon}
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
          <p className={`text-sm font-black ${stat.color} tracking-tight`}>{stat.value}</p>
        </Motion.div>
      ))}
    </div>
  );
};

export default QuickStats;
