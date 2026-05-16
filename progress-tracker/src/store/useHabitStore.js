import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useHabitStore = create(
  persist(
    (set) => ({
      habits: [],

      addHabit: (title, frequency = 'daily') => {
        const newHabit = {
          id: crypto.randomUUID(),
          title,
          frequency,
          logs: [],
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ habits: [...state.habits, newHabit] }));
      },

      toggleHabit: (id, date) => {
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id === id) {
              const logIndex = habit.logs.findIndex((l) => l.date === date);
              let newLogs = [...habit.logs];
              
              if (logIndex > -1) {
                // Toggle off
                if (newLogs[logIndex].completed) {
                  newLogs[logIndex].completed = false;
                } else {
                  newLogs[logIndex].completed = true;
                }
              } else {
                // Add new log
                newLogs.push({ date, completed: true });
              }
              
              return { ...habit, logs: newLogs };
            }
            return habit;
          }),
        }));
      },

      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
        }));
      },
    }),
    {
      name: 'dayforge-habits',
    }
  )
);

export default useHabitStore;
