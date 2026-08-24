import { useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronRightIcon } from '@shared/components/icons';
import type { Category } from '@typings/api';
import type { HomeStackParamList } from '@typings/navigation';
import AddressEditModal from '../AddressEditModal';
import CampaignCard from '../CampaignCard';
import CategoryCard from '../CategoryCard';
import { COLUMNS, styles } from './HomeScreen.styles';
import { useHomeData } from './useHomeData';

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const { profile, setProfile, categories, campaigns, loading, campaignListRef } =
    useHomeData();

  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const categoryListRef = useRef<FlatList<Category>>(null);

  // Lets tapping the already-focused "Əsas" tab scroll back to the top
  // (the category cards), matching native tab-bar "tap again to go top".
  useScrollToTop(categoryListRef);

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
              onPress={() => setAddressModalVisible(true)}
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

      <AddressEditModal
        visible={addressModalVisible}
        profile={profile}
        onClose={() => setAddressModalVisible(false)}
        onSaved={updated => {
          setProfile(updated);
          setAddressModalVisible(false);
        }}
      />
    </View>
  );
}

export default HomeScreen;
