import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@shared/components/Button';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './CheckoutFooter.styles';
import type { CheckoutFooterProps } from './CheckoutFooter.types';

// Kept in normal flow (not absolutely positioned) on purpose — an absolute
// footer here used to paint over the bottom of the order-items box above,
// which read as a clipping bug. See CLAUDE.md's note on that.
function CheckoutFooter({
  total,
  submitting,
  disabled,
  error,
  onSubmit,
}: CheckoutFooterProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
      <View style={styles.footerDivider} />
      <View style={styles.summaryRow}>
        <View>
          <Text style={styles.summaryLabel}>{t('checkout.subtotal', { total })}</Text>
          <Text style={styles.summaryLabel}>{t('checkout.deliveryFree')}</Text>
        </View>
        <View style={styles.summaryTotalWrapper}>
          <Text style={styles.summaryTotalLabel}>{t('checkout.finalTotalLabel')}</Text>
          <Text style={styles.summaryTotalValue}>{total} AZN</Text>
        </View>
      </View>
      {error ? <Text style={styles.formError}>{error}</Text> : null}
      <Button
        title={t('checkout.submit')}
        loading={submitting}
        disabled={disabled}
        onPress={onSubmit}
      />
    </View>
  );
}

export default CheckoutFooter;
