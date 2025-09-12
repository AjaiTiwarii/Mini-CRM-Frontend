// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  joinedAt?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success?: boolean;
  data: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

// Component Props Types
export interface CampaignCardProps {
  campaign: Campaign;
  onViewDetails?: (campaignId: string) => void;
}

export interface RuleBuilderProps {
  rules: SegmentRule[];
  onRulesChange: (rules: SegmentRule[]) => void;
}

export interface AudiencePreviewProps {
  rules: SegmentRule[];
}

// Form Types
export interface CreateSegmentForm {
  name: string;
  description?: string;
  rules: SegmentRule[];
}

export interface CreateCampaignForm {
  segmentId: string;
  name: string;
}

// Add these types to your existing types/index.ts file

export interface SegmentRule {
  id?: string;
  field: 'totalSpent' | 'orderCount' | 'lastOrderDate' | 'daysInactive';
  operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq';
  value: string | number;
  logicalOperator?: 'AND' | 'OR';
}

export interface Segment {
  id: string;
  name: string;
  description?: string;
  rules: SegmentRule[];
  audienceSize: number;
  createdAt: string;
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
  updatedAt: string;
  segment?: {
    name: string;
  };
}

export interface CommunicationLog {
  id: string;
  campaignId: string;
  customerId: string;
  message: string;
  status: 'PENDING' | 'SENT' | 'FAILED';
  sentAt?: string;
  failedAt?: string;
  failureReason?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  totalSpent: number;
  orderCount: number;
  lastOrderDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  amount: number;
  status: string;
  orderDate: string;
  createdAt: string;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
}