import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles, SUMMARY_BAR_GAP, SUMMARY_BAR_HEIGHT } from './BasketSummaryBar.styles';
import type { BasketSummaryBarProps } from './BasketSummaryBar.types';

function BasketSummaryBar({ itemCount, total, onPress }: BasketSummaryBarProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
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
        <Text style={styles.label}>{t('basketSummaryBar.label')}</Text>
      </View>
      <Text style={styles.total}>₼ {total}</Text>
    </TouchableOpacity>
  );
}

export default BasketSummaryBar;
