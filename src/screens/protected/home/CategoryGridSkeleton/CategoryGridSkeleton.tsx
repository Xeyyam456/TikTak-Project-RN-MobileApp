import { View } from 'react-native';
import Skeleton from '@shared/components/Skeleton';
import {
  CARD_RADIUS,
  CARD_WIDTH,
  styles,
} from './CategoryGridSkeleton.styles';

const SKELETON_COUNT = 6;

function CategoryGridSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <View key={index} style={styles.card}>
            <Skeleton width={CARD_WIDTH} height={CARD_WIDTH} borderRadius={CARD_RADIUS} />
            <Skeleton width="70%" height={12} borderRadius={4} />
          </View>
        ))}
      </View>
    </View>
  );
}

export default CategoryGridSkeleton;
