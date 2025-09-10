import React from 'react';
import { Button } from '@/components/ui/button';

interface LoginButtonProps {
  className?: string;
  size?: 'sm' | 'lg' | 'default';
}

export function LoginButton({ className, size = 'default' }: LoginButtonProps) {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <Button 
      onClick={handleGoogleLogin}
      className={className}
      size={size}
    >
      Continue with Google
    </Button>
  );
}