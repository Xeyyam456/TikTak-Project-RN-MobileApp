import type { UserProfile } from '@typings/api';

export type AddressEditModalProps = {
  visible: boolean;
  profile: UserProfile | undefined;
  onClose: () => void;
  onSaved: (profile: UserProfile) => void;
};
