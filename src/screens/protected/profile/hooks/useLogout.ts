import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '@shared/services/auth.service';
import { showSuccessToast } from '@shared/utils/toast';
import type { ProfileStackParamList, RootStackParamList } from '@typings/navigation';

/** Logout confirmation state plus the sign-out + reset-to-Welcome flow. */
export default function useLogout() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [modalVisible, setModalVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function confirmLogout() {
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

  return {
    modalVisible,
    loggingOut,
    open: () => setModalVisible(true),
    close: () => setModalVisible(false),
    confirmLogout,
  };
}
