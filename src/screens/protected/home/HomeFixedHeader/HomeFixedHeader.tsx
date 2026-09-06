import { useMemo } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { EditIcon } from '@shared/icons';
import CampaignCard from '../CampaignCard';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './HomeFixedHeader.styles';
import type { HomeFixedHeaderProps } from './HomeFixedHeader.types';

// Deliberately rendered outside HomeScreen's category FlatList rather than
// as its ListHeaderComponent — as a header it scrolled away with the list
// content, so the address bar and banner disappeared as soon as there were
// enough categories to scroll.
function HomeFixedHeader({
  address,
  campaigns,
  campaignListRef,
  onAddressPress,
  onCampaignPress,
}: HomeFixedHeaderProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  return (
    <View style={styles.fixedHeader}>
      <TouchableOpacity
        style={styles.addressCard}
        onPress={onAddressPress}
        activeOpacity={0.7}
      >
        <View style={styles.addressTextGroup}>
          <Text style={styles.addressLabel}>{t('home.addressLabel')}</Text>
          <Text style={styles.addressValue} numberOfLines={1}>
            {address ?? t('home.noAddress')}
          </Text>
        </View>
        <EditIcon size={22} color={colors.textMuted} />
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
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.85} onPress={onCampaignPress}>
              <CampaignCard campaign={item} />
            </TouchableOpacity>
          )}
          onScrollToIndexFailed={() => {}}
        />
      )}
    </View>
  );
}

export default HomeFixedHeader;
