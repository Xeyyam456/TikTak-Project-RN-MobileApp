import { View } from 'react-native';
import Skeleton from '@shared/components/Skeleton';
import { styles } from './CategoryGridSkeleton.styles';

const SKELETON_COUNT = 6;

function CategoryGridSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <View key={index} style={styles.card}>
            <Skeleton style={styles.cardImage} />
            <Skeleton height={14} borderRadius={4} width="80%" />
          </View>
        ))}
      </View>
    </View>
  );
}

export default CategoryGridSkeleton;
