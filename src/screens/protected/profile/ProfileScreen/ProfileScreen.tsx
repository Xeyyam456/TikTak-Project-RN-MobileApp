import { useMemo } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import ConfirmModal from '@shared/components/ConfirmModal';
import ErrorState from '@shared/components/ErrorState';
import { LogoutIcon } from '@shared/icons';
import useReload from '@shared/hooks/useReload';
import { getProfile } from '@shared/services/profile.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { getApiErrorMessage } from '@shared/utils/apiError';
import ProfileHeader from '../ProfileHeader';
import ProfileMenu from '../ProfileMenu';
import useLogout from '../hooks/useLogout';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './ProfileScreen.styles';

function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  const {
    data: profile,
    isPending: loading,
    error: queryError,
    refetch,
  } = useQuery({ queryKey: queryKeys.profile, queryFn: getProfile });
  const error = queryError ? getApiErrorMessage(queryError) : undefined;

  const { refreshing, onRefresh } = useReload(refetch);
  const logoutFlow = useLogout();

  return (
    <View style={styles.flex}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.title}>{t('profile.title')}</Text>

        {error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : loading ? (
          <ActivityIndicator color={colors.primary} style={styles.loader} />
        ) : (
          <ProfileHeader profile={profile} />
        )}

        <ProfileMenu onLogoutPress={logoutFlow.open} />
      </ScrollView>

      <ConfirmModal
        visible={logoutFlow.modalVisible}
        icon={<LogoutIcon size={28} color={colors.danger} />}
        title={t('profile.logout')}
        message={t('profile.logoutConfirmMessage')}
        confirmLabel={t('profile.logout')}
        destructive
        loading={logoutFlow.loggingOut}
        onConfirm={logoutFlow.confirmLogout}
        onCancel={logoutFlow.close}
      />
    </View>
  );
}

export default ProfileScreen;
