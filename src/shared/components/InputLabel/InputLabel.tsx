import { useMemo } from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles } from './InputLabel.styles';
import type { InputLabelProps } from './InputLabel.types';

function InputLabel({ children }: InputLabelProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return <Text style={styles.label}>{children}</Text>;
}

export default InputLabel;
