import { Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeftIcon } from '@shared/components/icons';
import { styles } from './ScreenHeader.styles';
import type { ScreenHeaderProps } from './ScreenHeader.types';

function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        onPress={onBack}
      >
        <ArrowLeftIcon size={22} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

export default ScreenHeader;
