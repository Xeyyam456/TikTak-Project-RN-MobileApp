import { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@shared/utils/toast';
import { navigationRef } from '../../navigation/navigationRef';
import RootNavigator from '../../navigation/RootNavigator';
import { buildNavigationTheme } from '../../theme/navigationTheme';
import { useTheme } from '../../theme/ThemeContext';

// Sits below Providers rather than inside App() so it can call useTheme() —
// that hook has to run under <ThemeProvider>, which wraps this whole tree.
function AppShell() {
  const { isDark, colors } = useTheme();
  const navigationTheme = useMemo(
    () => buildNavigationTheme(isDark, colors),
    [isDark, colors],
  );

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}

export default AppShell;
