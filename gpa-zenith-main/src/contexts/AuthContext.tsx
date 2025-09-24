import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  privacy: boolean;
  status: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load mock user from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Mock logged-in user
      const storedUser = localStorage.getItem('userData');
      if (storedUser) setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 500));

    // Mock users
    const mockUsers: User[] = [
      { id: '1', name: 'Ahmed Ali', email: 'ahmed.ali@university.edu', privacy: false, status: 'Studying for finals' },
      { id: '2', name: 'Sara Mohammed', email: 'sara.mohammed@university.edu', privacy: true, status: 'Computer Science major' },
    ];

    const foundUser = mockUsers.find(u => u.email === email);
    if (!foundUser) throw new Error('Invalid credentials');

    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('userData', JSON.stringify(foundUser));
    setUser(foundUser);
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise((res) => setTimeout(res, 500));

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      privacy: false,
      status: 'New student',
    };

    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('userData', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...userData };
      setUser(updated);
      localStorage.setItem('userData', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
