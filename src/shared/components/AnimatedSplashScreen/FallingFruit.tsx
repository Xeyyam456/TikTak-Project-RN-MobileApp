import { useEffect } from 'react';
import { G } from 'react-native-svg';
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { FALL_DURATION, type FruitConfig } from './splashTimeline';

const AnimatedG = Animated.createAnimatedComponent(G);

/** One fruit tumbling from `from` to `to`, landing with a slight bounce. */
function FallingFruit({
  Shape,
  cx,
  cy,
  delay,
  from,
  to,
  play,
}: FruitConfig & { play: boolean }) {
  const t = useSharedValue(0);

  useEffect(() => {
    if (!play) return;
    t.value = withDelay(
      delay,
      withSequence(
        withTiming(0.85, { duration: FALL_DURATION * 0.75, easing: Easing.in(Easing.quad) }),
        withTiming(1, { duration: FALL_DURATION * 0.25, easing: Easing.out(Easing.back(1.8)) }),
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  const animatedProps = useAnimatedProps(() => {
    const x = interpolate(t.value, [0, 1], [from.x, to.x]);
    const y = interpolate(t.value, [0, 1], [from.y, to.y]);
    const rotateDeg = interpolate(t.value, [0, 1], [from.rotate, to.rotate]);
    const opacity = interpolate(t.value, [0, 0.08, 1], [0, 1, 1]);
    // A raw SVG transform *string* here trips reanimated's own transform
    // validator (it expects the RN View-style array-of-objects form and
    // throws "[Worklets] ... invalidTransform" on anything else) — passing
    // the equivalent affine `matrix` (rotate the shape around its own
    // center, then move it to (x, y)) sidesteps that entirely since
    // `matrix` isn't a name reanimated treats specially.
    const rad = (rotateDeg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const e = x - cx * cos + cy * sin;
    const f = y - cx * sin - cy * cos;
    return {
      matrix: [cos, sin, -sin, cos, e, f],
      opacity,
    };
  });

  return (
    <AnimatedG animatedProps={animatedProps}>
      <Shape />
    </AnimatedG>
  );
}

export default FallingFruit;
