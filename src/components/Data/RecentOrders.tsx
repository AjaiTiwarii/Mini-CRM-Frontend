import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  amount: number;
  status: string;
  orderDate: string;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
}

interface RecentOrdersProps {
  orders: Order[];
  loading?: boolean;
}

export function RecentOrders({ orders, loading }: RecentOrdersProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-600 hover:bg-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600 hover:bg-yellow-100';
      case 'cancelled':
        return 'bg-red-100 text-red-600 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-600 hover:bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between space-x-4 animate-pulse">
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
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
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="font-medium text-sm">
                      {formatCurrency(order.amount)}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {order.customer ? (
                      <>
                        {order.customer.name} • {formatDate(order.orderDate)}
                      </>
                    ) : (
                      formatDate(order.orderDate)
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">
                    #{order.id.slice(-6)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <div className="text-sm">No orders yet</div>
              <div className="text-xs">Create your first order to get started</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}