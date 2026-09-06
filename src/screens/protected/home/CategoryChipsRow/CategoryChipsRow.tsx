import { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './CategoryChipsRow.styles';
import type { CategoryChipsRowProps } from './CategoryChipsRow.types';

function CategoryChipsRow({
  categories,
  selectedCategoryId,
  onSelect,
  chipsScrollRef,
  onChipsContentSizeChange,
  onChipLayout,
}: CategoryChipsRowProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView
      ref={chipsScrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      style={styles.chipsRow}
      contentContainerStyle={styles.chipsContent}
      onContentSizeChange={onChipsContentSizeChange}
    >
      {categories.map(category => {
        const active = category.id === selectedCategoryId;
        return (
          <TouchableOpacity
            key={category.id}
            style={[styles.chip, active && styles.chipActive]}
            onLayout={event =>
              onChipLayout(category.id, {
                x: event.nativeEvent.layout.x,
                width: event.nativeEvent.layout.width,
              })
            }
            onPress={() => onSelect(category.id)}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default CategoryChipsRow;
