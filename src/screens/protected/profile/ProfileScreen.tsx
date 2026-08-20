import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ConfirmModal from '@shared/components/ConfirmModal';
import {
  ClockIcon,
  DocumentIcon,
  HeartIcon,
  LogoutIcon,
  UserIcon,
} from '@shared/components/icons';
import { logout } from '@shared/services/auth.service';
import { getProfile } from '@shared/services/profile.service';
import type { ProfileStackParamList, RootStackParamList } from '@typings/navigation';
import type { UserProfile } from '@typings/api';
import { FONTS } from '../../../theme/fonts';

function MenuRow({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuRow} activeOpacity={0.7} onPress={onPress}>
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

  const [profile, setProfile] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  async function handleConfirmLogout() {
    setLoggingOut(true);
    await logout();
    navigation
      .getParent<NativeStackNavigationProp<RootStackParamList>>()
      ?.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  }

  return (
    <View style={[styles.flex, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.title}>Hesabım</Text>

      {loading ? (
        <ActivityIndicator color="#7BC043" style={styles.loader} />
      ) : (
        <>
          <View style={styles.avatar}>
            {profile?.img_url ? (
              <Image
                source={{ uri: profile.img_url }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            ) : (
              <UserIcon size={56} color="#FFFFFF" />
            )}
          </View>
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

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  loader: {
    marginTop: 48,
  },
  avatar: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F5D75',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    marginTop: 16,
    fontSize: 17,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  phone: {
    marginTop: 4,
    fontSize: 14,
    color: '#4F5D75',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  menu: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  menuLabel: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: FONTS.medium,
  },
});

export default ProfileScreen;
