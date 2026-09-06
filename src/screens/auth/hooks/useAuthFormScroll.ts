import { useRef } from 'react';
import {
  useReanimatedKeyboardAnimation,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller';

/**
 * Keeps the submit button reachable when an early field is focused: the
 * scroll fires immediately if the keyboard is already up, and waits ~300ms
 * if it still has to animate open — otherwise the scroll races the keyboard
 * (and its ghost padding) and jumps. Shared by the login and signup forms.
 */
export default function useAuthFormScroll() {
  const scrollRef = useRef<KeyboardAwareScrollViewRef>(null);
  const { progress } = useReanimatedKeyboardAnimation();

  function handleFieldFocus() {
    const keyboardAlreadyOpen = progress.value > 0.5;
    setTimeout(
      () => scrollRef.current?.scrollToEnd({ animated: true }),
      keyboardAlreadyOpen ? 0 : 300,
    );
  }

  return { scrollRef, handleFieldFocus };
}
