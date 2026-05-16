import React from 'react';
import useUserStore from '../store/useUserStore';
import useTaskStore from '../store/useTaskStore';
import useGoalStore from '../store/useGoalStore';
import useStreakStore from '../store/useStreakStore';
import useHabitStore from '../store/useHabitStore';
import { Trash2, Download, User } from 'lucide-react';
import UserAvatar from '../components/ui/UserAvatar';

const Settings = () => {
  const { user, updateUser } = useUserStore();
  const { tasks } = useTaskStore();
  const { goals } = useGoalStore();
  const { streak } = useStreakStore();
  const { habits } = useHabitStore();

  const handleExport = () => {
    const data = {
      user,
      tasks,
      goals,
      streak,
      habits,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dayforge-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (window.confirm('WARNING: This will permanently delete ALL your data. This cannot be undone. Are you sure?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="px-4 py-8 max-w-lg mx-auto min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Command Center</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Configure your workspace</p>
      </header>

      <section className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-surface-100 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <User size={14} /> Profile
          </h3>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-primary-100 rounded-[2rem] flex items-center justify-center shadow-inner overflow-hidden border border-surface-100">
               <UserAvatar className="w-full h-full" />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-1">Commander Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => updateUser({ name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 font-bold text-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Data Management Section */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-surface-100 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Data Management</h3>
          <div className="space-y-4">
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl text-primary-500 shadow-sm">
                  <Download size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-700 text-sm">Export Data</p>
                  <p className="text-[10px] font-medium text-slate-400">Download your progress as JSON</p>
                </div>
              </div>
            </button>
            <button
              onClick={handleClearData}
              className="w-full flex items-center justify-between p-5 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl text-red-500 shadow-sm">
                  <Trash2 size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-red-600 text-sm">Purge Data</p>
                  <p className="text-[10px] font-medium text-red-400/60">Reset all stats and history</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <footer className="mt-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
          DayForge v1.0.0
        </p>
      </footer>
    </div>
  );
};

export default Settings;
