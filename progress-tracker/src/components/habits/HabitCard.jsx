import React from 'react';
import { motion as Motion } from 'framer-motion';
import { CheckCircle2, Trash2, Activity } from 'lucide-react';
import { format, subDays, eachDayOfInterval } from 'date-fns';

const HabitCard = ({ habit, onToggle, onDelete }) => {
  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date(),
  });

  const getLogForDate = (date) => {
    return habit.logs.find(l => l.date === format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="bg-white dark:bg-surface-800 p-6 rounded-[2rem] border border-surface-100 dark:border-surface-700 shadow-sm relative overflow-hidden group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-500">
            <Activity size={18} />
          </div>
          <div>
            <h3 className="font-black text-slate-800 dark:text-white tracking-tight">{habit.title}</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{habit.frequency}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(habit.id)}
          className="p-2 text-slate-300 hover:text-red-500 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex justify-between items-center gap-2">
        {last7Days.map((day, i) => {
          const log = getLogForDate(day);
          const isCompleted = log?.completed;
          const isToday = i === 6;
          
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className={`text-[8px] font-black uppercase tracking-tighter ${isToday ? 'text-primary-500' : 'text-slate-300'}`}>
                {format(day, 'EEE')[0]}
              </span>
              <button
                onClick={() => onToggle(habit.id, format(day, 'yyyy-MM-dd'))}
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-all
                  ${isCompleted 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
                    : 'bg-slate-50 dark:bg-surface-900 text-slate-200 dark:text-surface-700'}
                  ${isToday ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-surface-800' : ''}
                `}
              >
                <CheckCircle2 size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitCard;
