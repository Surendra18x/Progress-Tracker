import React from 'react';
import useUserStore from '../store/useUserStore';
import useTaskStore from '../store/useTaskStore';
import useGoalStore from '../store/useGoalStore';
import useStreakStore from '../store/useStreakStore';
import { Moon, Sun, Monitor, Trash2, Download, User, Palette } from 'lucide-react';

const Settings = () => {
  const { user, updateUser, setTheme } = useUserStore();
  const { tasks } = useTaskStore();
  const { goals } = useGoalStore();

  const handleExport = () => {
    const data = {
      user,
      tasks,
      goals,
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
        <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Command Center</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Configure your workspace</p>
      </header>

      <section className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white dark:bg-surface-800 p-8 rounded-[2.5rem] border border-surface-100 dark:border-surface-700 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <User size={14} /> Profile
          </h3>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner">
              {user.avatar}
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-1">Commander Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => updateUser({ name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-surface-900 border-none rounded-xl focus:ring-2 focus:ring-primary-500 font-bold text-slate-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-white dark:bg-surface-800 p-8 rounded-[2.5rem] border border-surface-100 dark:border-surface-700 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <Palette size={14} /> Appearance
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'light', icon: <Sun size={20} />, label: 'Light' },
              { id: 'dark', icon: <Moon size={20} />, label: 'Dark' },
              { id: 'system', icon: <Monitor size={20} />, label: 'System' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`
                  flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all
                  ${user.theme === t.id 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-500' 
                    : 'border-slate-50 dark:border-surface-700 bg-slate-50 dark:bg-surface-900 text-slate-400'}
                `}
              >
                {t.icon}
                <span className="text-[10px] font-black uppercase tracking-widest">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Data Management Section */}
        <div className="bg-white dark:bg-surface-800 p-8 rounded-[2.5rem] border border-surface-100 dark:border-surface-700 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Data Management</h3>
          <div className="space-y-4">
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-between p-5 bg-slate-50 dark:bg-surface-900 rounded-2xl hover:bg-slate-100 dark:hover:bg-surface-700 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-surface-800 rounded-xl text-primary-500 shadow-sm">
                  <Download size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-700 dark:text-white text-sm">Export Data</p>
                  <p className="text-[10px] font-medium text-slate-400">Download your progress as JSON</p>
                </div>
              </div>
            </button>
            <button
              onClick={handleClearData}
              className="w-full flex items-center justify-between p-5 bg-red-50 dark:bg-red-900/10 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-surface-800 rounded-xl text-red-500 shadow-sm">
                  <Trash2 size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-red-600 dark:text-red-400 text-sm">Purge Data</p>
                  <p className="text-[10px] font-medium text-red-400/60">Reset all stats and history</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <footer className="mt-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-surface-700">
          DayForge v1.0.0
        </p>
      </footer>
    </div>
  );
};

export default Settings;
