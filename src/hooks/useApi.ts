import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { segmentAPI, campaignAPI, dataAPI } from '@/services/api';
import type { Segment, SegmentRule, Campaign } from '@/types';

// ==================== DATA INGESTION HOOKS ====================

// Dashboard Stats
export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: dataAPI.getStats,
    staleTime: 30000, // 30 seconds
    select: (data) => data.data, // Extract data from API response
  });
}

// Customers
export function useCustomers() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: dataAPI.getCustomers,
    staleTime: 60000, // 1 minute
    select: (data) => data.data, // Extract { customers, total }
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: dataAPI.createCustomer,
    onSuccess: () => {
      // Invalidate and refetch related data
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
    onError: (error) => {
      console.error('Failed to create customer:', error);
    }
  });
}

// Orders
export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: dataAPI.getOrders,
    staleTime: 60000, // 1 minute
    select: (data) => data.data, // Extract { orders, total }
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: dataAPI.createOrder,
    onSuccess: () => {
      // Invalidate and refetch related data
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
    onError: (error) => {
      console.error('Failed to create order:', error);
    }
  });
}

// ==================== EXISTING SEGMENT/CAMPAIGN HOOKS ====================

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