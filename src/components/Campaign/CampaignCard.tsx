import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Bot } from 'lucide-react';
import type { Campaign } from '@/types';

interface CampaignCardProps {
  campaign: Campaign;
  onViewDetails?: (campaignId: string) => void;
}

export function CampaignCard({ campaign, onViewDetails }: CampaignCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-600 bg-green-100';
      case 'RUNNING': return 'text-blue-600 bg-blue-100';
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      case 'FAILED': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const successRate = campaign.audienceSize > 0 
    ? ((campaign.sentCount / campaign.audienceSize) * 100).toFixed(1)
    : '0';

  const isCompleted = campaign.status === 'COMPLETED';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{campaign.name}</CardTitle>
          <div className="flex items-center space-x-2">
            {isCompleted && (
              <div className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                <Bot className="h-3 w-3 mr-1" />
                <span className="text-xs font-medium">AI Ready</span>
              </div>
            )}
            <Badge className={`${getStatusColor(campaign.status)}`}>
              {campaign.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Audience Size</div>
            <div className="font-semibold">{campaign.audienceSize.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-500">Success Rate</div>
            <div className="font-semibold">{successRate}%</div>
          </div>
          <div>
            <div className="text-gray-500">Messages Sent</div>
            <div className="font-semibold text-green-600">{campaign.sentCount.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-500">Failed</div>
            <div className="font-semibold text-red-600">{campaign.failedCount.toLocaleString()}</div>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Created: {new Date(campaign.createdAt).toLocaleDateString()}
        </div>

        {onViewDetails && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(campaign.id)}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
            {isCompleted && <Bot className="h-4 w-4 text-blue-600" />}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}