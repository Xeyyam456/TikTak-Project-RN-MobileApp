import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
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
import Button from '@shared/components/Button';
import { HeartIcon } from '@shared/components/icons';
import { getProduct, toggleFavorite } from '@shared/services/product.service';
import type { Product } from '@typings/api';
import { FONTS } from '../../../theme/fonts';

const FALLBACK_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';
// Any value at least as tall as the sheet's rendered content works as the
// off-screen starting point — using the full window height guarantees that
// regardless of how much text a given product has.
const OFFSCREEN_Y = Dimensions.get('window').height;
const DRAG_CLOSE_THRESHOLD = 100;

type ProductDetailSheetProps = {
  product: Product | null;
  quantity: number;
  onClose: () => void;
  onAdd: () => void;
  onFavoriteChange?: (productId: number, isFavorite: boolean) => void;
};

function ProductDetailSheet({
  product,
  quantity,
  onClose,
  onAdd,
  onFavoriteChange,
}: ProductDetailSheetProps) {
  const insets = useSafeAreaInsets();
  const [isFavorite, setIsFavorite] = useState(false);
  const [togglingFavorite, setTogglingFavorite] = useState(false);
  const translateY = useRef(new Animated.Value(OFFSCREEN_Y)).current;

  useEffect(() => {
    if (!product) return;
    setIsFavorite(false);
    getProduct(product.id).then(detail => setIsFavorite(detail.is_favorite));

    translateY.setValue(OFFSCREEN_Y);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  }, [product, translateY]);

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

  async function handleToggleFavorite() {
    if (!product || togglingFavorite) return;
    const nextValue = !isFavorite;
    setTogglingFavorite(true);
    setIsFavorite(nextValue);
    try {
      await toggleFavorite(product.id);
      const detail = await getProduct(product.id);
      setIsFavorite(detail.is_favorite);
      onFavoriteChange?.(product.id, detail.is_favorite);
    } catch {
      setIsFavorite(!nextValue);
    } finally {
      setTogglingFavorite(false);
    }
  }

  return (
    <Modal
      visible={!!product}
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
              style={[styles.sheet, { paddingBottom: insets.bottom + 20 }]}
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

              <TouchableOpacity
                style={styles.favoriteButton}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                onPress={handleToggleFavorite}
              >
                <HeartIcon
                  size={22}
                  filled={isFavorite}
                  color={isFavorite ? '#E24C4C' : '#B8B8C2'}
                />
              </TouchableOpacity>

              {product && (
                <>
                  <Image
                    source={{ uri: product.img_url || FALLBACK_IMAGE_URL }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <Text style={styles.title}>{product.title}</Text>
                  <Text style={styles.description} numberOfLines={3}>
                    {product.description}
                  </Text>
                  <Text style={styles.price}>{product.price} AZN</Text>

                  {quantity > 0 ? (
                    <View style={styles.inBasket}>
                      <Text style={styles.inBasketText}>
                        Artıq səbətdədir
                      </Text>
                    </View>
                  ) : (
                    <Button title="Səbətə əlavə et" onPress={onAdd} />
                  )}
                </>
              )}
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  handleArea: {
    paddingVertical: 8,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EFEFEF',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 12,
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  description: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  price: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 20,
    color: '#1A1A1A',
    fontFamily: FONTS.extraBold,
    textAlign: 'center',
  },
  inBasket: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F1F0F7',
  },
  inBasketText: {
    fontSize: 15,
    color: '#7BC043',
    fontFamily: FONTS.semiBold,
  },
});

export default ProductDetailSheet;
