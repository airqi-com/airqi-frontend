import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { mockApi } from '../services/mockApi';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (email: string, password: string) => {
        try {
          const response = await mockApi.auth.login(email, password);
          set({
            isAuthenticated: true,
            user: response.user,
            token: response.token
          });
        } catch (error) {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null
        });
      },
      updateProfile: async (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null
        }));
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token
      })
    }
  )
);