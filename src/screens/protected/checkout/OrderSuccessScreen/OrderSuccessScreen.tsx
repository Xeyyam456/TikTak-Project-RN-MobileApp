import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import { ArrowLeftIcon, CheckIcon } from '@shared/components/icons';
import type { RootStackParamList } from '@typings/navigation';
import { styles } from './OrderSuccessScreen.styles';

const REDIRECT_SECONDS = 3;

function goToOrderHistory(
  navigation: NativeStackNavigationProp<RootStackParamList>,
) {
  navigation.navigate('Main', {
    screen: 'Profile',
    params: { screen: 'OrderHistory' },
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          onPress={() => navigation.popToTop()}
        >
          <ArrowLeftIcon size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sifarişi tamamla</Text>
        <View style={styles.headerSpacer} />
      </View>

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
            navigation.navigate('Main', {
              screen: 'Home',
              params: { screen: 'HomeMain' },
            })
          }
        />
      </View>
    </View>
  );
}

export default OrderSuccessScreen;
