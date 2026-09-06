import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import { updateProfile } from '@shared/services/profile.service';
import { uploadFile } from '@shared/services/upload.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showErrorToast } from '@shared/utils/toast';
import type { UserProfile } from '@typings/api';

/** Picks an image from the library, uploads it and saves it on the profile. */
export default function useAvatarUpload(
  profile: UserProfile | undefined,
  onProfileUpdate: (profile: UserProfile) => void,
) {
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(false);

  async function pickAndUpload() {
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
      showErrorToast(result.errorMessage ?? t('avatarPicker.pickError'));
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
      showErrorToast(getApiErrorMessage(error));
    } finally {
      setUploading(false);
    }
  }

  return { uploading, pickAndUpload };
}
