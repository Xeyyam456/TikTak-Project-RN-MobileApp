import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { EyeIcon } from '@shared/components/icons';
import { formatOrderDate, getOrderStatusMeta } from '@shared/utils/order';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './OrderCard.styles';
import type { OrderCardProps } from './OrderCard.types';

function OrderCard({ order, onPress }: OrderCardProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const status = getOrderStatusMeta(order.status);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.cardTop}>
        <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
        <View style={[styles.statusBadge, { backgroundColor: status.backgroundColor }]}>
          <Text style={[styles.statusText, { color: status.color }]}>
            {status.label}
          </Text>
        </View>
      </View>

      <View style={styles.cardMiddle}>
        <Text style={styles.date}>{formatOrderDate(order.createdAt)}</Text>
        <Text style={styles.total}>{order.total} AZN</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardBottom}>
        <View style={styles.addressBlock}>
          <Text style={styles.addressLabel}>{t('orderDetail.addressLabel')}</Text>
          <Text style={styles.addressText} numberOfLines={1}>
            {order.address}
          </Text>
        </View>
        <View style={styles.viewButton}>
          <EyeIcon size={18} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default OrderCard;
