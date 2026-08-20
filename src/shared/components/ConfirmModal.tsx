import { type ReactNode } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { FONTS } from '../../theme/fonts';
import Button from './Button';

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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 32,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F0F7',
    marginBottom: 16,
  },
  iconCircleDanger: {
    backgroundColor: '#FBE6E6',
  },
  title: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  confirmButton: {
    alignSelf: 'stretch',
    marginTop: 24,
  },
  cancel: {
    marginTop: 16,
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
  },
});

export default ConfirmModal;
