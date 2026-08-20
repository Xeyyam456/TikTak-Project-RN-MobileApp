import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from '@shared/components/BottomSheet';
import { formatOrderDate, getOrderStatusMeta } from '@shared/utils/order';
import type { Order } from '@typings/api';
import { FONTS } from '../../../theme/fonts';

const FALLBACK_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';
// Row height (image + vertical padding) plus the gap between rows, so the
// sheet's height stays fixed regardless of item count instead of growing
// to fit every item — beyond this many, the list scrolls internally.
const VISIBLE_ITEM_ROWS = 5;
const ITEM_ROW_HEIGHT = 68;
const ITEM_ROW_GAP = 12;
const ITEMS_MAX_HEIGHT =
  VISIBLE_ITEM_ROWS * ITEM_ROW_HEIGHT + (VISIBLE_ITEM_ROWS - 1) * ITEM_ROW_GAP;

function OrderDetailContent({ order }: { order: Order }) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = (Number(order.total) - Number(order.deliveryFee)).toFixed(2);
  const deliveryLabel =
    Number(order.deliveryFee) === 0 ? 'pulsuz' : `${order.deliveryFee} AZN`;

  return (
    <>
      <View style={styles.infoGrid}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Tarix</Text>
          <Text style={styles.infoValue}>{formatOrderDate(order.createdAt)}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>No</Text>
          <Text style={styles.infoValue}>#{order.orderNumber}</Text>
        </View>

        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Məhsul sayı</Text>
          <Text style={styles.infoValue}>{itemCount}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Çatdırılma ünvanı</Text>
          <Text style={styles.infoValue} numberOfLines={1}>
            {order.address}
          </Text>
        </View>

        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Status</Text>
          <Text style={styles.infoValue}>
            {getOrderStatusMeta(order.status).label}
          </Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Subtotal/Çatdırılma</Text>
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
              {item.product.title} {item.quantity} {item.product.type}
            </Text>
            <Text style={styles.itemPrice}>{item.total_price} AZN</Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

type OrderDetailSheetProps = {
  order: Order | null;
  onClose: () => void;
};

function OrderDetailSheet({ order, onClose }: OrderDetailSheetProps) {
  return (
    <BottomSheet visible={!!order} onClose={onClose}>
      {order && <OrderDetailContent order={order} />}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  infoGrid: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoColumn: {
    width: '50%',
    gap: 2,
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
  },
  infoValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  items: {
    maxHeight: ITEMS_MAX_HEIGHT,
  },
  itemsContent: {
    gap: ITEM_ROW_GAP,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F0F7',
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  itemTitle: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.medium,
  },
  itemPrice: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
});

export default OrderDetailSheet;
