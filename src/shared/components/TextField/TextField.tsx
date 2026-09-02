import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import InputLabel from '../InputLabel';
import Input from '../Input';
import { createStyles } from './TextField.styles';
import type { TextFieldProps } from './TextField.types';

function TextField({ label, error, style, ...inputProps }: TextFieldProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.container}>
      <InputLabel>{label}</InputLabel>
      <Input style={[error ? styles.inputError : null, style]} {...inputProps} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export default TextField;
