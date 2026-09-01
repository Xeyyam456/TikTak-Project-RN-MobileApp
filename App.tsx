/**
 * @format
 */

import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import BootSplash from 'react-native-bootsplash';
import { navigationRef } from './src/navigation/navigationRef';
import RootNavigator from './src/navigation/RootNavigator';
import ErrorBoundary from './src/shared/components/ErrorBoundary';
import { toastConfig } from './src/shared/utils/toast';

function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
