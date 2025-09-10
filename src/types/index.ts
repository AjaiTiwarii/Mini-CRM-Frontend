// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  joinedAt?: string;
}

// Segment Types
export interface SegmentRule {
  id: string;
  field: 'totalSpent' | 'orderCount' | 'lastOrderDate' | 'daysInactive';
  operator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' | 'neq';
  value: string | number;
  logicalOperator?: 'AND' | 'OR';
}

export interface Segment {
  id?: string;
  name: string;
  description?: string;
  rules: SegmentRule[];
  audienceSize?: number;
  createdAt?: string;
}

// Campaign Types
export interface Campaign {
  id: string;
  name: string;
  segmentName?: string;
  segmentId?: string;
  audienceSize: number;
  sentCount: number;
  failedCount: number;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  successRate?: string;
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