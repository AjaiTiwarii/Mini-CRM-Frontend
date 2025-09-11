import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalSpent: number;
  orderCount: number;
  createdAt: string;
}

interface RecentCustomersProps {
  customers: Customer[];
  loading?: boolean;
}

export function RecentCustomers({ customers, loading }: RecentCustomersProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customers.length > 0 ? (
            customers.slice(0, 5).map((customer) => (
              <div key={customer.id} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{customer.name}</div>
                    <div className="text-xs text-muted-foreground">{customer.email}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {formatCurrency(customer.totalSpent)}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {customer.orderCount} orders
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <div className="text-sm">No customers yet</div>
              <div className="text-xs">Add your first customer to get started</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}