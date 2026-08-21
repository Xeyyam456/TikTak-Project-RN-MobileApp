import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CartIcon } from '@shared/components/icons';
import { useBasketStore } from '@shared/store/basket.store';
import type { RootStackParamList } from '@typings/navigation';
import { styles } from './AppHeader.styles';

function AppHeader() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const basket = useBasketStore(state => state.basket);
  const fetchBasket = useBasketStore(state => state.fetchBasket);

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  const basketCount =
    basket?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.logo}>TIK TAK</Text>
      <TouchableOpacity
        style={styles.cartWrapper}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        onPress={() => navigation.navigate('Basket')}
      >
        <CartIcon size={24} />
        {basketCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {basketCount > 99 ? '99+' : basketCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default AppHeader;
