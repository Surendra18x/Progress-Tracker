import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Plus, Trash2, CheckCircle2, Calendar, Target, MoreVertical } from 'lucide-react';
import useGoalStore from '../store/useGoalStore';

const GoalDetail = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();
  const { goals, addGoalTask, toggleGoalTask, deleteGoalTask, deleteGoal } = useGoalStore();
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const goal = goals.find((g) => g.id === goalId);

  if (!goal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-4">Goal not found</h2>
        <button 
          onClick={() => navigate('/goals')}
          className="px-6 py-3 bg-primary-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs"
        >
          Back to Goals
        </button>
      </div>
    );
  }

  const completedCount = goal.tasks.filter((t) => t.completed).length;
  const progress = goal.tasks.length > 0 ? (completedCount / goal.tasks.length) * 100 : 0;

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addGoalTask(goalId, newTaskTitle);
    setNewTaskTitle('');
  };

  const handleDeleteGoal = () => {
    if (window.confirm('Are you sure you want to delete this goal and all its tasks?')) {
      deleteGoal(goalId);
      navigate('/goals');
    }
  };

  return (
    <div className="px-4 py-8 max-w-lg mx-auto min-h-screen">
      <header className="flex justify-between items-center mb-10">
        <button 
          onClick={() => navigate('/goals')}
          className="p-3 bg-white dark:bg-surface-800 rounded-2xl text-slate-400 shadow-sm border border-surface-100 dark:border-surface-700"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="p-3 bg-white dark:bg-surface-800 rounded-2xl text-slate-400 shadow-sm border border-surface-100 dark:border-surface-700"
          >
            <MoreVertical size={20} />
          </button>
          <AnimatePresence>
            {showOptions && (
              <Motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-800 rounded-2xl shadow-2xl border border-surface-100 dark:border-surface-700 z-50 overflow-hidden"
              >
                <button
                  onClick={handleDeleteGoal}
                  className="w-full px-6 py-4 text-left text-red-500 font-bold text-sm flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 size={16} /> Delete Goal
                </button>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[10px] font-black uppercase tracking-widest">
            {goal.category}
          </div>
          {goal.targetDate && (
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <Calendar size={12} /> {goal.targetDate}
            </div>
          )}
        </div>
        <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter mb-4 leading-tight">
          {goal.title}
        </h1>
        <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8">
          {goal.description || 'Forge your path to success by breaking down this goal into manageable steps.'}
        </p>

        <div className="bg-white dark:bg-surface-800 p-6 rounded-[2rem] border border-surface-100 dark:border-surface-700 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Completion</span>
            <span className="text-lg font-black text-primary-500">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 dark:bg-surface-700 rounded-full overflow-hidden">
            <Motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            <Target size={20} className="text-primary-500" />
            Milestones
          </h2>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {completedCount} / {goal.tasks.length}
          </span>
        </div>

        <form onSubmit={handleAddTask} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new milestone..."
              className="w-full pl-6 pr-16 py-5 bg-white dark:bg-surface-800 border-2 border-surface-100 dark:border-surface-700 rounded-2xl focus:border-primary-500 focus:outline-none transition-all font-bold text-slate-700 dark:text-white"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-primary-500 text-white rounded-xl shadow-lg shadow-primary-500/20 active:scale-90 transition-all"
            >
              <Plus size={20} />
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {goal.tasks.length > 0 ? (
              goal.tasks.map((task) => (
                <Motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`
                    group flex items-center gap-4 p-5 bg-white dark:bg-surface-800 border border-surface-100 dark:border-surface-700 rounded-2xl shadow-sm transition-all
                    ${task.completed ? 'opacity-60 grayscale' : 'opacity-100'}
                  `}
                >
                  <button
                    onClick={() => toggleGoalTask(goalId, task.id)}
                    className={`
                      w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all
                      ${task.completed 
                        ? 'bg-primary-500 border-primary-500 text-white' 
                        : 'border-slate-200 dark:border-surface-600'}
                    `}
                  >
                    {task.completed && <CheckCircle2 size={16} />}
                  </button>
                  <span className={`flex-1 font-bold text-slate-700 dark:text-slate-200 ${task.completed ? 'line-through italic' : ''}`}>
                    {task.title}
                  </span>
                  <button
                    onClick={() => deleteGoalTask(goalId, task.id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </Motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 font-medium text-sm">No milestones yet. Break down your goal!</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default GoalDetail;
