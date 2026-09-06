import { useCallback, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import BootSplash from 'react-native-bootsplash';
import manifest from '@assets/bootsplash/manifest.json';
import SplashScene from './SplashScene';
import { styles } from './AnimatedSplashScreen.styles';
import {
  EXIT_DELAY,
  EXIT_DURATION,
  WORDMARK_DELAY,
  WORDMARK_DURATION,
} from './splashTimeline';
import type { AnimatedSplashScreenProps } from './AnimatedSplashScreen.types';

function AnimatedSplashScreen({ ready, onFinish }: AnimatedSplashScreenProps) {
  const [started, setStarted] = useState(false);
  const wordmarkT = useSharedValue(0);
  const exitOpacity = useSharedValue(1);

  const finish = useCallback(() => onFinish(), [onFinish]);

  // No `statusBarTranslucent` here on purpose: this app targets SDK 36, so
  // Android forces edge-to-edge and bootsplash logs "statusBarTranslucent
  // value is ignored when using react-native-edge-to-edge" if it's passed.
  const { container } = BootSplash.useHideAnimation({
    manifest,
    ready,
    // Runs once the native splash is hidden — kicks off the whole in-JS
    // timeline (line-draw basket -> fill -> fruits fall in -> wordmark ->
    // hold -> fade out).
    animate: () => {
      setStarted(true);
      wordmarkT.value = withDelay(
        WORDMARK_DELAY,
        withTiming(1, { duration: WORDMARK_DURATION, easing: Easing.out(Easing.ease) }),
      );
      exitOpacity.value = withDelay(
        EXIT_DELAY,
        withTiming(0, { duration: EXIT_DURATION }, finished => {
          // scheduleOnRN, not runOnJS — the latter is deprecated in
          // reanimated 4 / worklets 0.11 and logs a deprecation notice.
          if (finished) scheduleOnRN(finish);
        }),
      );
    },
  });

  const wordmarkStyle = useAnimatedStyle(() => ({
    opacity: wordmarkT.value,
    transform: [{ translateY: (1 - wordmarkT.value) * 10 }],
  }));

  const stageStyle = useAnimatedStyle(() => ({ opacity: exitOpacity.value }));

  return (
    <View {...container}>
      <Animated.View style={[styles.stage, stageStyle]}>
        <View style={styles.sceneWrap}>
          <SplashScene play={started} />
        </View>

        <Animated.Text style={[styles.wordmark, wordmarkStyle]}>TIKTAK</Animated.Text>
      </Animated.View>
    </View>
  );
}

export default AnimatedSplashScreen;
