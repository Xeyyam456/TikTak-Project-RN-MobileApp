import { useMemo } from 'react';
import { Image, Text } from 'react-native';
import BottomSheet from '@shared/components/BottomSheet';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './CampaignDetailSheet.styles';
import type { CampaignDetailSheetProps } from './CampaignDetailSheet.types';

const FALLBACK_CAMPAIGN_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

function CampaignDetailSheet({ campaign, onClose }: CampaignDetailSheetProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <BottomSheet visible={!!campaign} onClose={onClose}>
      {campaign && (
        <>
          <Image
            source={{ uri: campaign.img_url || FALLBACK_CAMPAIGN_IMAGE }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.title}>{campaign.title}</Text>
          {campaign.description ? (
            <Text style={styles.description}>{campaign.description}</Text>
          ) : null}
        </>
      )}
    </BottomSheet>
  );
}

export default CampaignDetailSheet;
