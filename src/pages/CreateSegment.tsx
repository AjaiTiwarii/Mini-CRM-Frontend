import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function CreateSegment() {
  const [segmentName, setSegmentName] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Audience Segment</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Segment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Segment Name"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Audience Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0 customers</p>
              <Button className="w-full mt-4" disabled>
                Launch Campaign
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
