import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { listCampaigns } from '@shared/services/campaign.service';
import { listCategories } from '@shared/services/category.service';
import { getProfile } from '@shared/services/profile.service';
import type { Campaign, Category, UserProfile } from '@typings/api';

const CAMPAIGN_AUTOPLAY_MS = 3000;

export function useHomeData() {
  const [profile, setProfile] = useState<UserProfile>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const campaignListRef = useRef<FlatList<Campaign>>(null);
  const campaignIndexRef = useRef(0);

  useEffect(() => {
    Promise.all([getProfile(), listCategories(), listCampaigns()])
      .then(([profileData, categoryList, campaignList]) => {
        setProfile(profileData);
        setCategories(categoryList);
        setCampaigns(campaignList);
      })
      .finally(() => setLoading(false));
  }, []);

  // HomeScreen stays mounted while switching tabs, so without this the
  // address shown here (and used as the checkout default) would go stale
  // after editing it from Hesabım → Hesab məlumatlarım.
  useFocusEffect(
    useCallback(() => {
      getProfile().then(setProfile);
    }, []),
  );

  useEffect(() => {
    if (campaigns.length <= 1) return;
    const interval = setInterval(() => {
      campaignIndexRef.current = (campaignIndexRef.current + 1) % campaigns.length;
      campaignListRef.current?.scrollToIndex({
        index: campaignIndexRef.current,
        animated: true,
      });
    }, CAMPAIGN_AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [campaigns]);

  return { profile, setProfile, categories, campaigns, loading, campaignListRef };
}
