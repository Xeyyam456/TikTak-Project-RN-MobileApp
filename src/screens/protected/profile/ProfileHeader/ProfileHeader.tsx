import { useMemo } from 'react';
import { Text } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@shared/queries/queryKeys';
import type { UserProfile } from '@typings/api';
import AvatarPicker from '../AvatarPicker';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './ProfileHeader.styles';
import type { ProfileHeaderProps } from './ProfileHeader.types';

function ProfileHeader({ profile }: ProfileHeaderProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const queryClient = useQueryClient();

  // A finished avatar upload returns the whole updated profile, so it is
  // written straight into the query cache instead of triggering a refetch.
  function handleProfileUpdate(updated: UserProfile) {
    queryClient.setQueryData(queryKeys.profile, updated);
  }

  return (
    <>
      <AvatarPicker profile={profile} onProfileUpdate={handleProfileUpdate} />
      <Text style={styles.name}>{profile?.full_name}</Text>
      <Text style={styles.phone}>{profile?.phone}</Text>
    </>
  );
}

export default ProfileHeader;
