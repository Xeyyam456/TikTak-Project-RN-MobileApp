import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@shared/components/ConfirmModal';
import { TrashIcon } from '@shared/icons';
import { useBasketStore } from '@shared/store/basket.store';
import { useTheme } from '../../../../theme/ThemeContext';
import type { ClearBasketModalProps } from './ClearBasketModal.types';

// Owns the in-flight `clearing` state itself so the screen only has to
// track whether the modal is open.
function ClearBasketModal({ visible, onClose }: ClearBasketModalProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const clearBasket = useBasketStore(state => state.clearBasket);
  const [clearing, setClearing] = useState(false);

  async function handleConfirm() {
    setClearing(true);
    await clearBasket();
    setClearing(false);
    onClose();
  }

  return (
    <ConfirmModal
      visible={visible}
      icon={<TrashIcon size={28} color={colors.danger} />}
      title={t('basket.clearAll')}
      message={t('basket.clearConfirmMessage')}
      confirmLabel={t('basket.clearConfirmButton')}
      destructive
      loading={clearing}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
}

export default ClearBasketModal;
