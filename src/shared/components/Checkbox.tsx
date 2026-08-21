import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CheckIcon } from './icons';
import { FONTS } from '../../theme/fonts';

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#D0D0D8',
    backgroundColor: '#F1F0F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: '#7BC043',
    borderColor: '#7BC043',
  },
  label: {
    fontSize: 13,
    color: '#333333',
    fontFamily: FONTS.regular,
  },
});

export default Checkbox;
