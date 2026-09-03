import { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ConfirmModal from '@shared/components/ConfirmModal';
import ScreenHeader from '@shared/components/ScreenHeader';
import ThemeSwitch from '@shared/components/ThemeSwitch';
import { ChevronRightIcon, TrashIcon } from '@shared/components/icons';
import { getLanguage, setLanguage, type Language } from '@shared/api/settingsStorage';
import { APP_VERSION } from '@shared/config/appInfo';
import { showSuccessToast } from '@shared/utils/toast';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './SettingsScreen.styles';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'az', label: 'Azərbaycan' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
];

function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors, isDark, setDarkModeEnabled, resetDarkModeToSystem } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();

  const [language, setLanguageState] = useState<Language>(getLanguage);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [clearCacheModalVisible, setClearCacheModalVisible] = useState(false);
  const selectedLanguage = LANGUAGES.find(item => item.code === language) ?? LANGUAGES[0];

  // Base chevron orientation is "right"; 90deg points it down (closed,
  // "tap to expand"), -90deg points it up (open, "tap to collapse").
  const chevronProgress = useSharedValue(0);
  useEffect(() => {
    chevronProgress.value = withTiming(languageMenuOpen ? 1 : 0, { duration: 180 });
  }, [languageMenuOpen, chevronProgress]);
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${90 - chevronProgress.value * 180}deg` }],
  }));

  function handleSelectLanguage(code: Language) {
    setLanguage(code);
    setLanguageState(code);
    i18n.changeLanguage(code);
    setLanguageMenuOpen(false);
  }

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
            <Text style={styles.languageLabel}>{t('settings.darkMode')}</Text>
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
          {/* Changes both the UI language (i18n.changeLanguage) and what
              the backend sends back (Accept-Language, via httpClient). */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.languageRow}
              activeOpacity={0.7}
              onPress={() => setLanguageMenuOpen(open => !open)}
            >
              <Text style={[styles.languageLabel, styles.languageLabelActive]}>
                {selectedLanguage.label}
              </Text>
              <Animated.View style={chevronStyle}>
                <ChevronRightIcon size={18} color={colors.textMuted} />
              </Animated.View>
            </TouchableOpacity>

            {languageMenuOpen
              ? LANGUAGES.filter(item => item.code !== language).map(item => (
                  <Animated.View key={item.code} entering={FadeIn.duration(150)}>
                    <TouchableOpacity
                      style={[styles.languageRow, styles.languageRowBorder]}
                      activeOpacity={0.7}
                      onPress={() => handleSelectLanguage(item.code)}
                    >
                      <Text style={styles.languageLabel}>{item.label}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                ))
              : null}
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>{t('settings.storage')}</Text>
          <TouchableOpacity
            style={[styles.card, styles.languageRow]}
            activeOpacity={0.7}
            onPress={() => setClearCacheModalVisible(true)}
          >
            <Text style={[styles.languageLabel, { color: colors.danger }]}>
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
