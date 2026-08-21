import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation, useScrollToTop } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import TextField from '@shared/components/TextField';
import { ChevronRightIcon } from '@shared/components/icons';
import { listCampaigns } from '@shared/services/campaign.service';
import { listCategories } from '@shared/services/category.service';
import { getProfile, updateProfile } from '@shared/services/profile.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import type { Campaign, Category, UserProfile } from '@typings/api';
import type { HomeStackParamList } from '@typings/navigation';
import { COLUMNS, styles } from './HomeScreen.styles';

const CAMPAIGN_AUTOPLAY_MS = 3000;
const FALLBACK_CAMPAIGN_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

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

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <View style={styles.campaignCard}>
      <Image
        source={{ uri: campaign.img_url || FALLBACK_CAMPAIGN_IMAGE }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <View style={styles.campaignOverlay}>
        <Text style={styles.campaignTitle} numberOfLines={1}>
          {campaign.title}
        </Text>
        {campaign.description ? (
          <Text style={styles.campaignDescription} numberOfLines={2}>
            {campaign.description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const [profile, setProfile] = useState<UserProfile>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [addressInput, setAddressInput] = useState('');
  const [addressError, setAddressError] = useState<string>();
  const [savingAddress, setSavingAddress] = useState(false);

  const campaignListRef = useRef<FlatList<Campaign>>(null);
  const campaignIndexRef = useRef(0);
  const categoryListRef = useRef<FlatList<Category>>(null);

  // Lets tapping the already-focused "Əsas" tab scroll back to the top
  // (the category cards), matching native tab-bar "tap again to go top".
  useScrollToTop(categoryListRef);

  useEffect(() => {
    Promise.all([getProfile(), listCategories(), listCampaigns()])
      .then(([profileData, categoryList, campaignList]) => {
        setProfile(profileData);
        setCategories(categoryList);
        setCampaigns(campaignList);
      })
      .finally(() => setLoading(false));
  }, []);

  // HomeScreen stays mounted while switching tabs, so without this the
  // address shown here (and used as the checkout default) would go stale
  // after editing it from Hesabım → Hesab məlumatlarım.
  useFocusEffect(
    useCallback(() => {
      getProfile().then(setProfile);
    }, []),
  );

  useEffect(() => {
    if (campaigns.length <= 1) return;
    const interval = setInterval(() => {
      campaignIndexRef.current = (campaignIndexRef.current + 1) % campaigns.length;
      campaignListRef.current?.scrollToIndex({
        index: campaignIndexRef.current,
        animated: true,
      });
    }, CAMPAIGN_AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [campaigns]);

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
        ref={categoryListRef}
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

            {campaigns.length > 0 && (
              <FlatList
                ref={campaignListRef}
                data={campaigns}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => String(item.id)}
                style={styles.campaignCarousel}
                renderItem={({ item }) => <CampaignCard campaign={item} />}
                onScrollToIndexFailed={() => {}}
              />
            )}

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

export default HomeScreen;
