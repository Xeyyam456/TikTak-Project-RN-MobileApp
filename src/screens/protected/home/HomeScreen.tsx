import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import FruitImage from '@assets/images/images1.svg';
import { CartIcon } from '@shared/components/icons';
import { listCategories } from '@shared/services/category.service';
import { getProfile } from '@shared/services/profile.service';
import type { Category } from '@typings/api';
import { FONTS } from '../../../theme/fonts';

const COLUMNS = 3;
const GRID_GAP = 12;
const HORIZONTAL_PADDING = 24;
const CARD_WIDTH =
  (Dimensions.get('window').width -
    HORIZONTAL_PADDING * 2 -
    GRID_GAP * (COLUMNS - 1)) /
  COLUMNS;

function HeaderShadow() {
  return (
    <Svg width="100%" height={10} style={styles.headerShadow}>
      <Defs>
        <LinearGradient id="headerShadowGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#000000" stopOpacity={0.06} />
          <Stop offset="1" stopColor="#000000" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height={10} fill="url(#headerShadowGradient)" />
    </Svg>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <View style={styles.card}>
      {category.img_url ? (
        <Image source={{ uri: category.img_url }} style={styles.cardImage} />
      ) : (
        <View style={[styles.cardImage, styles.cardImagePlaceholder]} />
      )}
      <Text style={styles.cardLabel} numberOfLines={1}>
        {category.name}
      </Text>
    </View>
  );
}

function HomeScreen() {
  const insets = useSafeAreaInsets();

  const [address, setAddress] = useState<string>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProfile(), listCategories()])
      .then(([profile, categoryList]) => {
        setAddress(profile.address ?? undefined);
        setCategories(categoryList);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.flex}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.logo}>TIK TAK</Text>
        <CartIcon size={24} />
      </View>
      <HeaderShadow />

      <FlatList
        style={styles.flex}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        data={categories}
        keyExtractor={item => String(item.id)}
        numColumns={COLUMNS}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <CategoryCard category={item} />}
        ListHeaderComponent={
          <>
            <View style={styles.addressCard}>
              <Text style={styles.addressLabel}>Çatdırılma ünvanı:</Text>
              <Text style={styles.addressValue} numberOfLines={1}>
                {address ?? 'Ünvan seçilməyib'}
              </Text>
            </View>

            <View style={styles.banner}>
              <FruitImage
                width={158}
                height={146}
                style={styles.bannerImage}
              />
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>MEYVƏLƏRƏ</Text>
                <Text style={styles.bannerSubtitle}>HƏFTƏ SONUNA KIMI</Text>
                <Text style={styles.bannerDiscount}>20% ENDİRİM</Text>
              </View>
            </View>

            {loading ? (
              <ActivityIndicator color="#7BC043" style={styles.loader} />
            ) : null}
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  headerShadow: {
    zIndex: 1,
  },
  logo: {
    fontSize: 22,
    color: '#1A1A1A',
    fontFamily: FONTS.extraBold,
  },
  addressCard: {
    backgroundColor: '#F1F0F7',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 21,
    gap: 4,
  },
  addressLabel: {
    fontSize: 13,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  addressValue: {
    fontSize: 13,
    color: '#555555',
    fontFamily: FONTS.regular,
  },
  banner: {
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#B380FF',
    borderRadius: 6,
    paddingVertical: 28,
    paddingRight: 20,
    paddingLeft: 148,
    marginBottom: 20,
    overflow: 'visible',
  },
  bannerImage: {
    position: 'absolute',
    left: -20,
    top: 11,
    zIndex: 1,
  },
  bannerText: {
    paddingLeft: 8,
    marginTop: 10,
  },
  bannerTitle: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: FONTS.extraBold,
  },
  bannerSubtitle: {
    fontSize: 17,
    color: '#FFFFFF',
    fontFamily: FONTS.medium,
    marginTop: -2,
  },
  bannerDiscount: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: FONTS.extraBold,
    marginTop: 6,
  },
  loader: {
    marginTop: 24,
  },
  row: {
    gap: GRID_GAP,
    marginBottom: GRID_GAP,
  },
  card: {
    width: CARD_WIDTH,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
    gap: 8,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 6,
  },
  cardImagePlaceholder: {
    backgroundColor: '#F1F0F7',
  },
  cardLabel: {
    fontSize: 12,
    color: '#1A1A1A',
    fontFamily: FONTS.medium,
  },
});

export default HomeScreen;
