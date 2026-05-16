import React from 'react';
import { motion as Motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

const Heatmap = ({ tasks }) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Group tasks by date
  const tasksByDate = tasks.reduce((acc, task) => {
    if (!acc[task.date]) acc[task.date] = [];
    acc[task.date].push(task);
    return acc;
  }, {});

  return (
    <div className="bg-white dark:bg-surface-800 p-6 rounded-[2rem] border border-surface-100 dark:border-surface-700 shadow-sm">
      <h3 className="text-sm font-black text-slate-800 dark:text-white mb-6 uppercase tracking-widest flex justify-between items-center">
        {format(today, 'MMMM yyyy')}
        <span className="text-primary-500 text-[10px]">Activity Log</span>
      </h3>
      
      <div className="grid grid-cols-7 gap-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className="text-[10px] font-black text-slate-300 dark:text-slate-600 text-center uppercase mb-2">
            {day}
          </div>
        ))}
        
        {/* Empty cells for days before the start of the month */}
        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {daysInMonth.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayTasks = tasksByDate[dateStr] || [];
          const completedCount = dayTasks.filter(t => t.status === 'completed').length;
          const totalCount = dayTasks.length;
          
          let colorClass = "bg-slate-50 dark:bg-surface-900";
          if (totalCount > 0) {
            const ratio = completedCount / totalCount;
            if (ratio === 0) colorClass = "bg-slate-100 dark:bg-surface-800";
            else if (ratio < 0.4) colorClass = "bg-primary-100 dark:bg-primary-900/30";
            else if (ratio < 0.7) colorClass = "bg-primary-300 dark:bg-primary-700/50";
            else colorClass = "bg-primary-500";
          }

          const isToday = isSameDay(day, new Date());

          return (
            <Motion.div
              key={dateStr}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              className={`
                aspect-square rounded-lg ${colorClass} transition-colors relative
                ${isToday ? 'ring-2 ring-accent ring-offset-2 dark:ring-offset-surface-800' : ''}
              `}
            >
              {/* Tooltip (Simplified for now) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-slate-900/80 rounded-lg transition-opacity pointer-events-none">
                <span className="text-[8px] font-bold text-white">{completedCount}/{totalCount}</span>
              </div>
            </Motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Less</span>
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-slate-50 dark:bg-surface-900" />
          <div className="w-2.5 h-2.5 rounded-sm bg-primary-100" />
          <div className="w-2.5 h-2.5 rounded-sm bg-primary-300" />
          <div className="w-2.5 h-2.5 rounded-sm bg-primary-500" />
        </div>
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">More</span>
      </div>
    </div>
  );
};

export default Heatmap;
