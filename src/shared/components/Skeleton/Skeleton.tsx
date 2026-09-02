import { useEffect, useMemo } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles } from './Skeleton.styles';
import type { SkeletonProps } from './Skeleton.types';

// One shared pulse per mounted Skeleton (not a single global driver) — for
// this app's list sizes that's simpler and cheap enough, and it means a
// skeleton row appearing later (e.g. after a refetch) starts its own pulse
// in phase with its own mount rather than needing to sync to others.
// `height` has no default (stays undefined when omitted) — RN drops an
// undefined style value rather than applying it, which is what lets a
// caller size this purely via `style` (e.g. `aspectRatio: 1`) instead of a
// fixed height fighting that aspect ratio.
function Skeleton({ width = '100%', height, borderRadius = 6, style }: SkeletonProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[styles.bone, { width, height, borderRadius }, animatedStyle, style]}
    />
  );
}

export default Skeleton;
