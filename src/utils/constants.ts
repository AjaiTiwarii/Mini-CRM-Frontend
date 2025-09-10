export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Mini CRM';

export const SEGMENT_FIELDS = [
  { value: 'totalSpent', label: 'Total Spent (₹)' },
  { value: 'orderCount', label: 'Order Count' },
  { value: 'lastOrderDate', label: 'Last Order Date' },
  { value: 'daysInactive', label: 'Days Inactive' },
];

export const OPERATORS = [
  { value: 'gt', label: 'Greater than' },
  { value: 'gte', label: 'Greater than or equal' },
  { value: 'lt', label: 'Less than' },
  { value: 'lte', label: 'Less than or equal' },
  { value: 'eq', label: 'Equal to' },
  { value: 'neq', label: 'Not equal to' },
];

export const LOGICAL_OPERATORS = [
  { value: 'AND', label: 'AND' },
  { value: 'OR', label: 'OR' },
];
