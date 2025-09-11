import React from 'react';
import { Header } from './Header';

interface NavigationItem {
  name: string;
  href: string;
}

interface LayoutProps {
  children: React.ReactNode;
  navigationItems?: NavigationItem[];
}

export function Layout({ children, navigationItems }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header navigationItems={navigationItems} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}