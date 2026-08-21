import { Text, TextInputProps, View } from 'react-native';
import InputLabel from '../InputLabel';
import Input from '../Input';
import { styles } from './TextField.styles';

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

export default TextField;
