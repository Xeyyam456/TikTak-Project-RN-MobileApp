import { useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TrashIcon } from '@shared/icons';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './BasketRow.styles';
import type { BasketRowProps } from './BasketRow.types';

const FALLBACK_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

function BasketRow({ item, onIncrement, onDecrement }: BasketRowProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.row}>
      <Image
        source={{ uri: item.product.img_url || FALLBACK_IMAGE_URL }}
        style={styles.rowImage}
        resizeMode="cover"
      />
      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text style={styles.rowPrice}>{item.product.price} AZN</Text>
      </View>
      <View style={styles.stepper}>
        <TouchableOpacity style={styles.stepperButton} onPress={onDecrement}>
          {item.quantity <= 1 ? (
            <TrashIcon size={20} color="#FFFFFF" />
          ) : (
            <Text style={styles.stepperButtonText}>−</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.stepperQuantity}>{item.quantity}</Text>
        <TouchableOpacity style={styles.stepperButton} onPress={onIncrement}>
          <Text style={styles.stepperButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default BasketRow;
