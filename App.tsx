/**
 * @format
 */

import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import BootSplash from 'react-native-bootsplash';
import RootNavigator from './src/navigation/RootNavigator';
import ErrorBoundary from './src/shared/components/ErrorBoundary';

function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <ErrorBoundary>
      <KeyboardProvider>
        <SafeAreaProvider>
          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </KeyboardProvider>
    </ErrorBoundary>
  );
}

export default App;
