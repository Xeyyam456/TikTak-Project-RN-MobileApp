import { useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import BottomSheet from '@shared/components/BottomSheet';
import { EyeIcon, ImageIcon, UserIcon } from '@shared/components/icons';
import { updateProfile } from '@shared/services/profile.service';
import { uploadFile } from '@shared/services/upload.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import MenuRow from '../MenuRow';
import { styles } from './AvatarPicker.styles';
import type { AvatarPickerProps } from './AvatarPicker.types';

function AvatarPicker({ profile, onProfileUpdate }: AvatarPickerProps) {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [viewerVisible, setViewerVisible] = useState(false);

  async function handleChangePhoto() {
    setSheetVisible(false);
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

    setUploading(true);
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
      onProfileUpdate(updated);
    } catch (error) {
      Alert.alert('Xəta', getApiErrorMessage(error));
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <TouchableOpacity
        style={styles.avatar}
        activeOpacity={0.8}
        onPress={() => setSheetVisible(true)}
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
        {uploading && (
          <View style={styles.avatarLoading}>
            <ActivityIndicator color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>

      <BottomSheet visible={sheetVisible} onClose={() => setSheetVisible(false)}>
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
              setSheetVisible(false);
              setViewerVisible(true);
            }}
          />
        )}
      </BottomSheet>

      <Modal
        visible={viewerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setViewerVisible(false)}
      >
        <TouchableOpacity
          style={styles.photoViewerOverlay}
          activeOpacity={1}
          onPress={() => setViewerVisible(false)}
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
    </>
  );
}

export default AvatarPicker;
