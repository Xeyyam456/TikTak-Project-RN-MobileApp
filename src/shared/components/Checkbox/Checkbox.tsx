import { Pressable, Text, View } from 'react-native';
import { CheckIcon } from '../icons';
import { styles } from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <Pressable
      style={styles.row}
      onPress={() => onChange(!checked)}
      hitSlop={8}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <CheckIcon size={13} color="#FFFFFF" /> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

export default Checkbox;
