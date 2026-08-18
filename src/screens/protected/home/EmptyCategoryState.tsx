import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { FONTS } from '../../../theme/fonts';

function EmptyCategoryState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
          <Path
            d="M6 6l12 12M18 6L6 18"
            stroke="#C4C4CE"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      </View>
      <Text style={styles.text}>Bu kateqoriyada məhsul yoxdur</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 64,
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F1F0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: '#B8B8C2',
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
});

export default EmptyCategoryState;
