import React, { useState } from 'react';
import useGoalStore from '../store/useGoalStore';
import GoalCard from '../components/goals/GoalCard';
import AddGoalModal from '../components/goals/AddGoalModal';
import GoalTimeline from '../components/goals/GoalTimeline';
import { Plus, Target, LayoutGrid, Calendar } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Goals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const goals = useGoalStore((state) => state.goals);

  const activeGoals = goals.filter(g => g.status !== 'archived');
  const goalsWithDates = activeGoals.filter(g => g.targetDate);

  return (
    <div className="px-4 py-8 max-w-lg mx-auto min-h-screen">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Mission Goals</h1>
          <div className="flex items-center gap-2 mt-1 text-slate-400">
            <Target size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">{activeGoals.length} Active Objectives</span>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-4 bg-primary-500 text-white rounded-2xl shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
        >
          <Plus size={24} />
        </button>
      </header>

      <section className="space-y-10">
        {goalsWithDates.length > 0 && (
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-primary-500" />
              Timeline
            </h2>
            <GoalTimeline goals={activeGoals} />
          </div>
        )}

        <div>
          <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <LayoutGrid size={20} className="text-primary-500" />
            Active Goals
          </h2>
          {activeGoals.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence mode="popLayout">
                {activeGoals.map((goal) => (
                  <Motion.div
                    key={goal.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <GoalCard goal={goal} />
                  </Motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 px-8 border-2 border-dashed border-surface-200 rounded-[3rem] bg-white/50 backdrop-blur-sm"
            >
              <div className="w-20 h-20 bg-surface-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                <LayoutGrid className="text-slate-300 w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Command Center Empty</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Every legend starts with a vision. Set your first big goal and start forging your roadmap today.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 px-8 py-4 bg-primary-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary-500/20"
              >
                Set First Goal
              </button>
            </Motion.div>
          )}
        </div>
      </section>

      <AddGoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Goals;
