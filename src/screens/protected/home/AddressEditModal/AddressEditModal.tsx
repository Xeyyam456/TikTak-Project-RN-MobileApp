import { useMemo, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '@shared/components/Button';
import MapAddressPicker from '../MapAddressPicker';
import SavedAddressListModal from '../SavedAddressListModal';
import TextField from '@shared/components/TextField';
import useAddressEditForm from '../hooks/useAddressEditForm';
import useSavedAddresses from '../hooks/useSavedAddresses';
import { ClockIcon, MapPinIcon } from '@shared/icons';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './AddressEditModal.styles';
import type { AddressEditModalProps } from './AddressEditModal.types';

function AddressEditModal({ visible, profile, onClose, onSaved }: AddressEditModalProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const [mapPickerVisible, setMapPickerVisible] = useState(false);
  const [savedListVisible, setSavedListVisible] = useState(false);
  const { addresses: savedAddresses } = useSavedAddresses();
  const form = useAddressEditForm(visible, profile, onSaved);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{t('addressEditModal.title')}</Text>
          <TextField
            label={t('addressEditModal.addressLabel')}
            placeholder={t('addressEditModal.addressPlaceholder')}
            value={form.addressInput}
            onChangeText={form.setAddressInput}
            error={form.addressError}
            autoFocus
          />
          <TouchableOpacity
            style={styles.pickFromMapRow}
            onPress={() => setSavedListVisible(true)}
          >
            <ClockIcon size={18} color={colors.primary} />
            <Text style={styles.pickFromMapText}>{t('addressEditModal.savedAddresses')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pickFromMapRow}
            onPress={() => setMapPickerVisible(true)}
          >
            <MapPinIcon size={18} color={colors.primary} />
            <Text style={styles.pickFromMapText}>{t('addressEditModal.pickFromMap')}</Text>
          </TouchableOpacity>
          <Button
            title={t('addressEditModal.save')}
            onPress={form.handleSave}
            loading={form.saving}
          />
          <Text style={styles.modalCancel} onPress={onClose}>
            {t('addressEditModal.cancel')}
          </Text>
        </View>
      </View>

      <MapAddressPicker
        visible={mapPickerVisible}
        onClose={() => setMapPickerVisible(false)}
        onSelect={form.setAddressInput}
      />
      <SavedAddressListModal
        visible={savedListVisible}
        addresses={savedAddresses}
        onClose={() => setSavedListVisible(false)}
        onSelect={form.setAddressInput}
      />
    </Modal>
  );
}

export default AddressEditModal;
