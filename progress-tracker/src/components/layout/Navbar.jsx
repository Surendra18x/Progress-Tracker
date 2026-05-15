import React from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Settings } from "lucide-react";
import useUserStore from "../../store/useUserStore";

function Navbar() {
  const { user, setTheme } = useUserStore();
  const isDark = user.theme === 'dark' || (user.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-surface-950/80 backdrop-blur-lg border-b border-surface-100 dark:border-surface-800 px-4 py-3 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-3">
        <div className="bg-primary-500 text-white w-10 h-10 flex items-center justify-center rounded-2xl font-bold shadow-lg shadow-primary-500/20">
          {user.avatar}
        </div>
        <div>
          <h1 className="font-black text-xl tracking-tight text-slate-800 dark:text-white leading-none">
            Day<span className="text-primary-500">Forge</span>
          </h1>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Status: Operational</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-slate-50 dark:bg-surface-800 border border-slate-100 dark:border-surface-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-90"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Link 
          to="/settings"
          className="p-2.5 rounded-xl bg-slate-50 dark:bg-surface-800 border border-slate-100 dark:border-surface-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-90"
        >
          <Settings size={18} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
