import { useEffect, useRef } from 'react';
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

function ThemeSwitch({ value, onValueChange, onLongPress }: ThemeSwitchProps) {
  const { colors } = useTheme();
  // Drives both the thumb's slide and the track's color crossfade off the
  // same value, so the two stay in lockstep instead of two separately
  // timed animations drifting apart.
  const progress = useSharedValue(value ? 1 : 0);
  // Toggling this also flips `isDark` at the top of the app, which
  // re-renders every themed screen at once — if the slide only started
  // from the `value` prop's own useEffect, it would wait behind that whole
  // re-render and visibly lag. Starting it immediately on press (and
  // tracking the last value we already animated to, so the effect below
  // doesn't redundantly re-trigger once the prop catches up) makes the
  // thumb move the instant it's tapped regardless of how heavy the rest
  // of that re-render is.
  const lastAnimatedValue = useRef(value);

  useEffect(() => {
    if (lastAnimatedValue.current === value) return;
    lastAnimatedValue.current = value;
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

  function handlePress() {
    const next = !value;
    lastAnimatedValue.current = next;
    progress.value = withTiming(next ? 1 : 0, { duration: 180 });
    onValueChange(next);
  }

  return (
    <Pressable onPress={handlePress} onLongPress={onLongPress} hitSlop={8}>
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </Animated.View>
    </Pressable>
  );
}

export default ThemeSwitch;
