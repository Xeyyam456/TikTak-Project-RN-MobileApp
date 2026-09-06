import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import { LIGHT_COLORS } from '../../../theme/colors';

// The scene canvas is taller than the basket itself so fruits have room to
// fall from above it before landing inside — see AnimatedSplashScreen.tsx.
export const SCENE_WIDTH = 170;
export const SCENE_HEIGHT = 220;
const STAGE_WIDTH = 220;
const SCENE_TOP = 16;

export const styles = StyleSheet.create({
  stage: {
    width: STAGE_WIDTH,
    height: SCENE_TOP + SCENE_HEIGHT + 18 + 34,
  },
  sceneWrap: {
    position: 'absolute',
    top: SCENE_TOP,
    left: '50%',
    marginLeft: -SCENE_WIDTH / 2,
  },
  wordmark: {
    position: 'absolute',
    top: SCENE_TOP + SCENE_HEIGHT + 18,
    width: STAGE_WIDTH,
    textAlign: 'center',
    fontSize: 26,
    letterSpacing: 2,
    color: LIGHT_COLORS.primary,
    fontFamily: FONTS.extraBold,
  },
});
