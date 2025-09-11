// Additional types for data ingestion
export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  totalSpent: number;
  orderCount: number;
  lastOrderDate?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Order {
  id: string;
  customerId: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  orderDate: string;
  createdAt: string;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface DashboardStats {
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  successRate: number;
  recentCustomers: Customer[];
  recentOrders: Order[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Create customer/order request types
export interface CreateCustomerRequest {
  email: string;
  name: string;
  phone?: string;
}

export interface CreateOrderRequest {
  customerId?: string;
  customerEmail?: string;
  amount: number;
  status?: 'completed' | 'pending' | 'cancelled';
}

// Existing types (keep these if they exist)
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Segment {
  id: string;
  name: string;
  rules: SegmentRule[];
  audienceSize: number;
  createdAt: string;
}

export interface SegmentRule {
  field: string;
  operator: string;
  value: any;
}

export interface Campaign {
  id: string;
  name: string;
  segmentId: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  audienceSize: number;
  sentCount: number;
  failedCount: number;
  createdAt: string;
}