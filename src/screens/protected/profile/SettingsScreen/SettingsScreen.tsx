import { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '@shared/components/ScreenHeader';
import ThemeSwitch from '@shared/components/ThemeSwitch';
import { CheckIcon } from '@shared/components/icons';
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

  const [language, setLanguageState] = useState<Language>(getLanguage);

  function handleSelectLanguage(code: Language) {
    setLanguage(code);
    setLanguageState(code);
  }

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title="Tənzimləmələr" onBack={() => navigation.goBack()} />

      <View style={styles.container}>
        <View>
          <Text style={styles.sectionTitle}>Görünüş</Text>
          <View style={[styles.card, styles.toggleRow]}>
            <Text style={styles.languageLabel}>Qaranlıq rejim</Text>
            <ThemeSwitch value={isDark} onValueChange={setDarkModeEnabled} />
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Dil</Text>
          {/* Only changes what the backend sends back (Accept-Language) —
              in-app screen text stays Azerbaijani until full translation
              is built out as a separate piece of work. */}
          <View style={styles.card}>
            {LANGUAGES.map((item, index) => {
              const active = item.code === language;
              return (
                <TouchableOpacity
                  key={item.code}
                  style={[styles.languageRow, index > 0 && styles.languageRowBorder]}
                  activeOpacity={0.7}
                  onPress={() => handleSelectLanguage(item.code)}
                >
                  <Text style={[styles.languageLabel, active && styles.languageLabelActive]}>
                    {item.label}
                  </Text>
                  {active ? <CheckIcon size={18} color={colors.primary} /> : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

export default SettingsScreen;
