import { Text } from 'react-native';
import { styles } from './InputLabel.styles';

type InputLabelProps = {
  children: string;
};

function InputLabel({ children }: InputLabelProps) {
  return <Text style={styles.label}>{children}</Text>;
}

export default InputLabel;
