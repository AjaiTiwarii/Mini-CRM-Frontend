import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { segmentAPI, campaignAPI } from '@/services/api';
import type { Segment, SegmentRule, Campaign } from '@/types';

// Segments
export function useSegments() {
  return useQuery({
    queryKey: ['segments'],
    queryFn: segmentAPI.getSegments, // Returns Segment[] directly
  });
}

export function useCreateSegment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: segmentAPI.createSegment, // Returns Segment directly
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['segments'] });
    },
  });
}

export function usePreviewAudience() {
  return useMutation({
    mutationFn: segmentAPI.previewAudience, // Returns { audienceSize: number } directly
  });
}

// Campaigns
export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: campaignAPI.getCampaigns, // Returns Campaign[] directly
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (campaignData: { segmentId: string; name: string }) => {
      return await campaignAPI.launchCampaign(campaignData.segmentId, campaignData.name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}

// AI Integration
export function useParseNaturalLanguage() {
  return useMutation({
    mutationFn: segmentAPI.parseNaturalLanguage, // Returns { rules: SegmentRule[] } directly
  });
}