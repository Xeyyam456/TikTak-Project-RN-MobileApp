import { View } from 'react-native';
import Skeleton from '@shared/components/Skeleton';
import { IMAGE_SIZE, styles } from './SearchResultsSkeleton.styles';

const SKELETON_COUNT = 5;

function SkeletonRow() {
  return (
    <View style={styles.row}>
      <Skeleton width={IMAGE_SIZE} height={IMAGE_SIZE} borderRadius={10} />
      <View style={styles.rowText}>
        <Skeleton width="90%" height={14} style={styles.title} />
        <Skeleton width={60} height={13} />
      </View>
    </View>
  );
}

function SearchResultsSkeleton() {
  return (
    <View style={styles.list}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </View>
  );
}

export default SearchResultsSkeleton;
