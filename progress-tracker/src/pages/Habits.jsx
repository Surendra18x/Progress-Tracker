import React, { useState } from 'react';
import useHabitStore from '../store/useHabitStore';
import HabitCard from '../components/habits/HabitCard';
import { Plus, Activity, Zap } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Habits = () => {
  const { habits, addHabit, toggleHabit, deleteHabit } = useHabitStore();
  const [newHabitTitle, setNewHabitTitle] = useState('');

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;
    addHabit(newHabitTitle);
    setNewHabitTitle('');
  };

  return (
    <div className="px-4 py-8 max-w-lg mx-auto min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Daily Habits</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Consistency is the key to mastery</p>
      </header>

      <section className="mb-10">
        <form onSubmit={handleAddHabit} className="relative">
          <input
            type="text"
            value={newHabitTitle}
            onChange={(e) => setNewHabitTitle(e.target.value)}
            placeholder="New recurring habit..."
            className="w-full pl-6 pr-16 py-5 bg-white dark:bg-surface-800 border-2 border-surface-100 dark:border-surface-700 rounded-2xl focus:border-primary-500 focus:outline-none transition-all font-bold text-slate-700 dark:text-white"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-primary-500 text-white rounded-xl shadow-lg shadow-primary-500/20 active:scale-90 transition-all"
          >
            <Plus size={20} />
          </button>
        </form>
      </section>

      <section className="space-y-6">
        {habits.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {habits.map((habit) => (
                <Motion.div
                  key={habit.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <HabitCard 
                    habit={habit} 
                    onToggle={toggleHabit} 
                    onDelete={deleteHabit} 
                  />
                </Motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <Motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 px-8 border-2 border-dashed border-surface-200 dark:border-surface-800 rounded-[3rem] bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm"
          >
            <div className="w-20 h-20 bg-surface-100 dark:bg-surface-800 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Zap className="text-slate-300 w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">No Habits Active</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Start building small daily actions that lead to big results. Add your first habit above.
            </p>
          </Motion.div>
        )}
      </section>
    </div>
  );
};

export default Habits;
