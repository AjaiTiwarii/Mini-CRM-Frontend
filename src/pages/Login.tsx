import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authAPI } from '@/services/api';

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Mini CRM</CardTitle>
          <CardDescription>
            Sign in to access your customer management platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={authAPI.loginWithGoogle}
            className="w-full"
            size="lg"
          >
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
