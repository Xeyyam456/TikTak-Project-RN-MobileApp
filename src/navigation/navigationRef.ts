import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from '@typings/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function resetToWelcome() {
  if (navigationRef.isReady()) {
    navigationRef.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  }
}
