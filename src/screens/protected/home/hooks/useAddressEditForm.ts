import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateProfile } from '@shared/services/profile.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showSuccessToast } from '@shared/utils/toast';
import type { UserProfile } from '@typings/api';

/** AddressEditModal's manual-entry text field state + save mutation. */
export default function useAddressEditForm(
  visible: boolean,
  profile: UserProfile | undefined,
  onSaved: (profile: UserProfile) => void,
) {
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
      const updated = await updateProfile({ full_name: profile.full_name, address: trimmed });
      onSaved(updated);
      showSuccessToast(t('addressEditModal.successToast'));
    } catch (error) {
      setAddressError(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return { addressInput, setAddressInput, addressError, saving, handleSave };
}
