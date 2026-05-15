import React from 'react';
import useTaskStore from '../store/useTaskStore';
import RoadmapCanvas from '../components/roadmap/RoadmapCanvas';
import QuickStats from '../components/dashboard/QuickStats';
import QuoteCard from '../components/ui/QuoteCard';
import FocusTimer from '../components/timer/FocusTimer';
import { format } from 'date-fns';
import { Target, Zap, Timer } from 'lucide-react';
import useUserStore from '../store/useUserStore';

const Home = () => {
  const { user } = useUserStore();
  const today = format(new Date(), 'yyyy-MM-dd');
  const tasks = useTaskStore((state) => state.getTasksByDate(today));

  return (
    <div className="pb-8">
      {/* Hero Header */}
      <section className="px-4 pt-8 pb-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 mb-1">Mission Control</p>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">
              Welcome back, <span className="text-primary-500">{user.name}</span>
            </h1>
          </div>
          <div className="w-12 h-12 bg-white dark:bg-surface-800 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-700 flex items-center justify-center text-2xl">
            {user.avatar}
          </div>
        </div>

        <QuickStats />
        
        <div className="space-y-6">
          <QuoteCard />
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Timer className="text-primary-500" size={20} />
              <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Focus Zone</h2>
            </div>
            <FocusTimer />
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="px-4 mt-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Target className="text-primary-500" size={20} />
            <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Today's Journey</h2>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Zap size={12} className="text-accent fill-accent" />
            Active Path
          </div>
        </div>
        
        {tasks.length > 0 ? (
          <RoadmapCanvas tasks={tasks} />
        ) : (
          <div className="bg-white dark:bg-surface-800 rounded-[2.5rem] p-12 text-center border-2 border-dashed border-surface-100 dark:border-surface-700">
            <div className="w-16 h-16 bg-surface-50 dark:bg-surface-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-500 font-bold">Your path is clear for today.</p>
            <p className="text-slate-400 text-xs mt-1">Add tasks in the Tasks tab to begin your journey!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
