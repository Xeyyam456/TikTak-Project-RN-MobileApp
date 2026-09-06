import { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ChevronRightIcon } from '@shared/icons';
import { getLanguage, setLanguage, type Language } from '@shared/api/settingsStorage';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './LanguagePicker.styles';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'az', label: 'Azərbaycan' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
];

// Changes both the UI language (i18n.changeLanguage) and what the backend
// sends back (Accept-Language, via httpClient).
function LanguagePicker() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { i18n } = useTranslation();

  const [language, setLanguageState] = useState<Language>(getLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const selected = LANGUAGES.find(item => item.code === language) ?? LANGUAGES[0];

  // Base chevron orientation is "right"; 90deg points it down (closed,
  // "tap to expand"), -90deg points it up (open, "tap to collapse").
  const chevronProgress = useSharedValue(0);
  useEffect(() => {
    chevronProgress.value = withTiming(menuOpen ? 1 : 0, { duration: 180 });
  }, [menuOpen, chevronProgress]);
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${90 - chevronProgress.value * 180}deg` }],
  }));

  function handleSelect(code: Language) {
    setLanguage(code);
    setLanguageState(code);
    i18n.changeLanguage(code);
    setMenuOpen(false);
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.languageRow}
        activeOpacity={0.7}
        onPress={() => setMenuOpen(open => !open)}
      >
        <Text style={[styles.languageLabel, styles.languageLabelActive]}>
          {selected.label}
        </Text>
        <Animated.View style={chevronStyle}>
          <ChevronRightIcon size={18} color={colors.textMuted} />
        </Animated.View>
      </TouchableOpacity>

      {menuOpen
        ? LANGUAGES.filter(item => item.code !== language).map(item => (
            <Animated.View key={item.code} entering={FadeIn.duration(150)}>
              <TouchableOpacity
                style={[styles.languageRow, styles.languageRowBorder]}
                activeOpacity={0.7}
                onPress={() => handleSelect(item.code)}
              >
                <Text style={styles.languageLabel}>{item.label}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))
        : null}
    </View>
  );
}

export default LanguagePicker;
