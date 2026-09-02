import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../../theme/ThemeContext';
import { styles, THUMB_TRAVEL } from './ThemeSwitch.styles';
import type { ThemeSwitchProps } from './ThemeSwitch.types';

function ThemeSwitch({ value, onValueChange }: ThemeSwitchProps) {
  const { colors } = useTheme();
  // Drives both the thumb's slide and the track's color crossfade off the
  // same value, so the two stay in lockstep instead of two separately
  // timed animations drifting apart.
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 180 });
  }, [value, progress]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.borderMuted, colors.primary],
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * THUMB_TRAVEL }],
  }));

  return (
    <Pressable onPress={() => onValueChange(!value)} hitSlop={8}>
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </Animated.View>
    </Pressable>
  );
}

export default ThemeSwitch;
