import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Target, Activity, BarChart2 } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/' },
    { icon: <CheckSquare size={24} />, label: 'Tasks', path: '/tasks' },
    { icon: <Target size={24} />, label: 'Goals', path: '/goals' },
    { icon: <Activity size={24} />, label: 'Habits', path: '/habits' },
    { icon: <BarChart2 size={24} />, label: 'Stats', path: '/stats' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-50 border-t border-surface-100 pb-safe-area-inset-bottom z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center w-full h-full gap-1 transition-colors
              ${isActive ? 'text-primary-500' : 'text-slate-400 hover:text-slate-600'}
            `}
          >
            {item.icon}
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
