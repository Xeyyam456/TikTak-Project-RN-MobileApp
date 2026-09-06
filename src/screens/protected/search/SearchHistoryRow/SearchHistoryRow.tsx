import { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ClockIcon, CloseIcon } from '@shared/components/icons';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './SearchHistoryRow.styles';
import type { SearchHistoryRowProps } from './SearchHistoryRow.types';

function SearchHistoryRow({ term, onPress, onRemove }: SearchHistoryRowProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={onPress}>
      <ClockIcon size={18} color={colors.textMuted} />
      <Text style={styles.text} numberOfLines={1}>
        {term}
      </Text>
      <TouchableOpacity hitSlop={10} onPress={onRemove}>
        <CloseIcon size={14} color={colors.textMuted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default SearchHistoryRow;
