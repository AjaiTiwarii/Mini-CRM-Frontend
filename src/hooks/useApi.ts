import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { segmentAPI, campaignAPI, dataAPI } from '@/services/api';

// DATA INGESTION HOOKS 
export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: dataAPI.getStats,
    staleTime: 30000,
    select: (data) => data.data,
  });
}

export function useCustomers() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: dataAPI.getCustomers,
    staleTime: 60000,
    select: (data) => data.data,
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dataAPI.createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: dataAPI.getOrders,
    staleTime: 60000,
    select: (data) => data.data,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dataAPI.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

// SEGMENT HOOKS 
export function useSegments() {
  return useQuery({
    queryKey: ['segments'],
    queryFn: segmentAPI.getSegments,
    select: (data) => data.data?.segments || [],
  });
}

export function useCreateSegment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: segmentAPI.createSegment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['segments'] });
    },
  });
}

export function usePreviewAudience() {
  return useMutation({
    mutationFn: segmentAPI.previewAudience,
  });
}

// CAMPAIGN HOOKS 
export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: campaignAPI.getCampaigns,
    select: (data) => data.data?.campaigns || [],
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: campaignAPI.createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}

export function useCampaignDetails(campaignId: string) {
  return useQuery({
    queryKey: ['campaigns', campaignId],
    queryFn: () => campaignAPI.getCampaignDetails(campaignId),
    select: (data) => data.data?.campaign,
    enabled: !!campaignId,
  });
}