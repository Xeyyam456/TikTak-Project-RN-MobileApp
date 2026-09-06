import { useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './SearchResultRow.styles';
import type { SearchResultRowProps } from './SearchResultRow.types';

const FALLBACK_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

function SearchResultRow({ product, onPress }: SearchResultRowProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={onPress}>
      <Image
        source={{ uri: product.img_url || FALLBACK_IMAGE_URL }}
        style={styles.rowImage}
        resizeMode="cover"
      />
      <View style={styles.rowText}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.rowPrice}>{product.price} AZN</Text>
      </View>
    </TouchableOpacity>
  );
}

export default SearchResultRow;
