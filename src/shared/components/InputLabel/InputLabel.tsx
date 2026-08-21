import { Text } from 'react-native';
import { styles } from './InputLabel.styles';
import type { InputLabelProps } from './InputLabel.types';

function InputLabel({ children }: InputLabelProps) {
  return <Text style={styles.label}>{children}</Text>;
}

export default InputLabel;
