// import React from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// export function CampaignHistory() {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Campaign History</h1>
      
//       <Card>
//         <CardHeader>
//           <CardTitle>Your Campaigns</CardTitle>
//           <CardDescription>View all your past and active campaigns</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground">No campaigns yet. Create your first segment to get started!</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CampaignCard } from '@/components/Campaign/CampaignCard';
import { useCampaigns, useSegments, useCreateCampaign } from '@/hooks/useApi';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { Campaign, Segment } from '@/types';

export function CampaignHistory() {
  const navigate = useNavigate();
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [selectedSegmentId, setSelectedSegmentId] = useState('');

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Campaign History</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/create-segment')}>
            Create Segment
          </Button>
          <Button onClick={() => setShowCreateCampaign(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Launch Campaign
          </Button>
        </div>
      </div>
      
      {campaigns && campaigns.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign: Campaign) => (
            <CampaignCard 
              key={campaign.id} 
              campaign={campaign}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Campaigns</CardTitle>
            <CardDescription>View all your past and active campaigns</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">No campaigns yet.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" onClick={() => navigate('/create-segment')}>
                Create Your First Segment
              </Button>
              <Button onClick={() => setShowCreateCampaign(true)}>
                Launch Campaign
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Campaign Dialog */}
      <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Launch New Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="campaign-name">Campaign Name *</Label>
              <Input
                id="campaign-name"
                placeholder="Spring Sale Campaign"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Select Segment *</Label>
              <Select value={selectedSegmentId} onValueChange={setSelectedSegmentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a segment" />
                </SelectTrigger>
                <SelectContent>
                  {segments?.map((segment: Segment) => (
                    <SelectItem key={segment.id} value={segment.id}>
                      {segment.name} ({segment.audienceSize} customers)
                    </SelectItem>
                  )) || (
                    <div className="p-2 text-sm text-gray-500">
                      No segments available. Create one first.
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateCampaign(false)}
                disabled={createCampaign.isPending}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateCampaign}
                disabled={!campaignName.trim() || !selectedSegmentId || createCampaign.isPending}
              >
                {createCampaign.isPending ? 'Launching...' : 'Launch Campaign'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}