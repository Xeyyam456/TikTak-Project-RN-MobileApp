import { type ReactNode } from 'react';
import { Modal, Text, View } from 'react-native';
import Button from '../Button';
import { styles } from './ConfirmModal.styles';

type ConfirmModalProps = {
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

function ConfirmModal({
  visible,
  icon,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Ləğv et',
  destructive,
  loading,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {icon && (
            <View
              style={[styles.iconCircle, destructive && styles.iconCircleDanger]}
            >
              {icon}
            </View>
          )}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <Button
            title={confirmLabel}
            onPress={onConfirm}
            loading={loading}
            variant={destructive ? 'danger' : 'primary'}
            style={styles.confirmButton}
          />
          <Text style={styles.cancel} onPress={onCancel}>
            {cancelLabel}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

export default ConfirmModal;
