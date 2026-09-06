import { useMemo, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import BottomSheet from '@shared/components/BottomSheet';
import { EyeIcon, ImageIcon, UserIcon } from '@shared/components/icons';
import MenuRow from '../MenuRow';
import PhotoViewerModal from '../PhotoViewerModal';
import useAvatarUpload from '../hooks/useAvatarUpload';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './AvatarPicker.styles';
import type { AvatarPickerProps } from './AvatarPicker.types';

function AvatarPicker({ profile, onProfileUpdate }: AvatarPickerProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const { uploading, pickAndUpload } = useAvatarUpload(profile, onProfileUpdate);

  const [sheetVisible, setSheetVisible] = useState(false);
  const [viewerVisible, setViewerVisible] = useState(false);

  function handleChangePhoto() {
    setSheetVisible(false);
    pickAndUpload();
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
        <Text style={styles.sheetTitle}>{t('avatarPicker.title')}</Text>
        <MenuRow
          icon={<ImageIcon size={22} />}
          label={t('avatarPicker.changePhoto')}
          onPress={handleChangePhoto}
        />
        {profile?.img_url && (
          <MenuRow
            icon={<EyeIcon size={22} color={colors.textPrimary} />}
            label={t('avatarPicker.viewPhoto')}
            onPress={() => {
              setSheetVisible(false);
              setViewerVisible(true);
            }}
          />
        )}
      </BottomSheet>

      <PhotoViewerModal
        visible={viewerVisible}
        imageUrl={profile?.img_url}
        onClose={() => setViewerVisible(false)}
      />
    </>
  );
}

export default AvatarPicker;
