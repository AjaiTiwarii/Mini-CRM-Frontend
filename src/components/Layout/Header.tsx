import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { authAPI } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

interface NavigationItem {
  name: string;
  href: string;
}

interface HeaderProps {
  navigationItems?: NavigationItem[];
}

export function Header({ navigationItems }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      logout();
      localStorage.removeItem('auth_token');
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  // Check if current path matches navigation item
  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Mini CRM
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          {navigationItems?.map(item => (
            <Link 
              key={item.href} 
              to={item.href} 
              className={`font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Info and Logout */}
        {user && (
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Welcome, {user.name}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}