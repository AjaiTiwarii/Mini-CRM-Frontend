import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CampaignCard } from '@/components/Campaign/CampaignCard';
import { useCampaigns, useSegments, useCreateCampaign } from '@/hooks/useApi';
import { Plus, Bot, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { Campaign, Segment } from '@/types';

export function CampaignHistory() {
  const navigate = useNavigate();
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [selectedSegmentId, setSelectedSegmentId] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const { data: campaigns, isLoading: campaignsLoading } = useCampaigns();
  const { data: segments } = useSegments();
  const createCampaign = useCreateCampaign();

  const handleCreateCampaign = async () => {
    if (!campaignName.trim()) {
      toast.error('Please enter a campaign name');
      return;
    }
    if (!selectedSegmentId) {
      toast.error('Please select a segment');
      return;
    }

    try {
      await createCampaign.mutateAsync({
        segmentId: selectedSegmentId,
        name: campaignName.trim()
      });
      toast.success('Campaign created and launched successfully!');
      setShowCreateCampaign(false);
      setCampaignName('');
      setSelectedSegmentId('');
    } catch (error) {
      toast.error('Failed to create campaign');
      console.error('Create campaign error:', error);
    }
  };

  const handleViewDetails = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  // Filter campaigns based on status
  const filteredCampaigns = campaigns?.filter((campaign: Campaign) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'ai-ready') return campaign.status === 'COMPLETED';
    return campaign.status === statusFilter;
  }) || [];

  // Count campaigns by status for stats
  const campaignStats = campaigns?.reduce((acc: any, campaign: Campaign) => {
    acc.total = (acc.total || 0) + 1;
    acc[campaign.status.toLowerCase()] = (acc[campaign.status.toLowerCase()] || 0) + 1;
    if (campaign.status === 'COMPLETED') {
      acc.aiReady = (acc.aiReady || 0) + 1;
    }
    return acc;
  }, {}) || {};

  if (campaignsLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Campaign History</h1>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-32 bg-gray-100"></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Campaign History</h1>
          <p className="text-muted-foreground mt-1">
            Manage and analyze your marketing campaigns
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateCampaign(true)} 
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Campaign</span>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaignStats.total || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{campaignStats.completed || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{campaignStats.running || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Ready</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{campaignStats.aiReady || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Label htmlFor="status-filter" className="text-sm font-medium">Filter by status:</Label>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All campaigns" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="RUNNING">Running</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
            <SelectItem value="ai-ready">AI Ready</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaigns List */}
      {filteredCampaigns.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-muted-foreground">
              {campaigns?.length === 0 ? (
                <>
                  <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
                  <p className="mb-4">Create your first campaign to start reaching your customers</p>
                  <Button onClick={() => setShowCreateCampaign(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-2">No campaigns match your filter</h3>
                  <p>Try adjusting your filter criteria</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign: Campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Create Campaign Dialog */}
      <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input
                id="campaign-name"
                placeholder="Enter campaign name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="segment-select">Target Segment</Label>
              <Select value={selectedSegmentId} onValueChange={setSelectedSegmentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a segment" />
                </SelectTrigger>
                <SelectContent>
                  {segments?.map((segment: Segment) => (
                    <SelectItem key={segment.id} value={segment.id}>
                      {segment.name} ({segment.audienceSize.toLocaleString()} customers)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {segments?.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No segments available. Create a segment first.
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateCampaign(false)}
                disabled={createCampaign.isPending}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateCampaign}
                disabled={createCampaign.isPending || !segments?.length}
              >
                {createCampaign.isPending ? 'Creating...' : 'Create Campaign'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}