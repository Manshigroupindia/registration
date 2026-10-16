import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { authService, AuthState } from '../services/authService';

interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(authService.getInitialState());

  const login = async (email: string, pass: string) => {
    setState((prev) => ({ ...prev, loading: true }));
    const res = await authService.login(email, pass);
    if (res.success && res.user) {
      setState({ isAuthenticated: true, user: res.user, loading: false });
      return { success: true };
    } else {
      setState((prev) => ({ ...prev, loading: false }));
      return { success: false, error: res.error };
    }
  };

  const logout = async () => {
    await authService.logout();
    setState({ isAuthenticated: false, user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
