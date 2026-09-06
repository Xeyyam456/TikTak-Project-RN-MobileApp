import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import SearchHistoryRow from '../SearchHistoryRow';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './SearchHistorySection.styles';
import type { SearchHistorySectionProps } from './SearchHistorySection.types';

function SearchHistorySection({
  history,
  onSelect,
  onRemove,
  onClear,
}: SearchHistorySectionProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  if (history.length === 0) return null;

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('search.recentSearches')}</Text>
        <TouchableOpacity onPress={onClear}>
          <Text style={styles.clear}>{t('search.clear')}</Text>
        </TouchableOpacity>
      </View>
      {history.map(term => (
        <SearchHistoryRow
          key={term}
          term={term}
          onPress={() => onSelect(term)}
          onRemove={() => onRemove(term)}
        />
      ))}
    </View>
  );
}

export default SearchHistorySection;
