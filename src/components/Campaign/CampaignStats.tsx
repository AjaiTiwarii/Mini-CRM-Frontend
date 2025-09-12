import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Campaign } from '@/types';

interface CampaignStatsProps {
  campaign: Campaign;
  deliveryStats?: {
    sent: number;
    failed: number;
    pending: number;
    delivered?: number;
    bounced?: number;
  };
}

export function CampaignStats({ campaign, deliveryStats }: CampaignStatsProps) {
  const successRate = campaign.audienceSize > 0 
    ? ((campaign.sentCount / campaign.audienceSize) * 100).toFixed(1)
    : '0';

  const completionRate = campaign.audienceSize > 0
    ? (((campaign.sentCount + campaign.failedCount) / campaign.audienceSize) * 100).toFixed(1)
    : '0';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-600';
      case 'RUNNING': return 'text-blue-600';
      case 'PENDING': return 'text-yellow-600';
      case 'FAILED': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Campaign Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{campaign.name}</CardTitle>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
              {campaign.status}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {campaign.audienceSize.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Target Audience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {campaign.sentCount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Messages Sent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {campaign.failedCount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Failed Deliveries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {successRate}%
              </div>
              <div className="text-sm text-gray-500">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Details */}
      {deliveryStats && (
        <Card>
          <CardHeader>
            <CardTitle>Delivery Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-lg font-semibold text-green-600">
                  {deliveryStats.sent.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Sent Successfully</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-lg font-semibold text-red-600">
                  {deliveryStats.failed.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Failed Deliveries</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-lg font-semibold text-yellow-600">
                  {deliveryStats.pending.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion Rate</span>
              <span>{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 text-center">
              {(campaign.sentCount + campaign.failedCount).toLocaleString()} of {campaign.audienceSize.toLocaleString()} processed
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}