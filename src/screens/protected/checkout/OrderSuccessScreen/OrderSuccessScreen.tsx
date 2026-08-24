import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import ScreenHeader from '@shared/components/ScreenHeader';
import { CheckIcon } from '@shared/components/icons';
import type { RootStackParamList } from '@typings/navigation';
import { styles } from './OrderSuccessScreen.styles';

const REDIRECT_SECONDS = 3;

// A plain `navigate('Main', ...)` merges params onto the existing 'Main'
// route and *should* pop everything above it, but in practice still left
// Basket/Checkout/OrderSuccess reachable via the hardware back button after
// navigating elsewhere and coming back. `reset` throws away the whole root
// stack instead, so there is nothing left to go "back" into.
function goToOrderHistory(
  navigation: NativeStackNavigationProp<RootStackParamList>,
) {
  navigation.reset({
    index: 0,
    routes: [
      {
        name: 'Main',
        params: { screen: 'Profile', params: { screen: 'OrderHistory' } },
      },
    ],
  });
}

function OrderSuccessScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      goToOrderHistory(navigation);
      return;
    }
    const timeout = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(timeout);
  }, [secondsLeft, navigation]);

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title="Sifarişi tamamla" onBack={() => navigation.popToTop()} />

      <View style={styles.content}>
        <View style={styles.iconHalo}>
          <View style={styles.iconCircle}>
            <CheckIcon size={40} />
          </View>
        </View>
        <Text style={styles.title}>Sifariş uğurla tamamlandı</Text>
        <Text style={styles.subtitle}>
          Əməkdaşlarımız sizinlə əlaqə saxlayıb sifarişinizi göndərəcəklər.
        </Text>
        <Text style={styles.countdown}>
          {secondsLeft} saniyə sonra Sifarişlərim bölməsinə yönləndiriləcəksiniz
        </Text>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          title="Əsas səhifəyə qayıt"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Main',
                  params: { screen: 'Home', params: { screen: 'HomeMain' } },
                },
              ],
            })
          }
        />
      </View>
    </View>
  );
}

export default OrderSuccessScreen;
