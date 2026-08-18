import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FruitImage from '@assets/images/images1.svg';
import Button from '@shared/components/Button';
import TextField from '@shared/components/TextField';
import { ChevronRightIcon } from '@shared/components/icons';
import { listCategories } from '@shared/services/category.service';
import { getProfile, updateProfile } from '@shared/services/profile.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import type { Category, UserProfile } from '@typings/api';
import type { HomeStackParamList } from '@typings/navigation';
import { FONTS } from '../../../theme/fonts';

const COLUMNS = 3;
const GRID_GAP = 12;
const HORIZONTAL_PADDING = 15;
const CARD_WIDTH =
  (Dimensions.get('window').width -
    HORIZONTAL_PADDING * 2 -
    GRID_GAP * (COLUMNS - 1)) /
  COLUMNS;

function CategoryCard({
  category,
  onPress,
}: {
  category: Category;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {category.img_url ? (
        <Image source={{ uri: category.img_url }} style={styles.cardImage} />
      ) : (
        <View style={[styles.cardImage, styles.cardImagePlaceholder]} />
      )}
      <Text style={styles.cardLabel} numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const [profile, setProfile] = useState<UserProfile>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [addressInput, setAddressInput] = useState('');
  const [addressError, setAddressError] = useState<string>();
  const [savingAddress, setSavingAddress] = useState(false);

  useEffect(() => {
    Promise.all([getProfile(), listCategories()])
      .then(([profileData, categoryList]) => {
        setProfile(profileData);
        setCategories(categoryList);
      })
      .finally(() => setLoading(false));
  }, []);

  function openAddressModal() {
    setAddressInput(profile?.address ?? '');
    setAddressError(undefined);
    setAddressModalVisible(true);
  }

  async function handleSaveAddress() {
    if (!profile) return;
    const trimmed = addressInput.trim();
    if (!trimmed) {
      setAddressError('Ünvan daxil edin');
      return;
    }

    setAddressError(undefined);
    setSavingAddress(true);
    try {
      const updated = await updateProfile({
        full_name: profile.full_name,
        address: trimmed,
      });
      setProfile(updated);
      setAddressModalVisible(false);
    } catch (error) {
      setAddressError(getApiErrorMessage(error));
    } finally {
      setSavingAddress(false);
    }
  }

  return (
    <View style={styles.flex}>
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
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() =>
              navigation.navigate('CategoryProducts', {
                categoryId: item.id,
                categoryName: item.name,
              })
            }
          />
        )}
        ListHeaderComponent={
          <>
            <TouchableOpacity
              style={styles.addressCard}
              onPress={openAddressModal}
              activeOpacity={0.7}
            >
              <View style={styles.addressTextGroup}>
                <Text style={styles.addressLabel}>Çatdırılma ünvanı:</Text>
                <Text style={styles.addressValue} numberOfLines={1}>
                  {profile?.address ?? 'Ünvan seçilməyib'}
                </Text>
              </View>
              <ChevronRightIcon size={20} color="#9B9B9B" />
            </TouchableOpacity>

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

      <Modal
        visible={addressModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAddressModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Çatdırılma ünvanı</Text>
            <TextField
              label="Ünvan"
              placeholder="Ünvanı daxil edin"
              value={addressInput}
              onChangeText={setAddressInput}
              error={addressError}
              autoFocus
            />
            <Button
              title="Yadda saxla"
              onPress={handleSaveAddress}
              loading={savingAddress}
            />
            <Text
              style={styles.modalCancel}
              onPress={() => setAddressModalVisible(false)}
            >
              Ləğv et
            </Text>
          </View>
        </View>
      </Modal>
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
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F0F7',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 21,
    gap: 8,
  },
  addressTextGroup: {
    flex: 1,
    gap: 0,
  },
  addressLabel: {
    fontSize: 17,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  addressValue: {
    fontSize: 15,
    color: '#555555',
    fontFamily: FONTS.regular,
  },
  banner: {
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#B380FF',
    borderRadius: 10,
    paddingVertical: 28.5,
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
    paddingLeft: 23,
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
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    gap: 6,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  cardImagePlaceholder: {
    backgroundColor: '#F1F0F7',
  },
  cardLabel: {
    fontSize: 12,
    color: '#1A1A1A',
    fontFamily: FONTS.medium,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    gap: 16,
  },
  modalTitle: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  modalCancel: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: FONTS.medium,
  },
});

export default HomeScreen;
