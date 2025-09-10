import { useState, useEffect } from 'react';
import { authAPI } from '@/services/api';
import type { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // API returns User directly, not wrapped in data
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
    } catch (error) {
      setUser(null);
      // Clear stored token on auth failure
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout failed:', error);
      // Force logout even if API call fails
      setUser(null);
      localStorage.removeItem('auth_token');
    }
  };

  return {
    user,
    loading,
    logout,
    isAuthenticated: !!user,
    checkAuthStatus, // Export for manual refresh
  };
}