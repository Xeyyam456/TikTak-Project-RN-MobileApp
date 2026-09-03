import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const PIN_SIZE = 40;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    map: {
      flex: 1,
    },
    // Pin stays fixed in the center of the map container while the map
    // pans underneath it — the coordinate under the pin's tip is what
    // getCenter() reports, so the pin's visual anchor (its bottom point,
    // not the icon's bounding-box center) must sit exactly on the
    // container's center. Shifting up by half the icon height does that.
    pinWrapper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: PIN_SIZE,
      height: PIN_SIZE,
      marginLeft: -PIN_SIZE / 2,
      marginTop: -PIN_SIZE,
      alignItems: 'center',
      justifyContent: 'center',
    },
    locateButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    footer: {
      paddingHorizontal: 20,
      paddingTop: 16,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    hint: {
      textAlign: 'center',
      fontSize: 12,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
      marginBottom: 12,
    },
  });
