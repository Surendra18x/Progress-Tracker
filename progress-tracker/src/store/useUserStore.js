import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: {
        name: 'Commander',
        avatar: '🚀', // Still here but we will use the component
        joinedAt: new Date().toISOString(),
      },

      updateUser: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates },
        }));
      },
    }),
    {
      name: 'dayforge-user',
    }
  )
);

export default useUserStore;
