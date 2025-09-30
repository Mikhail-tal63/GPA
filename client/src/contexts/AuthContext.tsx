import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

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
  try {
    const res = await axios.post(
      "http://localhost:4000/api/auth/login",
      { email, password },
      { withCredentials: true } // لو الكوكيز تستخدم للتحقق من الجلسة
    );

    const userData = res.data.user; // تأكد من اسم الـ user في response
    setUser(userData);

    // إذا تحب تخزن توكن
    localStorage.setItem("authToken", res.data.token);
    localStorage.setItem("userData", JSON.stringify(userData));
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
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
