import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
};
