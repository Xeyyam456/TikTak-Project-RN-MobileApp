/**
 * @format
 */

import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import BootSplash from 'react-native-bootsplash';
import * as Sentry from '@sentry/react-native';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { navigationRef } from './src/navigation/navigationRef';
import RootNavigator from './src/navigation/RootNavigator';
import ErrorBoundary from './src/shared/components/ErrorBoundary';
import { toastConfig } from './src/shared/utils/toast';
import { SENTRY_DSN } from './src/shared/config/env';
import { initTokenStorage } from './src/shared/api/tokenStorage';
import { queryClient } from './src/shared/api/queryClient';
import { queryPersister } from './src/shared/api/queryStorage';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

Sentry.init({
  dsn: SENTRY_DSN,
  enabled: !__DEV__,
  tracesSampleRate: 0.2,
});

// Bump this if a cached query's shape ever changes in a way old persisted
// data wouldn't satisfy (e.g. a field rename) — mismatched persister.buster
// makes restoreClient() discard the old cache instead of rehydrating it.
const CACHE_BUSTER = 'v1';

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initTokenStorage().then(() => {
      setReady(true);
      BootSplash.hide({ fade: true });
    });
  }, []);

  // The native splash view stays up (BootSplash.hide hasn't been called yet)
  // for the brief moment it takes to read the MMKV encryption key out of the
  // Keystore, so nothing needs to render here.
  if (!ready) {
    return null;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: queryPersister, maxAge: 24 * 60 * 60 * 1000, buster: CACHE_BUSTER }}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <KeyboardProvider>
              <SafeAreaProvider>
                <AppShell />
              </SafeAreaProvider>
            </KeyboardProvider>
          </GestureHandlerRootView>
        </PersistQueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

// Split out from App() so it can call useTheme() — that hook needs to run
// under <ThemeProvider>, which wraps App()'s own return value.
function AppShell() {
  const { isDark, colors } = useTheme();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer
        ref={navigationRef}
        theme={{
          ...(isDark ? NavigationDarkTheme : NavigationDefaultTheme),
          colors: {
            ...(isDark ? NavigationDarkTheme.colors : NavigationDefaultTheme.colors),
            background: colors.background,
            card: colors.surface,
            border: colors.border,
            text: colors.textPrimary,
            primary: colors.primary,
          },
        }}
      >
        <RootNavigator />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;
