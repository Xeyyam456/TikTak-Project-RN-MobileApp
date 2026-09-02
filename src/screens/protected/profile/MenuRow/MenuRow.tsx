import { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './MenuRow.styles';
import type { MenuRowProps } from './MenuRow.types';

function MenuRow({ icon, label, onPress }: MenuRowProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity style={styles.menuRow} activeOpacity={0.7} onPress={onPress}>
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default MenuRow;
