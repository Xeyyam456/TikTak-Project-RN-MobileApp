import { Text, TouchableOpacity, View } from 'react-native';
import { styles, SUMMARY_BAR_GAP, SUMMARY_BAR_HEIGHT } from './BasketSummaryBar.styles';
import type { BasketSummaryBarProps } from './BasketSummaryBar.types';

function BasketSummaryBar({ itemCount, total, onPress }: BasketSummaryBarProps) {
  return (
    <TouchableOpacity
      style={[styles.bar, { height: SUMMARY_BAR_HEIGHT, marginBottom: SUMMARY_BAR_GAP }]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.left}>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{itemCount}</Text>
        </View>
        <Text style={styles.label}>Sifarişlər</Text>
      </View>
      <Text style={styles.total}>₼ {total}</Text>
    </TouchableOpacity>
  );
}

export default BasketSummaryBar;
