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
        <Image source={{ uri: category.img_url }} style={styles.cardImage} />
      ) : (
        <View style={[styles.cardImage, styles.cardImagePlaceholder]} />
      )}
      <Text style={styles.cardLabel} numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

export default CategoryCard;
