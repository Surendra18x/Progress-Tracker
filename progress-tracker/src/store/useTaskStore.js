import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (title, effort = 'medium') => {
        const newTask = {
          id: crypto.randomUUID(),
          date: new Date().toISOString().split('T')[0],
          title,
          effort,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }));
      },

      toggleTaskStatus: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === id) {
              const newStatus = task.status === 'completed' ? 'pending' : 'completed';
              return {
                ...task,
                status: newStatus,
                completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
              };
            }
            return task;
          }),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      getTasksByDate: (date) => {
        return get().tasks.filter((task) => task.date === date);
      },

      getTodayTasks: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().tasks.filter((task) => task.date === today);
      },
    }),
    {
      name: 'dayforge-tasks',
    }
  )
);

export default useTaskStore;
