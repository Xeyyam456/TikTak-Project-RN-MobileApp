import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ConfirmModal from '@shared/components/ConfirmModal';
import ErrorState from '@shared/components/ErrorState';
import { ClockIcon, DocumentIcon, HeartIcon, LogoutIcon } from '@shared/components/icons';
import { logout } from '@shared/services/auth.service';
import { getProfile } from '@shared/services/profile.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showSuccessToast } from '@shared/utils/toast';
import type { ProfileStackParamList, RootStackParamList } from '@typings/navigation';
import type { UserProfile } from '@typings/api';
import useReload from '../../../../hooks/useReload';
import AvatarPicker from '../AvatarPicker';
import MenuRow from '../MenuRow';
import { styles } from './ProfileScreen.styles';

function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

  const [profile, setProfile] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const loadProfile = useCallback(() => {
    setLoading(true);
    setError(undefined);
    getProfile()
      .then(setProfile)
      .catch(err => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const { refreshing, onRefresh } = useReload(loadProfile);

  async function handleConfirmLogout() {
    setLoggingOut(true);
    await logout();
    showSuccessToast('Uğurla çıxış edildi');
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
        <Text style={styles.title}>Hesabım</Text>

        {error ? (
          <ErrorState message={error} onRetry={loadProfile} />
        ) : loading ? (
          <ActivityIndicator color="#7BC043" style={styles.loader} />
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
            label="Hesab məlumatlarım"
            onPress={() => navigation.navigate('AccountInfo')}
          />
          <MenuRow
            icon={<HeartIcon size={22} />}
            label="Siyahılarım"
            onPress={() => navigation.navigate('MyLists')}
          />
          <MenuRow
            icon={<ClockIcon size={22} />}
            label="Sifariş tarixçəsi"
            onPress={() => navigation.navigate('OrderHistory')}
          />
          <MenuRow
            icon={<LogoutIcon size={22} />}
            label="Çıxış"
            onPress={() => setLogoutModalVisible(true)}
          />
        </View>
      </ScrollView>

      <ConfirmModal
        visible={logoutModalVisible}
        icon={<LogoutIcon size={28} color="#E24C4C" />}
        title="Çıxış"
        message="Hesabdan çıxmaq istədiyinizə əminsiniz?"
        confirmLabel="Çıxış"
        destructive
        loading={loggingOut}
        onConfirm={handleConfirmLogout}
        onCancel={() => setLogoutModalVisible(false)}
      />
    </View>
  );
}

export default ProfileScreen;
