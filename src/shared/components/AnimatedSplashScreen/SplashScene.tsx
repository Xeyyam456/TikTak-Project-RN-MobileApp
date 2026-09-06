import Svg from 'react-native-svg';
import DrawnPath from './DrawnPath';
import FallingFruit from './FallingFruit';
import {
  SCENE_HEIGHT,
  SCENE_WIDTH,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
} from './AnimatedSplashScreen.styles';
import {
  BODY_D,
  BODY_DASH,
  BODY_DELAY,
  BODY_DRAW_END,
  BODY_DURATION,
  FRUITS,
  HANDLE_D,
  HANDLE_DASH,
  HANDLE_DURATION,
  WEAVE1_D,
  WEAVE2_D,
  WEAVE_DASH,
  WEAVE_DURATION,
} from './splashTimeline';

/** The basket drawing itself: handle, body, two weave lines, then fruit. */
function SplashScene({ play }: { play: boolean }) {
  return (
    <Svg
      width={SCENE_WIDTH}
      height={SCENE_HEIGHT}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
    >
      <DrawnPath
        d={HANDLE_D}
        dashLength={HANDLE_DASH}
        delay={0}
        duration={HANDLE_DURATION}
        stroke="#8C5A2B"
        strokeWidth={5}
        play={play}
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
        play={play}
      />
      <DrawnPath
        d={WEAVE1_D}
        dashLength={WEAVE_DASH}
        delay={BODY_DRAW_END}
        duration={WEAVE_DURATION}
        stroke="#A9713C"
        strokeWidth={3}
        play={play}
      />
      <DrawnPath
        d={WEAVE2_D}
        dashLength={WEAVE_DASH}
        delay={BODY_DRAW_END + 100}
        duration={WEAVE_DURATION}
        stroke="#A9713C"
        strokeWidth={3}
        play={play}
      />
      {FRUITS.map((fruit, index) => (
        <FallingFruit key={index} {...fruit} play={play} />
      ))}
    </Svg>
  );
}

export default SplashScene;
