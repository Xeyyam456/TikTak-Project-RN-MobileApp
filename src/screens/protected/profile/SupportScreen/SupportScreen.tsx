import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ScreenHeader from '@shared/components/ScreenHeader';
import { FacebookIcon, MailIcon, WhatsAppIcon } from '@shared/components/icons';
import { SUPPORT_EMAIL, SUPPORT_FACEBOOK_URL, SUPPORT_WHATSAPP_NUMBER } from '@shared/config/env';
import { showErrorToast } from '@shared/utils/toast';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './SupportScreen.styles';

function SupportScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  function openLink(url: string) {
    Linking.openURL(url).catch(() => showErrorToast(t('profile.linkOpenError')));
  }

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title={t('profile.support')} onBack={() => navigation.goBack()} />

      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.contactRow}
            activeOpacity={0.7}
            onPress={() => openLink(`https://wa.me/${SUPPORT_WHATSAPP_NUMBER}`)}
          >
            <WhatsAppIcon size={24} color={colors.textPrimary} />
            <Text style={styles.contactLabel}>{t('profile.supportWhatsapp')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contactRow, styles.contactRowBorder]}
            activeOpacity={0.7}
            onPress={() => openLink(SUPPORT_FACEBOOK_URL)}
          >
            <FacebookIcon size={24} color={colors.textPrimary} />
            <Text style={styles.contactLabel}>{t('profile.supportFacebook')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contactRow, styles.contactRowBorder]}
            activeOpacity={0.7}
            onPress={() => openLink(`mailto:${SUPPORT_EMAIL}`)}
          >
            <MailIcon size={24} color={colors.textPrimary} />
            <Text style={styles.contactLabel}>{t('profile.supportEmail')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SupportScreen;
