import type { ReactNode } from 'react';

export type MenuRowProps = {
  icon: ReactNode;
  label: string;
  onPress: () => void;
};
