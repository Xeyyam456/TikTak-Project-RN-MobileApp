import { useMemo } from 'react';
import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './EmptyCategoryState.styles';

function EmptyCategoryState() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
          <Path
            d="M6 6l12 12M18 6L6 18"
            stroke={colors.borderMuted}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      </View>
      <Text style={styles.text}>Bu kateqoriyada məhsul yoxdur</Text>
    </View>
  );
}

export default EmptyCategoryState;
