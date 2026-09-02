import { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ScreenHeader from '@shared/components/ScreenHeader';
import ThemeSwitch from '@shared/components/ThemeSwitch';
import { ChevronRightIcon } from '@shared/components/icons';
import { getLanguage, setLanguage, type Language } from '@shared/api/settingsStorage';
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
  const { colors, isDark, setDarkModeEnabled } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t, i18n } = useTranslation();

  const [language, setLanguageState] = useState<Language>(getLanguage);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
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

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title={t('settings.title')} onBack={() => navigation.goBack()} />

      <View style={styles.container}>
        <View>
          <Text style={styles.sectionTitle}>{t('settings.appearance')}</Text>
          <View style={[styles.card, styles.toggleRow]}>
            <Text style={styles.languageLabel}>{t('settings.darkMode')}</Text>
            <ThemeSwitch value={isDark} onValueChange={setDarkModeEnabled} />
          </View>
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
      </View>
    </View>
  );
}

export default SettingsScreen;
