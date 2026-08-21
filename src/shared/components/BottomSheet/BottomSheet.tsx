import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
  type PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BottomSheet.styles';
import type { BottomSheetProps } from './BottomSheet.types';

// Any value at least as tall as the sheet's rendered content works as the
// off-screen starting point — using the full window height guarantees that
// regardless of how much content a given sheet has.
const OFFSCREEN_Y = Dimensions.get('window').height;
const DRAG_CLOSE_THRESHOLD = 100;

function BottomSheet({ visible, onClose, children, contentStyle }: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(OFFSCREEN_Y)).current;

  useEffect(() => {
    if (!visible) return;
    translateY.setValue(OFFSCREEN_Y);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  }, [visible, translateY]);

  function closeWithAnimation() {
    Animated.timing(translateY, {
      toValue: OFFSCREEN_Y,
      duration: 200,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) onClose();
    });
  }

  // Sheet is at rest (translateY === 0) whenever a drag can start. Clamp to
  // 0 here (JS thread, not Animated.event) so dragging down then back up
  // before releasing can't push translateY negative, which would raise the
  // sheet above its resting position.
  function onHandleGestureEvent(event: PanGestureHandlerGestureEvent) {
    translateY.setValue(Math.max(0, event.nativeEvent.translationY));
  }

  function onHandleStateChange(event: PanGestureHandlerStateChangeEvent) {
    if (event.nativeEvent.oldState !== State.ACTIVE) return;
    const { translationY, velocityY } = event.nativeEvent;
    if (translationY > DRAG_CLOSE_THRESHOLD || velocityY > 800) {
      closeWithAnimation();
    } else {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={closeWithAnimation}
    >
      <GestureHandlerRootView style={styles.gestureRoot}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeWithAnimation}
        >
          <Animated.View style={{ transform: [{ translateY }] }}>
            <TouchableOpacity
              style={[styles.sheet, { paddingBottom: insets.bottom + 20 }, contentStyle]}
              activeOpacity={1}
              onPress={() => {}}
            >
              <PanGestureHandler
                onGestureEvent={onHandleGestureEvent}
                onHandlerStateChange={onHandleStateChange}
                activeOffsetY={10}
                failOffsetX={[-20, 20]}
                hitSlop={{ top: 20, bottom: 20, left: 60, right: 60 }}
              >
                <Animated.View style={styles.handleArea}>
                  <View style={styles.handle} />
                </Animated.View>
              </PanGestureHandler>

              {children}
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </Modal>
  );
}

export default BottomSheet;
