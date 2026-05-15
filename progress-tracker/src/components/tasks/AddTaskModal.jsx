import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import useTaskStore from '../../store/useTaskStore';

const AddTaskModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [effort, setEffort] = useState('medium');
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title, effort);
    setTitle('');
    setEffort('medium');
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
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-900 rounded-t-[2.5rem] p-8 z-[70] shadow-2xl max-w-lg mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">New Milestone</h2>
              <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-surface-800 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">What's the next step?</label>
                <input
                  autoFocus
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title..."
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-surface-800 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 text-lg font-bold text-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Effort Level</label>
                <div className="flex gap-3">
                  {['low', 'medium', 'high'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setEffort(level)}
                      className={`flex-1 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all
                        ${effort === level 
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                          : 'bg-slate-50 dark:bg-surface-800 text-slate-400'}
                      `}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary-500/20 active:scale-[0.98] transition-all"
              >
                <Plus size={20} />
                Create Milestone
              </button>
            </form>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddTaskModal;
