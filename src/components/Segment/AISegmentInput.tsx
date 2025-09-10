import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { segmentAPI } from '@/services/api';
import type { SegmentRule } from '@/types';
import toast from 'react-hot-toast';

interface AISegmentInputProps {
  onRulesGenerated: (rules: SegmentRule[]) => void;
}

export function AISegmentInput({ onRulesGenerated }: AISegmentInputProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAIParsing = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description');
      return;
    }

    setLoading(true);
    try {
      const response = await segmentAPI.parseNaturalLanguage(prompt);
      onRulesGenerated(response.rules);
      toast.success('Rules generated successfully!');
      setPrompt('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to parse description');
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    "Customers who spent more than ₹10,000",
    "People with less than 3 orders AND spent over ₹5,000", 
    "Users inactive for more than 30 days"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Segment Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            placeholder="Describe your target audience in natural language..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAIParsing()}
          />
        </div>

        <Button 
          onClick={handleAIParsing} 
          disabled={!prompt.trim() || loading}
          className="w-full"
        >
          {loading ? 'Generating Rules...' : 'Generate Rules with AI'}
        </Button>

        <div className="text-xs text-gray-500">
          <div className="font-medium mb-2">Try these examples:</div>
          {examples.map((example, index) => (
            <div 
              key={index}
              className="cursor-pointer hover:text-blue-600 mb-1"
              onClick={() => setPrompt(example)}
            >
              • {example}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}