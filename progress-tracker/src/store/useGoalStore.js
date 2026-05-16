import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGoalStore = create(
  persist(
    (set) => ({
      goals: [],

      addGoal: (goal) => {
        const newGoal = {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          status: 'not_started',
          tasks: [],
          ...goal,
        };
        set((state) => ({ goals: [...state.goals, newGoal] }));
      },

      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updates } : goal
          ),
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        }));
      },

      addGoalTask: (goalId, title) => {
        set((state) => ({
          goals: state.goals.map((goal) => {
            if (goal.id === goalId) {
              const newTask = {
                id: crypto.randomUUID(),
                goalId,
                title,
                order: goal.tasks.length,
                completed: false,
              };
              return { ...goal, tasks: [...goal.tasks, newTask] };
            }
            return goal;
          }),
        }));
      },

      toggleGoalTask: (goalId, taskId) => {
        set((state) => ({
          goals: state.goals.map((goal) => {
            if (goal.id === goalId) {
              const updatedTasks = goal.tasks.map((task) => {
                if (task.id === taskId) {
                  const completed = !task.completed;
                  return {
                    ...task,
                    completed,
                    completedAt: completed ? new Date().toISOString() : undefined,
                  };
                }
                return task;
              });

              // Update goal status based on tasks completion
              const allCompleted = updatedTasks.every((t) => t.completed);
              const someCompleted = updatedTasks.some((t) => t.completed);
              let status = goal.status;
              if (allCompleted && updatedTasks.length > 0) status = 'completed';
              else if (someCompleted) status = 'in_progress';
              else status = 'not_started';

              return { ...goal, tasks: updatedTasks, status };
            }
            return goal;
          }),
        }));
      },

      deleteGoalTask: (goalId, taskId) => {
        set((state) => ({
          goals: state.goals.map((goal) => {
            if (goal.id === goalId) {
              return {
                ...goal,
                tasks: goal.tasks.filter((t) => t.id !== taskId),
              };
            }
            return goal;
          }),
        }));
      },
    }),
    {
      name: 'dayforge-goals',
    }
  )
);

export default useGoalStore;
