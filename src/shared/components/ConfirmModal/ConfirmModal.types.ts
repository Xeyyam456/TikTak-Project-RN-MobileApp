import type { ReactNode } from 'react';

export type ConfirmModalProps = {
  visible: boolean;
  icon?: ReactNode;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
