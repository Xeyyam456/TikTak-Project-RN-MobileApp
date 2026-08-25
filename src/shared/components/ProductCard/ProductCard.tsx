import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../Button';
import { formatProductMeasure } from '@shared/utils/productMeasure';
import { styles } from './ProductCard.styles';
import type { ProductCardProps } from './ProductCard.types';

const FALLBACK_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

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
              {quantity} {formatProductMeasure(product.type)}
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
                + {quantity} {formatProductMeasure(product.type)}
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

export default ProductCard;
