import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ErrorState from '@shared/components/ErrorState';
import ScreenHeader from '@shared/components/ScreenHeader';
import Skeleton from '@shared/components/Skeleton';
import useReload from '@shared/hooks/useReload';
import type { Campaign } from '@typings/api';
import type { RootStackParamList } from '@typings/navigation';
import CampaignDetailSheet from '../CampaignDetailSheet';
import { useTheme } from '../../../../theme/ThemeContext';
import { CARD_HEIGHT, createStyles } from './CampaignsScreen.styles';
import { useCampaignsData } from '../hooks/useCampaignsData';

const FALLBACK_CAMPAIGN_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';
const SKELETON_COUNT = 3;

function CampaignsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  const { campaigns, loading, error, retry } = useCampaignsData();
  const { refreshing, onRefresh } = useReload(retry);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader
        title={t('campaigns.title')}
        onBack={() => navigation.goBack()}
      />

      {error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : loading ? (
        <View style={styles.listContent}>
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <Skeleton key={index} height={CARD_HEIGHT} borderRadius={10} style={styles.skeletonCard} />
          ))}
        </View>
      ) : campaigns.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>{t('campaigns.emptyText')}</Text>
        </View>
      ) : (
        <FlatList
          data={campaigns}
          keyExtractor={(item: Campaign) => String(item.id)}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 24 },
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setSelectedCampaign(item)}
            >
              <View style={styles.card}>
                <Image
                  source={{ uri: item.img_url || FALLBACK_CAMPAIGN_IMAGE }}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                />
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  {item.description ? (
                    <Text style={styles.cardDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <CampaignDetailSheet
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />
    </View>
  );
}

export default CampaignsScreen;
