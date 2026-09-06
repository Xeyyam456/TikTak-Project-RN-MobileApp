import { useMemo, useRef, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ErrorState from '@shared/components/ErrorState';
import useReload from '@shared/hooks/useReload';
import type { Category } from '@typings/api';
import type { HomeStackParamList, RootStackParamList } from '@typings/navigation';
import AddressEditModal from '../AddressEditModal';
import CategoryCard from '../CategoryCard';
import CategoryGridSkeleton from '../CategoryGridSkeleton';
import HomeFixedHeader from '../HomeFixedHeader';
import { useTheme } from '../../../../theme/ThemeContext';
import { COLUMNS, createStyles } from './HomeScreen.styles';
import { useHomeData } from '../hooks/useHomeData';

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

  // The backend has no per-campaign detail endpoint (campaign.service.ts),
  // so every banner opens the same full list rather than one campaign.
  function goToCampaigns() {
    (navigation as unknown as NativeStackNavigationProp<RootStackParamList>).navigate(
      'Campaigns',
    );
  }

  // Lets tapping the already-focused "Əsas" tab scroll back to the top
  // (the category cards), matching native tab-bar "tap again to go top".
  useScrollToTop(categoryListRef);

  return (
    <View style={styles.flex}>
      {!error && (
        <HomeFixedHeader
          address={profile?.address}
          campaigns={campaigns}
          campaignListRef={campaignListRef}
          onAddressPress={() => setAddressModalVisible(true)}
          onCampaignPress={goToCampaigns}
        />
      )}

      {error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : loading ? (
        <CategoryGridSkeleton />
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
