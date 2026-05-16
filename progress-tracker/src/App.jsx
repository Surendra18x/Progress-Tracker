import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import PageTransition from './components/layout/PageTransition';
import useStreakStore from './store/useStreakStore';
import useTaskStore from './store/useTaskStore';
import { AnimatePresence } from 'framer-motion';

import { getLocalDateString } from './utils/dateHelpers';

function App() {
  const location = useLocation();
  const updateStreak = useStreakStore((state) => state.updateStreak);
  const todayCompletedCount = useTaskStore((state) => {
    const today = getLocalDateString();
    return state.tasks.filter(t => t.date === today && t.status === 'completed').length;
  });

  useEffect(() => {
    // Force light mode
    document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => {
    // Update streak if at least one task is completed today
    if (todayCompletedCount > 0) {
      updateStreak();
    }
  }, [todayCompletedCount, updateStreak]);

  return (
    <div className='min-h-screen flex flex-col bg-surface-50 transition-colors duration-300'>
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
