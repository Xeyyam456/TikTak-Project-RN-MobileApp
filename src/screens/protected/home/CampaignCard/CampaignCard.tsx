import { Image, StyleSheet, Text, View } from 'react-native';
import { styles } from './CampaignCard.styles';
import type { CampaignCardProps } from './CampaignCard.types';

const FALLBACK_CAMPAIGN_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

function CampaignCard({ campaign }: CampaignCardProps) {
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

export default CampaignCard;
