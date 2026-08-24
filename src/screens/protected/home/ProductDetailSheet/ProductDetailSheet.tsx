import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from '@shared/components/BottomSheet';
import Button from '@shared/components/Button';
import { HeartIcon } from '@shared/components/icons';
import { getProduct, toggleFavorite } from '@shared/services/product.service';
import { showSuccessToast } from '@shared/utils/toast';
import { styles } from './ProductDetailSheet.styles';
import type { ProductDetailSheetProps } from './ProductDetailSheet.types';

const FALLBACK_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

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
      showSuccessToast(
        `${product.title} ${detail.is_favorite ? 'favoritlərə əlavə edildi' : 'favoritlərdən silindi'}`,
      );
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

export default ProductDetailSheet;
