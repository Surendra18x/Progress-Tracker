import React from 'react';
import useTaskStore from '../store/useTaskStore';
import useGoalStore from '../store/useGoalStore';
import useStreakStore from '../store/useStreakStore';
import RoadmapCanvas from '../components/roadmap/RoadmapCanvas';
import QuickStats from '../components/dashboard/QuickStats';
import QuoteCard from '../components/ui/QuoteCard';
import FocusTimer from '../components/timer/FocusTimer';
import StreakFlame from '../components/streak/StreakFlame';
import TaskCard from '../components/tasks/TaskCard';
import { format, parseISO, compareDesc } from 'date-fns';
import { Target, Zap, Timer, Sparkles, History, ArrowRight, CheckSquare } from 'lucide-react';
import useUserStore from '../store/useUserStore';
import { Link } from 'react-router-dom';
import { getLocalDateString } from '../utils/dateHelpers';
import UserAvatar from '../components/ui/UserAvatar';

const Home = () => {
  const { user } = useUserStore();
  const { streak } = useStreakStore();
  const { goals } = useGoalStore();
  const { tasks: allTasks, toggleTaskStatus, deleteTask } = useTaskStore();
  
  const today = getLocalDateString();
  const tasks = allTasks.filter(t => t.date === today);

  // Smart Suggestion Logic
  const nextTask = tasks.find(t => t.status === 'pending');
  let suggestion = null;
  if (nextTask) {
    suggestion = { type: 'task', item: nextTask, label: 'Next Task' };
  } else {
    for (const goal of goals) {
      const nextGoalTask = goal.tasks.find(t => !t.completed);
      if (nextGoalTask) {
        suggestion = { type: 'goal', item: nextGoalTask, goalTitle: goal.title, label: 'Goal Milestone' };
        break;
      }
    }
  }

  // Recent Activity Logic
  const taskActivity = allTasks
    .filter(t => t.completedAt)
    .map(t => ({ id: t.id, title: t.title, type: 'task', date: t.completedAt }));
  
  const goalActivity = goals.flatMap(g => 
    g.tasks
      .filter(t => t.completedAt)
      .map(t => ({ id: t.id, title: t.title, type: 'goal', date: t.completedAt, goalTitle: g.title }))
  );

  const recentActivity = [...taskActivity, ...goalActivity]
    .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)))
    .slice(0, 5);

  return (
    <div className="pb-8">
      {/* Hero Header */}
      <section className="px-4 pt-8 pb-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 mb-1">Mission Control</p>
            <h1 className="text-3xl font-black text-slate-800 tracking-tighter leading-tight">
              Welcome back, <br/>
              <span className="text-primary-500">{user.name}</span>
            </h1>
          </div>
          <div className="flex flex-col items-end gap-4">
             <div className="w-14 h-14 bg-white shadow-xl shadow-primary-500/10 rounded-2xl flex items-center justify-center border border-surface-100 overflow-hidden">
                <UserAvatar className="w-full h-full" />
             </div>
             <StreakFlame count={streak.currentStreak} />
          </div>
        </div>

        <QuickStats />
        
        <div className="space-y-8">
          <QuoteCard />
          
          {/* Smart Suggestion */}
          {suggestion && (
            <div className="bg-linear-to-br from-primary-500 to-primary-600 p-6 rounded-[2.5rem] text-white shadow-xl shadow-primary-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-primary-100" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-100">Smart Suggestion</span>
              </div>
              <h3 className="text-lg font-black leading-tight mb-2">
                {suggestion.item.title}
              </h3>
              <p className="text-primary-100 text-xs font-bold uppercase tracking-widest mb-6">
                {suggestion.label} {suggestion.goalTitle ? `• ${suggestion.goalTitle}` : ''}
              </p>
              <Link 
                to={suggestion.type === 'task' ? '/tasks' : `/goals/${goals.find(g => g.tasks.some(t => t.id === suggestion.item.id)).id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-50 transition-colors"
              >
                Go to Mission <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* Tasks & Timer Section */}
          <div className="grid grid-cols-1 gap-8">
            {/* Active Tasks */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckSquare className="text-primary-500" size={20} />
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">Today's Missions</h2>
                </div>
                <Link to="/tasks" className="text-[10px] font-black uppercase tracking-widest text-primary-500 hover:underline">View All</Link>
              </div>
              
              <div className="space-y-3">
                {tasks.length > 0 ? (
                  tasks.slice(0, 3).map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onToggle={() => toggleTaskStatus(task.id)} 
                      onDelete={() => deleteTask(task.id)} 
                    />
                  ))
                ) : (
                  <div className="bg-white rounded-[2rem] p-8 text-center border border-surface-100 border-dashed">
                    <p className="text-slate-400 text-sm font-bold">No tasks for today yet.</p>
                  </div>
                )}
                {tasks.length > 3 && (
                  <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                    + {tasks.length - 3} more tasks in the Tasks tab
                  </p>
                )}
              </div>
            </div>

            {/* Focus Zone */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Timer className="text-primary-500" size={20} />
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Focus Zone</h2>
              </div>
              <FocusTimer />
            </div>
          </div>

          {/* Roadmap Section - integrated progress visualization */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Target className="text-primary-500" size={20} />
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Journey Progress</h2>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <Zap size={12} className="text-accent fill-accent" />
                Live Update
              </div>
            </div>
            
            {tasks.length > 0 ? (
              <RoadmapCanvas tasks={tasks} />
            ) : (
              <div className="bg-white rounded-[2.5rem] p-12 text-center border-2 border-dashed border-surface-100">
                <div className="w-16 h-16 bg-surface-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-slate-300" size={32} />
                </div>
                <p className="text-slate-500 font-bold">Your path is clear for today.</p>
                <p className="text-slate-400 text-xs mt-1">Add tasks to begin your journey!</p>
              </div>
            )}
          </div>

          {/* Recent Activity moved to bottom */}
          {recentActivity.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <History className="text-primary-500" size={20} />
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Recent Activity</h2>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-surface-100 divide-y divide-surface-50 overflow-hidden">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-700">{activity.title}</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                        {activity.type === 'goal' ? `Goal: ${activity.goalTitle}` : 'Daily Task'} • {format(parseISO(activity.date), 'p')}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-500">
                      <Zap size={14} fill="currentColor" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
