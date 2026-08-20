import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomSheet from '@shared/components/BottomSheet';
import ConfirmModal from '@shared/components/ConfirmModal';
import {
  ClockIcon,
  DocumentIcon,
  EyeIcon,
  HeartIcon,
  ImageIcon,
  LogoutIcon,
  UserIcon,
} from '@shared/components/icons';
import { logout } from '@shared/services/auth.service';
import { getProfile, updateProfile } from '@shared/services/profile.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { uploadFile } from '@shared/services/upload.service';
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
  const [avatarSheetVisible, setAvatarSheetVisible] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [photoViewerVisible, setPhotoViewerVisible] = useState(false);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  async function handleChangePhoto() {
    setAvatarSheetVisible(false);
    // Resize/compress at pick time — phone camera photos can be several MB,
    // and we only ever display this at avatar size, so there's no reason to
    // upload the original resolution.
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
      maxWidth: 1024,
      maxHeight: 1024,
    });

    if (result.didCancel) return;
    if (result.errorCode) {
      Alert.alert('Xəta', result.errorMessage ?? 'Şəkil seçilə bilmədi');
      return;
    }

    const asset = result.assets?.[0];
    if (!asset?.uri || !profile) return;

    setUploadingAvatar(true);
    try {
      const imgUrl = await uploadFile({
        uri: asset.uri,
        name: asset.fileName ?? 'avatar.jpg',
        type: asset.type ?? 'image/jpeg',
      });
      const updated = await updateProfile({
        full_name: profile.full_name,
        address: profile.address ?? '',
        img_url: imgUrl,
      });
      setProfile(updated);
    } catch (error) {
      Alert.alert('Xəta', getApiErrorMessage(error));
    } finally {
      setUploadingAvatar(false);
    }
  }

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
          <TouchableOpacity
            style={styles.avatar}
            activeOpacity={0.8}
            onPress={() => setAvatarSheetVisible(true)}
          >
            {profile?.img_url ? (
              <Image
                source={{ uri: profile.img_url }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            ) : (
              <UserIcon size={56} color="#FFFFFF" />
            )}
            {uploadingAvatar && (
              <View style={styles.avatarLoading}>
                <ActivityIndicator color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
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

      <BottomSheet
        visible={avatarSheetVisible}
        onClose={() => setAvatarSheetVisible(false)}
      >
        <Text style={styles.sheetTitle}>Profil şəkli</Text>
        <MenuRow
          icon={<ImageIcon size={22} />}
          label="Şəkli dəyiş"
          onPress={handleChangePhoto}
        />
        {profile?.img_url && (
          <MenuRow
            icon={<EyeIcon size={22} color="#1A1A1A" />}
            label="Şəklə bax"
            onPress={() => {
              setAvatarSheetVisible(false);
              setPhotoViewerVisible(true);
            }}
          />
        )}
      </BottomSheet>

      <Modal
        visible={photoViewerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPhotoViewerVisible(false)}
      >
        <TouchableOpacity
          style={styles.photoViewerOverlay}
          activeOpacity={1}
          onPress={() => setPhotoViewerVisible(false)}
        >
          {profile?.img_url && (
            <Image
              source={{ uri: profile.img_url }}
              style={styles.photoViewerImage}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </Modal>
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
  avatarLoading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheetTitle: {
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    marginBottom: 4,
  },
  photoViewerOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  photoViewerImage: {
    width: '100%',
    height: '80%',
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
