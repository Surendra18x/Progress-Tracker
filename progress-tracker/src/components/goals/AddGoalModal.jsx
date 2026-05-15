import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Calendar } from 'lucide-react';
import useGoalStore from '../../store/useGoalStore';

const AddGoalModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Personal');
  const [color, setColor] = useState('#6366f1');
  const [targetDate, setTargetDate] = useState('');

  const addGoal = useGoalStore((state) => state.addGoal);

  const colors = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Sky', value: '#0ea5e9' },
    { name: 'Violet', value: '#8b5cf6' },
  ];

  const categories = ['Personal', 'Work', 'Health', 'Finance', 'Learning', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addGoal({
      title,
      description,
      category,
      color,
      targetDate,
    });

    setTitle('');
    setDescription('');
    setCategory('Personal');
    setColor('#6366f1');
    setTargetDate('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
          />
          <Motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-900 rounded-t-[2.5rem] p-8 z-[70] shadow-2xl max-w-lg mx-auto max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Set a New Goal</h2>
              <button onClick={onClose} className="p-2 bg-slate-50 dark:bg-surface-800 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Goal Title</label>
                <input
                  autoFocus
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What do you want to achieve?"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-surface-800 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 text-lg font-bold text-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your vision..."
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-surface-800 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 text-base font-medium text-slate-700 dark:text-white min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50 dark:bg-surface-800 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 text-sm font-bold text-slate-700 dark:text-white appearance-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Target Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-50 dark:bg-surface-800 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 text-sm font-bold text-slate-700 dark:text-white appearance-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Theme Color</label>
                <div className="flex justify-between">
                  {colors.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={`w-10 h-10 rounded-xl transition-all ${color === c.value ? 'ring-4 ring-primary-500/30 scale-110' : 'scale-100'}`}
                      style={{ backgroundColor: c.value }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary-500/20 active:scale-[0.98] transition-all"
              >
                <Plus size={20} />
                Initialize Goal
              </button>
            </form>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddGoalModal;
