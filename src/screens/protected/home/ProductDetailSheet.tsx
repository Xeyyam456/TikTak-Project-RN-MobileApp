import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from '@shared/components/BottomSheet';
import Button from '@shared/components/Button';
import { HeartIcon } from '@shared/components/icons';
import { getProduct, toggleFavorite } from '@shared/services/product.service';
import type { Product } from '@typings/api';
import { FONTS } from '../../../theme/fonts';

const FALLBACK_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [togglingFavorite, setTogglingFavorite] = useState(false);

  useEffect(() => {
    if (!product) return;
    setIsFavorite(false);
    getProduct(product.id).then(detail => setIsFavorite(detail.is_favorite));
  }, [product]);

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
    <BottomSheet visible={!!product} onClose={onClose}>
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
              <Text style={styles.inBasketText}>Artıq səbətdədir</Text>
            </View>
          ) : (
            <Button title="Səbətə əlavə et" onPress={onAdd} />
          )}
        </>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
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
