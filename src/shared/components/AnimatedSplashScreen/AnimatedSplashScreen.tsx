import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import BootSplash from 'react-native-bootsplash';
import manifest from '@assets/bootsplash/manifest.json';
import { SCENE_HEIGHT, SCENE_WIDTH, styles } from './AnimatedSplashScreen.styles';
import {
  AppleShape,
  BananaShape,
  GrapesShape,
  OrangeShape,
  StrawberryShape,
} from './SplashFruitShapes';
import type { AnimatedSplashScreenProps } from './AnimatedSplashScreen.types';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

// The basket is drawn stroke-by-stroke (classic SVG "line draw": a dash
// covering the whole path, offset from full-length down to 0), then its
// body fills with color, then real fruit shapes fall/tumble into it from
// above, then the wordmark reveals, then everything fades to the app.
//
// The scene's y-coordinates all sit 125px lower than the basket shape's
// original design (a 0-95 box) so there's open canvas above the basket for
// fruits to fall through — only the paths' absolute M/L y-values needed
// the +125 shift, since every other command in them is relative.
const HANDLE_D = 'M40 155c8-22 32-30 45-30s37 8 45 30';
const BODY_D = 'M12 155h146l-14 55a10 10 0 01-9.8 8H35.8a10 10 0 01-9.8-8L12 155z';
const WEAVE1_D = 'M20 173h130';
const WEAVE2_D = 'M26 191h118';

const HANDLE_DASH = 200;
const BODY_DASH = 450;
const WEAVE_DASH = 150;

const HANDLE_DURATION = 500;
const BODY_DELAY = 350;
const BODY_DURATION = 750;
const BODY_DRAW_END = BODY_DELAY + BODY_DURATION; // 1100
const WEAVE_DURATION = 250;
const FILL_DURATION = 400;

const FALL_DURATION = 750;
type FruitPose = { x: number; y: number; rotate: number };
type FruitConfig = {
  Shape: typeof AppleShape;
  cx: number;
  cy: number;
  delay: number;
  from: FruitPose;
  to: FruitPose;
};

const FRUITS: FruitConfig[] = [
  { Shape: AppleShape, cx: 16, cy: 16, delay: 1300, from: { x: 20, y: -10, rotate: -60 }, to: { x: 60, y: 158, rotate: -8 } },
  { Shape: OrangeShape, cx: 16, cy: 17, delay: 1450, from: { x: 140, y: -30, rotate: 70 }, to: { x: 112, y: 163, rotate: 12 } },
  { Shape: BananaShape, cx: 20, cy: 12, delay: 1600, from: { x: 150, y: 55, rotate: -40 }, to: { x: 130, y: 150, rotate: -20 } },
  { Shape: GrapesShape, cx: 15, cy: 15, delay: 1750, from: { x: 10, y: 45, rotate: 50 }, to: { x: 48, y: 145, rotate: 8 } },
  { Shape: StrawberryShape, cx: 14, cy: 14, delay: 1900, from: { x: 85, y: -40, rotate: -25 }, to: { x: 85, y: 172, rotate: 4 } },
];
const LAST_FRUIT_LANDS = FRUITS[FRUITS.length - 1].delay + FALL_DURATION; // 2650

const WORDMARK_DELAY = LAST_FRUIT_LANDS - 150; // 2500 — slight overlap with the last landing
const WORDMARK_DURATION = 500;
const HOLD_MS = 800;
const EXIT_DURATION = 500;
const EXIT_DELAY = WORDMARK_DELAY + WORDMARK_DURATION + HOLD_MS; // 3800

type DrawnPathProps = {
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

function FallingFruit({ Shape, cx, cy, delay, from, to, play }: FruitConfig & { play: boolean }) {
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

function AnimatedSplashScreen({ ready, onFinish }: AnimatedSplashScreenProps) {
  const [started, setStarted] = useState(false);
  const wordmarkT = useSharedValue(0);
  const exitOpacity = useSharedValue(1);

  const finish = useCallback(() => onFinish(), [onFinish]);

  const { container } = BootSplash.useHideAnimation({
    manifest,
    ready,
    statusBarTranslucent: true,
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
          if (finished) runOnJS(finish)();
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
          <Svg width={SCENE_WIDTH} height={SCENE_HEIGHT} viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}>
            <DrawnPath
              d={HANDLE_D}
              dashLength={HANDLE_DASH}
              delay={0}
              duration={HANDLE_DURATION}
              stroke="#8C5A2B"
              strokeWidth={5}
              play={started}
            />
            <DrawnPath
              d={BODY_D}
              dashLength={BODY_DASH}
              delay={BODY_DELAY}
              duration={BODY_DURATION}
              stroke="#8C5A2B"
              strokeWidth={4}
              fillColor="#C68E5A"
              fillDelay={BODY_DRAW_END}
              play={started}
            />
            <DrawnPath
              d={WEAVE1_D}
              dashLength={WEAVE_DASH}
              delay={BODY_DRAW_END}
              duration={WEAVE_DURATION}
              stroke="#A9713C"
              strokeWidth={3}
              play={started}
            />
            <DrawnPath
              d={WEAVE2_D}
              dashLength={WEAVE_DASH}
              delay={BODY_DRAW_END + 100}
              duration={WEAVE_DURATION}
              stroke="#A9713C"
              strokeWidth={3}
              play={started}
            />
            {FRUITS.map((fruit, index) => (
              <FallingFruit key={index} {...fruit} play={started} />
            ))}
          </Svg>
        </View>

        <Animated.Text style={[styles.wordmark, wordmarkStyle]}>TIKTAK</Animated.Text>
      </Animated.View>
    </View>
  );
}

export default AnimatedSplashScreen;
