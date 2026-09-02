import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { HomeIcon, SearchIcon, UserIcon } from '@shared/components/icons';
import { FONTS } from '../theme/fonts';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeColors } from '../theme/colors';

const ICONS = {
  Home: HomeIcon,
  Search: SearchIcon,
  Profile: UserIcon,
} as const;

// Tabs backed by a nested stack need their initial screen named explicitly —
// `navigate(route.name)` on an already-focused tab does NOT reset a nested
// stack back to its first screen by itself; that popToTop behavior only
// happens for the library's own tab bar reacting to a real `tabPress` event,
// not a bare `navigate()` call from a custom tab bar like this one.
const INITIAL_SCREEN: Partial<Record<keyof typeof ICONS, string>> = {
  Home: 'HomeMain',
  Profile: 'ProfileMain',
};

function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  // Built inside the component (not a module-level const like ICONS above)
  // because t() needs to be called from within a component/hook.
  const labels: Record<keyof typeof ICONS, string> = {
    Home: t('tabBar.home'),
    Search: t('tabBar.search'),
    Profile: t('tabBar.profile'),
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 10 }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const Icon = ICONS[route.name as keyof typeof ICONS];
        const label = labels[route.name as keyof typeof labels];
        const color = focused ? colors.primary : colors.textMuted;

        function handlePress() {
          const initialScreen =
            INITIAL_SCREEN[route.name as keyof typeof INITIAL_SCREEN];
          if (initialScreen) {
            navigation.navigate(route.name, { screen: initialScreen } as never);
          } else {
            navigation.navigate(route.name);
          }
        }

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={handlePress}
            activeOpacity={0.7}
          >
            <Icon size={24} color={color} />
            <Text style={[styles.label, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      paddingTop: 10,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      gap: 4,
    },
    label: {
      fontSize: 11,
      fontFamily: FONTS.medium,
    },
  });

export default TabBar;
