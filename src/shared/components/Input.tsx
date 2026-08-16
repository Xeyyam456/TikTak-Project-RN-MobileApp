import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { FONTS } from '../../theme/fonts';

function Input({ style, ...inputProps }: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor="#9B9B9B"
      style={[styles.input, style]}
      {...inputProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F1F0F7',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#000000',
    fontFamily: FONTS.regular,
  },
});

export default Input;
