import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import FruitImage from '@assets/images/images1.svg';
import type { RootStackParamList } from '@typings/navigation';
import useReload from '../../hooks/useReload';
import { FONTS } from '../../theme/fonts';

function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { refreshing, onRefresh } = useReload();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 24 },
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <FruitImage width={260} height={260} style={styles.image} />

      <View style={styles.footer}>
        <Text style={styles.description}>
          Sizə daha əlçatan olması üçün qeydiyyatdan keçərək davam edə
          bilərsiniz 🥰
        </Text>

        <Button
          title="Qeydiyyat"
          onPress={() => navigation.navigate('Register')}
        />

        <Text style={styles.loginText}>
          Hesabınız varsa {' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            Daxil olun
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    marginLeft: -90,
  },
  footer: {
    marginTop: 40,
    gap: 20,
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333333',
    lineHeight: 19,
    fontFamily: FONTS.regular,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333333',
    fontFamily: FONTS.regular,
  },
  loginLink: {
    marginLeft: 6,
    color: '#7BC043',
    fontFamily: FONTS.semiBold,
  },
});

export default WelcomeScreen;
