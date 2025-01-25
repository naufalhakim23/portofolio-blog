import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { verifyToken, JWTPayload } from '@/lib/jwt';

type User = {
  id: string;
  email: string;
  role: string;
  token: string;
};

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  getToken: () => string | null;
  getDecodedToken: () => JWTPayload | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email, password) => {
        try {
          const response = await fetch('/api/auth/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();

          if (!response.ok) {
            return { success: false, error: data.error };
          }

          set({ user: data, isAuthenticated: true });
          localStorage.setItem('adminToken', data.token);
          return { success: true };
        } catch (error) {
          return { success: false, error: 'An error occurred during login' };
        }
      },
      signup: async (email, password) => {
        try {
          const response = await fetch('/api/admin/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();

          if (!response.ok) {
            return { success: false, error: data.error };
          }

          // Automatically log in after successful signup
          const loginFn = useAuthStore.getState().login;
          const loginResult = await loginFn(email, password);
          if (!loginResult.success) {
            return { success: false, error: 'Signup successful, but automatic login failed' };
          }

          return { success: true };
        } catch (error) {
          return { success: false, error: 'An error occurred during signup' };
        }
      },
      getToken: () => get().user?.token || null,
      getDecodedToken: () => {
        const token = get().user?.token;
        if (!token) return null;
        try {
          return verifyToken(token);
        } catch (error) {
          // If token is invalid, log out the user
          get().logout();
          return null;
        }
      },
      logout: () => {
        localStorage.removeItem('adminToken');
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);