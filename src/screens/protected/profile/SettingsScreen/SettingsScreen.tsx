import { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@shared/components/ConfirmModal';
import ScreenHeader from '@shared/components/ScreenHeader';
import ThemeSwitch from '@shared/components/ThemeSwitch';
import { TrashIcon } from '@shared/icons';
import { APP_VERSION } from '@shared/config/appInfo';
import { showSuccessToast } from '@shared/utils/toast';
import LanguagePicker from '../LanguagePicker';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './SettingsScreen.styles';

function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors, isDark, setDarkModeEnabled, resetDarkModeToSystem } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [clearCacheModalVisible, setClearCacheModalVisible] = useState(false);

  function handleResetDarkMode() {
    resetDarkModeToSystem();
    showSuccessToast(t('settings.darkModeReset'));
  }

  function handleConfirmClearCache() {
    // Only the TanStack Query cache (products/categories/basket/orders) —
    // not tokenStorage or settingsStorage, so this can't accidentally log
    // the user out or reset their theme/language preference.
    queryClient.clear();
    setClearCacheModalVisible(false);
    showSuccessToast(t('settings.clearCacheSuccessToast'));
  }

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title={t('settings.title')} onBack={() => navigation.goBack()} />

      <View style={styles.container}>
        <View>
          <Text style={styles.sectionTitle}>{t('settings.appearance')}</Text>
          <View style={[styles.card, styles.toggleRow]}>
            <Text style={styles.rowLabel}>{t('settings.darkMode')}</Text>
            <ThemeSwitch
              value={isDark}
              onValueChange={setDarkModeEnabled}
              onLongPress={handleResetDarkMode}
            />
          </View>
          <Text style={styles.hint}>{t('settings.darkModeResetHint')}</Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
          <LanguagePicker />
        </View>

        <View>
          <Text style={styles.sectionTitle}>{t('settings.storage')}</Text>
          <TouchableOpacity
            style={[styles.card, styles.actionRow]}
            activeOpacity={0.7}
            onPress={() => setClearCacheModalVisible(true)}
          >
            <Text style={[styles.rowLabel, { color: colors.danger }]}>
              {t('settings.clearCache')}
            </Text>
            <TrashIcon size={18} color={colors.danger} />
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>{t('settings.version', { version: APP_VERSION })}</Text>
      </View>

      <ConfirmModal
        visible={clearCacheModalVisible}
        icon={<TrashIcon size={28} color={colors.danger} />}
        title={t('settings.clearCacheConfirmTitle')}
        message={t('settings.clearCacheConfirmMessage')}
        confirmLabel={t('settings.clearCache')}
        destructive
        onConfirm={handleConfirmClearCache}
        onCancel={() => setClearCacheModalVisible(false)}
      />
    </View>
  );
}

export default SettingsScreen;
