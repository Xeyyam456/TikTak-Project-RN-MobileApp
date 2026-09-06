import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@shared/components/Button';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './BasketFooter.styles';
import type { BasketFooterProps } from './BasketFooter.types';

function BasketFooter({ total, onCheckout, onHeightChange }: BasketFooterProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  return (
    <View
      style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}
      onLayout={event => onHeightChange(event.nativeEvent.layout.height)}
    >
      <View style={styles.footerDivider} />
      <View style={styles.summaryRow}>
        <View>
          <Text style={styles.summaryLabel}>{t('basket.subtotal', { total })}</Text>
          <Text style={styles.summaryLabel}>{t('basket.deliveryFree')}</Text>
        </View>
        <View style={styles.summaryTotalWrapper}>
          <Text style={styles.summaryTotalLabel}>{t('basket.finalTotalLabel')}</Text>
          <Text style={styles.summaryTotalValue}>{total} AZN</Text>
        </View>
      </View>
      <Button
        title={t('basket.checkout')}
        style={styles.checkoutButton}
        onPress={onCheckout}
      />
    </View>
  );
}

export default BasketFooter;
