import type { UserProfile } from '@typings/api';

export type AccountInfoFormProps = {
  profile: UserProfile | undefined;
  refreshing: boolean;
  onRefresh: () => void;
};
