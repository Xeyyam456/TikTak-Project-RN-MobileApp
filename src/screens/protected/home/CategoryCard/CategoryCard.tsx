import { useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './CategoryCard.styles';
import type { CategoryCardProps } from './CategoryCard.types';

function CategoryCard({ category, onPress }: CategoryCardProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {category.img_url ? (
        <Image source={{ uri: category.img_url }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]} />
      )}
      {/* Fixed-height box rather than a fixed-height Text: it centres a
          one-line and a two-line name alike, where textAlignVertical would
          only do so on Android. */}
      <View style={styles.labelBox}>
        <Text style={styles.label} numberOfLines={2}>
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default CategoryCard;
