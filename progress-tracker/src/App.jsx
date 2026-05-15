import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import PageTransition from './components/layout/PageTransition';
import useStreakStore from './store/useStreakStore';
import useUserStore from './store/useUserStore';
import useTaskStore from './store/useTaskStore';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  const updateStreak = useStreakStore((state) => state.updateStreak);
  const setTheme = useUserStore((state) => state.setTheme);
  const userTheme = useUserStore((state) => state.user.theme);
  const todayTasks = useTaskStore((state) => {
    const today = new Date().toISOString().split('T')[0];
    return state.tasks.filter(t => t.date === today);
  });

  useEffect(() => {
    setTheme(userTheme);
  }, [userTheme, setTheme]);

  useEffect(() => {
    // Update streak if at least one task is completed today
    if (todayTasks.some(t => t.status === 'completed')) {
      updateStreak();
    }
  }, [todayTasks, updateStreak]);

  return (
    <div className='min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950 transition-colors duration-300'>
      <Navbar />
      <main className="flex-1 pb-20 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
