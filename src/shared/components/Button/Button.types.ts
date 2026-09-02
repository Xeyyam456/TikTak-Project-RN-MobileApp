import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'danger';
  style?: StyleProp<ViewStyle>;
  // Only for shrinking text to fit a fixed-size button in a tight layout
  // (e.g. ProductCard's grid card) when a translation runs longer than the
  // original copy — never use this to redesign a button's type scale.
  textStyle?: StyleProp<TextStyle>;
};
