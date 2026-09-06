import { useEffect } from 'react';
import { Path } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { FILL_DURATION } from './splashTimeline';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export type DrawnPathProps = {
  d: string;
  dashLength: number;
  delay: number;
  duration: number;
  stroke: string;
  strokeWidth: number;
  play: boolean;
  fillColor?: string;
  fillDelay?: number;
};

/** One "line draw" stroke: a full-length dash whose offset animates to 0. */
function DrawnPath({
  d,
  dashLength,
  delay,
  duration,
  stroke,
  strokeWidth,
  play,
  fillColor,
  fillDelay,
}: DrawnPathProps) {
  const dashOffset = useSharedValue(dashLength);
  const fillOpacity = useSharedValue(0);

  useEffect(() => {
    if (!play) return;
    dashOffset.value = withDelay(delay, withTiming(0, { duration, easing: Easing.out(Easing.ease) }));
    if (fillColor != null) {
      fillOpacity.value = withDelay(fillDelay ?? 0, withTiming(1, { duration: FILL_DURATION }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
    fillOpacity: fillColor != null ? fillOpacity.value : 0,
  }));

  return (
    <AnimatedPath
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fillColor ?? 'none'}
      strokeDasharray={dashLength}
      animatedProps={animatedProps}
    />
  );
}

export default DrawnPath;
