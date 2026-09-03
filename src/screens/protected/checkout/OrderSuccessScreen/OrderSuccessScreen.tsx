import { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import ScreenHeader from '@shared/components/ScreenHeader';
import { CheckIcon } from '@shared/components/icons';
import { notifyOrderPlaced } from '@shared/utils/notifications';
import type { RootStackParamList } from '@typings/navigation';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './OrderSuccessScreen.styles';

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
  const route = useRoute<RouteProp<RootStackParamList, 'OrderSuccess'>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      goToOrderHistory(navigation);
      return;
    }
    const timeout = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(timeout);
  }, [secondsLeft, navigation]);

  // Runs once per successful order, independent of the countdown re-render
  // above — a denied notification permission fails silently inside
  // notifyOrderPlaced, so there's nothing to show here either way.
  useEffect(() => {
    notifyOrderPlaced(route.params.orderNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title={t('checkout.title')} onBack={() => navigation.popToTop()} />

      <View style={styles.content}>
        <View style={styles.iconHalo}>
          <View style={styles.iconCircle}>
            <CheckIcon size={40} />
          </View>
        </View>
        <Text style={styles.title}>{t('orderSuccess.title')}</Text>
        <Text style={styles.subtitle}>{t('orderSuccess.subtitle')}</Text>
        <Text style={styles.countdown}>
          {t('orderSuccess.countdown', { seconds: secondsLeft })}
        </Text>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          title={t('orderSuccess.backHome')}
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
