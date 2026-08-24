import { Text, TouchableOpacity } from 'react-native';
import { styles } from './MenuRow.styles';
import type { MenuRowProps } from './MenuRow.types';

function MenuRow({ icon, label, onPress }: MenuRowProps) {
  return (
    <TouchableOpacity style={styles.menuRow} activeOpacity={0.7} onPress={onPress}>
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default MenuRow;
