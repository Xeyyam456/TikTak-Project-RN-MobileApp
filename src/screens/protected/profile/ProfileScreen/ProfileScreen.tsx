import { useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ConfirmModal from '@shared/components/ConfirmModal';
import ErrorState from '@shared/components/ErrorState';
import {
  ClockIcon,
  DocumentIcon,
  HeartIcon,
  LogoutIcon,
  SettingsIcon,
} from '@shared/components/icons';
import useReload from '@shared/hooks/useReload';
import { logout } from '@shared/services/auth.service';
import { getProfile } from '@shared/services/profile.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showSuccessToast } from '@shared/utils/toast';
import type { ProfileStackParamList, RootStackParamList } from '@typings/navigation';
import type { UserProfile } from '@typings/api';
import AvatarPicker from '../AvatarPicker';
import MenuRow from '../MenuRow';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './ProfileScreen.styles';

function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    data: profile,
    isPending: loading,
    error: queryError,
    refetch,
  } = useQuery({ queryKey: queryKeys.profile, queryFn: getProfile });
  const error = queryError ? getApiErrorMessage(queryError) : undefined;

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { refreshing, onRefresh } = useReload(refetch);

  function setProfile(updated: UserProfile) {
    queryClient.setQueryData(queryKeys.profile, updated);
  }

  async function handleConfirmLogout() {
    setLoggingOut(true);
    await logout();
    // Drops cached profile/orders/favorites/basket data from both memory
    // and the MMKV-persisted query cache — otherwise a different user
    // logging in on the same device could see the previous user's data
    // offline, before their own queries have refetched.
    queryClient.clear();
    showSuccessToast(t('profile.logoutSuccessToast'));
    navigation
      .getParent<NativeStackNavigationProp<RootStackParamList>>()
      ?.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  }

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
          <>
            <AvatarPicker profile={profile} onProfileUpdate={setProfile} />
            <Text style={styles.name}>{profile?.full_name}</Text>
            <Text style={styles.phone}>{profile?.phone}</Text>
          </>
        )}

        <View style={styles.menu}>
          <MenuRow
            icon={<DocumentIcon size={22} />}
            label={t('profile.accountInfo')}
            onPress={() => navigation.navigate('AccountInfo')}
          />
          <MenuRow
            icon={<HeartIcon size={22} />}
            label={t('profile.myLists')}
            onPress={() => navigation.navigate('MyLists')}
          />
          <MenuRow
            icon={<ClockIcon size={22} />}
            label={t('profile.orderHistory')}
            onPress={() => navigation.navigate('OrderHistory')}
          />
          <MenuRow
            icon={<SettingsIcon size={22} />}
            label={t('settings.title')}
            onPress={() => navigation.navigate('Settings')}
          />
          <MenuRow
            icon={<LogoutIcon size={22} />}
            label={t('profile.logout')}
            onPress={() => setLogoutModalVisible(true)}
          />
        </View>
      </ScrollView>

      <ConfirmModal
        visible={logoutModalVisible}
        icon={<LogoutIcon size={28} color={colors.danger} />}
        title={t('profile.logout')}
        message={t('profile.logoutConfirmMessage')}
        confirmLabel={t('profile.logout')}
        destructive
        loading={loggingOut}
        onConfirm={handleConfirmLogout}
        onCancel={() => setLogoutModalVisible(false)}
      />
    </View>
  );
}

export default ProfileScreen;
