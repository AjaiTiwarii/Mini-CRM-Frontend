import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RuleBuilder } from '@/components/Segment/RuleBuilder';
import { AudiencePreview } from '@/components/Segment/AudiencePreview';
import { useCreateSegment } from '@/hooks/useApi';
import type { SegmentRule } from '@/types';
import toast from 'react-hot-toast';

export function CreateSegment() {
  const navigate = useNavigate();
  const [segmentName, setSegmentName] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState<SegmentRule[]>([]);
  const [audienceSize, setAudienceSize] = useState(0);
  
  const createSegment = useCreateSegment();

  const handleCreateSegment = async () => {
    if (!segmentName.trim()) {
      toast.error('Please enter a segment name');
      return;
    }
    
    if (rules.length === 0) {
      toast.error('Please add at least one rule');
      return;
    }

    if (audienceSize === 0) {
      toast.error('No customers match your criteria');
      return;
    }

    try {
      await createSegment.mutateAsync({
        name: segmentName.trim(),
        description: description.trim() || '',
        rules
      });
      
      toast.success('Segment created successfully!');
      navigate('/campaigns');
    } catch (error) {
      toast.error('Failed to create segment');
      console.error('Create segment error:', error);
    }
  };

  const onAudienceSizeChange = (size: number) => {
    setAudienceSize(size);
  };

  const isValid = segmentName.trim() && rules.length > 0 && audienceSize > 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create Audience Segment</h1>
        <Button variant="outline" onClick={() => navigate('/campaigns')}>
          Back to Campaigns
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Segment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Segment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Segment Name *</Label>
                <Input
                  id="name"
                  placeholder="High-value customers"
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Customers who spent more than ₹10,000"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Rule Builder */}
          <RuleBuilder rules={rules} onRulesChange={setRules} />
        </div>
        
        {/* Audience Preview */}
        <div>
          <AudiencePreview 
            rules={rules} 
            onAudienceSizeChange={onAudienceSizeChange}
          />
          <div className="mt-4">
            <Button 
              className="w-full" 
              onClick={handleCreateSegment}
              disabled={!isValid || createSegment.isPending}
            >
              {createSegment.isPending ? 'Creating...' : 'Create Segment'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}