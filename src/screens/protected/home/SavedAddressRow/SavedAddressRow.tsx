import { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { MapPinIcon } from '@shared/icons';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './SavedAddressRow.styles';
import type { SavedAddressRowProps } from './SavedAddressRow.types';

function SavedAddressRow({ address, onPress }: SavedAddressRowProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={onPress}>
      <MapPinIcon size={18} color={colors.textMuted} />
      <Text style={styles.text} numberOfLines={1}>
        {address}
      </Text>
    </TouchableOpacity>
  );
}

export default SavedAddressRow;
