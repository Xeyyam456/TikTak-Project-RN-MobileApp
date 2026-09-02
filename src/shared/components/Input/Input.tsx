import { useMemo, useState } from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { EyeIcon, EyeOffIcon } from '../icons';
import { createStyles } from './Input.styles';

const MASK_CHAR = '•';

function Input({
  style,
  secureTextEntry,
  value,
  onChangeText,
  ...inputProps
}: TextInputProps) {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (!secureTextEntry) {
    return (
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        {...inputProps}
      />
    );
  }

  const realValue = typeof value === 'string' ? value : '';

  // Android's native secureTextEntry briefly reveals each newly typed
  // character before masking it (an OS-level animation, not a JS timing
  // issue) — most noticeable on the very first character since there's
  // usually a pause before the next keystroke. Masking manually here
  // (always rendering mask characters, diffing edits ourselves) bypasses
  // that native reveal entirely instead of racing it.
  function handleChangeText(displayText: string) {
    const oldMasked = MASK_CHAR.repeat(realValue.length);

    let start = 0;
    while (
      start < oldMasked.length &&
      start < displayText.length &&
      oldMasked[start] === displayText[start]
    ) {
      start++;
    }

    let oldEnd = oldMasked.length;
    let newEnd = displayText.length;
    while (
      oldEnd > start &&
      newEnd > start &&
      oldMasked[oldEnd - 1] === displayText[newEnd - 1]
    ) {
      oldEnd--;
      newEnd--;
    }

    const inserted = displayText.slice(start, newEnd);
    const nextValue = realValue.slice(0, start) + inserted + realValue.slice(oldEnd);
    onChangeText?.(nextValue);
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[styles.input, styles.inputWithIcon, style]}
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
        importantForAutofill="no"
        {...inputProps}
        value={visible ? realValue : MASK_CHAR.repeat(realValue.length)}
        onChangeText={visible ? onChangeText : handleChangeText}
        secureTextEntry={false}
      />
      <Pressable
        style={styles.eyeButton}
        onPress={() => setVisible(prev => !prev)}
        hitSlop={8}
      >
        {visible ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
      </Pressable>
    </View>
  );
}

export default Input;
