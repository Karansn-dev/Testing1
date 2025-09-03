import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AssessmentResult } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  language: 'en' | 'hi' | 'ta';
  setLanguage: (lang: 'en' | 'hi' | 'ta') => void;
  assessmentResult: AssessmentResult | null;
  setAssessmentResult: (result: AssessmentResult | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi' | 'ta'>('en');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production this would hit an API
    if (email === 'admin@college.edu' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'System Admin',
        email,
        language,
        joinedAt: new Date().toISOString()
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        language,
        setLanguage,
        assessmentResult,
        setAssessmentResult,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};