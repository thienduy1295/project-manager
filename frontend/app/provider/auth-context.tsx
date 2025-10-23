import { publicRoutes } from '@/lib';
import type { User } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { queryClient } from './react-query-provider';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const isPublicRoute = publicRoutes.includes(currentPath);

  // check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);

      const userInfo = localStorage.getItem('user');
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (userInfo && accessToken && refreshToken) {
        setUser(JSON.parse(userInfo));
        setIsAuthenticated(true);
      } else {
        // Clear any partial auth data
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        if (!isPublicRoute) {
          navigate('/sign-in');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (data: any) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    setUser(data.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    // Call logout API to revoke refresh token
    if (refreshToken) {
      try {
        await fetch('/api-v1/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (error) {
        console.error('Logout API call failed:', error);
      }
    }

    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setUser(null);
    setIsAuthenticated(false);

    queryClient.clear();
  };

  useEffect(() => {
    const handleLogout = () => {
      console.log('🔒 Auto-logout triggered - Clearing session');

      // Clear storage immediately
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      // Clear state immediately
      setUser(null);
      setIsAuthenticated(false);

      // Clear React Query cache
      queryClient.clear();

      // Navigate to sign-in
      navigate('/sign-in');
    };

    window.addEventListener('force-logout', handleLogout);
    return () => window.removeEventListener('force-logout', handleLogout);
  }, [navigate]);

  const values = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
