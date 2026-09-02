import { useMemo, useRef, useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ErrorState from '@shared/components/ErrorState';
import Skeleton from '@shared/components/Skeleton';
import { ChevronRightIcon } from '@shared/components/icons';
import useReload from '@shared/hooks/useReload';
import type { Category } from '@typings/api';
import type { HomeStackParamList } from '@typings/navigation';
import AddressEditModal from '../AddressEditModal';
import CampaignCard from '../CampaignCard';
import CategoryCard from '../CategoryCard';
import { useTheme } from '../../../../theme/ThemeContext';
import { COLUMNS, createStyles } from './HomeScreen.styles';
import { useHomeData } from './useHomeData';

const SKELETON_COUNT = 6;

function CategoryGridSkeleton() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.skeletonGrid}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <View key={index} style={styles.skeletonCard}>
          <Skeleton style={styles.skeletonCardImage} />
          <Skeleton height={14} borderRadius={4} width="80%" />
        </View>
      ))}
    </View>
  );
}

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    profile,
    setProfile,
    categories,
    campaigns,
    loading,
    error,
    retry,
    campaignListRef,
  } = useHomeData();

  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const categoryListRef = useRef<FlatList<Category>>(null);
  const { refreshing, onRefresh } = useReload(retry);

  // Lets tapping the already-focused "Əsas" tab scroll back to the top
  // (the category cards), matching native tab-bar "tap again to go top".
  useScrollToTop(categoryListRef);

  return (
    <View style={styles.flex}>
      {error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : (
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
                <ChevronRightIcon size={20} color={colors.textMuted} />
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

              {loading ? <CategoryGridSkeleton /> : null}
            </>
          }
        />
      )}

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
