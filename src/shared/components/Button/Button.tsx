import { useRef } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { styles } from './Button.styles';
import type { ButtonProps } from './Button.types';

const DOUBLE_PRESS_GUARD_MS = 600;

function Button({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  style,
}: ButtonProps) {
  const lastPressRef = useRef(0);
  const isDisabled = disabled || loading;

  function handlePress() {
    const now = Date.now();
    if (now - lastPressRef.current < DOUBLE_PRESS_GUARD_MS) return;
    lastPressRef.current = now;
    onPress?.();
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'danger' && styles.buttonDanger,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.75}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

export default Button;
