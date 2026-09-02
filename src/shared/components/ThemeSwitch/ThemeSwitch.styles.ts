import { StyleSheet } from 'react-native';

// Layout constants feed the animated translateX math in ThemeSwitch.tsx
// directly, so they live here rather than a separate .constants.ts — same
// reasoning as the rest of the project's per-component convention.
export const TRACK_WIDTH = 52;
export const TRACK_HEIGHT = 30;
export const TRACK_PADDING = 3;
export const THUMB_SIZE = TRACK_HEIGHT - TRACK_PADDING * 2;
export const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - TRACK_PADDING * 2;

export const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    padding: TRACK_PADDING,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
