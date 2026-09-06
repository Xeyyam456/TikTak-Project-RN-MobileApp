import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import { LIGHT_COLORS } from '../../../theme/colors';

// The scene canvas is taller than the basket itself so fruits have room to
// fall from above it before landing inside — see AnimatedSplashScreen.tsx.
// These are the *authored* coordinates: every path in splashTimeline.ts
// (BODY_D, the FRUITS from/to offsets, ...) is written in this space, so the
// SVG viewBox must stay exactly this size. Scaling happens by rendering the
// same viewBox at a larger width/height — bumping these two instead would
// just add empty canvas around a same-sized drawing.
export const VIEWBOX_WIDTH = 170;
export const VIEWBOX_HEIGHT = 220;

/** Tune this alone to resize the whole splash mark. */
const SCENE_SCALE = 1.6;

export const SCENE_WIDTH = VIEWBOX_WIDTH * SCENE_SCALE;
export const SCENE_HEIGHT = VIEWBOX_HEIGHT * SCENE_SCALE;
const STAGE_WIDTH = 220 * SCENE_SCALE;
const WORDMARK_GAP = 18 * SCENE_SCALE;
const WORDMARK_HEIGHT = 34 * SCENE_SCALE;
const SCENE_TOP = 16;
const STAGE_LIFT = 25;

export const styles = StyleSheet.create({
  stage: {
    width: STAGE_WIDTH,
    height: SCENE_TOP + SCENE_HEIGHT + WORDMARK_GAP + WORDMARK_HEIGHT,
    // BootSplash's container centres the stage vertically; this nudges the
    // whole mark above that centre line so it sits a little higher.
    transform: [{ translateY: -STAGE_LIFT }],
  },
  sceneWrap: {
    position: 'absolute',
    top: SCENE_TOP,
    left: '50%',
    marginLeft: -SCENE_WIDTH / 2,
  },
  wordmark: {
    position: 'absolute',
    top: SCENE_TOP + SCENE_HEIGHT + WORDMARK_GAP,
    width: STAGE_WIDTH,
    textAlign: 'center',
    fontSize: 26 * SCENE_SCALE,
    letterSpacing: 2 * SCENE_SCALE,
    color: LIGHT_COLORS.primary,
    fontFamily: FONTS.extraBold,
  },
});
