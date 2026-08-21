import type { TextInputProps } from 'react-native';

export type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};
