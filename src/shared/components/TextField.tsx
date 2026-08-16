import { StyleSheet, Text, TextInputProps, View } from 'react-native';
import InputLabel from './InputLabel';
import Input from './Input';
import { FONTS } from '../../theme/fonts';

type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

function TextField({ label, error, style, ...inputProps }: TextFieldProps) {
  return (
    <View style={styles.container}>
      <InputLabel>{label}</InputLabel>
      <Input style={[error ? styles.inputError : null, style]} {...inputProps} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#E24C4C',
  },
  errorText: {
    fontSize: 12,
    color: '#E24C4C',
    fontFamily: FONTS.regular,
  },
});

export default TextField;
