import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

export const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F5D75',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarLoading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheetTitle: {
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    marginBottom: 4,
  },
  photoViewerOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  photoViewerImage: {
    width: '100%',
    height: '80%',
  },
});
