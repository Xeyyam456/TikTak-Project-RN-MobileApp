import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { HomeIcon, SearchIcon, UserIcon } from '@shared/components/icons';
import { FONTS } from '../theme/fonts';

const ACTIVE_COLOR = '#7BC043';
const INACTIVE_COLOR = '#9B9B9B';

const ICONS = {
  Home: HomeIcon,
  Search: SearchIcon,
  Profile: UserIcon,
} as const;

const LABELS = {
  Home: 'Əsas',
  Search: 'Axtar',
  Profile: 'Hesabım',
} as const;

function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 10 }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const Icon = ICONS[route.name as keyof typeof ICONS];
        const label = LABELS[route.name as keyof typeof LABELS];
        const color = focused ? ACTIVE_COLOR : INACTIVE_COLOR;

        function handlePress() {
          if (!focused) navigation.navigate(route.name);
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
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
