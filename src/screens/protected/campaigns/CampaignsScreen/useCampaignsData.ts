import { useQuery } from '@tanstack/react-query';
import { listCampaigns } from '@shared/services/campaign.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { getApiErrorMessage } from '@shared/utils/apiError';

export function useCampaignsData() {
  const campaignsQuery = useQuery({
    queryKey: queryKeys.campaigns,
    queryFn: listCampaigns,
  });

  const campaigns = campaignsQuery.data ?? [];
  const loading = campaignsQuery.isPending;
  const error = campaignsQuery.error
    ? getApiErrorMessage(campaignsQuery.error)
    : undefined;

  return {
    campaigns,
    loading,
    error,
    retry: campaignsQuery.refetch,
  };
}
