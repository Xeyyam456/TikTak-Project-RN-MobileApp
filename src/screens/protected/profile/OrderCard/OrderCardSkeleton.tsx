import { useMemo } from 'react';
import { View } from 'react-native';
import Skeleton from '@shared/components/Skeleton';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './OrderCard.styles';

const SKELETON_COUNT = 4;

function OrderCardSkeleton() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Skeleton width={90} height={16} />
        <Skeleton width={70} height={22} borderRadius={20} />
      </View>
      <View style={styles.cardMiddle}>
        <Skeleton width={110} height={14} />
        <Skeleton width={60} height={16} />
      </View>
      <View style={styles.divider} />
      <View style={styles.cardBottom}>
        <View style={styles.addressBlock}>
          <Skeleton width={100} height={12} style={{ marginBottom: 6 }} />
          <Skeleton width="80%" height={14} />
        </View>
        <Skeleton width={34} height={34} borderRadius={17} />
      </View>
    </View>
  );
}

export function OrderListSkeleton() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.skeletonList}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <View key={index} style={index > 0 ? styles.skeletonGap : undefined}>
          <OrderCardSkeleton />
        </View>
      ))}
    </View>
  );
}

export default OrderCardSkeleton;
