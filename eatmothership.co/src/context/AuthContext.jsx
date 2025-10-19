'use client';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock login - in production would call API
  const login = async (email, password) => {
    // Demo account check
    if (email === 'demo@mothership.com' && password === 'demo123') {
      const demoUser = {
        id: 'demo-user',
        email: 'demo@mothership.com',
        name: 'Sarah Johnson',
        firstName: 'Sarah',
        memberSince: 'January 2024',
        subscription: {
          status: 'active',
          nextDelivery: 'Wednesday, Oct 22',
          mealPlanSize: 12,
          totalSavings: 247.50,
          orders: 12,
          dayStreak: 45
        }
      };
      setUser(demoUser);
      setIsAuthenticated(true);
      return { success: true, user: demoUser };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = async (userData) => {
    // Mock signup
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      subscription: null
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true, user: newUser };
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
