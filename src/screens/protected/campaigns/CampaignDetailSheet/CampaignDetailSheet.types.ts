import type { Campaign } from '@typings/api';

export type CampaignDetailSheetProps = {
  campaign: Campaign | null;
  onClose: () => void;
};
