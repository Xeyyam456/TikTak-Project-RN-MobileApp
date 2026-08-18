import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import { ArrowLeftIcon, CheckIcon } from '@shared/components/icons';
import type { RootStackParamList } from '@typings/navigation';
import { FONTS } from '../../../theme/fonts';

function OrderSuccessScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          title="Əsas səhifəyə qayıt"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  backButton: {
    width: 32,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconHalo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EAF6DE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#7BC043',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 15,
    paddingTop: 16,
  },
});

export default OrderSuccessScreen;
