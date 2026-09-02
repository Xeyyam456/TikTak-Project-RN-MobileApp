import { useMemo } from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import BottomSheet from '@shared/components/BottomSheet';
import { formatOrderDate, getOrderStatusMeta } from '@shared/utils/order';
import { formatProductMeasure } from '@shared/utils/productMeasure';
import type { Order } from '@typings/api';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './OrderDetailSheet.styles';
import type { OrderDetailSheetProps } from './OrderDetailSheet.types';

const FALLBACK_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

function OrderDetailContent({ order }: { order: Order }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = (Number(order.total) - Number(order.deliveryFee)).toFixed(2);
  const deliveryLabel =
    Number(order.deliveryFee) === 0 ? t('orderDetail.free') : `${order.deliveryFee} AZN`;

  return (
    <>
      <View style={styles.infoGrid}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>{t('orderDetail.dateLabel')}</Text>
          <Text style={styles.infoValue}>{formatOrderDate(order.createdAt)}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>{t('orderDetail.numberLabel')}</Text>
          <Text style={styles.infoValue}>#{order.orderNumber}</Text>
        </View>

        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>{t('orderDetail.itemsCountLabel')}</Text>
          <Text style={styles.infoValue}>{itemCount}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>{t('orderDetail.addressLabel')}</Text>
          <Text style={styles.infoValue} numberOfLines={1}>
            {order.address}
          </Text>
        </View>

        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>{t('orderDetail.statusLabel')}</Text>
          <Text style={styles.infoValue}>
            {getOrderStatusMeta(order.status).label}
          </Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>{t('orderDetail.subtotalDeliveryLabel')}</Text>
          <Text style={styles.infoValue}>
            {subtotal} AZN/{deliveryLabel}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.items}
        contentContainerStyle={styles.itemsContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        {order.items.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <Image
              source={{ uri: item.product.img_url || FALLBACK_IMAGE_URL }}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <Text style={styles.itemTitle} numberOfLines={2}>
              {item.product.title} {item.quantity} {formatProductMeasure(item.product.type)}
            </Text>
            <Text style={styles.itemPrice}>{item.total_price} AZN</Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

function OrderDetailSheet({ order, onClose }: OrderDetailSheetProps) {
  return (
    <BottomSheet visible={!!order} onClose={onClose}>
      {order && <OrderDetailContent order={order} />}
    </BottomSheet>
  );
}

export default OrderDetailSheet;
