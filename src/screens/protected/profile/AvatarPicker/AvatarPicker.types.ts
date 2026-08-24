import type { UserProfile } from '@typings/api';

export type AvatarPickerProps = {
  profile: UserProfile | undefined;
  onProfileUpdate: (profile: UserProfile) => void;
};
