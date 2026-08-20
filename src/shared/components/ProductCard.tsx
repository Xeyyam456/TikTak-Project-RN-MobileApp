import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Product } from '@typings/api';
import { FONTS } from '../../theme/fonts';
import Button from './Button';

export const COLUMNS = 2;
export const GRID_GAP = 12;
export const HORIZONTAL_PADDING = 15;
export const CARD_WIDTH =
  (Dimensions.get('window').width -
    HORIZONTAL_PADDING * 2 -
    GRID_GAP * (COLUMNS - 1)) /
  COLUMNS;

const FALLBACK_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

type ProductCardProps = {
  product: Product;
  quantity: number;
  onPress: () => void;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

function ProductCard({
  product,
  quantity,
  onPress,
  onAdd,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  const total = (Number(product.price) * quantity).toFixed(2);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.cardImage}>
        <Image
          source={{ uri: product.img_url || FALLBACK_IMAGE_URL }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {product.title}
      </Text>

      {quantity > 0 ? (
        <>
          <Text style={styles.bulkPriceLine}>
            <Text style={styles.bulkPriceQty}>
              {quantity} {product.type}
            </Text>
            <Text style={styles.bulkPriceEquals}> = </Text>
            <Text style={styles.bulkPriceTotal}>{total} AZN</Text>
          </Text>
          <View style={styles.stepper}>
            <TouchableOpacity style={styles.stepperMinus} onPress={onDecrement}>
              <Text style={styles.stepperMinusText}>−</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stepperPlus} onPress={onIncrement}>
              <Text style={styles.stepperPlusText}>
                + {quantity} {product.type}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.cardPrice}>{product.price} AZN</Text>
          <Button title="Səbətə əlavə et" onPress={onAdd} style={styles.addButton} />
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 14,
    padding: 6,
    gap: 3,
  },
  cardImage: {
    width: '92%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 13,
    lineHeight: 17,
    height: 34,
    color: '#1A1A1A',
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 14,
    lineHeight: 18,
    height: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  addButton: {
    height: 34,
    paddingVertical: 0,
  },
  bulkPriceLine: {
    fontSize: 12,
    lineHeight: 18,
    height: 18,
    textAlign: 'center',
  },
  bulkPriceQty: {
    color: '#B85C5C',
    fontFamily: FONTS.medium,
  },
  bulkPriceEquals: {
    color: '#E24C4C',
    fontFamily: FONTS.semiBold,
  },
  bulkPriceTotal: {
    fontSize: 13,
    color: '#E24C4C',
    fontFamily: FONTS.extraBold,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepperMinus: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F6D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperMinusText: {
    fontSize: 18,
    color: '#E24C4C',
    fontFamily: FONTS.bold,
  },
  stepperPlus: {
    flex: 1,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#7BC043',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperPlusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: FONTS.semiBold,
  },
});

export default ProductCard;
