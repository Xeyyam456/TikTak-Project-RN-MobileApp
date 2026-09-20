import { useMemo } from 'react';
import { Modal, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import SavedAddressList from '../SavedAddressList';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './SavedAddressListModal.styles';
import type { SavedAddressListModalProps } from './SavedAddressListModal.types';

function SavedAddressListModal({
  visible,
  addresses,
  onClose,
  onSelect,
}: SavedAddressListModalProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  function handleSelect(address: string) {
    onSelect(address);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{t('addressEditModal.savedAddresses')}</Text>
          <SavedAddressList addresses={addresses} onSelect={handleSelect} />
          <Text style={styles.modalCancel} onPress={onClose}>
            {t('addressEditModal.cancel')}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

export default SavedAddressListModal;
