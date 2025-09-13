import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bot, Loader2, MessageSquare, Users } from 'lucide-react';
import { CampaignStats } from '@/components/Campaign/CampaignStats';
import { AIInsights } from '@/components/Campaign/AIInsights';
import { useCampaignDetails, useCampaignInsights } from '@/hooks/useApi';


export function CampaignDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: campaign, isLoading: campaignLoading } = useCampaignDetails(id!);
  const { 
    data: insights, 
    isLoading: insightsLoading, 
    refetch: refetchInsights,
    error: insightsError 
  } = useCampaignInsights(id!, campaign?.status === 'COMPLETED');

  if (campaignLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/campaigns')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/campaigns')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Campaign not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-700';
      case 'RUNNING': return 'bg-blue-100 text-blue-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'FAILED': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/campaigns')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Campaigns
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{campaign.name}</h1>
            <div className="flex items-center space-x-3 mt-1">
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Created {formatDate(campaign.createdAt)}
              </span>
            </div>
          </div>
        </div>
        
        {campaign.status === 'COMPLETED' && (
          <Button
            variant="outline"
            onClick={() => refetchInsights()}
            disabled={insightsLoading}
            className="flex items-center space-x-2"
          >
            {insightsLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
            <span>Refresh Insights</span>
          </Button>
        )}
      </div>

      {/* Campaign Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Audience</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.audienceSize.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">customers targeted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{campaign.sentCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {campaign.audienceSize > 0 ? 
                `${((campaign.sentCount / campaign.audienceSize) * 100).toFixed(1)}% success rate` : 
                '0% success rate'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Deliveries</CardTitle>
            <MessageSquare className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{campaign.failedCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {campaign.audienceSize > 0 ? 
                `${((campaign.failedCount / campaign.audienceSize) * 100).toFixed(1)}% failure rate` : 
                '0% failure rate'
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      {campaign.status === 'COMPLETED' && (
        <AIInsights 
          campaignId={campaign.id}
          insights={insights}
          loading={insightsLoading}
          error={insightsError}
          onRetry={() => refetchInsights()}
        />
      )}

      {/* Detailed Stats */}
      <CampaignStats campaign={campaign} />
    </div>
  );
}