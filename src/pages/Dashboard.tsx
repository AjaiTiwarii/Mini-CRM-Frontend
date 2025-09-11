import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, MessageSquare, BarChart3, TrendingUp, Database, ShoppingCart } from 'lucide-react';
import { useStats, useCustomers, useOrders } from '@/hooks/useApi';
import { AddCustomerDialog } from '@/components/Data/AddCustomerDialog';
import { AddOrderDialog } from '@/components/Data/AddOrderDialog';
import { RecentCustomers } from '@/components/Data/RecentCustomers';
import { RecentOrders } from '@/components/Data/RecentOrders';

// Add type definitions for Customer and Order if not in @/types
interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalSpent: number;
  orderCount: number;
  createdAt: string;
  lastOrderDate?: string;
}

interface Order {
  id: string;
  customerId: string;
  amount: number;
  status: string;
  orderDate: string;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
}

export function Dashboard() {
  const navigate = useNavigate();
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showAddOrder, setShowAddOrder] = useState(false);

  // Fetch real data from API
  const { data: stats, isLoading: statsLoading, error: statsError } = useStats();
  const { data: customersData, isLoading: customersLoading } = useCustomers();
  const { data: ordersData, isLoading: ordersLoading } = useOrders();

  // Loading state for the main stats
  if (statsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (statsError) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-red-600 text-center">
              <p className="font-medium">Failed to load dashboard data</p>
              <p className="text-sm mt-1">Please check your connection and try again</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline" 
                className="mt-4"
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAddCustomer(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
          <Button variant="outline" onClick={() => setShowAddOrder(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Order
          </Button>
          <Button onClick={() => navigate('/create-segment')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Segment
          </Button>
        </div>
      </div>

      {/* Stats Cards with Real Data */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats?.totalCustomers || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Active customer base
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats?.totalOrders || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Orders processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats?.totalRevenue || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Total sales value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats?.avgOrderValue || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Per transaction average
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAddCustomer(true)}
              className="w-full justify-start"
            >
              <Users className="mr-2 h-4 w-4" />
              Add New Customer
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAddOrder(true)}
              className="w-full justify-start"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Create New Order
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/create-segment')}
              className="w-full justify-start"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Segment
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/campaigns')}
              className="w-full justify-start"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              View Campaign History
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest customer and order activity</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Show recent customers and orders */}
            <div className="space-y-3">
              {stats?.recentCustomers?.slice(0, 2).map((customer: Customer) => (
                <div key={customer.id} className="flex justify-between text-sm">
                  <span>New customer: {customer.name}</span>
                  <span className="text-muted-foreground">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )) || (
                <div className="text-sm text-muted-foreground">No recent customers</div>
              )}
              
              {stats?.recentOrders?.slice(0, 2).map((order: Order) => (
                <div key={order.id} className="flex justify-between text-sm">
                  <span>Order: {formatCurrency(order.amount)}</span>
                  <span className="text-muted-foreground">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                </div>
              )) || (
                <div className="text-sm text-muted-foreground">No recent orders</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Data Tables */}
      <div className="grid gap-4 md:grid-cols-2">
        <RecentCustomers 
          customers={stats?.recentCustomers || []} 
          loading={customersLoading}
        />
        <RecentOrders 
          orders={stats?.recentOrders || []} 
          loading={ordersLoading}
        />
      </div>

      {/* Dialogs */}
      <AddCustomerDialog 
        open={showAddCustomer} 
        onClose={() => setShowAddCustomer(false)} 
      />
      <AddOrderDialog 
        open={showAddOrder} 
        onClose={() => setShowAddOrder(false)} 
      />
    </div>
  );
}