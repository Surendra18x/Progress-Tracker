import React from 'react';
import useGoalStore from '../store/useGoalStore';
import useTaskStore from '../store/useTaskStore';
import useStreakStore from '../store/useStreakStore';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { BarChart2, CheckCircle, Target, Flame, TrendingUp, Shield, Award } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import Heatmap from '../components/tasks/Heatmap';

const Stats = () => {
  const { tasks } = useTaskStore();
  const { goals } = useGoalStore();
  const { streak, activateFreeze } = useStreakStore();

  const completedTasks = tasks.filter(t => t.status === 'completed');
  const totalTasks = tasks.length;
  const taskCompletionRate = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;

  const completedGoals = goals.filter(g => g.status === 'completed');

  // Weekly Activity Data (last 7 days)
  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date(),
  });

  const weeklyData = last7Days.map(day => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayTasks = tasks.filter(t => t.date === dateStr);
    const dayCompleted = dayTasks.filter(t => t.status === 'completed').length;
    return {
      day: format(day, 'EEE'),
      completed: dayCompleted,
      total: dayTasks.length,
    };
  });

  const maxDailyTasks = Math.max(...weeklyData.map(d => d.total), 1);

  const milestones = [
    { id: 7, label: '7 Day Streak', icon: '🌱' },
    { id: 14, label: '14 Day Streak', icon: '🌿' },
    { id: 30, label: '30 Day Streak', icon: '🌳' },
    { id: 60, label: '60 Day Streak', icon: '🔥' },
    { id: 100, label: '100 Day Streak', icon: '👑' },
  ];

  return (
    <div className="px-4 py-8 max-w-lg mx-auto min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Mission Stats</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Analyzing your performance data</p>
      </header>

      <section className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border border-surface-100 shadow-sm">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mb-4 text-primary-600">
            <CheckCircle size={20} />
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Tasks</p>
          <p className="text-2xl font-black text-slate-800">{completedTasks.length}</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-surface-100 shadow-sm">
          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4 text-accent">
            <Flame size={20} fill="currentColor" />
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Best Streak</p>
          <p className="text-2xl font-black text-slate-800">{streak.longestStreak}d</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-surface-100 shadow-sm">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mb-4 text-primary-600">
            <Target size={20} />
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Goals Won</p>
          <p className="text-2xl font-black text-slate-800">{completedGoals.length}</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-surface-100 shadow-sm">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mb-4 text-primary-600">
            <TrendingUp size={20} />
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Win Rate</p>
          <p className="text-2xl font-black text-slate-800">{Math.round(taskCompletionRate)}%</p>
        </div>
      </section>

      {/* Streak Protection */}
      <section className="mb-8">
        <div className="bg-linear-to-br from-indigo-500 to-purple-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-500/20">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-black tracking-tight mb-1">Streak Protection</h3>
              <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest">Shield your progress</p>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <Shield size={24} />
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="text-4xl font-black">{streak.freezesAvailable}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-indigo-100 leading-tight">
              Freezes<br/>Available
            </div>
          </div>

          <button
            onClick={() => {
              if (activateFreeze()) {
                alert('Streak frozen for today!');
              } else {
                alert('No freezes available!');
              }
            }}
            disabled={streak.freezesAvailable === 0}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 ${streak.freezesAvailable > 0 ? 'bg-white text-indigo-600 shadow-lg' : 'bg-white/20 text-white/50 cursor-not-allowed'}`}
          >
            Activate Freeze
          </button>
        </div>
      </section>

      {/* Milestones */}
      <section className="mb-8">
        <h3 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-widest flex items-center gap-2">
          <Award size={16} className="text-primary-500" />
          Mission Badges
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {milestones.map((m) => {
            const isEarned = streak.longestStreak >= m.id;
            return (
              <div 
                key={m.id}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all ${isEarned ? 'bg-white border-primary-500 shadow-lg shadow-primary-500/10' : 'bg-slate-50 border-surface-100 opacity-40'}`}
              >
                <span className="text-xl">{m.icon}</span>
                <span className="text-[8px] font-black text-center leading-tight px-1">{m.id}D</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white p-8 rounded-[2.5rem] border border-surface-100 shadow-sm mb-8">
        <h3 className="text-sm font-black text-slate-800 mb-8 uppercase tracking-widest flex items-center gap-2">
          <BarChart2 size={16} className="text-primary-500" />
          Weekly Performance
        </h3>
        
        <div className="flex justify-between items-end h-40 gap-2">
          {weeklyData.map((d, i) => {
            const height = d.total > 0 ? (d.completed / maxDailyTasks) * 100 : 0;
            const totalHeight = d.total > 0 ? (d.total / maxDailyTasks) * 100 : 0;
            
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full">
                <div className="flex-1 w-full flex flex-col justify-end gap-1 relative">
                  {/* Total Bar (Background) */}
                  <div 
                    className="w-full bg-slate-100 rounded-t-lg absolute bottom-0 transition-all duration-1000"
                    style={{ height: `${totalHeight}%` }}
                  />
                  {/* Completed Bar (Foreground) */}
                  <Motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    className="w-full bg-primary-500 rounded-t-lg z-10 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                  />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{d.day}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-widest flex items-center gap-2">
          <TrendingUp size={16} className="text-primary-500" />
          Activity Map
        </h3>
        <Heatmap tasks={tasks} />
      </section>
    </div>
  );
};

export default Stats;
