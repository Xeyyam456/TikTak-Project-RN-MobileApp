import { useMemo } from 'react';
import { View } from 'react-native';
import Skeleton from '../Skeleton';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles } from './ProductCardSkeleton.styles';

// Mirrors ProductCard's layout (image / title / price / button) so the
// grid doesn't visibly reflow once real cards replace these.
function ProductCardSkeleton() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <Skeleton style={styles.image} />
      <Skeleton height={17} borderRadius={4} />
      <Skeleton width="60%" height={17} borderRadius={4} style={{ alignSelf: 'center' }} />
      <Skeleton height={34} borderRadius={17} />
    </View>
  );
}

export default ProductCardSkeleton;
