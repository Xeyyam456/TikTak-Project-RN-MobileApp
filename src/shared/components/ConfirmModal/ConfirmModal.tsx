import { useMemo } from 'react';
import { Modal, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../theme/ThemeContext';
import Button from '../Button';
import { createStyles } from './ConfirmModal.styles';
import type { ConfirmModalProps } from './ConfirmModal.types';

function ConfirmModal({
  visible,
  icon,
  title,
  message,
  confirmLabel,
  cancelLabel,
  destructive,
  loading,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const resolvedCancelLabel = cancelLabel ?? t('common.cancel');
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
            {resolvedCancelLabel}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

export default ConfirmModal;
