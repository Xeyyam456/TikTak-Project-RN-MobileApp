import type { RefObject } from 'react';
import type { FlatList } from 'react-native';
import type { Campaign } from '@typings/api';

export type HomeFixedHeaderProps = {
  address: string | null | undefined;
  campaigns: Campaign[];
  campaignListRef: RefObject<FlatList<Campaign> | null>;
  onAddressPress: () => void;
  onCampaignPress: () => void;
};
