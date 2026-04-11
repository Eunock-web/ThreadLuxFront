import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type User, authService } from '../services/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: any) => Promise<any>;
  adminLogin: (credentials: any) => Promise<any>;
  register: (userData: any) => Promise<any>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials: any) => {
    const response = await authService.login(credentials);
    if (response.success && response.user) {
      setUser(response.user);
    }
    return response;
  };

  const adminLogin = async (credentials: any) => {
    const response = await authService.adminLogin(credentials);
    if (response.success && response.user) {
      setUser(response.user);
    }
    return response;
  };

  const register = async (userData: any) => {
    const response = await authService.register(userData);
    if (response.success && response.user) {
      setUser(response.user);
    }
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    adminLogin,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
