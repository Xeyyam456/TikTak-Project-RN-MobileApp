/**
 * @format
 */

import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import BootSplash from 'react-native-bootsplash';
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { navigationRef } from './src/navigation/navigationRef';
import RootNavigator from './src/navigation/RootNavigator';
import ErrorBoundary from './src/shared/components/ErrorBoundary';
import { toastConfig } from './src/shared/utils/toast';
import { SENTRY_DSN } from './src/shared/config/env';
import { initTokenStorage } from './src/shared/api/tokenStorage';

Sentry.init({
  dsn: SENTRY_DSN,
  enabled: !__DEV__,
  tracesSampleRate: 0.2,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

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
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <SafeAreaProvider>
              <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
              <NavigationContainer ref={navigationRef}>
                <RootNavigator />
              </NavigationContainer>
              <Toast config={toastConfig} />
            </SafeAreaProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
