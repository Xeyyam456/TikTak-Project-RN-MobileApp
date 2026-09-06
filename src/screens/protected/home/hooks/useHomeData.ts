import { useCallback, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { listCampaigns } from '@shared/services/campaign.service';
import { listCategories } from '@shared/services/category.service';
import { getProfile } from '@shared/services/profile.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { getApiErrorMessage } from '@shared/utils/apiError';
import type { Campaign, UserProfile } from '@typings/api';

const CAMPAIGN_AUTOPLAY_MS = 3000;

export function useHomeData() {
  const queryClient = useQueryClient();

  const [profileQuery, categoriesQuery, campaignsQuery] = useQueries({
    queries: [
      { queryKey: queryKeys.profile, queryFn: getProfile },
      { queryKey: queryKeys.categories, queryFn: listCategories },
      { queryKey: queryKeys.campaigns, queryFn: listCampaigns },
    ],
  });

  const profile = profileQuery.data;
  const categories = categoriesQuery.data ?? [];
  // campaignsQuery.data itself is a stable reference across renders (Query
  // only replaces it when the data actually changes) — ?? [] would allocate
  // a fresh array every render instead and retrigger the autoplay effect
  // below on every render, so keep the raw reference for that dependency.
  const rawCampaigns = campaignsQuery.data;
  const campaigns = rawCampaigns ?? [];
  const loading =
    profileQuery.isPending || categoriesQuery.isPending || campaignsQuery.isPending;
  const firstError =
    profileQuery.error ?? categoriesQuery.error ?? campaignsQuery.error;
  const error = firstError ? getApiErrorMessage(firstError) : undefined;

  const retry = useCallback(() => {
    return Promise.all([
      profileQuery.refetch(),
      categoriesQuery.refetch(),
      campaignsQuery.refetch(),
    ]);
  }, [profileQuery, categoriesQuery, campaignsQuery]);

  function setProfile(updated: UserProfile) {
    queryClient.setQueryData(queryKeys.profile, updated);
  }

  const campaignListRef = useRef<FlatList<Campaign>>(null);
  const campaignIndexRef = useRef(0);

  // HomeScreen stays mounted while switching tabs, so without this the
  // address shown here (and used as the checkout default) would go stale
  // after editing it from Hesabım → Hesab məlumatlarım. Fetched imperatively
  // (not via invalidateQueries) and written straight into the cache so a
  // failure here can't flip profileQuery.error and blow away a screen that
  // already has perfectly good data — this is a background sync, not the
  // primary load.
  useFocusEffect(
    useCallback(() => {
      getProfile()
        .then(data => queryClient.setQueryData(queryKeys.profile, data))
        .catch(() => {});
    }, [queryClient]),
  );

  useEffect(() => {
    if (!rawCampaigns || rawCampaigns.length <= 1) return;
    const interval = setInterval(() => {
      campaignIndexRef.current = (campaignIndexRef.current + 1) % rawCampaigns.length;
      campaignListRef.current?.scrollToIndex({
        index: campaignIndexRef.current,
        animated: true,
      });
    }, CAMPAIGN_AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [rawCampaigns]);

  return {
    profile,
    setProfile,
    categories,
    campaigns,
    loading,
    error,
    retry,
    campaignListRef,
  };
}
