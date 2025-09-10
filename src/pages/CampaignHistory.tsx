import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CampaignHistory() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Campaign History</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Campaigns</CardTitle>
          <CardDescription>View all your past and active campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No campaigns yet. Create your first segment to get started!</p>
        </CardContent>
      </Card>
    </div>
  );
}
