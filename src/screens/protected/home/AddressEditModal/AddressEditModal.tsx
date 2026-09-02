import { useEffect, useMemo, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '@shared/components/Button';
import TextField from '@shared/components/TextField';
import { updateProfile } from '@shared/services/profile.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showSuccessToast } from '@shared/utils/toast';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './AddressEditModal.styles';
import type { AddressEditModalProps } from './AddressEditModal.types';

function AddressEditModal({ visible, profile, onClose, onSaved }: AddressEditModalProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const [addressInput, setAddressInput] = useState('');
  const [addressError, setAddressError] = useState<string>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) {
      setAddressInput(profile?.address ?? '');
      setAddressError(undefined);
    }
  }, [visible, profile?.address]);

  async function handleSave() {
    if (!profile) return;
    const trimmed = addressInput.trim();
    if (!trimmed) {
      setAddressError(t('addressEditModal.addressRequired'));
      return;
    }

    setAddressError(undefined);
    setSaving(true);
    try {
      const updated = await updateProfile({
        full_name: profile.full_name,
        address: trimmed,
      });
      onSaved(updated);
      showSuccessToast(t('addressEditModal.successToast'));
    } catch (error) {
      setAddressError(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{t('addressEditModal.title')}</Text>
          <TextField
            label={t('addressEditModal.addressLabel')}
            placeholder={t('addressEditModal.addressPlaceholder')}
            value={addressInput}
            onChangeText={setAddressInput}
            error={addressError}
            autoFocus
          />
          <Button title={t('addressEditModal.save')} onPress={handleSave} loading={saving} />
          <Text style={styles.modalCancel} onPress={onClose}>
            {t('addressEditModal.cancel')}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

export default AddressEditModal;
