import { useRef } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { FONTS } from '../../theme/fonts';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

const DOUBLE_PRESS_GUARD_MS = 600;

function Button({ title, onPress, disabled }: ButtonProps) {
  const lastPressRef = useRef(0);

  function handlePress() {
    const now = Date.now();
    if (now - lastPressRef.current < DOUBLE_PRESS_GUARD_MS) return;
    lastPressRef.current = now;
    onPress?.();
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7BC043',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: FONTS.semiBold,
  },
});

export default Button;
