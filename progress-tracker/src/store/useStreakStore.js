import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isYesterday, isToday, parseISO } from 'date-fns';

const useStreakStore = create(
  persist(
    (set, get) => ({
      streak: {
        currentStreak: 0,
        longestStreak: 0,
        lastLoggedDate: '',
        freezesAvailable: 1,
        lastFreezeUsed: '',
        milestonesBadges: [],
      },

      updateStreak: () => {
        const { streak } = get();
        const today = new Date().toISOString().split('T')[0];
        
        if (streak.lastLoggedDate === today) return;

        let newCurrentStreak = streak.currentStreak;
        const lastDate = streak.lastLoggedDate ? parseISO(streak.lastLoggedDate) : null;

        if (!lastDate) {
          newCurrentStreak = 1;
        } else if (isYesterday(lastDate)) {
          newCurrentStreak += 1;
        } else if (!isToday(lastDate)) {
          // Check if freeze can be used
          if (streak.freezesAvailable > 0) {
            // Freeze used, streak maintained (hypothetically, usually freeze is proactive)
            // For now, let's just reset if not consecutive
            newCurrentStreak = 1;
          } else {
            newCurrentStreak = 1;
          }
        }

        const newLongestStreak = Math.max(newCurrentStreak, streak.longestStreak);

        set({
          streak: {
            ...streak,
            currentStreak: newCurrentStreak,
            longestStreak: newLongestStreak,
            lastLoggedDate: today,
          },
        });
      },

      activateFreeze: () => {
        const { streak } = get();
        if (streak.freezesAvailable > 0) {
          set({
            streak: {
              ...streak,
              freezesAvailable: streak.freezesAvailable - 1,
              lastFreezeUsed: new Date().toISOString().split('T')[0],
            },
          });
          return true;
        }
        return false;
      },
      
      resetFreeze: () => {
        set((state) => ({
          streak: { ...state.streak, freezesAvailable: 1 }
        }));
      }
    }),
    {
      name: 'dayforge-streak',
    }
  )
);

export default useStreakStore;
