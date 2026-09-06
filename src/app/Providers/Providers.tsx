import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import ErrorBoundary from '@shared/components/ErrorBoundary';
import { queryClient } from '@shared/api/queryClient';
import { persistOptions } from '@shared/api/queryStorage';
import { ThemeProvider } from '../../theme/ThemeContext';
import { styles } from './Providers.styles';
import type { ProvidersProps } from './Providers.types';

function Providers({ children }: ProvidersProps) {
  return (
    // ThemeProvider wraps ErrorBoundary (not the other way around) on
    // purpose — ErrorBoundary's own fallback UI renders a <Button>, which
    // calls useTheme() internally, so the boundary's fallback needs a theme
    // context available even when everything below it has crashed.
    // ThemeProvider itself is simple/stable enough not to need catching.
    <ThemeProvider>
      <ErrorBoundary>
        <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
          <GestureHandlerRootView style={styles.root}>
            <KeyboardProvider>
              <SafeAreaProvider>{children}</SafeAreaProvider>
            </KeyboardProvider>
          </GestureHandlerRootView>
        </PersistQueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default Providers;
