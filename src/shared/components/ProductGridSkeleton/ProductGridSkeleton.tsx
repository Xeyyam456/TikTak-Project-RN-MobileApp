import { View } from 'react-native';
import ProductCardSkeleton from '../ProductCardSkeleton';
import { COLUMNS } from '../ProductCard';
import { styles } from './ProductGridSkeleton.styles';
import type { ProductGridSkeletonProps } from './ProductGridSkeleton.types';

const SKELETON_COUNT = 6;

// Placeholder twin of ProductGrid — same column count and gaps, so the
// real grid drops in without the page reflowing.
function ProductGridSkeleton({ paddingTop = 14 }: ProductGridSkeletonProps) {
  return (
    <View style={[styles.grid, { paddingTop }]}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.cardWrapper,
            index % COLUMNS !== 0 && styles.cardWrapperRight,
          ]}
        >
          <ProductCardSkeleton />
        </View>
      ))}
    </View>
  );
}

export default ProductGridSkeleton;
