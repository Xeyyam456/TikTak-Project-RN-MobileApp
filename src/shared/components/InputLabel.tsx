import { StyleSheet, Text } from 'react-native';
import { FONTS } from '../../theme/fonts';

type InputLabelProps = {
  children: string;
};

function InputLabel({ children }: InputLabelProps) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: '#333333',
    fontFamily: FONTS.regular,
  },
});

export default InputLabel;
