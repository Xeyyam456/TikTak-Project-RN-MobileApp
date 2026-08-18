import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CartIcon } from '@shared/components/icons';
import { useBasketStore } from '@shared/store/basket.store';
import type { RootStackParamList } from '@typings/navigation';
import { FONTS } from '../../theme/fonts';

const HORIZONTAL_PADDING = 15;

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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  logo: {
    fontSize: 24,
    color: '#1A1A1A',
    fontFamily: FONTS.extraBold,
  },
  cartWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    borderRadius: 8,
    backgroundColor: '#E24C4C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    fontSize: 10,
    lineHeight: 12,
    color: '#FFFFFF',
    fontFamily: FONTS.bold,
  },
});

export default AppHeader;
